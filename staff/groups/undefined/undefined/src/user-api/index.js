'use strict'

/**
 * User API client.
 * 
 * @version 1.0.0
 */

const userApi = {
    url: 'https://skylabcoders.herokuapp.com/api',

    /**
     * 
     * @param {string} - name the user's name.
     * @param {string}  - surname the user's surname.
     * @param {string} - username the user's username.
     * @param {string} - password the user's password.
     * 
     * @retuns {Promise} - Resolves with array of movies, otherwise rejects with an error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
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
            body: JSON.stringify({ name, surname, username, password, favorites: [] })
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
     * @param {string} - username the user's username.
     * @param {string} - password the user's password.
     * 
     * @retuns {Promise} - Response an object with id and token user
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
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
     * @param {string} - user id
     * @param {string} - user token 
     * 
     * @retuns {Promise} - Response an object with  the user's parameters
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
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
     * @param {string} - user id
     * @param {string} - user token 
     * @param {object} - data what do you want to modify
     *
     * 
     * @retuns {Promise} - Response an object with the modified data
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     */


    update(id, token, data) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')


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
     * @param {string} - user id
     * @param {string}  - token id
     * @param {string} - username the user's username.
     * @param {string} - password the user's password.
     * 
     * @retuns {Promise} - Delete user
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
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