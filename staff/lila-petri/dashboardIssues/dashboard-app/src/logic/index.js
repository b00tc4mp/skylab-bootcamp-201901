const { LogicError, RequirementError, ValueError, FormatError } = require ('dashboard-errors')
const restApi = require('../api')
const validate = require('dashboard-validate')
const normalize = require('dashboard-normalize')

const logic = {

    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

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
    retrieveUser() {
        return(async()=>{
            try{
                const response = await restApi.retrieveUser(this.__userToken__)
                return response
            }catch(error){

                throw new LogicError(error)
            }

        })()

    },

    logoutUser() {
        sessionStorage.clear()
    },

    updateUser(name, surname, country){
        validate.arguments([
            { name: 'name', value: name, type: 'string', optional: true },
            { name: 'surname', value: surname, type: 'string', optional: true },
            { name: 'country', value: country, type: 'string', optional: true }
        ])
        return(async ()=>{
            try{
                await restApi.updateUser(this.__userToken__, name, surname, country)
            }catch(error){
                throw new LogicError(error)
            }
        })()
    },
    removeUser() {

        return (async () => {
            try {

                await restApi.deleteUser(this.__userToken__)

            } catch (error) {

                throw new LogicError(error)

            }
        })()
    },
    loadJirasByMonth(month){
        validate.arguments([
            { name: 'month', value: month, type: 'string', notEmpty: true}
        ])
        return(async()=>{
            try{
                await restApi.loadJirasByMonth(this.__userToken__, month)
            }catch(error){
                throw new LogicError(error)
            }
        })()
    },
    calculateOverdue(){
        return(async()=>{
            try{
                await restApi.calculateOverdue(this.__userToken__)
            }catch(error){
                throw new LogicError(error)
            }
        })()
    },
    clearUp(){
        return(async()=>{
            try{
                await restApi.clearUp(this.__userToken__)
            }catch(error){
                throw new LogicError(error)
            }

        })()
    },
    retrieveIssuesByResolution(issueType, country, startDate, endDate){
        validate.arguments([
            { name: 'issueType', value: issueType, type: 'string', notEmpty: true },
            { name: 'country', value: country, type: 'string', notEmpty: true },
            { name: 'startDate', value: startDate, type: 'string', notEmpty: true },
            { name: 'endDate', value: endDate, type: 'string', notEmpty: true }
        ])
        return(async()=>{
            try{
                const response = await restApi.retrieveIssuesByResolution(this.__userToken__, issueType, country, startDate, endDate)
                return response
            }catch(error){
                throw new LogicError(error)
            }
        })()

    },
    retrieveIssuesBySLA(issueType, country, startDate, endDate){
        validate.arguments([
            { name: 'issueType', value: issueType, type: 'string', notEmpty: true },
            { name: 'country', value: country, type: 'string', notEmpty: true },
            { name: 'startDate', value: startDate, type: 'string', notEmpty: true },
            { name: 'endDate', value: endDate, type: 'string', notEmpty: true }
        ])
        return(async()=>{
            try{
                const response = await restApi.retrieveIssuesBySLA(this.__userToken__, issueType, country, startDate, endDate)
                return response
            }catch(error){
                throw new LogicError(error)
            }
        })()
    },
    retrieveIssuesByTable(country, startDate, endDate){
        validate.arguments([
            { name: 'country', value: country, type: 'string', notEmpty: true },
            { name: 'startDate', value: startDate, type: 'string', notEmpty: true },
            { name: 'endDate', value: endDate, type: 'string', notEmpty: true }
        ])
        return(async()=>{
            try{
                const response = await restApi.retrieveIssuesByTable(this.__userToken__, country, startDate, endDate)
                return response
            }catch(error){
                throw new LogicError(error)
            }
        })()
    }



}

module.exports= logic