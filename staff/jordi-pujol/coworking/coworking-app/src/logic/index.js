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
    registerUser(name, surname, userName, email, password, passwordConfirm) {

        validate([{ key: 'name', value: name, type: String },
        { key: 'surname', value: surname, type: String },
        { key: 'userName', value: userName, type: String },
        { key: 'email', value: email, type: String },
        { key: 'password', value: password, type: String },
        { key: 'passwordConfirm', value: passwordConfirm, type: String }])

        if (password !== passwordConfirm) throw Error('passwords do not match')

        return coworkingApi.registerUser(name, surname, userName, email, password, passwordConfirm)
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

    /**
     * Retrieves user
     */
    retrieveUser() {
        return coworkingApi.retrieveUser(this.__coworkingApiToken__)
    },

    /**
     * Retrieves user profile by userName
     * 
     * @param {string} userName 
     */
    retrieveUserProfile(userName) {
        validate([{ key: 'userName', value: userName, type: String }])

        return coworkingApi.retrieveUserProfile(this.__coworkingApiToken__, userName)
    },

    /**
     * Updates user
     * 
     * @param  {Object} data 
     */
    updateUser(...data) {

        return coworkingApi.updateUser(this.__coworkingApiToken__, data)
    },

    /**
     * Removes user
     * 
     * @param {string} email 
     * @param {string} password 
     */
    removeUser(email, password) {
        validate([{ key: 'email', value: email, type: String },
        { key: 'password', value: password, type: String }])

        return coworkingApi.removeUser(this.__coworkingApiToken__, email, password)
    },

    /**
     * Retrieves user created services
     */
    retrieveUserServices() {

        return coworkingApi.retrieveUserServices(this.__coworkingApiToken__)
    },

    /**
     * Retrieves services where user has submit
     */
    retrieveUserSubmitedServices() {

        return coworkingApi.retrieveUserSubmitedServices(this.__coworkingApiToken__)
    },

    /**
     * Creates a workspace once user has registerd
     * 
     * @param {string} name 
     */
    createWorkspace(name) {
        validate([{ key: 'name', value: name, type: String }])

        return coworkingApi.createWorkspace(name, this.__coworkingApiToken__)
            .then((id) => id)
    },

    /**
     * Creates an invitation for new users to add into a workspace
     */
    createNewUserLink() {

        return coworkingApi.createNewUserLink(this.__coworkingApiToken__)
    },

    /**
     * Verifies link exists and if success then deletes it
     * 
     * @param {string} link 
     */
    verifyNewUserLink(link) {
        validate([{ key: 'link', value: link, type: String }])

        return coworkingApi.verifyNewUserLink(this.__coworkingApiToken__, link)
    },

    /**
     * Adds a user into a workspace
     * 
     * @param {string} workspaceId 
     */
    addUserToWorkspace(workspaceId) {
        validate([{ key: 'workspaceId', value: workspaceId, type: String }])

        return coworkingApi.addUserToWorkspace(this.__coworkingApiToken__, workspaceId)
    },

    /**
     * Creates a new service
     * 
     * @param {string} title 
     * @param {string} description 
     * @param {number} maxUsers 
     * @param {string} place 
     * @param {number} time 
     */
    createService(title, description, maxUsers, place, time) {
        validate([{ key: 'title', value: title, type: String },
        { key: 'description', value: description, type: String },
        { key: 'maxUsers', value: maxUsers, type: Number },
        { key: 'place', value: place, type: String },
        { key: 'time', value: time, type: Number }])

        return coworkingApi.createService(this.__coworkingApiToken__, title, description, maxUsers, place, time)
    },

    /**
     * Retrieves all services from a workspace
     * 
     * @param {string} workspaceId 
     */
    retrieveWorkspaceServices(workspaceId) {
        validate([{ key: 'workspaceId', value: workspaceId, type: String }])

        return coworkingApi.retrieveWorkspaceServices(this.__coworkingApiToken__, workspaceId)
    },

    /**
     * Search services by title
     * 
     * @param {string} query 
     */
    searchServices(query) {
        validate([{ key: 'query', value: query, type: String }])

        return coworkingApi.searchServices(this.__coworkingApiToken__, query)
    },

    /**
     * Retrieves a service by Id
     * 
     * @param {string} serviceId 
     */
    retrieveService(serviceId) {
        validate([{ key: 'serviceId', value: serviceId, type: String }])

        return coworkingApi.retrieveService(this.__coworkingApiToken__, serviceId)
    },

    /**
     * Submit a user to a service.
     * 
     * @param {string} serviceId 
     */
    addUserToService(serviceId) {
        validate([{ key: 'serviceId', value: serviceId, type: String }])

        return coworkingApi.addUserToService(this.__coworkingApiToken__, serviceId)
    },

    /**
     * Close a service
     * 
     * @param {string} serviceId 
     */
    closeService(serviceId) {
        validate([{ key: 'serviceId', value: serviceId, type: String }])

        return coworkingApi.closeService(this.__coworkingApiToken__, serviceId)
    },

    /**
     * Creates a comment in a service
     * 
     * @param {string} serviceId 
     * @param {string} text 
     */
    createComment(serviceId, text) {
        validate([{ key: 'serviceId', value: serviceId, type: String },
        { key: 'text', value: text, type: String }])

        return coworkingApi.createComment(this.__coworkingApiToken__, serviceId, text)
    },

    /**
     * Retrieve all service comments
     * 
     * @param {string} serviceId 
     */
    retrieveWorkspaceComments(serviceId) {
        validate([{ key: 'serviceId', value: serviceId, type: String }])

        return coworkingApi.retrieveWorkspaceComments(this.__coworkingApiToken__, serviceId)
    },

    /**
     * Removes an own comment
     * 
     * @param {string} serviceId 
     * @param {string} commentId 
     */
    removeComment(serviceId, commentId) {
        validate([{ key: 'serviceId', value: serviceId, type: String },
        { key: 'commentId', value: commentId, type: String }])

        return coworkingApi.removeComment(this.__coworkingApiToken__, serviceId, commentId)
    },

    /**
     * Updates a user profile photo
     * 
     * @param {File} image 
     */
    updateUserPhoto(image) {

        return coworkingApi.updateUserPhoto(this.__coworkingApiToken__, image)
            .then(({ user }) => user)
    },
}
export default logic