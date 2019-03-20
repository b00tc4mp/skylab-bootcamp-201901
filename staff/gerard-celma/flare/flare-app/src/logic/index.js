'use strict'

import flareApi from '../flare-api'
const { AuthError, EmptyError, DuplicateError, MatchingError, NotFoundError } = require('errorify')
const validate = require('flare-validation') 

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
    validate([{ key: 'name', value: name, type: String }, { key: 'surname', value: surname, type: String }, { key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }, { key: 'passwordConfirmation', value: passwordConfirmation, type: String }])

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
        validate([{ key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }])

        return flareApi.authenticateUser(email, password)
            .then(({token}) => this.__userApiToken__ = token)
    },

    logOutUser() {
        this.__userApiToken__ = null
    },

    /**
     * Checks user is logged in.
     */
    get isUserLoggedIn() {
        // double negation !! turns a "truthy" or "falsy" value into a boolean value, true or false
        return !!this.__userApiToken__
    },

    updateUser(name, surname, email) {
        validate([{ key: 'name', value: name, type: String }, { key: 'surname', value: surname, type: String }, { key: 'email', value: email, type: String }])

        return flareApi.updateUser(this.__userApiToken__, name, surname, email)
            .then(user => user)
    },

    retrieveUser() {
        return flareApi.retrieveUser(this.__userApiToken__)
            .then(user => user)
    },

    retrieveUsers() {
        return flareApi.retrieveUsers(this.__userApiToken__)
            .then(users => users)
    },

    uploadMessagePhoto(data, msgId) {
        if (!data) throw Error('data is empty')
        if (data.constructor !== File) throw TypeError(`${data} is not an object`)

        if (typeof msgId !== 'string') throw TypeError(msgId + ' is not a string')
        if (!msgId.trim().length) throw Error('msgId cannot be empty')

        return flareApi.uploadMessagePhoto(this.__userApiToken__, data, msgId)
            .then(({user}) => user)
    },

    updateUserPhoto(data) {
        if (!data) throw Error('data is empty')
        if (data.constructor !== File) throw TypeError(`${data} is not an object`)

        return flareApi.updateUserPhoto(this.__userApiToken__, data)
            .then(({user}) => user)
    },

    createMessage(userIdTo, launchDate, position, text) {
        let actualDate = new Date().toJSON().slice(0, 10)

        if (typeof userIdTo !== 'string') throw TypeError(userIdTo + ' is not a string')

        if (!userIdTo.trim().length) throw Error('Select user in order to send message')

        if (launchDate < actualDate) throw Error('You cannot select a past date')

        // TODO validate launchDate, position, text

        return flareApi.createMessage(this.__userApiToken__, userIdTo, launchDate, position, text)
            .then(message => message)
    },

    retrieveReceivedMessages() {
        return flareApi.retrieveReceivedMessages(this.__userApiToken__)
            .then((messages) => messages)
    },

    retrieveSentMessages() {
        return flareApi.retrieveSentMessages(this.__userApiToken__)
            .then((messages) => messages)
    },

    retrieveAllMessages() {
        return flareApi.retrieveAllMessages(this.__userApiToken__)
            .then((messages) => messages)
    },

    messageRead(msgId) {
        return flareApi.messageRead(this.__userApiToken__, msgId)
        .then((messages) => messages)
    },

    messageDelete(msgId) {
        return flareApi.messageDelete(this.__userApiToken__, msgId)
        .then((messages) => messages)
    }
}

export default logic