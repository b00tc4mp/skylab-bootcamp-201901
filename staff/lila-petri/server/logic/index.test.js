const dotenv = require ('dotenv')
const mongoose = require ('mongoose')
const models = require ('../data/models')
const { expect } = require ('chai') 
const logic = require('.')
const { TimeoutError, ConnectionError, ValueError, RequirementError }= require('../common/errors')
const jiraApi = require ('../data/jira-api')


dotenv.config()

const { Issues } = models;
const { env: { MONGO_URL_LOGIC_TEST: url } } = process

describe('logic', ()=>{
    before(()=> mongoose.connect(url, {useNewUrlParser:true}))
    beforeEach(async()=>{
        await Issues.deleteMany()
    })
    describe('load jira', ()=>{
        const month= 'May'
        it('should succeed on correct data', async ()=>{
            const res= await logic.loadJirasByMonth(month)
            expect(res).to.be.undefined
            const issues= await Issues.find()
            expect(issues).to.exist
        })
        it('should succeed on correct data loading more tha one month', async ()=>{
            const monthBefore= 'April'
            await logic.loadJirasByMonth(monthBefore)
            await logic.loadJirasByMonth(month)
            const issues= await Issues.find()
            expect(issues).to.exist
        })
        it('should fail on undefined month', () => {
            const month = undefined
            
            expect(() => logic.loadJirasByMonth(month)).to.throw(RequirementError, `month is not optional`)
        })
        
        it('should fail on null month', () => {
            const month = null
            
            expect(() => logic.loadJirasByMonth(month)).to.throw(RequirementError, `month is not optional`)
        })
        
        it('should fail on empty month', () => {
            const month = ''
            
            expect(() => logic.loadJirasByMonth(month)).to.throw(ValueError, 'month is empty')
        })
        
        it('should fail on blank month', () => {
            const month = ' \t    \n'
            
            expect(() => logic.loadJirasByMonth(month)).to.throw(ValueError, 'month is empty')
        })
    })
    describe('calculate overdue',()=>{
        const month='May'
        beforeEach(async()=>{
            await logic.loadJirasByMonth(month)
        })
        it('shoul succeed on correct data', async ()=>{
            await logic.calculateOverdue()
            const issues= await Issues.find()
            expect(issues).to.exist


        })
    })
    describe('clean collection', ()=>{
        const month='May'
        beforeEach(async()=>{
            await logic.loadJirasByMonth(month)
        })
        it('should clean issues collection', async ()=>{
            await logic.clearUp()
            const collection = await Issues.estimatedDocumentCount()
            expect(collection).is.equal(0)
        })
    })

    after(() => mongoose.disconnect())

})