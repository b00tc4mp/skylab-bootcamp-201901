'use strict'

const coworkingApi = {
    url: 'http://localhost:8000/api',

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
        debugger

        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(response => {
                
                if (response.error) throw Error(response.error)

                return response.id
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

                return response.token
            })
    },

    retrieveUser(token) {
        if (typeof token == ! 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/user`, {
            method: 'GET',
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

    removeUser(token, email, password) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch(`${this.url}/user`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ email, password })
        })
            .then( response => response.json())
            .then (response => {
                if (response.error) throw Error (response.error)

                return response
            })
    }
}

export default coworkingApi