'use strict'

const skylabInnApi = {
    url: 'http://localhost:8000/api',

    /**
     * Registers a user.
     * 
     * @param {String} name 
     * @param {String} surname 
     * @param {String} email 
     * @param {String} password 
     * @param {String} passwordConfirm
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty, password and password confirm do not match or error is received from the fetch.
     *
     * @returns {String} - id. 
     */
    registerUser(name, surname, email, password, passwordConfirm) {

        if (typeof name !== 'string') throw new TypeError(`${name} is not a string`)
        if (!name.trim().length) throw new Error('name is empty')

        if (typeof surname !== 'string') throw new TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw new Error('surname is empty')

        if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
        if (!email.trim().length) throw new Error('email is empty')

        if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)
        if (!password.trim().length) throw new Error('password is empty')

        if (typeof passwordConfirm !== 'string') throw new TypeError(`${passwordConfirm} is not a string`)
        if (!passwordConfirm.trim().length) throw new Error('password confirmation is empty')

        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(({ id, error }) => {
                if (error) throw new Error(error)
                return id
            })
    },

    /**
     * Authenticates a user.
     * 
     * @param {String} email 
     * @param {String} password
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty, password and password confirm do not match or error is received from the fetch.
     *
     * @returns {String} - id.  
     */
    authenticateUser(email, password) {

        if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
        if (!email.trim().length) throw new Error('email is empty')

        if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)
        if (!password.trim().length) throw new Error('password is empty')

        return fetch(`${this.url}/user/auth`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(({token, error}) => {
                if (error) throw new Error(error)
                debugger
                return token
            })
    },
    
    /**
     * Retrieves user information
     * 
     * @param {String} token 
     * 
     * @throws {TypeError} - if token is not a string.
     * @throws {Error} - if token is empty.
     *
     * @returns {Object} - user.  
     */
    retrieveUser(token){

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        return fetch (`${this.url}/user`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })


    }
}

export default skylabInnApi