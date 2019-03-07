'use strict'

const fwsApi = {
    url: 'http://localhost:8000/api',

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
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('name is empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw Error('surname is empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(`${passwordConfirmation} is not a string`)
        if (!passwordConfirmation.trim().length) throw Error('password confirmation is empty')

        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, username, password, passwordConfirmation })
        })
        .then(response => response.json())
        .then(({ id, error }) => {
            if (error) throw Error(error)

            return id
        })
    },

    /**
     * 
     * @param {string} emailOrUsername 
     * @param {string} password 
     */
    authenticateUser(emailOrUsername, password) {
        if (typeof emailOrUsername !== 'string') throw TypeError(`${emailOrUsername} is not a string`)
        if (!emailOrUsername.trim().length) throw Error('emailOrUsername is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch(`${this.url}/user/auth`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ emailOrUsername, password })
        })
        .then(response => {
            return response.json()
        })
        .then(response => response)
        .catch(console.error)
    },

    /**
     * 
     * @param {string} id 
     * @param {string} token 
     */
    retrieveUser(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/user`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)

            return response
        })
    },

    /**
     * 
     * @param {string} restaurantId 
     * @param {string} token 
     * @param {string} eventTime 
     * @param {string} eventDate 
     */
    createEvent(restaurantId, token, eventTime, eventDate) {
        if (typeof restaurantId !== 'string') throw TypeError(`${restaurantId} is not a string`)
        if (!restaurantId.trim().length) throw Error('restaurantId is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof eventTime !== 'string') throw TypeError(`${eventTime} is not a string`)
        if (!eventTime.trim().length) throw Error('eventTime is empty')

        if (typeof eventDate !== 'string') throw TypeError(`${eventDate} is not a string`)
        if (!eventDate.trim().length) throw Error('eventDate is empty')

        return fetch(`${this.url}/event/${restaurantId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ eventTime, eventDate })
        })
        .then(response => response.json())
        .then(({ id, error }) => {
            if (error) throw Error(error)

            return id
        })
    },

    /**
     * 
     * @param {string} eventId 
     * @param {string} token 
     */
    joinEvent(eventId, token) {
        if (typeof eventId !== 'string') throw TypeError(`${eventId} is not a string`)
        if (!eventId.trim().length) throw Error('eventId is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/event/${eventId}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)

            return response
        })
    },

    /**
     * 
     * @param {string} token 
     */
    userEvents(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/events`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)

            return response
        })
    },

    /**
     * 
     * @param {string} token 
     * @param {string} chatName 
     * @param {string} eventId 
     */
    createChat(token, chatName, eventId) {
        if (typeof eventId !== 'string') throw TypeError(`${eventId} is not a string`)
        if (!eventId.trim().length) throw Error('eventId is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof chatName !== 'string') throw TypeError(`${chatName} is not a string`)
        if (!chatName.trim().length) throw Error('chatName is empty')

        return fetch(`${this.url}/chat/${eventId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ chatName })
        })
        .then(response => response.json())
        .then(({ id, error }) => {
            if (error) throw Error(error)

            return id
        })
    },

    /**
     * 
     * @param {string} chatId 
     * @param {string} token 
     */
    joinChat(chatId, token) {
        if (typeof chatId !== 'string') throw TypeError(`${chatId} is not a string`)
        if (!chatId.trim().length) throw Error('chatId is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/chat/${chatId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)

            return response
        })
    },

    /**
     * 
     * @param {string} token 
     */
    userChats(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/chats`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)

            return response
        })
    },

    /**
     * 
     * @param {string} token 
     * @param {string} chatId 
     * @param {string} text 
     */
    addMesageToChat(token, chatId, text) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof chatId !== 'string') throw TypeError(`${chatId} is not a string`)
        if (!chatId.trim().length) throw Error('chatId is empty')

        if (typeof text !== 'string') throw TypeError(`${text} is not a string`)
        if (!text.trim().length) throw Error('text is empty')

        return fetch(`${this.url}/message/${chatId}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ text })
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)

            return response
        })
    },
    
    /**
     * 
     * @param {string} query 
     * @param {string} token 
     */
    searchRestaurants(query, token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error('query is empty')

        return fetch(`${this.url}/search-restaurants/${query}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)

            return response
        })
    },

    restaurantDetails(restaurantId, token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof restaurantId !== 'string') throw TypeError(`${restaurantId} is not a string`)
        if (!restaurantId.trim().length) throw Error('restaurantId is empty')

        return fetch(`${this.url}/restaurant-details/${restaurantId}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)

            return response
        })
    },

    /**
     * 
     * @param {string} photoReference 
     * @param {string} token 
     */
    retrievePhoto(photoReference, token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof photoReference !== 'string') throw TypeError(`${photoReference} is not a string`)
        if (!photoReference.trim().length) throw Error('photoReference is empty')

        return fetch(`${this.url}/resized-photo/${photoReference}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) throw Error(response.error)

            return response
        })
    }
}

export default fwsApi