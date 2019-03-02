'use strict'

const { models: { User } } = require('datify')
const bcrypt = require('bcrypt')
const { AuthError, EmptyError, DuplicateError, MatchingError, NotFoundError } = require('errorify')


const logic = {
    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
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

        // return User.findOne({ email })
        //     .then(user => {
        //         if (user) throw Error(`user with email ${email} already exists`)

        //         return bcrypt.hash(password, 10)
        //     })
        //     .then(hash => User.create({ name, surname, email, password: hash }))
        //     .then(({ id }) => id)

        return (async () => {
            const user = await User.findOne({ email })

            if (user) throw new DuplicateError(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 10)

            const { id } = await User.create({ name, surname, email, password: hash })

            return id
        })()
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw new EmptyError('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw new EmptyError('password cannot be empty')

        return (async () => {
            const user = await User.findOne({ email })

            if (!user) throw new NotFoundError(`user with email ${email} not found`)

            const match = await bcrypt.compare(password, user.password)

            if (!match) throw new AuthError('wrong credentials')

            return user.id
        })()
    },

    /**
     * Retrieves user by its userId.
     * 
     * @param {string} userId
     */
    retrieveUser(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)

        if (!userId.trim().length) throw new EmptyError('user id is empty')

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw new NotFoundError(`user with id ${userId} not found`)

                // delete user.password
                // delete user.__v

                user.id = user._id.toString()

                delete user._id

                return user
            })
    },

    updateUser(userId, _name, _surname, _email, _password, _passwordConfirm) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)

        if (!userId.trim().length) throw new EmptyError('user id is empty')

        if (typeof _name !== 'string') throw TypeError(_name + ' is not a string')

        if (!_name.trim().length) throw new EmptyError('name cannot be empty')

        if (typeof _surname !== 'string') throw TypeError(_surname + ' is not a string')

        if (!_surname.trim().length) throw new EmptyError('surname cannot be empty')

        if (typeof _email !== 'string') throw TypeError(_email + ' is not a string')

        if (!_email.trim().length) throw new EmptyError('email cannot be empty')

        if (typeof _password !== 'string') throw TypeError(_password + ' is not a string')

        if (!_password.trim().length) throw new EmptyError('password cannot be empty')

        if (typeof _passwordConfirm !== 'string') throw TypeError(_passwordConfirm + ' is not a string')

        if (!_passwordConfirm.trim().length) throw new EmptyError('password confirmation cannot be empty')

        if (_password !== _passwordConfirm) throw new MatchingError('passwords do not match')

        return User.findOneAndUpdate({ _id: userId }, { name: _name, surname: _surname, email: _email, password: _password }).select('-password -__v').lean()
            .then((user) => {
                user.id = user._id.toString()

                delete user._id
                return user
            })
            .catch((err) => console.error(err))
    },

    removeUser(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)

        if (!userId.trim().length) throw new EmptyError('user id is empty')

        return User.findOneAndRemove({ _id: userId }).select('-password -__v').lean()
            .then(user => user)
    }
    // TODO removeUser
}

module.exports = logic