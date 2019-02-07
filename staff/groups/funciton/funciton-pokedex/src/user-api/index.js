'use strict'

const userApi = {

    //Endpoint of the API
    url: 'https://skylabcoders.herokuapp.com/api',

    /**
     * Register a user
     * 
     * @param {string} email 
     * @param {string} username 
     * @param {string} password 
     * @param {string} passwordConf 
     * 
     * Register a user. In case login is successful it returns user's id, otherwise an Error is thrown.
     */

    register(email, username, password, passwordConf) {
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)
        if (!username.trim().length) throw Error('surname is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('username is empty')

        if (typeof passwordConf !== 'string') throw TypeError(`${passwordConf} is not a string`)
        if (!passwordConf.trim().length) throw Error('passwordConf is empty')

        if (password !== passwordConf) throw Error('Passwords do not match')

        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response

                if (status === 'OK') return response.data.id


                throw Error(response.error) //Contempla caso de error
            })
    },


    /**
     * Authenticates a user
     * 
     * @param {string} username 
     * @param {string} password 
     * 
     * Authenticates a user. In case authentication is successful it returns user's data, otherwise an Error is thrown.
     * Data returned contain userid and token.
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

                throw Error(response.error) //Contempla el caso de mal funcionamiento de la API
            })
    },

    /**
     * Authenticates a user
     * 
     * @param {string} id 
     * @param {string} token 
     * 
     * Retrieves data from a user from the API. 
     * In case id and token are successful, it returns data, otherwise an error is thrown.
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

                if (response.status === 'OK') return response.data

                throw Error(response.error)
            })
    },

    /**
     * Updates user data 
     * 
     * @param {string} id 
     * @param {string} token 
     * @param {Object} data 
     * 
     * Updates user data, according to the parameter. An error is thrown if 
     * any of the parameters is incorrect.
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
     * Removes a user
     * 
     * @param {string} id 
     * @param {string} token 
     * @param {string} username 
     * @param {string} password 
     * 
     * Removes a user. In case the deletion is successful, nothing is returned, otherwise it throws Error.
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