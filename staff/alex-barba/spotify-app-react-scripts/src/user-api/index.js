'use strict'

/**
 * Database API client.
 * 
 * @version 1.0.0
 */

 const userApi = {

    /**
     * 
     * Registers a new user.
     * 
     * @param {*} name 
     * @param {*} surname 
     * @param {*} email 
     * @param {*} password 
     */
    
    register(name, surname, email, password) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('name is empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw Error('surname is empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch('https://skylabcoders.herokuapp.com/api/user', { 
            method: 'POST', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, username: email, password, favourites:[] })
        })
            .then(response => response.json())
            .then(response => {
                const { status} = response
                
                if (status === 'OK') {
                    const { data: {id} } = response
                    return id
                }
                else throw Error(response.error)
            })
    },

    /**
     * 
     * Authenticates a user.
     * 
     * @param {*} email 
     * @param {*} password 
     */

    auth(email, password) {
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email is empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password is empty')

        return fetch('https://skylabcoders.herokuapp.com/api/auth', { 
            method: 'POST', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username: email, password })
        })
            .then(response => response.json())
            .then(response => {
                const { status, data} = response
                
                if (status === 'OK') return data
                else throw Error(response.error)
            })
    },

    /**
     * 
     * Retrieves user information.
     * 
     * @param {*} id 
     * @param {*} token 
     */

    retrieve(id, token) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`https://skylabcoders.herokuapp.com/api/user/${id}`, { 
            method: 'GET', 
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {
                const { status, data} = response

                if (status === 'OK') return data
                else throw Error(response.error)
            })
    },

    /**
     * 
     * Updates user information.
     * 
     * @param {*} id 
     * @param {*} token 
     * @param {*} object 
     */

    update(id, token, object) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        if (Object.entries(object).length === 0) throw Error(`${object} is empty`)

        return fetch(`https://skylabcoders.herokuapp.com/api/user/${id}`, { 
            method: 'PUT', 
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ object }),
        })
            .then(response => response.json())
            .then(response => {
                const { status, data} = response

                if (status === 'OK') return data
                else throw Error(response.error)
            })
    },

    /**
     * 
     * Removes user.
     * 
     * @param {*} id 
     * @param {*} token 
     * @param {*} email 
     * @param {*} password 
     */

    remove(id, token, email, password) {
        if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
        if (!id.trim().length) throw Error('id is empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token is empty')

        return fetch(`https://skylabcoders.herokuapp.com/api/user/${id}`, { 
            method: 'DELETE', 
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ username: email, password }),
        })
            .then(response => response.json())
            .then(response => {
                const { status } = response

                if (status === 'OK') return true
                else throw Error(response.error)
            })
    }
}

export default userApi;