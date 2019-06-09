import validate from 'pg-validate'
import { RequirementError, ValueError, LogicError, HttpError } from 'pg-errors'
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

    registerUser(name, email, password) {

        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const res = await pgApi.registerUser(name, email, password)            
            const {err} = res                
        })()
    },

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

    retrieveUser() {

        return pgApi.retrieveUser(this.__userToken__)

        .then(response => {
            const { error } = response

            if (error) throw new LogicError(error)

            return response
        })
    },

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

    updatePublicThing(id, status) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'status', value: status, type: 'number'}
        ])
        return (async () => { 

        return await pgApi.updatePublicThing(this.__userToken__, id, status)      
        })()
            
    },

    searchByCategory(category) {
        validate.arguments([
           
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])

        return (async () =>{
            return await pgApi.searchByCategory(this.__userToken__, category)             
        })()           
    },

    searchByLocation(location) {
        validate.arguments([
           
            { name: 'location', value: location, type: 'string', notEmpty: true }
        ])

        return (async () =>{
            return await pgApi.searchByLocation(this.__userToken__, location)             
        })()           
    },

    retrivePrivateThings() {
        
        return (async () =>{
            
            return await pgApi.retrivePrivateThings(this.__userToken__)                          
        })()           
    },

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
