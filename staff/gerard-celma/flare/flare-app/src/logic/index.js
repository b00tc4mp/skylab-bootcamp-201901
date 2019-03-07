'use strict'

import flareApi from '../flare-api'

const logic = {
    __userApiToken__: null,

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

    return flareApi.registerUser(name, surname, email, password, passwordConfirmation)
        .then(() => { })
    },

    /**
     * Logs in the user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    logInUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')

        if (!password.trim().length) throw Error('password cannot be empty')

        return flareApi.authenticateUser(email, password)
            .then(({token}) => this.__userApiToken__ = token)
    },

    /**
     * Checks user is logged in.
     */
    get isUserLoggedIn() {
        // double negation !! turns a "truthy" or "falsy" value into a boolean value, true or false
        return !!this.__userApiToken__
    },

    retrieveUser() {
        return flareApi.retrieveUser(this.__userApiToken__)
            .then(user => user)
    },

    retrieveUsers() {
        return flareApi.retrieveUsers(this.__userApiToken__)
            .then(users => users)
    },

    createMessage(userIdTo, launchDate, position, text) {
        if (typeof userIdTo !== 'string') throw TypeError(userIdTo + ' is not a string')

        if (!userIdTo.trim().length) throw Error('name cannot be empty')

        // TODO validate launchDate, position, text

        return flareApi.createMessage(this.__userApiToken__, userIdTo, launchDate, position, text)
            .then(message => message)
    }
}

export default logic