const validate = require('../../common/validate')
const call = require('../../common/call')

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
                Authorization: `Basic cWFAZG9jdG9yYWxpYS5jb206WW9Rb0NsWU1Na1BhcTRySGo3TVQwNjc5`,
                'Content-Type': 'application/json'
            },
            data: { 
                'jql': `project = DOC AND issuetype in (Bug, BugFix, HotFix, Request) AND created >= ${startDate} AND created <= ${endDate} order by created DESC`
            }
        })
    }
}

module.exports = jiraApi