'use strict'

const jwt = require('jsonwebtoken')
const { models: { User, Journey }, data: { seas, languages, talents }, mongoose: { Types: { ObjectId } }, mongoose } = require('sail-away-data')
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
            .catch(error => { throw Error(`user with id ${userId} not found`) })
    },

    searchUsers(talents, languages) {
        //TODO

        return (async () => {
            let results
            let talentsToFilter = []
            let languagesToFilter = []

            talents.forEach(talent => talentsToFilter.push({ "talents": talent }))
            languages.forEach(language => languagesToFilter.push({ "languages": language }))

            if (!talents.length && !languages.length) results = await User.find()
            else if (!talents.length) results = await User.find({ $or: languagesToFilter }).lean()
            else if (!languages.length) results = await User.find({ $or: talentsToFilter }).lean()
            else results = await User.find({ $and: [{ $or: talentsToFilter }, { $or: languagesToFilter }] }).lean()
          
            results.map(result => {
                result.id = result._id.toString()
                delete result._id
                delete result.__v
                debugger
              
                return result
            })
          

            return results

        })()


    },

    updateUser(userId, data) {
      
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (!data) throw Error('data should be defined')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return (async () => {
            const result = await User.findByIdAndUpdate(userId, { $set: data }, { new: true, runValidators: true }).select('-__v').lean()

            if (!result) throw Error('journey could not be updated')
            else {
                result.id = result._id.toString()
                delete result._id
                return result
            }
        })()
    },

    updateUserPicture(userId, url) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof url !== 'string') throw TypeError(`${url} is not a string`)
        if (!url.trim().length) throw Error('url is empty')

        return (async () => {
            let user = await User.findById(userId).select('-password -__v').lean()
            let pictures = [...user.pictures, url]

            user = await User.findByIdAndUpdate(userId, { pictures }, { new: true, runValidators: true }).select('-__v ').lean()
            if (!user) throw new Error(`user with userId ${userId} not found`)

            user.id = user._id.toString()
            delete user._id

            return user
        })()
    },

    removeUser(userId) {

        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string')
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findByIdAndDelete(userId)
    },

    //----------------JOURNEYS--------------------//

    async addJourney(title, seaId, route, dates, description, userId, boat, lookingFor) {

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

        if (userId.constructor !== ObjectId) throw TypeError(userId + ' is not an ObjecyId')
        if (!Object.keys(userId).length) throw Error('userId cannot be empty')

        if (boat.constructor !== Object) throw TypeError(boat + ' is not an Object')
        if (!Object.keys(boat).length) throw Error('boat cannot be empty')

        if (lookingFor.constructor !== Object) throw TypeError(lookingFor + ' is not an Object')
        if (!Object.keys(lookingFor).length) throw Error('lookingFor cannot be empty')

        let user = await User.findById(userId.toString())

        if (user.kind != 'captain') throw Error('user cannot create a journey')
        if (!(user.boats.find(b => b.toString() === boat.toString()))) throw Error('boat dose not belong to user')

        return (async () => {

            const journey = new Journey({ title, seaId, route, dates, description, userId, boat, lookingFor })
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

    myJourneys(userId) {
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

    updateJourney(id, data) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        if (data.constructor !== Object) throw TypeError(data + ' is not an Object')
        if (!Object.keys(data).length) throw Error('data cannot be empty')

        return (async () => {
            const result = await Journey.findByIdAndUpdate(id, { $set: data }, { new: true }).select('-__v').lean()
            debugger
            if (!result) return { error: 'journey could not be updated' }
            else {
                result.id = result._id.toString()
                delete result._id
                return result
            }
        })()

    },

    // deleteJourney(id) {
    //     if (typeof id !== 'string') throw TypeError(id + ' is not a string')
    //     if (!id.trim().length) throw Error('id cannot be empty')

    //     return (async () => {
    //         const { id } = await Journey.findByIdAndDelete(id)

    //         return id
    //     })()

    // },

    toggleFavoriteJourney(userId, journeyId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string');
        if (!userId.trim().length) throw Error('userId cannot be empty');

        if (typeof journeyId !== 'string') throw TypeError(journeyId + ' is not a string')
        if (!journeyId.trim().length) throw Error('journeyId cannot be empty')

        return (async () => {
            let user = await User.findById(userId).select('-password -__v').lean()
            
            let favoriteJourneys = user.favoriteJourneys

            let index = favoriteJourneys.indexOf(journeyId)
        
            if (index != -1) favoriteJourneys.splice(index, 1) 
            else favoriteJourneys.push(journeyId)

            user = await User.findByIdAndUpdate(userId, { favoriteJourneys }, { new: true, runValidators: true }).select('-__v ').lean()
        
            if (!user) throw new Error(`user with userId ${userId} not found`)

            user.id = user._id.toString()
            delete user._id

            return user
        })()
    },

    toggleFavoriteCrew(userId, crewId) {
        if (typeof userId !== 'string') throw TypeError(userId + ' is not a string');
        if (!userId.trim().length) throw Error('userId cannot be empty');

        if (typeof crewId !== 'string') throw TypeError(crewId + ' is not a string')
        if (!crewId.trim().length) throw Error('crewId cannot be empty')

        return (async () => {
            let user = await User.findById(userId).select('-password -__v').lean()
            
            let favoriteCrew = user.favoriteCrew

            let index = favoriteCrew.indexOf(crewId)
        
            if (index != -1) favoriteCrew.splice(index, 1) 
            else favoriteCrew.push(crewId)
            debugger
            user = await User.findByIdAndUpdate(userId, { favoriteCrew }, { new: true, runValidators: true }).select('-__v ').lean()
        
            if (!user) throw new Error(`user with userId ${userId} not found`)

            user.id = user._id.toString()
            delete user._id

            return user
        })()
    }

}

module.exports = logic