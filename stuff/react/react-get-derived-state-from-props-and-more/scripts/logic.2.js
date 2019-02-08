'use strict'

/**
 * Abstraction of business logic.
 */
const logic = {
    __storage__ : null,

    set storage(storage) {
        this.__storage__ = storage
    },

    set __userId__(id) {
        if (id) this.__storage__.setItem('user-id', id)
        else this.__storage__.removeItem('user-id')
    },

    get __userId__() {
        return this.__storage__.getItem('user-id')
    },

    set __userApiToken__(token) {
        if (token) this.__storage__.setItem('user-api-token', token)
        else this.__storage__.removeItem('user-api-token')
    },

    get __userApiToken__() {
        sessionStorage.getItem('user-api-token')
    },
    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser(name, surname, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')

        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')

        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return userApi.register(name, surname, email, password)
            .then(() => { })
    },

    /**
     * Logins a user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    loginUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return userApi.authenticate(email, password)
            .then(({ id, token }) => {
                this.__userId__ = id
                this.__userApiToken__ = token
            })
    },


    get userLoggedIn() {
        return !!this.__userId__
    },

    logout() {
        this.__userId__ = null
        this.__userApiToken__ = null
    },

    /**
     * Retrieves the current logged in user.
     */
    retrieveUser() {
        return userApi.retrieve(this.__userId__, this.__userApiToken__)
            .then(({ id, name, surname, username }) => ({
                id,
                name,
                surname,
                email: username
            }))
    },

    /**
     * Searchs ducklings.
     * 
     * @param {string} query - The search criteria.
     * @param {function} callback - The expression to evaluate on response.
     */
    searchDucklings(query, callback) {
        if (typeof query !== 'string') throw TypeError(query + ' is not a string')

        if (!query.trim().length) throw Error('query cannot be empty')

        ducklingApi.search(query, callback)
    },

    /**
     * Retrieves a duckling information detail.
     * 
     * @param {string} id - The duckling id.
     * @param {function} callback - The expression to evaluate on response.
     */
    retrieveDuckling(id, callback) {
        if (typeof id !== 'string') throw TypeError(id + ' is not a string')

        if (!id.trim().length) throw Error('id cannot be empty')

        ducklingApi.retrieve(id, callback)
    }
}