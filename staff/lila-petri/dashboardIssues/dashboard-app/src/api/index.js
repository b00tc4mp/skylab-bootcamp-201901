
const validate = require ('dashboard-validate')
const call = require ('dashboard-call')
const dotenv = require('dotenv')
dotenv.config()

//const { env: { URL_SERVER: url } } = process
const port = process.env.REACT_APP_APP_PORT

const restApi = {
    __url__: `http://localhost:${port}/api`,

    registerUser(name, surname, email, password, profile, country){
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true},
            { name: 'surname', value: surname, type: 'string', notEmpty: true},
            { name: 'email', value: email, type: 'string', notEmpty: true},
            { name: 'password', value: password, type: 'string', notEmpty: true},
            { name: 'profile', value: profile, type: 'string', notEmpty: true},
            { name: 'country', value: country, type: 'string', notEmpty: true},
        ])

        validate.email(email)
        
        return call(`${this.__url__}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { name, surname, email, password, profile, country }
        })

    },
    authenticateUser(email, password){
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true},
            { name: 'password', value: password, type: 'string', notEmpty: true}
        ])

        validate.email(email)

        return call(`${this.__url__}/users/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { email, password }
        })

    },
    retrieveUser(token){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true}
        ])
        return call(`${this.__url__}/users`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },
    updateUser(token, name, surname, country){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true},
            { name: 'name', value: name, type: 'string', optional: true},
            { name: 'surname', value: surname, type: 'string', optional: true},
            { name: 'country', value: country, type: 'string', optional: true}
        ])
        return call(`${this.__url__}/users`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: { name, surname, country }
        })
    },
    deleteUser(token){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true}
        ])
        return call(`${this.__url__}/users`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })

    },
    loadJirasByMonth(token, month){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true},
            { name: 'month', value: month, type: 'string', notEmpty: true}
        ])
        return call(`${this.__url__}/issues/load?month=${month}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
        })
    },
    saveIssues(token){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true}
        ])
        return call(`${this.__url__}/issues/save`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
        })
    },
    calculateOverdue(token){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true}
        ])
        
        return call(`${this.__url__}/issues/overdue`, {
            method: 'PUT',
            headers: {Authorization: `Bearer ${token}`}
        })
    },
    clearUp(token){
        
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true}
        ])
        
        return call(`${this.__url__}/issues/cleanup`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` }
        })
    },
    clearUpBuffer(token){
        
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true}
        ])
        
        return call(`${this.__url__}/issues/cleanupbuffer`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` }
        })
    },
    retrieveIssuesByResolution(token, issueType, country, startDate, endDate){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true},
            { name: 'issueType', value: issueType, type: 'string', notEmpty: true},
            { name: 'country', value: country, type: 'string', notEmpty: true},
            { name: 'startDate', value: startDate, type: 'string', notEmpty: true},
            { name: 'endDate', value: endDate, type: 'string', notEmpty: true}
        ])
        return call(`${this.__url__}/issues/resolution?issueType=${issueType}&country=${country}&startDate=${startDate}&endDate=${endDate}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
    },
    retrieveIssuesBySLA(token, issueType, country, startDate, endDate){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true},
            { name: 'issueType', value: issueType, type: 'string', notEmpty: true},
            { name: 'country', value: country, type: 'string', notEmpty: true},
            { name: 'startDate', value: startDate, type: 'string', notEmpty: true},
            { name: 'endDate', value: endDate, type: 'string', notEmpty: true}
        ])
        return call(`${this.__url__}/issues/sla?issueType=${issueType}&country=${country}&startDate=${startDate}&endDate=${endDate}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
    },
    retrieveIssuesByTable(token, country, startDate, endDate){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true},
            { name: 'country', value: country, type: 'string', notEmpty: true},
            { name: 'startDate', value: startDate, type: 'string', notEmpty: true},
            { name: 'endDate', value: endDate, type: 'string', notEmpty: true}
        ])
        return call(`${this.__url__}/issues/table?country=${country}&startDate=${startDate}&endDate=${endDate}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })
    }

}
module.exports = restApi