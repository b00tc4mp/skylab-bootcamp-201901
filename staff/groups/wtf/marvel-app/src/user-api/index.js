'use strict'

/**
 * 
 * User API
 * 
 * @version 0.0.1
 */

const userApi = {

    url: `https://skylabcoders.herokuapp.com/api`,

    /**
     * 
     * Register a new user
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} username 
     * @param {string} password 
     * 
     * @throws {TypeError} - When any param is not a string.
     * @throws {Error} - When any param is empty.
     * @throws {Error} - When API returns an error.
     * 
     * @returns {Object} - User Id.
     * 
     */

    register(name, surname, username, password) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('name is empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw Error('surname is empty')

        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')


        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, username, password, favourites: [] })
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response

                if (status === 'OK') return response.data.id
                throw Error(response.error)
            })
    },

    /**
     * 
     * Authenticates a user.
     * 
     * @param {string} username 
     * @param {string} password 
     * 
     * @throws {TypeError} - When any param is not a string.
     * @throws {Error} - When any param is empty.
     * @throws {Error} - When API returns an error.
     * 
     * @returns {Object} - User id and token.
     * 
     */

    authenticate(username, password) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch(`${this.url}/auth`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response

                if (status === 'OK') return response.data
                throw Error(response.error)
            })
    },

    /**
     * 
     * Retrieves user data.
     * 
     * @param {string} id 
     * @param {string} token 
     * 
     * @throws {TypeError} - When any param is not a string.
     * @throws {Error} - When any param is empty.
     * @throws {Error} - When API returns an error.
     * 
     * @returns {Object} - User data.
     * 
     */

    retrieve(id, token) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`${this.url}/user/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response

                if (status === 'OK') return response.data
                throw Error(response.error)
            })
    },

    /**
     * 
     * Updates user data.
     * 
     * @param {string} id 
     * @param {string} token 
     * @param {Object} data 
     * 
     * @throws {TypeError} - When any param is not a string.
     * @throws {Error} - When any param is empty.
     * @throws {Error} - When API returns an error.
     * 
     * @returns {String} - Returns an OK or KO result.
     * 
     */

    update(id, token, data) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return fetch(`${this.url}/user/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response

                if (status === 'OK') return
                throw Error(response.error)
            })
    },

    /**
     * 
     * Removes a user.
     * 
     * @param {string} id 
     * @param {string} token 
     * @param {string} username 
     * @param {string} password 
     * 
     * @throws {TypeError} - When any param is not a string.
     * @throws {Error} - When any param is empty.
     * @throws {Error} - When API returns an error.
     * 
     * @returns {String} - Returns an OK or KO result.
     * 
     */

    remove(id, token, username, password) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('username is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch(`${this.url}/user/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response

                if (status === 'OK') return

                throw Error(response.error)
            })
    }
}

export default userApi
