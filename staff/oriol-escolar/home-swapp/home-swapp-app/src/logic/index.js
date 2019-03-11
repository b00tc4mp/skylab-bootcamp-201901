'use strict'
import homeSwappApi from '../api'

/**
 * Abstraction of business logic.
 */
const logic = {

    __userApiToken__: null,

    

    setUserApiToken(token) {
        this.__userApiToken__ = token
    },

    getUserApiToken() {
        return this.__userApiToken__
    },

    get userLoggedIn() {
        return !!this.getUserApiToken()
    },

    /**
    * Registers a user.
    * 
    * Register a user in the application
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    * 
    * @returns {promise} - returns a empty promise
    */
    registerUser(username, email, password, passwordConfirmation) {
        if (typeof username !== 'string') throw TypeError(username + ' is not a string')

        if (!username.trim().length) throw Error('username cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if(!(/^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(email))) throw Error ('Invalid email adress')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return homeSwappApi.registerUser(username, email, password,passwordConfirmation)
    },

    /**
     * 
     * Login User
     * 
     * Logins a user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {promise} - sets in sessioin storage the token and the id of the user
     */
    loginUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return homeSwappApi.authenticateUser(email, password)
            .then((token) => {
                this.setUserApiToken(token)
                return token
            })
    },

    logout() {
        this.__userApiToken__ = null;
    },

    /**
     * Retrieve user
     * 
     * retrieve the information of the logged user
     * 
     * 
     * @returns {promise} - returns the infromation of a user in object format
     * 
     */

    retrieveUser() {
        return homeSwappApi.retrieveUser(this.getUserApiToken())
            
    },

    /**
     * 
     * update user
     * 
     * updates an user with new information
     * 
     * @param {Object} data 
     * 
     * @returns {promise}
     */

    updateUser(data) {
        if (data.constructor !== Object) throw TypeError(data + 'is not an Object')

        return homeSwappApi.updateUser(this.getUserApiToken(), data)
    },



}

export default logic