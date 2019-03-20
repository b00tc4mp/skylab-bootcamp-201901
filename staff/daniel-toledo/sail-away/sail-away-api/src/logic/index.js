'use strict'

const jwt = require('jsonwebtoken')
const { models: { User, Journey }, mongoose: { Types: { ObjectId } }, mongoose } = require('sail-away-data')
const bcrypt = require('bcrypt')

const logic = {

    // //----------------USERS--------------------//
    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation
    * 
    * @throws {Error} when user already exists
    * 
    * @return {string} 
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
     * 
     * @throws {Error} when user not found
     * @throws {Error} when paswords does not match
     * 
     * @return {Object} 
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

    /**
     * 
     * Retrieve a user
     * 
     * @param {string} userId 
     * 
     * @throws {Error} if user not found
     * @return {Object} the user
     */
    retrieveUser(userId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return (async () => {
            try {
                let user = await User.findById(userId).select('-password -__v').lean()
                user.id = user._id.toString()

                delete user._id

                return user

            } catch (error) {
                throw new Error(`user with id ${userId} not found`)
            }

        })()

    },

    /**
     * 
     * Updates the user with new data
     * 
     * @param {string} userId 
     * @param {Object} data 
     * 
     * @throws {Error} if user not found
     * @return {Object} user updated
     */
    updateUser(userId, data) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (!data) throw Error('data should be defined')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return (async () => {

            try {
                let result = await User.findByIdAndUpdate(userId, { $set: data }, { new: true, runValidators: true }).select('-__v').lean()
                result.id = result._id.toString()
                delete result._id

                return result

            } catch (error) {
                throw new Error(`user with userId ${userId} not found`)
            }


        })()
    },

    /**
     * Updates the profile pictures
     * 
     * @param {string} userId 
     * @param {string} url 
     * 
     * @throws {Error} if user not found
     * 
     * @return {Object} user updated
     */
    updateUserPicture(userId, url) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof url !== 'string') throw TypeError(`${url} is not a string`)
        if (!url.trim().length) throw Error('url cannot be empty')


        return (async () => {
            try {
                let user = await User.findById(userId).select('-password -__v').lean()
                let pictures = [...user.pictures, url]
                user = await User.findByIdAndUpdate(userId, { pictures }, { new: true, runValidators: true }).select('-__v ').lean()

                user.id = user._id.toString()
                delete user._id

                return user

            } catch (error) {
                throw new Error(`user with userId ${userId} not found`)
            }


        })()
    },

    /**
     * Adds or Edit a new Boat from user
     * 
     * @param {string} userId 
     * @param {Object} boat 
     * 
     * @throws {Error} if user not found
     * 
     * @return {Object} user updated
     */
    updateBoat(userId, boat) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (!Object.keys(boat).length) throw Error('boat should be defined')
        if (boat.constructor !== Object) throw TypeError(`${boat} is not an object`)

        return (async () => {
            try {
                let user = await User.findById(userId).select('-password -__v')
                const boats = user.boats
                let boatIndex = boats.findIndex(userBoat => userBoat.id === boat.id)
                if (boatIndex === -1) {
                    boats.push(boat)
                    boatIndex = boats.findIndex(userBoat => userBoat.id === boat.id)
                }
                else boats.splice(boatIndex, 1, boat)

                user.markModified('boats')

                await user.save()

                return boats[boatIndex]

            } catch (error) {
                throw new Error(`user with userId ${userId} not found`)
            }

        })()
    },

    /**
     * Updates the pictures of Boat from user
     * 
     * @param {string} userId 
     * @param {string} boatId 
     * @param {string} url 
     * 
     * @throws {Error} if user not found
     * @throws {Error} boat not found
     * 
     * @return {Object} user updated
     */
    updateBoatPicture(userId, boatId, url) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof boatId !== 'string') throw TypeError(`${boatId} is not a string`)
        if (!boatId.trim().length) throw Error('boatId cannot be empty')

        if (typeof url !== 'string') throw TypeError(`${url} is not a string`)
        if (!url.trim().length) throw Error('url cannot be empty')

        return (async () => {
            try {

                let user = await User.findById(userId).select('-password -__v')
                let boatIndex = user.boats.findIndex(boat => boat.id === boatId)
                if (boatIndex < 0) throw new Error(`boat with id ${boatId} not found`)

                const boat = user.boats[boatIndex]
                boat.pictures = [...boat.pictures, url]

                user.markModified('boats')
                await user.save()

                return user.boats[boatIndex]

            } catch (error) {

                throw new Error(`user with id ${userId} not found`)
            }

        })()
    },

    /**
     * Search users by its talents and langugaes. At least one talent and one lenguages of the inputs arrays
     * 
     * @param {Array} talents 
     * @param {Array} languages 
     * 
     * 
     * @return {Array} users found
     */
    searchUsers(talents, languages) {

        if (talents.constructor !== Array) throw TypeError(`${talents} is not an array`)
        if (languages.constructor !== Array) throw TypeError(`${languages} is not an array`)

        return (async () => {
            let results
            let talentsToFilter = []
            let languagesToFilter = []

            talents.forEach(talent => talentsToFilter.push({ "talents": talent }))
            languages.forEach(language => languagesToFilter.push({ "languages": language }))

            if (!talents.length && !languages.length) results = await User.find().lean()
            else if (!talents.length) results = await User.find({ $or: languagesToFilter }).lean()
            else if (!languages.length) results = await User.find({ $or: talentsToFilter }).lean()
            else results = await User.find({ $and: [{ $or: talentsToFilter }, { $or: languagesToFilter }] }).lean()

            results = results.map(result => {
                result.id = result._id.toString()
                delete result._id
                delete result.__v

                return result
            })


            return results

        })()


    },

    /**
     * deletes user
     * 
     * @param {string} userId
     * 
     * @return {Object} users deleted
     */
    removeUser(userId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findByIdAndDelete(userId)
    },

    //----------------JOURNEYS--------------------//

    /**
     * creates a journey
     * 
     * @param {string} title 
     * @param {string} seaId 
     * @param {Array} route 
     * @param {Array} dates 
     * @param {string} description 
     * @param {string} userId 
     * @param {Object} boat 
     * @param {Object} lookingFor 
     * 
     * @return {string} journey id
     */
    addJourney(title, seaId, route, dates, description, userId, boat, lookingFor) {
        if (typeof title !== 'string') throw TypeError(title + ' is not a string')
        if (!title.trim().length) throw Error('title cannot be empty')

        if (typeof seaId !== 'string') throw TypeError(seaId + ' is not a string')
        if (!seaId.trim().length) throw Error('seaId cannot be empty')

        if (route.constructor !== Array) throw TypeError(route + ' is not an Array')
        if (!route.length) throw Error('route cannot be empty')

        if (dates.constructor !== Array) throw TypeError(dates + ' is not an Array')
        if (!dates.length) throw Error('dates cannot be empty')

        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        if (!description.trim().length) throw Error('description cannot be empty')

        if (userId.constructor !== ObjectId) throw TypeError(userId + ' is not an ObjectId')

        if (boat.constructor !== Object) throw TypeError(boat + ' is not an Object')
        if (!Object.keys(boat).length) throw Error('boat cannot be empty')

        if (lookingFor.constructor !== Object) throw TypeError(lookingFor + ' is not an Object')
        if (!Object.keys(lookingFor).length) throw Error('lookingFor cannot be empty')


        return (async () => {
            let user = await User.findById(userId.toString())

            if (!(user.boats.find(b => b.id === boat.id))) throw Error('boat does not belong to user')

            const journey = new Journey({ title, seaId, route, dates, description, userId, boat, lookingFor })
            await journey.save()
            return journey.id
        })()
    },

    /**
     * 
     * Search journeys by the sea
     * 
     * @param {string} query 
     * 
     * @return {Array} journeys found
     */
    searchJourneys(query) {
        if (typeof query !== 'string') throw TypeError(query + ' is not a string')
        if (!query.trim().length) throw Error('query cannot be empty')

        return (async () => {
            const results = await Journey.find({ seaId: query }).lean()

            results.map(result => {
                result.id = result._id.toString()
                delete result._id
                delete result.__v
                return result
            })

            return results
        })()
    },

    /**
     * retruieve journey by its id
     * 
     * @param {string} id
     * 
     * @return {Object} the journey 
     */
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

    /**
     * Updates a journey
     * 
     * @param {string} id 
     * @param {Object} data 
     * 
     * @return {Object} the journey updated
     */
    updateJourney(id, data) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        if (data.constructor !== Object) throw TypeError(data + ' is not an Object')
        if (!Object.keys(data).length) throw Error('data cannot be empty')

        return (async () => {
            const result = await Journey.findByIdAndUpdate(id, { $set: data }, { new: true }).select('-__v').lean()

            if (!result) return { error: 'journey could not be updated' }
            else {
                result.id = result._id.toString()
                delete result._id
                return result
            }
        })()

    },

    /**
     * find the user journeys
     * 
     * @param {string} userId 
     * 
     * @return {Array} the matching journeys
     */
    myJourneys(userId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return (async () => {
            userId = ObjectId(userId)
            const results = await Journey.find({ userId }).lean()

            results.map(result => {
                result.id = result._id.toString()
                delete result._id
                delete result.__v
                return result
            })

            return results
        })()
    },

    /**
     * add favorite o delete favorite journeys
     * 
     * @param {string} userId 
     * @param {string} journeyId
     * 
     * @return {Object} the updated user
     */
    toggleFavoriteJourney(userId, journeyId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string');
        if (!userId.trim().length) throw Error('userId cannot be empty');

        if (typeof journeyId !== 'string') throw TypeError(journeyId + ' is not a string')
        if (!journeyId.trim().length) throw Error('journeyId cannot be empty')

        return (async () => {

            try {
                let user = await User.findById(userId).select('-password -__v').lean()

                let favoriteJourneys = user.favoriteJourneys

                let index = favoriteJourneys.indexOf(journeyId)

                if (index != -1) favoriteJourneys.splice(index, 1)
                else favoriteJourneys.push(journeyId)

                user = await User.findByIdAndUpdate(userId, { favoriteJourneys }, { new: true, runValidators: true }).select('-__v ').lean()

                user.id = user._id.toString()
                delete user._id

                return user
            } catch (error) {

                throw new Error(`user with id ${userId} not found`)
            }

        })()
    },


   /**
     * add favorite o delete favorite users
     * 
     * @param {string} userId 
     * @param {string} crewId
     * 
     * @return {Object} the updated user
     */
    toggleFavoriteCrew(userId, crewId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string');
        if (!userId.trim().length) throw Error('userId cannot be empty');

        if (typeof crewId !== 'string') throw TypeError(crewId + ' is not a string')
        if (!crewId.trim().length) throw Error('crewId cannot be empty')

        return (async () => {
            try {
                let user = await User.findById(userId).select('-password -__v').lean()

                let favoriteCrew = user.favoriteCrew

                let index = favoriteCrew.indexOf(crewId)

                if (index != -1) favoriteCrew.splice(index, 1)
                else favoriteCrew.push(crewId)

                user = await User.findByIdAndUpdate(userId, { favoriteCrew }, { new: true, runValidators: true }).select('-__v ').lean()

                user.id = user._id.toString()
                delete user._id

                return user
            } catch (error) {

                throw new Error(`user with id ${userId} not found`)
            }

        })()
    }

}

module.exports = logic