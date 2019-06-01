const { LogicError, RequirementError, ValueError, FormatError } = require ('dashboard-errors')
const restApi = require('../api')
const validate = require('dashboard-validate')

const logic = {

    // set __userToken__(token) {
    //     sessionStorage.userToken = token
    // },

    // get __userToken__() {
    //     return normalize.undefinedOrNull(sessionStorage.userToken)
    // },

    get isUserLoggedIn() {
        return !!this.__userToken__
    },

    registerUser(name, surname, email, password, profile, country) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'profile', value: profile, type: 'string', notEmpty: true },
            { name: 'country', value: country, type: 'string', notEmpty: true }

        ])

        validate.email(email)
        debugger
        return(async()=>{
            try{

                await restApi.registerUser(name, surname, email, password, profile, country)
                
            }catch(error){
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
        return (async()=>{
            try{
                const response = await restApi.authenticateUser(email, password)
                this.__userToken__ = response.token
                debugger

            }catch(error){
                throw new LogicError(error)
            }
        })()
    },


}

module.exports= logic