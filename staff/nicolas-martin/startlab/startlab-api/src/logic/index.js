'use strict'

const users = require('../data/users')
const exercises = require('../data/exercises')

const { User, Exercise } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const testing = require('../testing')
const { AuthError, EmptyError, DuplicateError, MatchingError, NotFoundError, PrivilegeError, CodeError } = require('../errors')

/**
 * Abstraction of business logic.
 */
const logic = {

    jwtSecret: null,

    /******************/
    /** User methods **/
    /******************/

    registerUser(name, surname, email, password, passwordConfirm) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        if (!name.trim().length) throw new EmptyError('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')
        if (!surname.trim().length) throw new EmptyError('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw new EmptyError('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw new EmptyError('password cannot be empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(passwordConfirm + ' is not a string')
        if (!passwordConfirm.trim().length) throw new EmptyError('password confirmation cannot be empty')
        if (passwordConfirm.trim() !== password.trim()) throw new MatchingError('password and password confirmation does not match')

        return User.findOne({ email })
            .then(user => {
                if (user) throw new DuplicateError(`user with email ${email} already exists`)

                return bcrypt.hash(password, 10)
            })
            .then(hash => User.create({ name, surname, email, password: hash }))
            .then(({ id }) => id)
    },

    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw new EmptyError('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw new EmptyError('password cannot be empty')

        return User.findOne({ email })
            .then(user => {
                if (!user) throw new NotFoundError(`user with email ${email} not found`)

                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) throw new AuthError('wrong credentials')

                        return user.id
                    })
            })
    },

    retrieveUser(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new EmptyError(`${userId} is empty`)

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} not found`)
                //if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

                user.id = user._id
                delete user._id
                return user
            })
    },

    /********************/
    /** CRUD exercise ***/
    /********************/

    createExercise(userId, title, summary, test) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new EmptyError('userId is empty')

        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw new EmptyError('title is empty')

        if (typeof summary !== 'string') throw TypeError(`${summary} is not a string`)
        if (!summary.trim().length) throw new EmptyError('summary is empty')

        if (typeof test !== 'string') throw TypeError(`${test} is not a string`)
        if (!test.trim().length) throw new EmptyError('test is empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

                return Exercise.create({ title, summary, test })
                    .then(({ id }) => id)
            })

    },

    retrieveExercise(userId, exerciseId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new EmptyError(`${userId} is empty`)

        if (typeof exerciseId !== 'string') throw TypeError(`${exerciseId} is not a string`)
        if (!exerciseId.trim().length) throw new EmptyError(`exerciseId is empty`)

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                //if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

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
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new EmptyError(`${userId} is empty`)

        if (typeof exerciseId !== 'string') throw TypeError(`${exerciseId} is not a string`)
        if (!exerciseId.trim().length) throw new EmptyError(`exerciseId is empty`)

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

                return Exercise.findById(exerciseId)
                    .then(exercise => {
                        if (!exercise) throw new NotFoundError(`exercise with id ${exerciseId} not found`)

                        return Exercise.deleteOne({ _id: exerciseId })
                            .then((res) => {
                                if (res.ok === 1) return {status: 'ok', message: `exercise with id ${exerciseId} deleted`}
                            })
                    })
            })
    },

    updateExercise(userId, exercise) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new EmptyError(`${userId} is empty`)

        //Todo validate exercise and fields

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)
                if (!user.isAdmin) throw new PrivilegeError(`user with id ${userId} has not privileges`)

                const { id, ..._exercise } = exercise

                return Exercise.findByIdAndUpdate(id, _exercise, { runValidators: true, new: true }).select('-__v').lean()
                                .then(exercise => {
                                    if (!exercise) throw new NotFoundError(`exercise with id ${id} not found`)

                                    exercise.id = exercise._id.toString()
                                    delete exercise._id

                                    return exercise
                                })
            })
    
    },

    listExercises(userId){
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new EmptyError(`${userId} is empty`)

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


    /********************/
    /*** Code methods ***/
    /********************/

    checkCode(userId, code, test) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new EmptyError(`${userId} is empty`)

        if (typeof code !== 'string') throw TypeError(`${code} is not a string`)
        if (!code.trim().length) throw new EmptyError(`${code} is empty`)

        if (typeof test !== 'string') throw TypeError(`${test} is not a string`)
        if (!test.trim().length) throw new EmptyError(`${test} is empty`)

        return testing.checkCode(code, test)
        // if (result.error) throw new CodeError(result.error)
        // return result
    }

}

module.exports = logic