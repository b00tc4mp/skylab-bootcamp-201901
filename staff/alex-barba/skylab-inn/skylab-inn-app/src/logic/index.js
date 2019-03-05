'use strict'

import skylabInnApi from '../skylab-inn-api'

/**
 * Abstraction of business logic.
 */
const logic = {

    __userApiToken__: null,

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
     * @throws {Error} - if any param is empty or password and password confirm do not match.
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

        if (password !== passwordConfirm) throw new Error('passwords do not match')

        return skylabInnApi.registerUser(name, surname, email, password, passwordConfirm)
            .then(id => id)
    },

    /**
     * Authenticates a user.
     * 
     * @param {String} email 
     * @param {String} password
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty, email is not found or password does not match.
     *
     * @returns {String} - id.  
     */
    logInUser(email, password) {

        if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
        if (!email.trim().length) throw new Error('email is empty')

        if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)
        if (!password.trim().length) throw new Error('password is empty')

        return skylabInnApi.authenticateUser(email, password)
            .then(token => this.__userApiToken__ = token)
    },

    /**
     * Checks if user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__userApiToken__
    },

    /**
     * Signs out the user.
     */
    signOutUser() {
        this.__userApiToken__ = null
    },

    /**
     * Retrieves user information
     * 
     * @param {String} token 
     *
     * @returns {Object} - user.  
     */
    retrieveUser() {
        return skylabInnApi.retrieveUser(this.__userApiToken__)
            .then(({user}) => user)
    },

    /**
     * Updates a user.
     * 
     * @param {Object} data 
     * 
     * @throws {TypeError} - if data is not an object.
     * @throws {Error} - if any data is empty.
     *
     * @returns {Object} - user.  
     */
    updateUser(data) {

        if (!data) throw Error('data is empty')
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return skylabInnApi.updateUser(this.__userApiToken__, data)
            .then(({user}) => user)
    },

    /**
     * Searches for a skylaber.
     * 
     * @param {String} query 
     * 
     * @throws {TypeError} - if query is not a string.
     * @throws {Error} - if query is empty.
     *
     * @returns {Object} - skylabers matching the query.  
     */
    searchSkylaber(query) {

        if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
        if (!query.trim().length) throw new Error('query is empty')

        return skylabInnApi.searchSkylaber(this.__userApiToken__, query)
            .then(({user}) => user)
    },

    /**
     * Advance search for a skylaber.
     * 
     * @param {String} param
     * @param {String} query 
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Object} - skylabers matching the query.  
     */
    adSearchSkylaber(param, query) {

        if (typeof param !== 'string') throw new TypeError(`${param} is not a string`)
        if (!param.trim().length) throw new Error('param is empty')

        if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
        if (!query.trim().length) throw new Error('query is empty')

        return skylabInnApi.adSearchSkylaber(this.__userApiToken__, param, query)
            .then(({user}) =>  user)
    },

     /**
     * Next advance search for a skylaber.
     * 
     * @param {Array} adSearchResults
     * @param {String} param
     * @param {String} query 
     * 
     * @throws {TypeError} - if adSearchResults is not an array or param or query are not a string.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Object} - skylabers matching the new query.  
     */
    nextAdSearchSkylaber(adSearchResults, param, query) {
        debugger
        if (typeof adSearchResults !== 'string') throw new TypeError(`${adSearchResults} is not a string`)
        if (!adSearchResults.trim().length) throw new Error('adSearchResults is empty')

        if (typeof param !== 'string') throw new TypeError(`${param} is not a string`)
        if (!param.trim().length) throw new Error('param is empty')

        if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
        if (!query.trim().length) throw new Error('query is empty')

            let results

            switch (param) {
                case 'contact':
                results = adSearchResults.filter(res => res.name= { "$regex": `${query}`, "$options": "i" })
                //  {surname: { "$regex": `${query}`, "$options": "i" }}, {email: { "$regex": `${query}`, "$options": "i" }} , {git: { "$regex": `${query}`, "$options": "i" }}, {linkedin: { "$regex": `${query}`, "$options": "i" }}, {slack: { "$regex": `${query}`, "$options": "i" }} ]})
                break;
                case 'techs':
                results = adSearchResults.filter({techs: { "$regex": `${query}`, "$options": "i" }})
                break;
                case 'work':
                results = adSearchResults.filter({languages: { "$regex": `${query}`, "$options": "i" }})
                break;
                case 'languages':
                results = adSearchResults.filter({$or: [{'education.college': { "$regex": `${query}`, "$options": "i" }}, {'education.degree': { "$regex": `${query}`, "$options": "i" }}]})
                break;
                case 'education':
                results = adSearchResults.filter({$or: [{'workExperience.company': { "$regex": `${query}`, "$options": "i" }}, {'workExperience.position': { "$regex": `${query}`, "$options": "i" }}]})
                break;
            }

            return results
        
    },


    /**
     * Retrieves a skylaber.
     * 
     * @param {String} id 
     * 
     * @throws {TypeError} - if id is not a string.
     * @throws {Error} - if any id is empty.
     *
     * @returns {Object} - skylaber matching the id.  
     */
    retrieveSkylaber(id) {

        if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)
        if (!id.trim().length) throw new Error('id is empty')

        return skylabInnApi.retrieveSkylaber(this.__userApiToken__, id)
        .then(({user}) => user)
    },
}

export default logic