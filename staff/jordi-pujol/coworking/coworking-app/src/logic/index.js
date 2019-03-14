'use strict'

import coworkingApi from '../coworking-api'
import validate from 'coworking-validation'

/**
 * Abstraction of business logic.
 */
const logic = {
    __coworkingApiToken__: null,
    __isAdmin__: null,

    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser(name, surname, email, password, passwordConfirm) {

        validate([{ key: 'name', value: name, type: String },
        { key: 'surname', value: surname, type: String },
        { key: 'email', value: email, type: String },
        { key: 'password', value: password, type: String },
        { key: 'passwordConfirm', value: passwordConfirm, type: String }])

        if (password !== passwordConfirm) throw Error('passwords do not match')

        return coworkingApi.registerUser(name, surname, email, password, passwordConfirm)
            .then(() => { })
    },

    /**
     * Logs in the user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    logInUser(email, password) {

        validate([{ key: 'email', value: email, type: String },
        { key: 'password', value: password, type: String }])

        return coworkingApi.authenticateUser(email, password)
            .then(({ token, isAdmin }) => {
                this.__coworkingApiToken__ = token
                this.__isAdmin__ = isAdmin.toString()

                return token
            })
    },

    /**
     * Checks user is logged in.
     */
    get isUserLoggedIn() {
        return !!this.__coworkingApiToken__
    },

    /**
 * Checks user is logged in.
 */
    get isUserAdmin() {
        return this.__isAdmin__ === 'true'
    },

    /**
     * Logs out the user.
     */
    logOutUser() {
        this.__coworkingApiToken__ = null
        this.__isAdmin__ = null
    },
    retrieveUser() {
        return coworkingApi.retrieveUser(this.__coworkingApiToken__)
    },

    updateUser (...data) {
        return coworkingApi.updateUser(this.__coworkingApiToken__, data)
    },

    removeUser(email, password) {
        validate([{ key: 'email', value: email, type: String },
        { key: 'password', value: password, type: String }])

        return coworkingApi.removeUser(this.__coworkingApiToken__, email, password)
    },

    retrieveUserServices() {

        return coworkingApi.retrieveUserServices(this.__coworkingApiToken__)
    },

    retrieveUserSubmitedServices() {

        return coworkingApi.retrieveUserSubmitedServices(this.__coworkingApiToken__)
    },

    createWorkspace(name, userId) {
        validate([{ key: 'name', value: name, type: String },
        { key: 'userId', value: userId, type: String }])

        return coworkingApi.createWorkspace(name, userId)
            .then((id) => id)
    },

    createNewUserLink() {

        return coworkingApi.createNewUserLink(this.__coworkingApiToken__)
    },

    verifyNewUserLink(link) {
        validate([{ key: 'link', value: link, type: String }])

        return coworkingApi.verifyNewUserLink(this.__coworkingApiToken__, link)
    },

    addUserToWorkspace(workspaceId) {
        validate([{ key: 'workspaceId', value: workspaceId, type: String }])

        return coworkingApi.addUserToWorkspace(this.__coworkingApiToken__, workspaceId)
    },

    createService(title, description, maxUsers, place, time) {
        validate([{ key: 'title', value: title, type: String },
        { key: 'description', value: description, type: String },
        { key: 'maxUsers', value: maxUsers, type: Number },
        { key: 'place', value: place, type: String },
        { key: 'time', value: time, type: Number }])

        return coworkingApi.createService(this.__coworkingApiToken__, title, description, maxUsers, place, time)
    },

    retrieveWorkspaceServices(workspaceId) {
        validate([{ key: 'workspaceId', value: workspaceId, type: String }])

        return coworkingApi.retrieveWorkspaceServices(this.__coworkingApiToken__, workspaceId)
    },

    retrieveService(serviceId) {
        validate([{ key: 'serviceId', value: serviceId, type: String }])

        return coworkingApi.retrieveService(this.__coworkingApiToken__, serviceId)
    },

    addUserToService(serviceId) {
        validate([{ key: 'serviceId', value: serviceId, type: String }])

        return coworkingApi.addUserToService(this.__coworkingApiToken__, serviceId)
    },

    closeService(serviceId) {
        validate([{ key: 'serviceId', value: serviceId, type: String }])

        return coworkingApi.closeService(this.__coworkingApiToken__, serviceId)
    },

    createComment(serviceId, text) {
        validate([{ key: 'serviceId', value: serviceId, type: String },
        { key: 'text', value: text, type: String }])

        return coworkingApi.createComment(this.__coworkingApiToken__, serviceId, text)
    },

    retrieveWorkspaceComments(serviceId) {
        validate([{ key: 'serviceId', value: serviceId, type: String }])

        return coworkingApi.retrieveWorkspaceComments(this.__coworkingApiToken__, serviceId)
    },

    removeComment(serviceId, commentId) {
        validate([{ key: 'serviceId', value: serviceId, type: String },
        { key: 'commentId', value: commentId, type: String }])

        return coworkingApi.removeComment(this.__coworkingApiToken__, serviceId, commentId)
    }
}
export default logic