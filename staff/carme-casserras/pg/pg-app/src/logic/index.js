import validate from 'pg-validate'
import { LogicError} from 'pg-errors'
import normalize from 'pg-normalize'
import pgApi from '../data'

const logic = {
    
    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        return !!(this.__userToken__) 
    },

    /**
     * Register user
     * 
     * @param {string} name 
     * @param {string} email 
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
        

        return (async () => {
            try{
                
                return await pgApi.registerUser(name, email, password)    
                
            } catch (err) {
                
                throw Error(err.message)
            }           
        })()
    },

    /**
     * Verify if it is the correct user
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {string} user id
     */

    loginUser(email, password) {

        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)
        
        return pgApi.authenticateUser(email, password) 
            .then(({ token }) => {
                this.__userToken__ = token
            })
            .catch(err => {
                throw new LogicError(err.message)
            })          
    },

     /**
     * Returns some information of user
     * 
     * @param {*} id user
     * 
     * @returns {object} userid, name, email
     * 
     */

    retrieveUser() {

        return pgApi.retrieveUser(this.__userToken__)

        .then(response => {
            const { error } = response

            if (error) throw new LogicError(error)

            return response
        })
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

    addPublicThings(image, category, description, locId) {
        validate.arguments([
            { name: 'image', value: image, type: 'object', optional: false },
            { name: 'category', value: category, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'locId', value: locId, type: 'string', notEmpty: true },
        ])

        const formData = new window.FormData()

        formData.append('image', image)
        formData.append('category', category)
        formData.append('description', description)
        formData.append('locId', locId)

        return (async () => {      
               
        return await pgApi.addPublicThing(formData, this.__userToken__)      
                               
        })()
    },

    /**
     * Update if the item is or not in the container
     * 
     * @param {*} userId 
     * @param {*} id 
     * @param {*} status 
     * 
     */

    updatePublicThing(id, status) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'status', value: status, type: 'number'}
        ])
        return (async () => { 

        return await pgApi.updatePublicThing(this.__userToken__, id, status)      
        })()
            
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

    searchByCategory(category) {
        validate.arguments([
           
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])

        return (async () =>{
            return await pgApi.searchByCategory(this.__userToken__, category)             
        })()           
    },

    /**
     * Seach all the items by location
     * 
     * @param {*} location 
     * 
     * @returns {array} for each item returns: status, image, category, description, location, address 
     * 
     */

    searchByLocation(location) {
        validate.arguments([
           
            { name: 'location', value: location, type: 'string', notEmpty: true }
        ])

        return (async () =>{
            return await pgApi.searchByLocation(this.__userToken__, location)             
        })()           
    },

    /**
     * Retrieve all the items's user
     * 
     * @param {*} userId 
     * 
     * @returns {array} for each item returns: image, category, description, location
     * 
     */

    retrivePrivateThings() {
        
        return (async () =>{
            
            return await pgApi.retrivePrivateThings(this.__userToken__)                          
        })()           
    },

    /**
     * Retrieve all the information on an item
     * 
     * @param {*} thingId 
     * 
     * @returns {array} image, category, description, location, address 
     */
    
    retrieveThing(thingId) {
        validate.arguments([          
            { name: 'thingId', value: thingId, type: 'string', notEmpty: true },
        ])

        return (async () =>{

            return await pgApi.retrieveThing(this.__userToken__, thingId)             
        })()    
    }
}

export default logic
