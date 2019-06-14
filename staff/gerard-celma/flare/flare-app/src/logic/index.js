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
        .then((id) => id)
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

    /**
     * Logs user out.
     */
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

    /**
     * Logs in the user by its credentials.
     * 
     * @param {string} name
     * @param {string} surname
     * @param {string} email  
     */
    updateUser(name, surname, email) {
        validate([{ key: 'name', value: name, type: String }, { key: 'surname', value: surname, type: String }, { key: 'email', value: email, type: String }])

        return flareApi.updateUser(this.__userApiToken__, name, surname, email)
            .then(user => user)
    },

    /**
     * Retrieves a user.
     */
    retrieveUser() {
        return flareApi.retrieveUser(this.__userApiToken__)
            .then(user => user)
    },

    /**
     * Retrieves all users.
     */
    retrieveUsers() {
        return flareApi.retrieveUsers(this.__userApiToken__)
            .then(users => users)
    },

    /**
     * Updates message photo.
     * 
     * @param {File} data
     * @param {string} msgId
     */
    uploadMessagePhoto(data, msgId) {
        validate([{ key: 'data', value: data, type: File }, { key: 'msgId', value: msgId, type: String }])

        return flareApi.uploadMessagePhoto(this.__userApiToken__, data, msgId)
            .then(({user}) => user)
    },

    /**
     * Updates user photo.
     * 
     * @param {File} data
     */
    updateUserPhoto(data) {
        validate([{ key: 'data', value: data, type: File }])

        return flareApi.updateUserPhoto(this.__userApiToken__, data)
            .then(({user}) => user)
    },

    /**
     * Creates message.
     * 
     * @param {string} userIdTo
     * @param {string} launchDate
     * @param {array} position
     * @param {string} text
     */
    createMessage(userIdTo, launchDate, position, text) {
        validate([{ key: 'userIdTo', value: userIdTo, type: String }, { key: 'launchDate', value: launchDate, type: String }, { key: 'position', value: position, type: Array }, { key: 'text', value: text, type: String }])

        let actualDate = new Date().toJSON().slice(0, 10)
        if (launchDate < actualDate) throw Error('You cannot select a past date')

        return flareApi.createMessage(this.__userApiToken__, userIdTo, launchDate, position, text)
            .then(message => message)
    },

    /**
     * Retrieves received messages.
     */
    retrieveReceivedMessages() {
        return flareApi.retrieveReceivedMessages(this.__userApiToken__)
            .then((messages) => messages)
    },

    /**
     * Retrieves sent messages.
     */
    retrieveSentMessages() {
        return flareApi.retrieveSentMessages(this.__userApiToken__)
            .then((messages) => messages)
    },

    /**
     * Retrieves all messages.
     */
    retrieveAllMessages() {
        return flareApi.retrieveAllMessages(this.__userApiToken__)
            .then((messages) => messages)
    },

    /**
     * Marks message as read.
     * 
     * @param {string} msgId
     */
    messageRead(msgId) {
        validate([{ key: 'msgId', value: msgId, type: String }])

        return flareApi.messageRead(this.__userApiToken__, msgId)
        .then((messages) => messages)
    },

    /**
     * Deletes messages.
     * 
     * @param {string} msgId
     */
    messageDelete(msgId) {
        validate([{ key: 'msgId', value: msgId, type: String }])
        
        return flareApi.messageDelete(this.__userApiToken__, msgId)
        .then((messages) => messages)
    }
}

export default logic