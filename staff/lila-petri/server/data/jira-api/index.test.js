const jiraApi = require('.')
const { expect } = require('chai')
const { TimeoutError, ConnectionError, ValueError, RequirementError }= require('../../common/errors')

const startDate='2019-04-01'
const endDate='2019-04-02'

describe('jira api', () => {
    describe('search issues', () => {
        it('should succeed on correct data', async () => {
            const jiras = await jiraApi.searchIssues(startDate, endDate)
            expect(jiras).to.exist
            const { total, issues }= jiras
            expect(issues).to.have.lengthOf(total)
        })
    })

    it('should fail on undefined startDate', () => {
        const startDate = undefined

        expect(() => jiraApi.searchIssues(startDate, endDate)).to.throw(RequirementError, `startDate is not optional`)
    })

    it('should fail on null startDate', () => {
        const startDate = null

        expect(() => jiraApi.searchIssues(startDate, endDate)).to.throw(RequirementError, `startDate is not optional`)
    })

    it('should fail on empty startDate', () => {
        const startDate = ''

        expect(() => jiraApi.searchIssues(startDate, endDate)).to.throw(ValueError, 'startDate is empty')
    })

    it('should fail on blank startDate', () => {
        const startDate = ' \t    \n'

        expect(() => jiraApi.searchIssues(startDate, endDate)).to.throw(ValueError, 'startDate is empty')
    })
    it('should fail on undefined endDate', () => {
        const endDate = undefined

        expect(() => jiraApi.searchIssues(startDate, endDate)).to.throw(RequirementError, `endDate is not optional`)
    })

    it('should fail on null endDate', () => {
        const endDate = null

        expect(() => jiraApi.searchIssues(startDate, endDate)).to.throw(RequirementError, `endDate is not optional`)
    })

    it('should fail on empty startDate', () => {
        const endDate = ''

        expect(() => jiraApi.searchIssues(startDate, endDate)).to.throw(ValueError, 'endDate is empty')
    })

    it('should fail on blank startDate', () => {
        const endDate = ' \t    \n'

        expect(() => jiraApi.searchIssues(startDate, endDate)).to.throw(ValueError, 'endDate is empty')
    })
})