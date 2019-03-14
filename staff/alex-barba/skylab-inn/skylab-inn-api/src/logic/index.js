'use strict'

const { models: { User, Admin } } = require('skylab-inn-data')
const bcrypt = require('bcrypt')

/**
 * Abstraction of business logic.
 */
const logic = {

    /**
     * Registers a user.
     * 
     * @param {String} name 
     * @param {String} surname 
     * @param {String} email 
     * @param {String} password 
     * @param {String} passwordConfirm
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty or password and password confirm do not match.
     *
     * @returns {String} - id. 
     */
    registerUser(name, surname, email, password, passwordConfirm) {

        if (typeof name !== 'string') throw new TypeError(`${name} is not a string`)
        if (!name.trim().length) throw new Error('name is empty')

        if (typeof surname !== 'string') throw new TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw new Error('surname is empty')

        if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
        if (!email.trim().length) throw new Error('email is empty')

        if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)
        if (!password.trim().length) throw new Error('password is empty')

        if (typeof passwordConfirm !== 'string') throw new TypeError(`${passwordConfirm} is not a string`)
        if (!passwordConfirm.trim().length) throw new Error('password confirmation is empty')

        if (password !== passwordConfirm) throw new Error('passwords do not match')

        return (async () => {
            const user = await User.findOne({ email })

            if (user) throw new Error(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 11)

            const { id } = await User.create({ name, surname, email, password: hash })

            return id
        })()
    },

    /**
     * Authenticates a user.
     * 
     * @param {String} email 
     * @param {String} password
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty, email is not found or password does not match.
     *
     * @returns {String} - id.  
     */
    authenticateUser(email, password) {

        if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
        if (!email.trim().length) throw new Error('email is empty')

        if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)
        if (!password.trim().length) throw new Error('password is empty')

        return (async () => {

            const user = await User.findOne({ email })
            if (!user) throw Error(`user with email ${email} not found`)

            const match = await bcrypt.compare(password, user.password)
            if (!match) throw Error('wrong credentials')

            const { id } = user

            return id
        })()
    },
    
    /**
     * Retrieves user information
     * 
     * @param {String} userId 
     * 
     * @throws {TypeError} - if userId is not a string.
     * @throws {Error} - if userId is empty or user is not found.
     *
     * @returns {Object} - user.  
     */
    retrieveUser(userId){

        if (typeof userId !== 'string') throw new TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw new Error('userId is empty')

        return(async() => {
            debugger
            const user = await User.findById(userId).select('-__v -password').lean()
            debugger
            if(!user) throw new Error(`user with userId ${userId} not found`)

            user.id = user._id.toString()
            delete user._id

            return user
        })()
    },

    /**
     * Updates user information.
     * 
     * @param {String} userId 
     * @param {Object} data 
     */
    updateUser(userId, data) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')    
        
        if (!data) throw Error('data is empty')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return(async() => {
            const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true }).select('-__v -password').lean()

            user.id = user._id.toString()
            delete user._id
            debugger
            return user
        })()
    }
}

module.exports = logic