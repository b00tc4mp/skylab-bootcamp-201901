'use strict'

const bcrypt = require('bcrypt')
const { models: { User } } = require('flyme-data')
const { AuthError, EmptyError, DuplicateError, MatchingError, NotFoundError } = require('flyme-errors')

/**
 * 
 * Abstraction of business logic
 * 
 */

const logic = {

    /**
     * 
     * User Register
     * 
     * Function that register a new user to the application.
     * 
     * @param {String} name 
     * @param {String} surname 
     * @param {String} email 
     * @param {String} password 
     * @param {String} passwordConfirmation 
     * 
     * @return Object with the Id of the new User
     */
    registerUser(name, surname, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw new EmptyError('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw new EmptyError('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw new EmptyError('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw new EmptyError('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw new EmptyError('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw new MatchingError('passwords do not match')

        return User.findOne({ email })
            .then(user => {

                if (user) throw new DuplicateError(`This email: ${email} is already used it`)

                return bcrypt.hash(password, 10)
            })
            .then(hash => User.create({ name, surname, email, password: hash }))
            .then(user => user.id)
    },

    /**
     * Authenticat User
     * 
     * Function to authenticate an user with  credentials
     * 
     * @param {String} email 
     * @param {String} password
     * 
     * @return {Object} Object with the User Token 
     */
    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw new EmptyError('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw new EmptyError('password cannot be empty')

        return User.findOne({ email })
            .then(user => {
                if (!user) throw new NotFoundError(`There is no User with this email: ${email}`)

                return bcrypt.compare(password, user.password)
                    .then(match => {
                        if (!match) throw new AuthError('wrong credentials')

                        return { id: user.id }
                    })
            })
    },


    retrieveUser(userId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

                user.id = user._id.toString()

                delete user._id

                return user
            })
    },

    updateUser(userId, data) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        if (!(data instanceof Object)) throw new TypeError(data + ' is not an Object')

        if (data instanceof Function) throw new TypeError(data + ' is a Function')

        if (data instanceof Array) throw new TypeError(data + ' is an array')

        if (Object.keys(data).length === 0) throw new EmptyError('Data cannot be empty')

        //todo validate data is an object

        return User.findById(userId)
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

                return User.findByIdAndUpdate(userId, data, { runValidators: true })
                    .then(user => {

                        return {
                            status: 'OK',
                            id: user._id.toString(),
                        }
                    })
            })
    },


    deleteUser(userId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')

        if (!userId.trim().length) throw new EmptyError('userId cannot be empty')

        return User.findByIdAndDelete(userId)
            .then(() => {
                return { status: 'OK' }
            })
    }


}

module.exports = logic