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

    get __token__ () {
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

            if (token.error) throw Error('login unsuccessful')

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
            const user = await fwsApi.registerUser(this.__token__)

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
    createEvent(restaurantId, eventTime, eventDate) {
        if (typeof restaurantId !== 'string') throw TypeError(restaurantId + ' is not a string')
        if (!restaurantId.trim().length) throw Error('restaurantId cannot be empty')

        if (typeof eventTime !== 'string') throw TypeError(eventTime + ' is not a string')
        if (!eventTime.trim().length) throw Error('eventTime cannot be empty')

        if (typeof eventDate !== 'string') throw TypeError(eventDate + ' is not a string')
        if (!eventDate.trim().length) throw Error('eventDate cannot be empty')

        return (async () => {
            const eventId = await fwsApi.createEvent(restaurantId, this.__token__, eventTime, eventDate)

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

    joinChat(chatId) {
        if (typeof chatId !== 'string') throw TypeError(chatId + ' is not a string')
        if (!chatId.trim().length) throw Error('chatId cannot be empty')

        return (async () => {
            const chat = await fwsApi.joinChat(chatId, this.__token__)

            if (!chat) throw Error('unable to join chat at this time')

            return chat
        })()
    },

    userChats() {
        return (async () => {
            const chats = fwsApi.userChats(this.__token__)

            if (!chats) throw Error('unable to retrieve users chats')

            return chats
        })()
    }
}

export default logic