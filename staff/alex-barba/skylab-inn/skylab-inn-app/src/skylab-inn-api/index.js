'use strict'

const skylabInnApi = {
    // url: 'http://localhost:8000/api',
    url: 'https://fast-taiga-93895.herokuapp.com/',

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
            .then(({ token, error }) => {
                if (error) throw new Error(error)

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
    retrieveUser(token) {

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        return fetch(`${this.url}/user`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Updates user information
     * 
     * @param {String} token
     * @param {Object} data
     * 
     * @throws {TypeError} - if token is not a string or data is not an object.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Object} - user.  
     */
    updateUser(token, data) {

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        if (!data) throw Error('data is empty')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return fetch(`${this.url}/user`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ data })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Updates user information
     * 
     * @param {String} token
     * @param {Object} data
     * 
     * @throws {TypeError} - if token is not a string or data is not an object.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Object} - user.  
     */
    updateUserPhoto(token, data) {

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        if (!data) throw Error('data is empty')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        let formData = new FormData()
        formData.append('image', data.image)

        return fetch(`${this.url}/user-photo`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
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
     * Searches for a skylaber
     * 
     * @param {String} token
     * @param {String} query
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Object} - user matching query
     */
    searchSkylaber(token, query) {

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
        if (!query.trim().length) throw new Error('query is empty')

        return fetch(`${this.url}/user/search`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ query })
        })
            .then(response => response.json())
            .then(response => {
                debugger
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Advanced search for a skylaber
     * 
     * @param {String} token
     * @param {Array} param
     * 
     * @throws {TypeError} - if token is not a string or param is not an array.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Object} - user matching query 
     */
    adSearchSkylaber(token, param) {

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        if (param instanceof Array === false) throw new TypeError(`${param} is not an array`)
        if (!param.length) throw new Error('param is empty')

        return fetch(`${this.url}/user/advanced-search`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ param })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Retrieves a skylaber information
     * 
     * @param {String} token 
     * @param {String} id 
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if param is empty.
     *
     * @returns {Object} - skjylaber matching id.  
     */
    retrieveSkylaber(token, id) {

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new Error('id is empty')

        return fetch(`${this.url}/skylaber/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Add work experience to a user
     * 
     * @param {String} token
     * @param {String} type
     * @param {Object} data
     * 
     * @throws {TypeError} - if token or type are not a string or data is not an object.
     * @throws {Error} - if any param is empty.
     *
     * @returns {String} - added work id.  
     */
    addUserInformation(token, type, data) {

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        if (typeof type !== 'string') throw new TypeError(`${type} is not a string`)
        if (!type.trim().length) throw new Error('type is empty')

        if (!data) throw Error('data is empty')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return fetch(`${this.url}/user/addInformation`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ type, data })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Update work experience from a user
     * 
     * @param {String} token
     * @param {String} infoId
     * @param {String} type 
     * @param {Object} data
     * 
     * @throws {TypeError} - if token, infoId or type are not a string or data is not an object.
     * @throws {Error} - if any param is empty.
     *
     * @returns {String} - updated work id.  
     */
    updateUserInformation(token, infoId, type, data) {

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        if (typeof infoId !== 'string') throw new TypeError(`${infoId} is not a string`)
        if (!infoId.trim().length) throw new Error('infoId is empty')

        if (typeof type !== 'string') throw new TypeError(`${type} is not a string`)
        if (!type.trim().length) throw new Error('type is empty')

        if (!data) throw Error('data is empty')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return fetch(`${this.url}/user/updateInformation`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ infoId, type, data })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Remove work experience from a user
     * 
     * @param {String} token
     * @param {String} infoId
     * @param {String} type 
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Promise} resolves or rejects. 
     */
    removeUserInformation(token, infoId, type) {

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        if (typeof infoId !== 'string') throw new TypeError(`${infoId} is not a string`)
        if (!infoId.trim().length) throw new Error('infoId is empty')

        if (typeof type !== 'string') throw new TypeError(`${type} is not a string`)
        if (!type.trim().length) throw new Error('type is empty')

        return fetch(`${this.url}/user/removeInformation`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ infoId, type })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Adds skylaber to the whitelist.
     * 
     * @param {String} token
     * @param {Object} data
     * 
     * @throws {TypeError} - if token is not a string or data is not an object.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Promise} resolves or rejects.   
     */
    addSkylaber(token, data) {

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        if (!data) throw Error('data is empty')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return fetch(`${this.url}/add-skylaber`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ data })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Retrieve whitelist skylabers with pending status.
     * 
     * @param {String} token 
     * 
     * @throws {TypeError} - if token is not a string.
     * @throws {Error} - if token is empty.
     *
     * @returns {Object} - users pending sign up.  
     */
    retrievePendingSkylabers(token) {

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        return fetch(`${this.url}/pending-skylabers`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Retrieve skylabers with unverified emails.
     * 
     * @param {String} token 
     * 
     * @throws {TypeError} - if token is not a string.
     * @throws {Error} - if token is empty.
     *
     * @returns {Object} - users with unverified emails.  
     */
    retrieveUnverifiedEmails(token) {

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        return fetch(`${this.url}/unverified-emails`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Create a hashed url with skylaberIds.
     * 
     * @param {String} token
     * @param {Array} skylaberIds
     * 
     * @throws {TypeError} - if token is not a string or skylaberIds is not an array.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Object} - hashed url with skylabers ids. 
     */
    shareResults(token, skylaberIds) {

        if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
        if (!token.trim().length) throw new Error('token is empty')

        if (skylaberIds instanceof Array === false) throw new TypeError(`${skylaberIds} is not an array`)
        if (!skylaberIds.length) throw new Error('skylaberIds is empty')

        return fetch(`${this.url}/admin/create-hashed-url`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ skylaberIds })
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw new Error(response.error)

                return response
            })
    },

    /**
     * Retrieves encrypted skylabers.
     * 
     * @param {String} encryptedIds 
     * 
     * @throws {TypeError} - if encryptedIds is not a string.
     * @throws {Error} - if encryptedIds is empty.
     *
     * @returns {Array} - skkylabers matching id.  
     */
    retrieveEncryptedIds(encryptedIds) {

        if (typeof encryptedIds !== 'string') throw new TypeError(`${encryptedIds} is not a string`)
        if (!encryptedIds.trim().length) throw new Error('encryptedIds is empty')

        return fetch(`${this.url}/retrieve-skylaber/${encryptedIds}`)
            .then(response => response.json())
            .then(response => {

                if (response.error) throw new Error(response.error)

                return response
            })
    },
}

export default skylabInnApi