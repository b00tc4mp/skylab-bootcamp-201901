'use strict'

const bcrypt = require('bcrypt')
const fs = require('fs')

var Mocha = require('mocha')
var path = require('path')

const { models: { Historical, User, Exercise, Invitation } } = require('startlab-data')

const emailing = require('../emailing')

/**
 * Abstraction of business logic.
 */
const logic = {

    jwtSecret: null,

    /**
    * Registers a user and creates the user folder
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirm
    *  
    */

    registerUser(name, surname, email, password, passwordConfirm) {

        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')
        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(passwordConfirm + ' is not a string')
        if (!passwordConfirm.trim().length) throw Error('password confirmation cannot be empty')
        if (password !== passwordConfirm) throw Error('passwords do not match')

        return this.__isEmailInvited__(email)
            .then(isInvited => {
                if (!isInvited) throw Error('only invited users can registered')

                return User.findOne({ email })
                    .then(user => {
                        if (user) throw Error(`user with email ${email} already exists`)
                        return bcrypt.hash(password, 10)
                    })
                    .then(hash => User.create({ name, surname, email, password: hash }))
                    .then(({ id }) => {
                        this.__createUserFolder__(id)
                        return this.__fillExercisesToUser__(id)
                    })
                    .then(({ id }) => id)
            })
    },

    /**
    * Creates the user folder
    * 
    * @param {string} userId 
    */

    __createUserFolder__(userId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        var directoryToUserFiles = path.join(process.cwd(), 'src', 'answer-files', userId)

        if (!fs.existsSync(directoryToUserFiles)) {
            fs.mkdirSync(directoryToUserFiles)
        }
    },

    /**
    * Fill historical exercises for students
    * 
    * @param {string} userId 
    */

    __fillExercisesToUser__(userId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                return Exercise.find()
                    .then(exercises => {

                        exercises.forEach(exercise => {
                            user.historical.push(new Historical({ exercise: exercise.id, answer: '', completed: false }))
                        })

                        return user.save()
                            .then(user => user)
                    })
            })
    },

    /**
    * Checks if an email is invited
    * 
    * @param {string} email 
    */

    __isEmailInvited__(email) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        return Invitation.findOne({ email }).select('-__v -_id').lean()
            .then(invitation => {
                if (!invitation) throw Error('only invited users can registered')
                return (invitation.status === 'sent')
            })
    },

    /**
    * get user data
    * 
    * @param {string} userId 
    */

    retrieveUser(userId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                user.id = user._id
                delete user._id
                return user
            })
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */

    authenticateUser(email, password) {

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        return User.findOne({ email })
            .then(user => {
                if (!user) throw Error(`user with email ${email} not found`)

                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) throw Error('wrong credentials')
                        return user
                    })
            })
    },

    /**
     * Creates an exercise
     * 
     * @param {string} userId 
     * @param {string} title 
     * @param {string} summary 
     * @param {string} test 
     * @param {number} theme 
     * @param {number} order 
     */

    createExercise(userId, title, summary, test, theme, order) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof title !== 'string') throw TypeError(title + ' is not a string')
        if (!title.trim().length) throw Error('title cannot be empty')

        if (typeof summary !== 'string') throw TypeError(summary + ' is not a string')
        if (!summary.trim().length) throw Error('summary cannot be empty')

        if (typeof test !== 'string') throw TypeError(test + ' is not a string')
        if (!test.trim().length) throw Error('test cannot be empty')

        if (typeof theme !== 'number') throw TypeError(theme + ' is not a number')
        if (theme < 0) throw Error('theme cannot be negative')

        if (typeof order !== 'number') throw TypeError(order + ' is not a number')
        if (order < 0) throw Error('order cannot be negative')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                if (!user.isAdmin) throw Error(`user with id ${userId} has not privileges`)

                return Exercise.create({ title, summary, test, theme, order })
                    .then(({ id }) => {
                        var unitFile = path.join(process.cwd(), 'src', 'test-files', `${id}.js`)

                        fs.appendFile(unitFile, test.toString(), function (err) {
                            if (err) throw Error('file not created')
                        })

                        return { id, message: `Exercise created` }
                    })
            })

    },

    /**
     * Retrieves an exercise
     * 
     * @param {string} userId 
     * @param {string} exerciseId 
     */

    retrieveExercise(userId, exerciseId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof exerciseId !== 'string') throw TypeError(exerciseId + ' is not a string')
        if (!exerciseId.trim().length) throw Error('exerciseId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                return Exercise.findById(exerciseId).select('-__v').lean()
                    .then(exercise => {
                        if (!exercise) throw Error(`exercise with id ${exerciseId} not found`)

                        exercise.id = exercise._id.toString()
                        delete exercise._id
                        return exercise
                    })
            })
    },

    /**
     * Deletes an exercise
     * 
     * @param {string} userId 
     * @param {string} exerciseId 
     */

    deleteExercise(userId, exerciseId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof exerciseId !== 'string') throw TypeError(exerciseId + ' is not a string')
        if (!exerciseId.trim().length) throw Error('exerciseId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                if (!user.isAdmin) throw Error(`user with id ${userId} has not privileges`)

                return Exercise.findById(exerciseId)
                    .then(exercise => {
                        if (!exercise) throw Error(`exercise with id ${exerciseId} not found`)

                        var pathToDeleteFile = path.join(process.cwd(), 'src', 'test-files', `${exerciseId}.js`)
                        fs.unlink(pathToDeleteFile, function (err) {
                            if (err) throw Error('file not created')
                        })

                        return Exercise.deleteOne({ _id: exerciseId })
                            .then((res) => {
                                if (res.ok === 1) return { status: 'ok', message: `Exercise deleted` }
                            })
                    })
            })
    },

    /**
     * Updates an exercise
     * 
     * @param {string} userId 
     * @param {object} exercise 
     */

    updateExercise(userId, exercise) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (exercise.constructor !== Object) throw TypeError(`${exercise} is not an object`)

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                if (!user.isAdmin) throw Error(`user with id ${userId} has not privileges`)

                const { id, ..._exercise } = exercise

                return Exercise.findByIdAndUpdate(id, _exercise, { runValidators: true, new: true }).select('-__v').lean()
                    .then(exercise => {
                        if (!exercise) throw Error(`exercise with id ${id} not found`)
                        exercise.id = exercise._id.toString()

                        var pathToUpdateFile = path.join(process.cwd(), 'src', 'test-files', `${exercise.id}.js`)

                        fs.writeFile(pathToUpdateFile, exercise.test.toString(), function (err) {
                            if (err) throw Error(`error updating the file`)
                        })

                        return { status: 'ok', message: `Exercise updated` }
                    })
            })

    },

    /**
     * List exercises
     * 
     * @param {string} userId 
     * @param {object} exercise 
     */

    listExercises(userId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

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
    },

    /**
     * Gets exercises from the user
     * 
     * @param {string} userId 
     */

    getExercisesFromUser(userId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findById(userId).populate('historical.exercise').lean()
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                return user.historical
            })
    },

    /**
     * Update exercise from the user
     * 
     * @param {string} userId 
     * @param {string} historicalId 
     * @param {string} answer 
     */

    updateExerciseFromUser(userId, historicalId, answer) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof historicalId !== 'string') throw TypeError(historicalId + ' is not a string')
        if (!historicalId.trim().length) throw Error('historicalId cannot be empty')

        if (typeof answer !== 'string') throw TypeError(answer + ' is not a string')
        if (!answer.trim().length) throw Error('answer cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                let newHistorical = user.historical.map(historicalItem => {
                    if (historicalItem.id === historicalId) {
                        historicalItem.answer = answer
                        historicalItem.completed = true
                    }
                    return historicalItem
                })
                user.historical = newHistorical
                return user.save()
            })
    },

    /**
     * Retrieve an invitation
     * 
     * @param {string} userId 
     * @param {string} invitationId 
     */

    retrieveInvitation(userId, invitationId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof invitationId !== 'string') throw TypeError(invitationId + ' is not a string')
        if (!invitationId.trim().length) throw Error('invitationId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                if (!user.isAdmin) throw Error(`user with id ${userId} has not privileges`)

                return Invitation.findById(invitationId).select('-__v').lean()
                    .then(invitation => {
                        if (!invitation) throw Error(`invitation with id ${invitationId} not found`)


                        invitation.id = invitation._id.toString()
                        delete invitation._id
                        return invitation
                    })
            })
    },

    /**
     * Creates an invitation
     * 
     * @param {string} userId 
     * @param {string} email 
     */

    createInvitation(userId, email) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                if (!user.isAdmin) throw Error(`user with id ${userId} has not privileges`)

                return Invitation.create({ email })
                    .then(({ id }) => {
                        return { message: `Invitation created` }
                    })
            })

    },

    /**
     * List invitations
     * 
     * @param {string} userId 
     */

    listInvitations(userId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                if (!user.isAdmin) throw Error(`user with id ${userId} has not privileges`)

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

    /**
     * Deletes an invitation
     * 
     * @param {string} userId 
     * @param {string} invitationId 
     */

    deleteInvitation(userId, invitationId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof invitationId !== 'string') throw TypeError(invitationId + ' is not a string')
        if (!invitationId.trim().length) throw Error('invitationId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                if (!user.isAdmin) throw Error(`user with id ${userId} has not privileges`)

                return Invitation.findById(invitationId)
                    .then(invitation => {
                        if (!invitation) throw Error(`invitation with id ${invitationId} not found`)

                        return Invitation.deleteOne({ _id: invitationId })
                            .then((res) => {
                                if (res.ok === 1) return { status: 'ok', message: `Invitation deleted` }
                            })
                    })
            })
    },

    /**
     * Updates an invitation
     * 
     * @param {string} userId 
     * @param {object} invitation
     */

    updateInvitation(userId, invitation) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (invitation.constructor !== Object) throw TypeError(`invitation is not an object`)

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                if (!user.isAdmin) throw Error(`user with id ${userId} has not privileges`)

                const { id, ..._invitation } = invitation

                return Invitation.findByIdAndUpdate(id, _invitation, { runValidators: true, new: true }).select('-__v').lean()
                    .then(invitation => {
                        if (!invitation) throw Error(`invitation with id ${id} not found`)
                        invitation.id = invitation._id.toString()

                        return { status: 'ok', message: `Invitation updated` }
                    })
            })

    },

    /**
     * checks an answer from the student
     * 
     * @param {string} userId 
     * @param {string} answer
     * @param {string} exerciseId 
     * @param {function} callback 
     */

    checkAnswer(userId, answer, exerciseId, callback) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof answer !== 'string') throw TypeError(answer + ' is not a string')
        if (!answer.trim().length) throw Error('answer cannot be empty')

        if (typeof exerciseId !== 'string') throw TypeError(exerciseId + ' is not a string')
        if (!exerciseId.trim().length) throw Error('exerciseId cannot be empty')

        if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`)

        const MyReporter = require('./reporter')
        MyReporter.callback = callback

        const exerciseFile = path.join(process.cwd(), 'src', 'test-files', `${exerciseId}.js`) // test file
        const exerciseUserFile = path.join(process.cwd(), 'src', 'answer-files', userId, `${exerciseId}.js`) // test with answer file

        let testFromFile
        if (fs.existsSync(exerciseFile)) {
            testFromFile = fs.readFileSync(exerciseFile, 'utf8')
        }

        const dataReplaced = testFromFile.replace(/TARGET/g, answer)

        fs.writeFileSync(exerciseUserFile, dataReplaced, 'utf-8')

        const mocha = new Mocha({ reporter: MyReporter })
        const Suite = Mocha.Suite

        // clean cache "confirmed bug" - https://github.com/mochajs/mocha/issues/1938
        delete require.cache[require.resolve(exerciseUserFile)]

        // Add the test to mocha before run
        mocha.addFile(exerciseUserFile)

        mocha.run(function (failures) {
            process.exitCode = failures ? 1 : 0  // exit with non-zero status if there were failures
        })
    },

    /**
     * change exercise status 
     * 
     * @param {string} userId 
     * @param {string} answer
     * @param {string} exerciseId 
     */

    __changeStatusExerciseFromUser__(userId, answer, exerciseId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof answer !== 'string') throw TypeError(answer + ' is not a string')
        if (!answer.trim().length) throw Error('answer cannot be empty')

        if (typeof exerciseId !== 'string') throw TypeError(exerciseId + ' is not a string')
        if (!exerciseId.trim().length) throw Error('exerciseId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

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

    /**
     * change exercise status 
     * 
     * @param {string} userId 
     * @param {string} invitationId
     */

    __changeStatusInvitation__(userId, invitationId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof invitationId !== 'string') throw TypeError(invitationId + ' is not a string')
        if (!invitationId.trim().length) throw Error('invitationId cannot be empty')

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

    /**
     * change exercise status 
     * 
     * @param {string} userId 
     * @param {string} email 
     * @param {string} invitationId
     */

    sendInvitationEmail(userId, email, invitationId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof invitationId !== 'string') throw TypeError(invitationId + ' is not a string')
        if (!invitationId.trim().length) throw Error('invitationId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)
                if (!user.isAdmin) throw Error(`user with id ${userId} has not privileges`)

                emailing.sendInvitation(email, user.name)

                return this.__changeStatusInvitation__(userId, invitationId)
                    .then(result => {
                        return { message: `email sent` }
                    })
            })
    }
}

module.exports = logic