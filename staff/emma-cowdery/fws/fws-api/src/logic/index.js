'use strict'

const { models: { Users, Events, Chats } } = require('fws-data')
const bcrypt = require('bcrypt')

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

            const { id } = await Users.create({ name, surname, email, username, password: hash })

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
            const user = await Users.findById(userId)

            if (!user) throw Error(`user with id ${userId} not found`)

            user.id = user._id.toString()

            delete user._id

            return user
        })()
    },

    // updateUser(userId,) {

    // }

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

    //         delete user
    //     })()
    // },

    /**
     * 
     * @param {string} restaurantId 
     * @param {string} userId 
     * @param {string} eventTime 
     * @param {string} eventDate 
     */
    createEvent(restaurantId, userId, eventTime, eventDate) {
        if (typeof restaurantId !== 'string') throw TypeError(`${restaurantId} is not a string`)
        if (!restaurantId.trim().length) throw Error('restaurantId is empty')

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        if (typeof eventTime !== 'string') throw TypeError(`${eventTime} is not a string`)
        if (!eventTime.trim().length) throw Error('eventTime is empty')

        if (typeof eventDate !== 'string') throw TypeError(`${eventDate} is not a string`)
        if (!eventDate.trim().length) throw Error('eventDate is empty')

        return (async () => {
            const restaurant = await Events.findOne({ restaurantId })

            if (restaurant) {
                if (restaurant.eventTime === eventTime && restaurant.eventDate === eventDate) throw Error('an event at this place and time already exists, would you like to join that event?')
            }

            const event = await Events.create({ restaurantId, eventTime, eventDate })

            const { id, participants = [] } = event

            participants.push(userId)

            Events.findByIdAndUpdate(id, participants)

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
            const event = await Events.findById(eventId)

            if (!event) throw Error('event not found')

            const { participants = [] } = event

            const index = participants.findIndex(_userId => _userId === userId)

            if (index < 0) participants.push(userId)
            else participants.splice(index, 1)

            return Events.findByIdAndUpdate(eventId, event)
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

            Chats.findByIdAndUpdate(id, userIds)

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
            const chat = await Chats.findById(chatId)

            if (!chat) throw Error('unable to join chat room')

            const { id, userIds = [] } = chat

            userIds.push(userId)

            return Chats.findByIdAndUpdate(id, userIds)
        })()
    }
}

module.exports = logic