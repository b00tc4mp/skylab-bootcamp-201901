import validate from 'pg-validate'
import call from 'pg-call'

const pgApi = {

    __url__: 'https://salty-ridge-23134.herokuapp.com/api',
    // __url__: ' http://localhost:8080/api',
    __timeout__: 0,

/**
 * * Register user
 * 
 * @param {string} name 
 * @param {string } email 
 * @param {string} password 
 * 
 */

    registerUser(name, email, password) {

        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)
        
        return call(`${this.__url__}/users`, {
            
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: {name, email, password},
            timeout: this.__timeout__
        })
        
    },

      /**
     * Verify if it is the correct user
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {string} user id
     * 
     */

    authenticateUser(email, password) {

        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)        

        return call(`${this.__url__}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: {email, password},
            timeout: this.__timeout__
        })
        
        // con axios no es necesario
        // .then(res => res)
    },

    /**
     * Returns some information of user
     * 
     * @param {*} id user
     * 
     * @returns {object} userid, name, email
     * 
     */

    retrieveUser(token) {

        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            
        ])

        return call(`${this.__url__}/users`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${token}`}
        })
        // con axios no es necesario
        // .then(res => res.json())
    },

    /**
     * Add an item to container
     * 
     * @param {object} buffer 
     * @param {string} category 
     * @param {string} description 
     * @param {string} userId 
     * @param {string} locId 
     * 
     */

    addPublicThing(formData, token) {

        validate.arguments([
            { name: 'formData', value: formData, type: 'object', optional: false },          
            { name: 'token', value: token, type: 'string', notEmpty: true },            
        ])

        return call(`${this.__url__}/things`, {
            method: 'POST',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'},
            body: formData,
            timeout: this.__timeout__
        })
    },

    /**
     * Update if the item is or not in the container
     * 
     * @param {*} userId 
     * @param {*} id 
     * @param {*} status 
     * 
     */

    updatePublicThing(token, id, status) {

        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'status', value: status, type: 'number'}
        ])

        return call(`${this.__url__}//things/update/${id}`, {
            method: 'PATCH',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'},
            body: ({id, status}),
            timeout: this.__timeout__
        })
    },

    /**
     * Seach all the items by category
     * 
     * @param {*} userId 
     * @param {*} category 
     * 
     * @returns {array} for each item returns: status, image, category, description, location, address 
     * 
     */

    searchByCategory(token, category) {

        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/search/category/${category}`, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'},
            timeout: this.__timeout__
        })
    },

    /**
     * Seach all the items by location
     * 
     * @param {*} location 
     * 
     * @returns {array} for each item returns: status, image, category, description, location, address 
     * 
     */

    searchByLocation(token, location) {

        validate.arguments([           
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'location', value: location, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/search/locations/${location}`, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'},
            timeout: this.__timeout__
        })
    },

    /**
     * Retrieve all the items's user
     * 
     * @param {*} userId 
     * 
     * @returns {array} for each item returns: image, category, description, location
     * 
     */

    retrivePrivateThings(token) { 
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ]) 

        return call(`${this.__url__}/search/user/things`, {
            headers: { Authorization: `Bearer ${token}`},           
            timeout: this.__timeout__
        })
    },

    /**
     * Retrieve all the information on an item
     * 
     * @param {*} thingId 
     * 
     * @returns {array} image, category, description, location, address 
     */
    
    retrieveThing(token, thingId) {
        
        validate.arguments([          
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'thingId', value: thingId, type: 'string', notEmpty: true },
        ])

        return call(`${this.__url__}/thing/${thingId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'},
            timeout: this.__timeout__
        })
    }
}

export default pgApi