const { LogicError } = require ('dashboard-errors')
const restApi = require('../api')
const validate = require('dashboard-validate')
const normalize = require('dashboard-normalize')

const logic = {

    /**
     * Saves the token on sessionStorage
     */
    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    /**
     * Gets the token from sessionStorage
     */
    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    /**
     * Returns true or false depending if the user is logged in or not
     */
    get isUserLoggedIn() {
        return !!this.__userToken__
    },

    /**
     * Creates a new unique user with a specific profile
     * @param {string} name of new user
     * @param {string} surname of new user
     * @param {string} email (unique) with valid format
     * @param {string} password of new user
     * @param {string} profile can be product-expert or admin
     * @param {string} country where the user belongs
     */
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
        
        return(async()=>{
            try{

                await restApi.registerUser(name, surname, email, password, profile, country)
                
            }catch(error){
                throw new LogicError('error in user registration')
            }
        })()
    },

    /**
     * Logged in an existent user
     * @param {string} email registered (unique)
     * @param {string} password registered
     */
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
                

            }catch(error){
                throw new LogicError('wrong credentials')
            }
        })()
    },

    /**
     * Retrieve informatio from an existent user
     * 
     * @returns name, surname, email, country and profile form the user
     */
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

    /**
     * Logout a logged in user
     */
    logoutUser() {
        sessionStorage.clear()
    },

    /**
     * Allows to update some information from the user 
     * @param {string} name to update
     * @param {string} surname to update
     * @param {string} country to update
     */
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

    /**
     * Allows to delete a register user
     */
    removeUser() {
        return (async () => {
            try {

                await restApi.deleteUser(this.__userToken__)

            } catch (error) {

                throw new LogicError(error)

            }
        })()
    },

    /**
     * It makes a request to Jira (on an specific project) to retrieve all the issues from the specific month,
     * and save them on the buffer collection
     * @param {string} month to retrieve a speficit month
     * 
     */
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

    /**
     * It copies the buffer collection to issues collection 
     */
    saveIssues(){
        return(async()=>{
            try{
                await restApi.saveIssues(this.__userToken__)
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

    /**
     * Cleanup buffer collection
     */
    clearUpBuffer(){
        return(async()=>{
            try{
                await restApi.clearUpBuffer(this.__userToken__)
            }catch(error){
                throw new LogicError(error)
            }

        })()
    },

    /**
     * Retrieves all issues of the same type and specific country, by resolution, of a range of dates
     * @param {string} issueType type of issues (HotFix, BugFix, Bug, Request)
     * @param {string} country to to consult
     * @param {string} startDate date from 
     * @param {string} endDate date to
     */
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

    /**
     * Retrieves all issues of the same type and specific country, by SLA (Services Level Agreement), of a range of dates
     * @param {string} issueType type of issues (HotFix, BugFix, Bug, Request)
     * @param {string} country to to consult
     * @param {string} startDate date from 
     * @param {string} endDate date to
     */
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

    /**
     * Retrieves a summary by country of issues order by issues type by SLA
     * @param {string} country to to consult
     * @param {string} startDate date form
     * @param {string} endDate date to
     */
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

export default logic