//const normalize = require('../utils/normalize')
import normalize from '../utils/normalize'
const validate = require('photopin-validate')
const { LogicError } = require('photopin-errors')
const photopinApi = require('../photopin-api')


const logic = {

    __userToken__ : null,

    // set __userToken__(token) {
    //     sessionStorage.userToken = token
    // },

    // get __userToken__() {
    //     return normalize.undefinedOrNull(sessionStorage.userToken)
    // },

    get isUserLoggedIn() {
        return !!this.__userToken__
    },

    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            try {
            
                await photopinApi.registerUser(name, surname, email, password )
            
            } catch (error) {
            
                throw new LogicError(error)
            
            }
        })()  
    },

    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            try {
            
                const token = await photopinApi.authenticateUser(email, password)
                
                this.__userToken__ = token

            } catch (error) {
            
                throw new LogicError(error)
            
            }
        })()
    },

    logoutUser() {
        sessionStorage.clear()
    },

    retrieveUser() {

        return (async () => {
            try {
            
                return await photopinApi.retrieve(this.__userToken__) 
                
            } catch (error) {
            
                throw new LogicError(error)
            
            }
        })()
    },


    updateUser( data) {
    //updateUser(name, surname, email, password) {
        // validate.arguments([
        //     { name: 'name', value: name, type: 'string', notEmpty: true },
        //     { name: 'surname', value: surname, type: 'string', notEmpty: true },
        //     { name: 'email', value: email, type: 'string', notEmpty: true },
        //     { name: 'password', value: password, type: 'string', notEmpty: true }
        // ])
        //validate.email(email)
        
        validate.arguments([
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return (async () => {
            try {
            
                await photopinApi.updateUser(this.__userToken__, data)
            
            } catch (error) {
            
                throw new LogicError(error)
            
            }
        })()
    },

    removeUser() {
        
        return (async () => {
            try {
            
                await photopinApi.removeUser(this.__userToken__)
            
            } catch (error) {
            
                throw new LogicError(error)
            
            }
        })()
    }
    


}

//module.exports = logic
export default logic