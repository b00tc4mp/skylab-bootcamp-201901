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
        await Issue.deleteMany()
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
            name = `John`
            surname = `Smith`
            email = `email-${Math.random()}@mail.com`
            password = `123`
            profile = `admin`
            country = `PL`
        })
        describe('registerUser', ()=>{
            it('should succeed on correct data', async ()=>{
            const res = await logic.registerUser(name, surname, email, password, profile, country)

            expect(res).to.be.undefined

            const users = await User.find()

            expect(users).to.exist
            expect(users).to.have.lengthOf(1)

            const [user] = users

            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.profile).to.equal(profile)
            expect(user.country).to.equal(country)

            expect(user.password).to.exist

            expect(await argon2.verify(user.password, password)).to.be.true
            })

            it('should fail on existing user', async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})

                try{

                    await logic.registerUser(name, surname, email, password, profile, country)
                    throw Error('should not reach this point')

                }catch(err){
                    
                    expect(err.message).to.equal(`user with username \"${email}\" already exists`)
                }

            })

            it('should fail on undefined name', () => {
                const name = undefined
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `name is not optional`)
            })
            
            it('should fail on null name', () => {
                const name = null
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `name is not optional`)
            })
            
            it('should fail on empty name', () => {
                const name = ''
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'name is empty')
            })
            
            it('should fail on blank name', () => {
                const name = ' \t    \n'
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `surname is not optional`)
            })
            
            it('should fail on null surname', () => {
                const surname = null
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `surname is not optional`)
            })
            
            it('should fail on empty surname', () => {
                const surname = ''
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'surname is empty')
            })
            
            it('should fail on blank surname', () => {
                const surname = ' \t    \n'
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `email is not optional`)
            })
            
            it('should fail on null email', () => {
                const email = null
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `email is not optional`)
            })
            
            it('should fail on empty email', () => {
                const email = ''
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'email is empty')
            })
            
            it('should fail on blank email', () => {
                const email = ' \t    \n'
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on undefined password', () => {
                const password = undefined
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `password is not optional`)
            })
            
            it('should fail on null password', () => {
                const password = null
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `password is not optional`)
            })
            
            it('should fail on empty password', () => {
                const password = ''
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'password is empty')
            })
            
            it('should fail on blank password', () => {
                const password = ' \t    \n'
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'password is empty')
            })

            it('should fail on undefined profile', () => {
                const profile = undefined
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `profile is not optional`)
            })
            
            it('should fail on null profile', () => {
                const profile = null
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `profile is not optional`)
            })
            
            it('should fail on empty profile', () => {
                const profile = ''
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'profile is empty')
            })
            
            it('should fail on blank profile', () => {
                const profile = ' \t    \n'
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'profile is empty')
            })

            it('should fail on undefined country', () => {
                const country = undefined
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `country is not optional`)
            })
            
            it('should fail on null country', () => {
                const country = null
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `country is not optional`)
            })
            
            it('should fail on empty country', () => {
                const country = ''
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'country is empty')
            })
            
            it('should fail on blank country', () => {
                const country = ' \t    \n'
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'country is empty')
            })


        })
        describe('authenticateUser', ()=>{
            let user
            beforeEach(async()=>{
                user = await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
            })

            it('should succeed on correct credentials', async () => {
                const id = await logic.authenticateUser(email, password)
    
                expect(id).to.exist
                expect(id).to.be.a('string')
    
                expect(id).to.equal(user.id)
            })

            it('should fail on non existing user', async () => {
                const email= 'wrong@email.com'
                try{
                    
                    await logic.authenticateUser(email, password)
                    throw Error('should not reach this point')

                }catch(err){

                    expect(err.message).to.equal(`wrong credentials`)
                }
            })

            it('should fail on undefined email', () => {
                const email = undefined
                
                expect(() => logic.authenticateUser(email, password)).to.throw(RequirementError, `email is not optional`)
            })
            
            it('should fail on null email', () => {
                const email = null
                
                expect(() => logic.authenticateUser(email, password)).to.throw(RequirementError, `email is not optional`)
            })
            
            it('should fail on empty email', () => {
                const email = ''
                
                expect(() => logic.authenticateUser(email, password)).to.throw(ValueError, 'email is empty')
            })
            
            it('should fail on blank email', () => {
                const email = ' \t    \n'
                
                expect(() => logic.authenticateUser(email, password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on incorrect password', async () => {
                const password ='123999'
                try{
                    
                    await logic.authenticateUser(email, password)
                    throw Error('should not reach this point')

                }catch(err){

                    expect(err.message).to.equal(`wrong credentials`)
                }
            })

            it('should fail on undefined password', () => {
                const password = undefined
                
                expect(() => logic.authenticateUser(email, password)).to.throw(RequirementError, `password is not optional`)
            })
            
            it('should fail on null password', () => {
                const password = null
                
                expect(() => logic.authenticateUser(email, password)).to.throw(RequirementError, `password is not optional`)
            })
        
            it('should fail on empty password', () => {
                const password = ''
                
                expect(() => logic.authenticateUser(email, password)).to.throw(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'
                
                expect(() => logic.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'password is empty')
            })

        })
        describe('retrieveUser', ()=>{
        let user
            beforeEach(async () => user = await User.create({ name, surname, email, password: await argon2.hash(password), profile, country }))

            it('should succeed on correct id from existing user', async () => {
                const _user = await logic.retrieveUser(user.id)

                expect(_user.id).to.be.undefined
                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(surname)
                expect(_user.email).to.equal(email)
                expect(_user.password).to.be.undefined
                expect(_user.profile).to.equal(profile)
                expect(_user.country).to.equal(country)
                
            })
            it('should fail on non-existent user', async ()=>{
                const id= 'non-existent'
                try{
                    await logic.retrieveUser(id)
                }catch(err){
                    expect(err.message).to.equal('user not found')
                }
            })
            it('should fail on undefined id', () => {
                const id = undefined
                
                expect(() => logic.retrieveUser(id)).to.throw(RequirementError, `id is not optional`)
            })
            
            it('should fail on null id', () => {
                const id = null
                
                expect(() => logic.retrieveUser(id)).to.throw(RequirementError, `id is not optional`)
            })
            
            it('should fail on empty id', () => {
                const id = ''
                
                expect(() => logic.retrieveUser(id)).to.throw(ValueError, 'id is empty')
            })
            
            it('should fail on blank id', () => {
                const id = ' \t    \n'
                
                expect(() => logic.retrieveUser(id)).to.throw(ValueError, 'id is empty')
            })

        })
        describe('updateUser',()=>{
            let user, id
            beforeEach(async()=>{
                user = await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                id = await logic.authenticateUser(email, password)
            })
            it.only('should succeed on correct data', async ()=>{
                const name='Lila'
                await logic.updateUser(id, name)
                
            })
        })
        describe('deleteUser',()=>{
            let user, id
            beforeEach(async()=>{
                user = await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                id = await logic.authenticateUser(email, password)
            })
            it('shoul succeed on correct data', async ()=> {
                const res= await logic.deleteUser(id)
                expect(res).to.be.undefined
                const collection = await User.estimatedDocumentCount()
                expect(collection).is.equal(0)
            })
            it('should fail on non-existent user', async ()=>{
                const id= 'non-existent'
                try{
                    await logic.deleteUser(id)
                }catch(err){
                    expect(err.message).to.equal('user not found')
                }
            })
            it('should fail on undefined id', () => {
                const id = undefined
                
                expect(() => logic.deleteUser(id)).to.throw(RequirementError, `id is not optional`)
            })
            
            it('should fail on null id', () => {
                const id = null
                
                expect(() => logic.deleteUser(id)).to.throw(RequirementError, `id is not optional`)
            })
            
            it('should fail on empty id', () => {
                const id = ''
                
                expect(() => logic.deleteUser(id)).to.throw(ValueError, 'id is empty')
            })
            
            it('should fail on blank id', () => {
                const id = ' \t    \n'
                
                expect(() => logic.deleteUser(id)).to.throw(ValueError, 'id is empty')
            })

        })
    })

    after(() => mongoose.disconnect())

})