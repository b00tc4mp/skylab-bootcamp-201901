const call = require('dashboard-call')
const validate = require('dashboard-validate')

// const dotenv = require ('dotenv')
require('dotenv').config()
const { env: { JIRA_TOKEN: token } } = process

const jiraApi = {
    __url__: 'https://docplanner.atlassian.net/rest/api/3/search',
    

    searchIssues(startDate, endDate) {
        
        validate.arguments([
            { name: 'startDate', value: startDate, type: 'string', notEmpty: true},
            { name: 'endDate', value: endDate, type: 'string', notEmpty: true }
        ])
        
        return call(`${this.__url__}`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${token}`,
                'Content-Type': 'application/json'
            },
            data: { 
                'jql': `project = DOC AND issuetype in (Bug, BugFix, HotFix, Request) AND created >= ${startDate} AND created <= ${endDate} AND duedate!=null order by created DESC`
            }
        })
    }
}

module.exports = jiraApi