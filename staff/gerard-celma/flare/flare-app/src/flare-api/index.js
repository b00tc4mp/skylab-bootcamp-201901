'use strict'

const { AuthError, EmptyError, DuplicateError, MatchingError, NotFoundError } = require('errorify')
const validate = require('flare-validation')

const flareApi = {
    url: "http://localhost:8000/api",
    // url: 'https://stark-basin-28669.herokuapp.com/api',

    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirm 
    */
    registerUser(name, surname, email, password, passwordConfirm) {
        validate([{ key: 'name', value: name, type: String }, { key: 'surname', value: surname, type: String }, { key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }, { key: 'passwordConfirm', value: passwordConfirm, type: String }])

        if(password !== passwordConfirm) throw new MatchingError('passwords do not match')
        
        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(({ id, error }) => {
                if (error) throw Error(error)

                return id
            })
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    authenticateUser(email, password) {
        validate([{ key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }])

        return fetch(`${this.url}/user/auth`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    /**
     * Retrieves user by its token.
     * 
     * @param {string} token
     */
    retrieveUser(token) {
        validate([{ key: 'token', value: token, type: String }])

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
     * Retrieves users.
     * 
     * @param {string} token
     */
    retrieveUsers(token) {
        validate([{ key: 'token', value: token, type: String }])

        return fetch(`${this.url}/users`, {
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
     * Updates user.
     * 
     * @param {string} token
     * @param {string} name
     * @param {string} surname
     * @param {string} email
     */
    updateUser(token, name, surname, email) {
        validate([{ key: 'token', value: token, type: String }, { key: 'name', value: name, type: String }, { key: 'surname', value: surname, type: String }, { key: 'email', value: email, type: String }])
        
        return fetch(`${this.url}/user`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, surname, email })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    /**
     * Updates message image.
     * 
     * @param {string} token
     * @param {file} data
     * @param {string} msgId
     */
    uploadMessagePhoto(token, data, msgId) {
        validate([{ key: 'token', value: token, type: String }, { key: 'data', value: data, type: File }, { key: 'msgId', value: msgId, type: String }])

        let formData = new FormData()
        formData.append('image', data)

        return fetch(`${this.url}/message/photo/${msgId}`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`
            },
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Updates user image.
     * 
     * @param {string} token
     * @param {file} data
     */
    updateUserPhoto(token, data) {
        validate([{ key: 'token', value: token, type: String }, { key: 'data', value: data, type: File }])
        let formData = new FormData()
        formData.append('image', data)

        return fetch(`${this.url}/user/photo`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`
            },
            body: formData
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Creates message.
     * 
     * @param {string} token
     * @param {string} userIdTo
     * @param {string} launchDate
     * @param {array} position
     * @param {string} text
     */
    createMessage(token, userIdTo, launchDate, position, text) {
        validate([{ key: 'token', value: token, type: String }, { key: 'userIdTo', value: userIdTo, type: String }, { key: 'launchDate', value: launchDate, type: String }, { key: 'position', value: position, type: Array }, { key: 'text', value: text, type: String }])

        return fetch(`${this.url}/message/create`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userIdTo, launchDate, position, text })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    /**
     * Retrieves received messages.
     * 
     * @param {string} token
     */
    retrieveReceivedMessages(token) {
        validate([{ key: 'token', value: token, type: String }])

        return fetch(`${this.url}/message/received`, {
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
     * Retrieves sent messages.
     * 
     * @param {string} token
     */
    retrieveSentMessages(token) {
        validate([{ key: 'token', value: token, type: String }])

        return fetch(`${this.url}/message/sent`, {
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
     * Retrieves all messages.
     * 
     * @param {string} token
     */
    retrieveAllMessages(token) {
        validate([{ key: 'token', value: token, type: String }])

        return fetch(`${this.url}/message/all`, {
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
     * Marks messages as read.
     * 
     * @param {string} token
     * @param {string} msgId
     */
    messageRead(token, msgId) {
        validate([{ key: 'token', value: token, type: String }, { key: 'msgId', value: msgId, type: String }])

        return fetch(`${this.url}/message/read`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ msgId })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    },

    /**
     * Marks message as read.
     * 
     * @param {string} token
     * @param {string} msgId
     */
    messageDelete(token, msgId) {
        validate([{ key: 'token', value: token, type: String }, { key: 'msgId', value: msgId, type: String }])

        return fetch(`${this.url}/message/delete`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ msgId })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error)

                return response
            })
    }
}

export default flareApi

