'use strict'

const flareApi = {
    url: "http://localhost:8000/api",
    // url: 'https://stark-basin-28669.herokuapp.com/api',

    registerUser(name, surname, email, password, passwordConfirm) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('name is empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw Error('surname is empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        if (typeof passwordConfirm !== 'string') throw TypeError(`${passwordConfirm} is not a string`)
        if (!passwordConfirm.trim().length) throw Error('password confirm is empty')
        
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
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

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

    retrieveUsers(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

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
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')
        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')
        debugger
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
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (!data) throw Error('data is empty')
        if (data.constructor !== File) throw TypeError(`${data} is not an object`)

        if (typeof msgId !== 'string') throw TypeError(msgId + ' is not a string')
        if (!msgId.trim().length) throw Error('msgId cannot be empty')

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

