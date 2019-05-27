const dotenv = require ('dotenv')
const moment =require ('moment')
const mongoose = require ('mongoose')
const models = require ('../data/models')
const { expect } = require ('chai') 
const logic = require('.')
const argon2 = require('argon2')
const { TimeoutError, ConnectionError, ValueError, RequirementError }= require('../common/errors')

dotenv.config()

const { Issue, User } = models;
const { env: { MONGO_URL_LOGIC_TEST: url } } = process

describe('logic', ()=>{
    before(()=> mongoose.connect(url, {useNewUrlParser:true}))
    beforeEach(async()=>{
        //await Issue.deleteMany()
        //await User.deleteMany()
    })
    describe('load jira', ()=>{
        const month= 'May'
        it('should succeed on correct data', async ()=>{
            const res= await logic.loadJirasByMonth(month)
            expect(res).to.be.undefined
            const issues= await Issue.find()
            expect(issues).to.exist
        })
        it('should succeed on correct data loading more tha one month', async ()=>{
            const monthBefore= 'April'
            await logic.loadJirasByMonth(monthBefore)
            await logic.loadJirasByMonth(month)
            const issues= await Issue.find()
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
            const issues= await Issue.find()
            expect(issues).to.exist


        })
    })
    describe('clean collection issue', ()=>{
        const month='May'
        beforeEach(async()=>{
            await logic.loadJirasByMonth(month)
        })
        it('should clean issues collection', async ()=>{
            await logic.clearUp()
            const collection = await Issue.estimatedDocumentCount()
            expect(collection).is.equal(0)
        })
    })
    describe('static method', ()=>{
        const month='May'
        beforeEach(async()=>{
            await logic.loadJirasByMonth(month)
        })
        it('should succeed on correct data', async ()=>{
            let statDate= moment('2019-05-24')
            let endDate= moment('2019-05-27')
            const issuesByCountryByDate= await Issue.findIssuesByCountryAndDate('BugFix', 'IT', statDate, endDate)
            expect(issuesByCountryByDate[0].issueType).is.equal('BugFix')
            expect(issuesByCountryByDate[0].country).is.equal('IT')
            expect(issuesByCountryByDate[0].createdDate).to.be.within(statDate.toDate(),endDate.toDate())
        })
    })
    describe('user',()=>{
        let name, surname, email, password, profile, country
        beforeEach(()=>{
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `password-${Math.random()}`
            profile = `profile-${Math.random()}`
            country = `country-${Math.random()}`
        })
        describe('registerUser', ()=>{
            it.only('should succeed on correct data', async ()=>{
            const res = await logic.registerUser(name, surname, email, password, profile, country)

            expect(res).to.be.undefined

            const users = await User.find()

            expect(users).to.exist
            expect(users).to.have.lengthOf(1)

            const [user] = users

            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)

            expect(user.password).to.exist

            expect(await argon2.verify(user.password, password)).to.be.true
            })

        })
    })

    after(() => mongoose.disconnect())

})