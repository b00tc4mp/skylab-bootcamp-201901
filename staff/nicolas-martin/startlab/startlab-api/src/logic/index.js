'use strict'

const bcrypt = require('bcrypt')

const { AuthError, DuplicateError, MatchingError, NotFoundError, PrivilegeError } = require('startlab-errors')
const validate = require('startlab-validation')
const fs = require('fs')
const vm = require('vm')

var Mocha = require('mocha')
var path = require('path')

const testing = require('../testing')
const { User, Exercise, Invitation } = require('../models')
const emailing = require('../emailing')

/**
 * Abstraction of business logic.
 */
const logic = {

    jwtSecret: null,

    /******************/
    /** User methods **/
    /******************/

    registerUser(name, surname, email, password, passwordConfirm) {

        validate([
            { key: 'name', value: name, type: String },
            { key: 'surname', value: surname, type: String },
            { key: 'email', value: email, type: String },
            { key: 'password', value: password, type: String },
            { key: 'passwordConfirm', value: passwordConfirm, type: String }
        ])

        if (passwordConfirm.trim() !== password.trim()) throw new MatchingError('password and password confirmation does not match')

        return User.findOne({ email })
            .then(user => {
                if (user) throw new DuplicateError(`user with email ${email} already exists`)

                return bcrypt.hash(password, 10)
            })
            .then(hash => User.create({ name, surname, email, password: hash }))
            .then(({ id }) => id)
    },

    retrieveUser(userId) {

        validate([{ key: 'userId', value: userId, type: String }])

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} not found`)

                user.id = user._id
                delete user._id
                return user
            })
    },

    authenticateUser(email, password) {

        validate([
            { key: 'email', value: email, type: String },
            { key: 'password', value: password, type: String }
        ])

        return User.findOne({ email })
            .then(user => {
                if (!user) throw new NotFoundError(`user with email ${email} not found`)

                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) throw new AuthError('wrong credentials')
                        return user
                    })
            })
    },

    /********************/
    /** CRUD exercise ***/
    /********************/

    createExercise(userId, title, summary, test, theme) {

        validate([
            { key: 'userId', value: userId, type: String },
            { key: 'title', value: title, type: String },
            { key: 'summary', value: summary, type: String },
            { key: 'test', value: test, type: String },
            { key: 'theme', value: theme, type: Number }
        ])

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

                return Exercise.create({ title, summary, test, theme }) // here I'm not calling to Exercise.create. instead I¡m calling to mongo DB create method, right?
                    .then(({ id }) => {
                        var unitFile = path.join(process.cwd(), 'src', 'test-files', `${id}.js`)

                        fs.appendFile(unitFile, test.toString(), function (err) {
                            if (err) throw Error('file not created')
                        })

                        return { message: `exercise with id ${id} created` }
                    })
            })

    },

    retrieveExercise(userId, exerciseId) {

        validate([
            { key: 'userId', value: userId, type: String },
            { key: 'exerciseId', value: exerciseId, type: String }
        ])

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)

                return Exercise.findById(exerciseId).select('-__v').lean()
                    .then(exercise => {
                        if (!exercise) throw new NotFoundError(`exercise with id ${exerciseId} not found`)

                        exercise.id = exercise._id.toString()
                        delete exercise._id
                        return exercise
                    })
            })
    },

    deleteExercise(userId, exerciseId) {

        validate([
            { key: 'userId', value: userId, type: String },
            { key: 'exerciseId', value: exerciseId, type: String }
        ])

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

                return Exercise.findById(exerciseId)
                    .then(exercise => {
                        if (!exercise) throw new NotFoundError(`exercise with id ${exerciseId} not found`)
                        debugger
                        var pathToDeleteFile = path.join(process.cwd(), 'src', 'test-files', `${exerciseId}.js`)
                        fs.unlink(pathToDeleteFile, function (err) {
                            //if (err) throw Error('file not created')
                        })

                        return Exercise.deleteOne({ _id: exerciseId })
                            .then((res) => {
                                if (res.ok === 1) return { status: 'ok', message: `exercise with id ${exerciseId} deleted` }
                            })
                    })
            })
    },

    updateExercise(userId, exercise) {

        validate([{ key: 'userId', value: userId, type: String }])

        // How to validate exercise -> Object ??

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

                const { id, ..._exercise } = exercise

                return Exercise.findByIdAndUpdate(id, _exercise, { runValidators: true, new: true }).select('-__v').lean()
                    .then(exercise => {
                        if (!exercise) throw new NotFoundError(`exercise with id ${id} not found`)
                        exercise.id = exercise._id.toString()

                        var pathToUpdateFile = path.join(process.cwd(), 'src', 'test-files', `${exercise.id}.js`)

                        fs.writeFile(pathToUpdateFile, exercise.test.toString(), function (err) {
                            if (err) throw Error(`error updating the file`);
                        })

                        return { status: 'ok', message: `exercise with id ${exercise._id} updated` }
                    })
            })

    },

    listExercises(userId) {

        validate([{ key: 'userId', value: userId, type: String }])

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

                return Exercise.find().select('-__v').lean()
                    .then(exercises => {

                        let _exercises = []
                        exercises.forEach(ex => {
                            ex.id = ex._id
                            delete ex._id
                            _exercises.push(ex)
                        })

                        return _exercises
                    })
            })
    },

    getExercisesFromUser(userId) {

        validate([{ key: 'userId', value: userId, type: String }])

        return User.findById(userId).populate('historical.exercise').lean()
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)

                const historical = user.historical.filter(userExercise => {

                    userExercise.exercise.id = userExercise.exercise._id
                    delete userExercise.exercise._id
                    delete userExercise.exercise.__v
                    return userExercise
                })

                return historical

            })
    },

    /***************************/
    /*** Invitations methods ***/
    /***************************/

    retrieveInvitation(userId, invitationId) {

        validate([
            { key: 'userId', value: userId, type: String },
            { key: 'invitationId', value: invitationId, type: String }
        ])

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)

                return Invitation.findById(invitationId).select('-__v').lean()
                    .then(invitation => {
                        if (!invitation) throw new NotFoundError(`invitation with id ${invitationId} not found`)
                        if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

                        invitation.id = invitation._id.toString()
                        delete invitation._id
                        return invitation
                    })
            })
    },

    createInvitation(userId, email) {

        validate([
            { key: 'userId', value: userId, type: String },
            { key: 'email', value: email, type: String }
        ])

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

                return Invitation.create({ email })
                    .then(({ id }) => {
                        return { message: `invitation with id ${id} created` }
                    })
            })

    },

    listInvitations(userId) {

        validate([{ key: 'userId', value: userId, type: String }])

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

                return Invitation.find().select('-__v').lean()
                    .then(invitations => {

                        let _invitations = []
                        invitations.forEach(_invitation => {
                            _invitation.id = _invitation._id
                            delete _invitation._id
                            _invitations.push(_invitation)
                        })

                        return _invitations
                    })
            })
    },

    deleteInvitation(userId, invitationId) {

        validate([
            { key: 'userId', value: userId, type: String },
            { key: 'invitationId', value: invitationId, type: String }
        ])

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

                return Invitation.findById(invitationId)
                    .then(invitation => {
                        if (!invitation) throw new NotFoundError(`invitation with id ${invitationId} not found`)

                        return Invitation.deleteOne({ _id: invitationId })
                            .then((res) => {
                                if (res.ok === 1) return { status: 'ok', message: `invitation with id ${invitationId} deleted` }
                            })
                    })
            })
    },

    updateInvitation(userId, invitation) {

        validate([{ key: 'userId', value: userId, type: String }])

        // How to validate exercise -> Object ??

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

                const { id, ..._invitation } = invitation

                return Invitation.findByIdAndUpdate(id, _invitation, { runValidators: true, new: true }).select('-__v').lean()
                    .then(invitation => {
                        if (!invitation) throw new NotFoundError(`invitation with id ${id} not found`)
                        invitation.id = invitation._id.toString()

                        return { status: 'ok', message: `invitation with id ${invitation._id} updated` }
                    })
            })

    },

    /********************/
    /*** Code methods ***/
    /********************/

    checkAnswer(userId, answer, exerciseId, callback) {

        validate([
            { key: 'userId', value: userId, type: String },
            { key: 'answer', value: answer, type: String },
            { key: 'exerciseId', value: exerciseId, type: String }
        ])

        const unit = `function target(){${answer}}module.exports = target` // we have to wrapped in a function target

        const script = new vm.Script(unit)
        const ctx = { module, console }
        script.runInNewContext(ctx) //ctx => { module: Module, console: Console, salute: [Function: salute] }

        var MyReporter = require('./reporter')
        
        // MyReporter.callback =  function(result) {
        //     console.log('Inside callback: ', result)
        //     debugger
        //     return result
        // }

        MyReporter.callback = callback

        var mocha = new Mocha({ reporter: MyReporter })
        var Suite = Mocha.Suite

        /** passing target in mocha context **/
        mocha.suite.on(Suite.constants.EVENT_FILE_PRE_REQUIRE, function (context) {
            context.target = ctx.target
        })

        // we need to pass from mongo the file where test file is located
        var unitFile = path.join(process.cwd(), 'src', 'test-files', `${exerciseId}.js`)

        // Add the test to mocha before run
        mocha.addFile(unitFile)

        // Run the tests
        mocha.run(function (failures) {
            process.exitCode = failures ? 1 : 0  // exit with non-zero status if there were failures
        })
    },

    __changeStatusExerciseFromUser__(userId, answer, exerciseId) {

        validate([
            { key: 'userId', value: userId, type: String },
            { key: 'answer', value: answer, type: String },
            { key: 'exerciseId', value: exerciseId, type: String }
        ])

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)

                let newHistorical = user.historical.map(exerciseItem => {
                    if (exerciseItem.exercise.toString() === exerciseId) {
                        exerciseItem.answer = answer
                        exerciseItem.completed = true
                    }

                    return exerciseItem
                })
                user.historical = newHistorical
                user.save()
            })
    },

    __changeStatusInvitation__(userId, invitationId) {
        // todo

        return this.retrieveInvitation(userId, invitationId)
            .then(invitation => {
                invitation.status = 'sent'
                return this.updateInvitation(userId, invitation)
                    .then(({ error, status }) => {
                        if (error) throw Error(`an error ocurred changing the status of invitation after sending email`)
                        return status
                    })
            })
    },

    sendInvitationEmail(userId, email, invitationId) {
        validate([{ key: 'userId', value: userId, type: String }])
        // todo validate email format

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

                emailing.sendInvitation(email, user.name)

                return this.__changeStatusInvitation__(userId, invitationId)
                    .then(result => {
                        return { message: `email sent` }
                    })
            })
    }
}

module.exports = logic