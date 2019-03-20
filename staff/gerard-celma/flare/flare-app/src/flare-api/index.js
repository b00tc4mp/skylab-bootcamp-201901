'use strict'

const { AuthError, EmptyError, DuplicateError, MatchingError, NotFoundError } = require('errorify')
const validate = require('flare-validation')

const flareApi = {
    url: "http://localhost:8000/api",
    // url: 'https://stark-basin-28669.herokuapp.com/api',

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

    updateUserPhoto(token, data) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (!data) throw Error('data is empty')
        if (data.constructor !== File) throw TypeError(`${data} is not an object`)

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

    createMessage(token, userIdTo, launchDate, position, text) {
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

    retrieveReceivedMessages(token) {
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

    retrieveSentMessages(token) {
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

    retrieveAllMessages(token) {
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

    messageRead(token, msgId) {
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

    messageDelete(token, msgId) {
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

