import skylabInnApi from '../skylab-inn-api'
import validate from 'skylab-inn-validation'

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

        validate([{ key: 'name', value: name, type: String }, { key: 'surname', value: surname, type: String }, { key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }, { key: 'passwordConfirm', value: passwordConfirm, type: String }])

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

        validate([{ key: 'email', value: email, type: String }, { key: 'password', value: password, type: String }])

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

        validate([{ key: 'data', value: data, type: Object }])

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

        validate([{ key: 'query', value: query, type: String }])

        return skylabInnApi.searchSkylaber(this.__userApiToken__, query)
            .then(({user}) =>user)
    },

    /**
     * Advance search for a skylaber.
     * 
     * @param {Array} param
     * 
     * @throws {TypeError} - if param is not an array.
     * @throws {Error} - if param is empty.
     *
     * @returns {Object} - skylabers matching the query.  
     */
    adSearchSkylaber(param) {

        validate([{ key: 'param', value: param, type: Array }])

        return skylabInnApi.adSearchSkylaber(this.__userApiToken__, param)
            .then(({user}) =>  user)
    },

    /**
     * Retrieves a skylaber.
     * 
     * @param {String} skylaberId 
     * 
     * @throws {TypeError} - if skylaberId is not a string.
     * @throws {Error} - if any skylaberId is empty.
     *
     * @returns {Object} - skylaber matching the skylaberId.  
     */
    retrieveSkylaber(skylaberId) {

        validate([{ key: 'skylaberId', value: skylaberId, type: String }])

        return skylabInnApi.retrieveSkylaber(this.__userApiToken__, skylaberId)
        .then(({user}) => user)
    },

     /**
     * Add information to a user.
     * 
     * @param {String} type 
     * @param {Object} data 
     * 
     * @throws {TypeError} - if type is not a string or data is not an object.
     * @throws {Error} - if any param is empty.
     *
     * @returns {String} - added work id.  
     */
    addUserInformation(type, data) {
        
        validate([{ key: 'type', value: type, type: String }, { key: 'data', value: data, type: Object }])

        return skylabInnApi.addUserInformation(this.__userApiToken__, type, data)
            .then(({id}) => id)
    },

    /**
     * Update information from a user.
     * 
     * @param {String} infoId
     * @param {String} type  
     * @param {Object} data 
     * 
     * @throws {TypeError} - if infoId or type are not a string or data is not an object.
     * @throws {Error} - if any param is empty.
     *
     * @returns {String} - updated work id.  
     */
    updateUserInformation(infoId, type, data) {

        validate([{ key: 'infoId', value: infoId, type: String }, { key: 'type', value: type, type: String }, { key: 'data', value: data, type: Object }])

        return skylabInnApi.updateUserInformation(this.__userApiToken__, infoId, type, data)
            .then(({id}) => id)
    },

    /**
     * Remove information from a user.
     * 
     * @param {String} infoId 
     * @param {String} type 
     * 
     * @throws {TypeError} - if any param is not a string.
     * @throws {Error} - if any param is empty.
     *
     * @returns {Promise} resolves or rejects.   
     */
    removeUserInformation(infoId, type) {

        validate([{ key: 'infoId', value: infoId, type: String }, { key: 'type', value: type, type: String }])

        return skylabInnApi.removeUserInformation(this.__userApiToken__, infoId, type)
            .then(({id}) => id)
    },

    /**
     * Adds a skylaber to the whitelist.
     * 
     * @param {Object} data
     * 
     * @throws {TypeError} - if data is not an object.
     * @throws {Error} - if data is empty.
     *
     * @returns {Promise} resolves or rejects.  
     */
    addSkylaber(data) {

        validate([{ key: 'data', value: data, type: Object }])

        return skylabInnApi.addSkylaber(this.__userApiToken__, data)
            .then(({id}) => id)
    },

    /**
     * Retrieve whitelist skylabers with pending status.
     *
     * @returns {Object} - users pending sign up.   
     */
    retrievePendingSkylabers() {
        return skylabInnApi.retrievePendingSkylabers(this.__userApiToken__)
            .then(({preUsers}) => preUsers)
    },

    /**
     * Updates a user.
     * 
     * @param {Blob} image 
     * 
     * @throws {TypeError} - if image is not an blob.
     * @throws {Error} - if image is empty.
     *
     * @returns {Object} - user.  
     */
    updateUserPhoto(image) {

        validate([{ key: 'image', value: image, type: Blob }])

        return skylabInnApi.updateUserPhoto(this.__userApiToken__, image)
            .then(({user}) => user)
    },

    /**
     * Retrieve skylabers with unverified emails.
     *
     * @returns {Object} - users with unverified emails.   
     */
    retrieveUnverifiedEmails() {
        return skylabInnApi.retrieveUnverifiedEmails(this.__userApiToken__)
            .then(({unverified}) => unverified)
    },

    /**
     * Create a hashed url with skylaberIds.
     * 
     * @param {Array} skylaberIds
     * 
     * @throws {TypeError} - if skylaberIds is not an array.
     * @throws {Error} - if skylaberIds is empty.
     *
     * @returns {String} - hashed url with skylabers ids.  
     */
    shareResults(skylaberIds) {

        validate([{ key: 'skylaberIds', value: skylaberIds, type: Array }])

        return skylabInnApi.shareResults(this.__userApiToken__, skylaberIds)
            .then(({hashedUrl}) =>  hashedUrl)
    },

    /**
     * Retrieve encrypted skylabers.
     * 
     * @param {String} encryptedIds 
     * 
     * @throws {TypeError} - if any encryptedIds is not a string.
     * @throws {Error} - if any encryptedIds is empty.
     *
     * @returns {Array} - list of skylabers.  
     */
    retrieveEncryptedIds(encryptedIds) {

        validate([{ key: 'encryptedIds', value: encryptedIds, type: String }])

        return skylabInnApi.retrieveEncryptedIds(encryptedIds)
            .then(({skylabers}) => skylabers)
    },
    
}

export default logic