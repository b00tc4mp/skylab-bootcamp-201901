import fwsApi from '../fws-api'

const logic = {
    __token__: null,

    set storage (storage) {
        this.__storage__ = storage
    },

    set __token__ (token) {
        if (token) this.__storage__.setItem('token', token)
        else this.__storage__.removeItem('token')
    },

    set __userId__ (userId) {
        if (userId) this.__storage__.setItem('userId', userId)
        else this.__storage__.removeItem('userId')
    },

    get __token__ () {
        if (this.__storage__.getItem('token')) return this.__storage__.getItem('token')
    },

    get __userId__ () {
        if (this.__storage__.getItem('token')) return this.__storage__.getItem('token')
    },

    /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} username 
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
            const userId = await fwsApi.registerUser(name, surname, email, username, password, passwordConfirmation)

            if (!userId) throw Error('user not registered correctly')

            return userId
        })()
    },

    /**
     * 
     * @param {string} emailOrUsername 
     * @param {string} password 
     */
    authenticateUser(emailOrUsername, password) {
        if (typeof emailOrUsername !== 'string') throw TypeError(emailOrUsername + ' is not a string')
        if (!emailOrUsername.trim().length) throw Error('emailOrUsername cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        return(async () => {
            const token = await fwsApi.authenticateUser(emailOrUsername, password)

            if (token.error) throw Error(`user not found`)

            this.__token__ = token.token

            return token
        })()
    },

    get isUserLoggedIn() {
        return !!this.__token__
    },

    logout() {
        this.__token__ = null
    },

    /**
     * 
     * @param {string} token 
     */
    retrieveUser() {
        return (async () => {
            const user = await fwsApi.retrieveUser(this.__token__)

            if (!user) throw Error('user not found')

            return user
        })()
    },

    /**
     * 
     * @param {string} userId 
     */
    retrieveUserWithId(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        return (async () => {
            const user = await fwsApi.retrieveUserWithId(userId)

            if (!user) throw Error('user not found')

            return user
        })()
    },

    /**
     * 
     * @param {string} about 
     * @param {string} instagram 
     * @param {string} twitter 
     * @param {string} facebook 
     */
    updateUser(about, instagram, twitter, facebook) {

        return (async () => {
            const user = await fwsApi.updateUser(this.__token__, about, instagram, twitter, facebook)

            if (!user) throw Error('failed to update')

            return user
        })()
    },

    /**
     * 
     * @param {blob} image 
     */
    updateProfilePicture(image) {
        if (!image) throw Error('image is empty')
        if (image instanceof Blob === false) throw TypeError(`${image} is not a blob`)

        return (async () => {
            const user = await fwsApi.updateProfilePicture(this.__token__, image)

            if (!user) throw Error('user not found')

            return user
        })()
    },

    /**
     * 
     * @param {string} restaurantId 
     * @param {string} eventTime 
     * @param {string} eventDate 
     */
    createEvent(restaurantId, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating, restaurantName) {
        if (typeof restaurantId !== 'string') throw TypeError(restaurantId + ' is not a string')
        if (!restaurantId.trim().length) throw Error('restaurantId cannot be empty')

        if (typeof eventTime !== 'string') throw TypeError(eventTime + ' is not a string')
        if (!eventTime.trim().length) throw Error('eventTime cannot be empty')

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
            const eventId = await fwsApi.createEvent(restaurantId, this.__token__, eventTime, eventDate, reservationName, restaurantCategory, eventLocation, priceLevel, rating, restaurantName)

            if (!eventId) throw Error('event creation was unsuccessful')

            return eventId
        })()
    },

    /**
     * 
     * @param {string} eventId 
     */
    joinEvent(eventId) {
        if (typeof eventId !== 'string') throw TypeError(eventId + ' is not a string')
        if (!eventId.trim().length) throw Error('eventId cannot be empty')

        return (async () => {
            const event = await fwsApi.joinEvent(eventId, this.__token__)

            if (!event) throw Error('unable to join event at this time')

            return event
        })()
    },

    userEvents() {
        return (async () => {
            const events = fwsApi.userEvents(this.__token__)

            if (!events) throw Error('unable to retrieve users events')

            return events
        })()
    },

    /**
     * 
     * @param {string} restaurantCategory 
     */
    findEventsByCategory(restaurantCategory) {
        if (typeof restaurantCategory !== 'string') throw TypeError(restaurantCategory + ' is not a string')
        if (!restaurantCategory.trim().length) throw Error('restaurantCategory cannot be empty')

        return (async () => {
            const events = await fwsApi.findEventsByCategory(this.__token__, restaurantCategory)

            if (!events) throw Error('unable to retrieve events at this moment')

            return events
        })()
    },

    /**
     * 
     * @param {number} distance 
     */
    findEventsNearMe(distance) {
        if (typeof distance !== 'number') throw TypeError(`${distance} is not a number`)

        return (async () => {
            const events = await fwsApi.findEventsNearMe(this.__token__, distance)

            if (!events) throw Error('unable to retrieve events at this moment')

            return events
        })()
    },

    /**
     * 
     * @param {string} chatName 
     * @param {string} eventId 
     */
    createChat(chatName, eventId) {
        if (typeof chatName !== 'string') throw TypeError(chatName + ' is not a string')
        if (!chatName.trim().length) throw Error('chatName cannot be empty')

        if (typeof eventId !== 'string') throw TypeError(eventId + ' is not a string')
        if (!eventId.trim().length) throw Error('eventId cannot be empty')

        return (async () => {
            const chatId = await fwsApi.createChat(this.__token__, chatName, eventId)

            if (!chatId) throw Error('chat creation was unsuccessful')

            return chatId
        })()
    },

    /**
     * 
     * @param {string} chatId 
     */
    joinChat(chatId) {
        if (typeof chatId !== 'string') throw TypeError(chatId + ' is not a string')
        if (!chatId.trim().length) throw Error('chatId cannot be empty')

        return (async () => {
            const chat = await fwsApi.joinChat(chatId, this.__token__)

            if (!chat) throw Error('unable to join chat at this time')

            return chat
        })()
    },

    /**
     * Retrieves chat information from the user that is logged in at that moment
     */
    userChats() {
        return (async () => {
            const chats = await fwsApi.userChats(this.__token__)

            if (!chats) throw Error('unable to retrieve users chats')

            return chats
        })()
    },

    /**
     * 
     * @param {string} chatId 
     * @param {string} text 
     */
    addMessageToChat(chatId, text) {
        if (typeof chatId !== 'string') throw TypeError(chatId + ' is not a string')
        if (!chatId.trim().length) throw Error('chatId cannot be empty')

        if (typeof text !== 'string') throw TypeError(text + ' is not a string')
        if (!text.trim().length) throw Error('text cannot be empty')

        return (async () => {
            const chat = await fwsApi.addMesageToChat(this.__token__, chatId, text)

            if (!chat) throw Error('messae failed to send')

            return chat
        })()
    },

    /**
     * 
     * @param {string} chatId 
     */
    messagesFromChat(chatId) {
        if (typeof chatId !== 'string') throw TypeError(chatId + ' is not a string')
        if (!chatId.trim().length) throw Error('chatId cannot be empty')

        return (async () => {
            const messages = await fwsApi.messagesFromChat(this.__token__, chatId)

            if (!messages) throw Error('unable to get messages')

            return messages
        })()
    },

    /**
     * 
     * @param {string} query 
     */
    searchRetaurants(query) {
        if (typeof query !== 'string') throw TypeError(query + ' is not a string')
        if (!query.trim().length) throw Error('query cannot be empty')

        return (async () => {
            const results = await fwsApi.searchRestaurants(query, this.__token__)

            if (!results) throw Error('failed to search')

            return results
        })()
    },

    /**
     * 
     * @param {string} restaurantId 
     */
    restaurantDetails(restaurantId) {
        if (typeof restaurantId !== 'string') throw TypeError(restaurantId + ' is not a string')
        if (!restaurantId.trim().length) throw Error('restaurantId cannot be empty')

        return (async () => {
            const details = await fwsApi.restaurantDetails(restaurantId, this.__token__)

            if (!details) throw Error('unable tof etch details')

            return details
        })()
    },

    /**
     * 
     * @param {string} photoReference 
     */
    retrievePhoto(photoReference) {
        if (typeof photoReference !== 'string') throw TypeError(`${photoReference} is not a string`)
        if (!photoReference.trim().length) throw Error('photoReference is empty')

        return (async () => {
            const imgUrl = await fwsApi.retrievePhoto(photoReference, this.__token__)

            if (!imgUrl) throw Error('image not found')

            return imgUrl.result
        })()
    },

    dontShowHowTo() {
        return (async () => {
            const howTo = await fwsApi.dontShowHowTo(this.__token__)

            if (!howTo) throw Error('how to not found')

            return howTo
        })()
    },

    howTo() {
        return (async () => {
            const howTo = await fwsApi.howTo(this.__token__)

            if (!howTo) throw Error('how to not found')

            return howTo
        })()
    },

    geolocation() {
        return (async () => {
            const geolocation = await fwsApi.geolocation(this.__token__)

            if (!geolocation) throw Error('unable to retrieve current location')

            return geolocation
        })()
    },

    /**
     * 
     * @param {object} filters 
     */
    filterEvents(filters) {
        if (filters.constructor !== Object) throw TypeError(`${filters} is not an object`)

        return (async () => {
            const events = await fwsApi.filterEvents(this.__token__, filters)

            if (!events.events.length) throw Error('no events were found with these specified filters')

            return events.events
        })()
    },

    /**
     * 
     * @param {string} userId 
     */
    retrieveEvents(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId is empty')

        return (async () => {
            const events = await fwsApi.retrieveEvents(userId)

            if (!events.events.length) throw Error('events not found')

            return events.events
        })
    }
}

export default logic