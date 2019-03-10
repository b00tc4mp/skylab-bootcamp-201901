'use strict'

const { User, Exercise } = require('../models')

const bcrypt = require('bcrypt')
const testing = require('../testing')
const { AuthError, DuplicateError, MatchingError, NotFoundError, PrivilegeError } = require('startlab-errors')
const validate = require('startlab-validation')

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

    createExercise(userId, title, summary, test) {

        validate([
            { key: 'userId', value: userId, type: String },
            { key: 'title', value: title, type: String },
            { key: 'summary', value: summary, type: String },
            { key: 'test', value: test, type: String }
        ])

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

                return Exercise.create({ title, summary, test }) // here I'm not calling to Exercise.create. instead I¡m calling to mongo DB create method, right?
                    .then(({ id }) => {
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


    /********************/
    /*** Code methods ***/
    /********************/

    checkAnswer(userId, answer, exerciseId) {

        validate([
            { key: 'userId', value: userId, type: String },
            { key: 'answer', value: answer, type: String },
            { key: 'exerciseId', value: exerciseId, type: String }
        ])

        return this.retrieveExercise(userId, exerciseId)
            .then(exercise => {
                if (!exercise) throw new NotFoundError(`exercise with id ${exerciseId} not found`)

                const result = testing.checkAnswer(answer, exercise.test)

                this.__changeStatusExerciseFromUser__(userId, answer, exercise.id)
                return { status: 'ok' }
            })
            .catch(error => {   // {"error": "ReferenceError: favoriteFood is not defined"}
                                // goes to catch if the answer from user is not valid
                if (error) return { error: error.message }
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
    }

}

module.exports = logic