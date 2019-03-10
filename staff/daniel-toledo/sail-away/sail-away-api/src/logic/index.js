'use strict'

const jwt = require('jsonwebtoken')
const { models: { User, Journey }, } = require('sail-away-data')
const bcrypt = require('bcrypt')

const logic = {

    //----------------USERS--------------------//
    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser(name, surname, email, password, passwordConfirmation, kind) {

        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')
        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')
        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return (async () => {
            const user = await User.findOne({ email })

            if (user) throw Error(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 10)

            const { id } = await User.create({ name, surname, email, password: hash, kind })

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
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        return (async () => {
            const user = await User.findOne({ email })

            if (!user) throw Error(`user with email ${email} not found`)

            const match = await bcrypt.compare(password, user.password)

            if (!match) throw Error('wrong credentials')

            return { id: user.id }
        })()
    },

    retrieveUser(userId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                user.id = user._id.toString()

                delete user._id

                return user
            })
    },

    updateUser(userId, data) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (!data) throw Error('data should be defined')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return (async () => {
            const result = await User.findByIdAndUpdate(userId, { $set: data}, { new: true }).select('-__v').lean()
   
            if (!result) throw Error('journey could not be updated')
            else {
                result.id = result._id.toString()
                delete result._id
                return result
            }
        })()
    },

    removeUser(userId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findByIdAndDelete(userId)
    },

    //----------------JOURNEYS--------------------//

    addJourney(sea, route, dates, description) {
        if (route.constructor !== Array) throw TypeError(route + ' is not an Array')
        if (!route.length) throw Error('route cannot be empty')

        if (dates.constructor !== Array) throw TypeError(dates + ' is not an Array')
        if (!dates.length) throw Error('dates cannot be empty')

        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        if (!description.trim().length) throw Error('description cannot be empty')

        return (async () => {
            const journey = new Journey({ sea, route, dates, description })
            await journey.save()
            return journey.id
        })()
    },

    retrieveJourney(id) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return (async () => {
            const result = await Journey.findById(id).select('-__v').lean()
            if (!result) return { error: 'journey not found' }
            else {
                result.id = result._id.toString()
                delete result._id
                return result
            }
        })()
    },

    listJourneys() {
        return (async () => {
            const results = await Journey.find().lean()

            results.map(result => {
                result.id = result._id.toString()
                delete result._id
                delete result.__v
                return result
            })

            return results
        })()
    },

    searchJourneys(query) {
        if (typeof query !== 'string') throw TypeError(query + ' is not a string')
        if (!query.trim().length) throw Error('query cannot be empty')

        return (async () => {
            const results = await Journey.find({ "sea.name": query }).lean()

            results.map(result => {
                result.id = result._id.toString()
                delete result._id
                delete result.__v
                return result
            })

            return results
        })()
    },

    updateJourney(id, sea, route, dates, description) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        if (route.constructor !== Array) throw TypeError(route + ' is not an Array')
        if (!route.length) throw Error('route cannot be empty')

        if (dates.constructor !== Array) throw TypeError(dates + ' is not an Array')
        if (!dates.length) throw Error('dates cannot be empty')

        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        if (!description.trim().length) throw Error('description cannot be empty')


        return (async () => {
            const result = await Journey.findByIdAndUpdate(id, { $set: { sea, route, dates, description } }, { new: true }).select('-__v').lean()
            debugger
            if (!result) throw Error('journey could not be updated')
            else {
                result.id = result._id.toString()
                delete result._id
                return result
            }
        })()

    },

    deleteJourney(id) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return (async () => {
            const { id } = await Journey.findByIdAndDelete(id)

            return id
        })()

    }

}

module.exports = logic