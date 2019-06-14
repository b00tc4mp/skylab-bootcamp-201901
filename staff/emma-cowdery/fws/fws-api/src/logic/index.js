'use strict'

const { models: { Users, Events, Chats, Messages } } = require('fws-data')
const bcrypt = require('bcrypt')

const { uploadImage } = require('../cloudinary')

const googleMapsApi = require('../google-maps-api')

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
    registerUser(name, surname, email, username, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')
        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof username !== 'string') throw TypeError(username + ' is not a string')
        if (!username.trim().length) throw Error('username cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')
        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return (async () => {
            const userEmail = await Users.findOne({ email })

            if (userEmail) throw Error(`user with email ${email} already exists`)

            const userUsername = await Users.findOne({ username })

            if (userUsername) throw Error(`user with username ${username} already exists`)

            const hash = await bcrypt.hash(password, 10)

            const { id } = await Users.create({ name, surname, email, username, password: hash, howTo: true })

            return id
        })()
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} emailOrUsername 
     * @param {string} password 
     */
    authenticateUser(emailOrUsername, password) {
        if (typeof emailOrUsername !== 'string') throw TypeError(emailOrUsername + ' is not a string')

        if (!emailOrUsername.trim().length) throw Error('email or username cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return (async () => {
                if (emailOrUsername.includes('@')) {
                    const email = emailOrUsername

                    const user = await Users.findOne({ email })

                    if (!user) throw Error(`user with email or username ${email} not found`)
                
                    const match = await bcrypt.compare(password, user.password)
                    
                    if (!match) throw Error('wrong credentials')

                    return user.id

                } else {
                    const username = emailOrUsername

                    const user = await Users.findOne({ username })

                    if (!user) throw Error(`user with email or username ${email} not found`)
                    
                    const match = await bcrypt.compare(password, user.password)
                    
                    if (!match) throw Error('wrong credentials')
                    
                    return user.id
                }
        })()
    },

    /**
     * 
     * @param {string} userId 
     */
    retrieveUser(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        return (async () => {
            const user = await Users.findById(userId).select('-__v -password').lean()

            if (!user) throw Error(`user with id ${userId} not found`)

            user.id = user._id.toString()

            delete user._id

            return user
        })()
    },

    
    updateUser(userId, about, instagram, twitter, facebook) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        return (async () => {
            const data = { about: about, instagram: instagram, twitter: twitter, facebook: facebook }

            const _user = await Users.findByIdAndUpdate(userId, data)

            if (!_user) throw Error('unable to update user')

            const user = await Users.findById(userId).select('-__v -password').lean()

            user.id = user._id

            delete user._id

            return user
        })()
    },

    // /**
    //  * 
    //  * @param {string} userId 
    //  * @param {string} password 
    //  */
    // removeUser(userId, password) {
    //     if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
    //     if (!userId.trim().length) throw Error('userId is empty')

    //     if (typeof password !== 'string') throw TypeError(password + ' is not a string')
    //     if (!password.trim().length) throw new EmptyError('password cannot be empty')

    //     return (async () => {
    //         const user = await Users.findById(userId)

    //         if (!user) throw Error(`user with id ${userId} not found`)

    //         const match = await bcrypt.compare(password, user.password)

    //         if (!match) throw Error('wrong credentials')

    //         Users.deleteOne(user)
    //     })()
    // },

    /**
     * 
     * @param {string} userId 
     * @param {string} url 
     */
    updateProfilePicture(userId, url) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof url !== 'string') throw TypeError(`${url} is not a string`)
        if (!url.trim().length) throw Error('url is empty')

        return (async () => {
            const user = await Users.findByIdAndUpdate(userId, { profilePicture: url }).select('-__v -password').lean()

            if (!user) throw Error('user not found')

            user.id = user._id.toString()
            
            delete user._id

            return user
        })()
    },

    /**
     * 
     * @param {string} restaurantId 
     * @param {string} userId 
     * @param {string} eventTime 
     * @param {string} eventDate 
     */
    createEvent(restaurantId, userId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating, restaurantName) {
        if (typeof restaurantId !== 'string') throw TypeError(`${restaurantId} is not a string`)
        if (!restaurantId.trim().length) throw Error('restaurantId is empty')

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof eventTime !== 'string') throw TypeError(`${eventTime} is not a string`)
        if (!eventTime.trim().length) throw Error('eventTime is empty')

        if (typeof reservationName !== 'string') throw TypeError(reservationName + ' is not a string')
        if (!reservationName.trim().length) throw Error('reservationName cannot be empty')

        if (typeof restaurantCategory !== 'string') throw TypeError(restaurantCategory + ' is not a string')
        if (!restaurantCategory.trim().length) throw Error('restaurantCategory cannot be empty')

        if (eventLocation.constructor !== Array) throw TypeError(eventLocation + ' is not an array')

        if (typeof priceLevel !== 'number') throw TypeError(priceLevel + ' is not a number')
        //if (!priceLevel.trim().length) throw Error('priceLevel cannot be empty')

        if (typeof rating !== 'number') throw TypeError(rating + ' is not a number')
        //if (!rating.trim().length) throw Error('rating cannot be empty')

        if (typeof restaurantName !== 'string') throw TypeError(restaurantName + ' is not a string')
        if (!restaurantName.trim().length) throw Error('restaurantName cannot be empty')

        return (async () => {
            if ((new Date()).getDate() >= (new Date(eventDate)).getDate() && (new Date()).getMonth() >= (new Date(eventDate)).getMonth() && (new Date()).getFullYear() >= (new Date(eventDate)).getFullYear()) throw Error('unable to create an event on a date that is equal to the present or has already passed')
            
            const restaurant = await Events.findOne({ restaurantId })

            if (restaurant) {
                if (restaurant.eventTime === eventTime && restaurant.eventDate === eventDate) throw Error('an event at this place and time already exists, would you like to join that event?')
            }

            const event = await Events.create({ restaurantId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating, restaurantName })

            const { participants = [], id } = event

            participants.push(userId)

            await event.save()

            const user = await Users.findById(userId)

            const { events = [] } = user

            events.push(id)

            await user.save()

            return id
        })()
    },

    /**
     * 
     * @param {string} eventId 
     * @param {string} userId 
     */
    joinEvent(eventId, userId) {
        if (typeof eventId !== 'string') throw TypeError(`${eventId} is not a string`)
        if (!eventId.trim().length) throw Error('eventId is empty')

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        return (async () => {
            const _event = await Events.findById(eventId)//.select('__v').lean()

            if (!_event) throw Error('event not found')

            const { participants = [] } = _event

            const index = participants.findIndex(_userId => _userId === userId)

            if (index < 0) participants.push(userId)
            else participants.splice(index, 1)

            await _event.save()

            const user = await Users.findById(userId)

            const { events = [] } = user

            const index2 = events.findIndex(_eventId => _eventId === eventId)

            if (index2 < 0) events.push(eventId)
            else events.splice(index2, 1)

            await user.save()

            const event = await Events.findById(eventId).select('-password -__v').lean()

            event.id = event._id.toString()

            delete event._id

            return event
        })()
    },

    /**
     * 
     * @param {string} userId 
     */
    userEvents(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        return (async () => {
            const user = await Users.findById(userId)

            const { events } = user

            return await Promise.all(events.map(async eventId => {
                const event = await Events.findById(eventId).select('-__v').lean()

                event.id = event._id.toString()

                delete event._id

                return event
            }))
        })()
    },

    /**
     * 
     * @param {string} userId 
     * @param {string} restaurantCategory 
     */
    findEventByCategory(userId, restaurantCategory) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof restaurantCategory !== 'string') throw TypeError(`${restaurantCategory} is not a string`)
        if (!restaurantCategory.trim().length) throw Error('restaurantCategory is empty')

        return (async () => {
            const user = Users.findById({ userId })

            if (!user) throw Error('you must be logged in to perform this action')
            
            const events = await Events.find({ restaurantCategory }).select('-__v').lean()

            if (!events) throw Error('there are no events in this category')

            events.forEach(event => {
                event.id = event._id

                delete event._id
            })

            return events
        })()
    },

    findEventsNearMe(userId, distance) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof distance !== 'number') throw TypeError(`${distance} is not a number`)
        //if (!distance.trim().length) throw Error('distance is empty')

        return (async () => {
            const userLocation = await googleMapsApi.geolocation()

            const _events = await Events.find().select('-__v').lean()

            let events = []

            _events.map(event => {
                const { eventLocation} = event

                const R = 6373 //earths radius in meters

                const degToRad = (Math.PI / 180)

                const lat1 = eventLocation[0] * degToRad

                const lng1 = eventLocation[1] * degToRad

                const lat2 = userLocation.lat * degToRad

                const lng2 = userLocation.lng * degToRad

                const latDiff = (lat1 - lat2)

                const lngDiff = (lng1 - lng2)

                const a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(lngDiff / 2) * Math.sin(lngDiff / 2)

                const b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

                const totalDist = Math.round((R * b) * 100) / 100

                event.totalDist = totalDist

                event.id = event._id.toString()

                delete event._id

                if (event.totalDist <= distance) events.push(event)
            })

            if (events.length === 0) throw Error('no events were found at this specified distance')

            return events
        })()
    },

    /**
     * 
     * @param {string} userId 
     * @param {string} chatName 
     * @param {string} eventId 
     */
    createChat(userId, chatName, eventId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof chatName !== 'string') throw TypeError(`${chatName} is not a string`)
        if (!chatName.trim().length) throw Error('chatName is empty')

        if (typeof eventId !== 'string') throw TypeError(`${eventId} is not a string`)
        if (!eventId.trim().length) throw Error('eventId is empty')

        return (async () => {
            const chat = await Chats.create({ chatName, eventId })

            const { id, userIds = [] } = chat

            userIds.push(userId)

            await chat.save()

            const user = await Users.findById(userId)

            const { chatRooms = [] } = user

            chatRooms.push(id)

            await user.save()

            const event = await Events.findByIdAndUpdate(eventId, { chatId: id})

            return id
        })()
    },

    /**
     * 
     * @param {string} chatId 
     * @param {string} userId 
     */
    joinChat(chatId, userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof chatId !== 'string') throw TypeError(`${chatId} is not a string`)
        if (!chatId.trim().length) throw Error('chatId is empty')

        return (async () => {
            const _chat = await Chats.findById(chatId)

            if (!_chat) throw Error('unable to join chat room')

            const { userIds = [] } = _chat

            const index = userIds.findIndex(_userId => _userId === userId)

            if (index < 0) userIds.push(userId)
            else userIds.splice(index, 1)

            await _chat.save()

            const user = await Users.findById(userId)

            const { chatRooms = [] } = user

            const index2 = chatRooms.findIndex(_chatId => _chatId === chatId)

            if (index2 < 0) chatRooms.push(chatId)
            else chatRooms.splice(index2, 1)

            await user.save()

            const chat = await Chats.findById(chatId).select('-password -__v').lean()

            chat.id = chat._id.toString()

            delete chat._id

            return chat
        })()
    },

    /**
     * 
     * @param {string} userId 
     */
    userChats(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        return (async () => {
            const user = await Users.findById(userId)

            const { chatRooms } = user

            return await Promise.all(chatRooms.map(async chatId => {
                const chat = await Chats.findById(chatId).select('-password -__v').lean()

                chat.id = chat._id.toString()

                delete chat._id

                if (chat.messages.length) {
                    const index = chat.messages.length

                    const message = chat.messages[index - 1]
                    
                    delete message.__v

                    message.id = message._id

                    delete message._id

                    chat.message = message

                    delete chat.messages
                }

                return chat
            }))
        })()
    },

    /**
     * 
     * @param {string} userId 
     * @param {string} chatId 
     * @param {string} text 
     */
    addMessageToChat(userId, chatId, text) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof chatId !== 'string') throw TypeError(`${chatId} is not a string`)
        if (!chatId.trim().length) throw Error('chatId is empty')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)
        if (!text.trim().length) throw Error('text is empty')

        return (async () => {
            const message = await Messages.create({ userId, text, date: new Date })

            const _chat = await Chats.findById(chatId)

            const { messages = [] } = _chat

            messages.push(message)

            await  _chat.save()

            const chat = await Chats.findById(chatId).select('-password -__v').lean()

            chat.id = chat._id.toString()

            delete chat._id

            return chat
        })()
    },

    /**
     * 
     * @param {string} userId 
     * @param {string} chatId 
     */
    messagesFromChat(userId, chatId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof chatId !== 'string') throw TypeError(`${chatId} is not a string`)
        if (!chatId.trim().length) throw Error('chatId is empty')

        return (async () => {
            const chat = await Chats.findById(chatId).select('-__v').lean()

            const { messages } = chat

            messages.map(message => {
                delete message.__v

                message.id = message._id

                delete message._id
            })

            return messages
        })()
    },

    /**
     * 
     * @param {string} query 
     */
    searchRestaurants(query, userId) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error('query is empty')

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        return (async () => {
            const user = await Users.findById(userId)

            if (!user) throw Error('you must be logged in to perform search')

            const results = await googleMapsApi.searchRestaurants(query)

            if (!results) throw Error('unable to fetch results')

            return results
        })()
    },

    /**
     * 
     * @param {string} restaurantId 
     */
    restaurantDetails(restaurantId, userId) {
        if (typeof restaurantId !== 'string') throw TypeError(`${restaurantId} is not a string`)
        if (!restaurantId.trim().length) throw Error('restaurantId is empty')

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        return (async () => {
            const user = await Users.findById(userId)

            if (!user) throw Error('you must be logged in to perform search')

            const result = await googleMapsApi.restaurantDetails(restaurantId)

            if (!result) throw Error('unable to fetch restaurant details')

            return result
        })()
    },

    /**
     * 
     * @param {string} photoReference 
     */
    resizePhoto(photoReference, userId) {
        if (typeof photoReference !== 'string') throw TypeError(`${photoReference} is not a string`)
        if (!photoReference.trim().length) throw Error('photoReference is empty')

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        return (async () => {
            const user = await Users.findById(userId)

            if (!user) throw Error('you must be logged in to perform search')

            const result = await googleMapsApi.resizePhoto(photoReference)

            if (!result) throw Error('unable to fetch restaurant details')

            return result
        })()
    },

    geolocation(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        return (async () => {
            const user = await Users.findById(userId)

            if (!user) throw Error('you must be logged in to perform search')

            const geolocation = await googleMapsApi.geolocation()

            if (!geolocation) throw Error('unable to obrain current location')

            return geolocation
        })()
    },

    dontShowHowTo(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        return (async () => {
            const user = await Users.findById(userId)

            if (!user) throw Error('user not found')

            user.howTo = false

            await user.save()

            return user.howTo
        })()
    },

    howTo(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        return (async () => {
            const user = await Users.findById(userId)

            if (!user) throw Error('user not found')

            return user.howTo
        })()
    },

    filterEvents(userId, filters) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (filters.constructor !== Object) throw TypeError(`${filters} is not an object`)

        return (async () => {
            let events = []

            if (filters.hasOwnProperty('distance')) 
                events = await logic.findEventsNearMe(userId, filters.distance)

            if (filters.hasOwnProperty('restaurantCategory')) 
                    events = events.filter(event => event.restaurantCategory === filters.restaurantCategory)
            

            if (filters.hasOwnProperty('priceRange')) 
                    events = events.filter(event => filters.priceRange[0] <= event.priceLevel && event.priceLevel <= filters.priceRange[1])
            

            if (filters.hasOwnProperty('rating')) 
                    events = events.filter(event => event.rating >= filters.rating)
            

            if (filters.hasOwnProperty('timeRange')) 
                    events = events.filter(event => filters.timeRange[0] <= event.eventTime && event.eventTime <= filters.timeRange[1])
            
            if (filters.hasOwnProperty('date'))       
                    events = events.filter(event => (new Date(event.eventDate)).getDate() === (new Date(filters.date)).getDate() && (new Date(event.eventDate)).getMonth() === (new Date(filters.date)).getMonth() && (new Date(event.eventDate)).getFullYear() === (new Date(filters.date)).getFullYear())
                
            return events
        })()
    }
}

module.exports = logic