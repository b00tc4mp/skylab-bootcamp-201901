const {models:{Issue, User}, mongoose} = require ('dashboard-data')
const { expect } = require ('chai') 
const argon2 = require ('argon2')
const {  ValueError, RequirementError } = require('dashboard-errors')
const restApi = require('.')
const dotenv = require ('dotenv')
const moment = require ('moment')
const helper = require ('./helper')
const momentRandom = require('moment-random')

dotenv.config()

//const { env: { MONGO_URL_LOGIC_TEST: url } } = process
const url = 'mongodb://localhost/dashboard-api-client'

describe('rest api', ()=>{
    let email
    const name = `John`
    const surname = `Smith`
    const password = `123`
    const profile = `admin`
    const  country = `PL`
    before(()=> mongoose.connect(url, {useNewUrlParser:true}))
    beforeEach(async()=>{
        await Issue.deleteMany()
        await User.deleteMany()
        email = `email-${Math.random()}@mail.com`
    })
    describe('users', ()=>{
        describe('register', ()=>{

            it('should succeed on correct data', async ()=>{
                
                const res = await restApi.registerUser(name, surname, email, password, profile, country)

                expect(res.message).to.equal('Ok, user registered.')

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
                
                try{
                    await User.create({name, surname, email, password: await argon2.hash(password), profile, country})           
                    await restApi.registerUser(name, surname, email, password, profile, country)
                    throw Error('should not reach this point')

                }catch(error){
                    expect(error).to.exist
                }

            })

            it('should fail on undefined name', () => {
                const name = undefined
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `name is not optional`)
            })
            
            it('should fail on null name', () => {
                const name = null
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `name is not optional`)
            })
            
            it('should fail on empty name', () => {
                const name = ''
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'name is empty')
            })
            
            it('should fail on blank name', () => {
                const name = ' \t    \n'
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `surname is not optional`)
            })
            
            it('should fail on null surname', () => {
                const surname = null
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `surname is not optional`)
            })
            
            it('should fail on empty surname', () => {
                const surname = ''
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'surname is empty')
            })
            
            it('should fail on blank surname', () => {
                const surname = ' \t    \n'
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `email is not optional`)
            })
            
            it('should fail on null email', () => {
                const email = null
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `email is not optional`)
            })
            
            it('should fail on empty email', () => {
                const email = ''
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'email is empty')
            })
            
            it('should fail on blank email', () => {
                const email = ' \t    \n'
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on undefined password', () => {
                const password = undefined
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `password is not optional`)
            })
            
            it('should fail on null password', () => {
                const password = null
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `password is not optional`)
            })
            
            it('should fail on empty password', () => {
                const password = ''
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'password is empty')
            })
            
            it('should fail on blank password', () => {
                const password = ' \t    \n'
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'password is empty')
            })

            it('should fail on undefined profile', () => {
                const profile = undefined
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `profile is not optional`)
            })
            
            it('should fail on null profile', () => {
                const profile = null
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `profile is not optional`)
            })
            
            it('should fail on empty profile', () => {
                const profile = ''
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'profile is empty')
            })
            
            it('should fail on blank profile', () => {
                const profile = ' \t    \n'
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'profile is empty')
            })

            it('should fail on undefined country', () => {
                const country = undefined
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `country is not optional`)
            })
            
            it('should fail on null country', () => {
                const country = null
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(RequirementError, `country is not optional`)
            })
            
            it('should fail on empty country', () => {
                const country = ''
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'country is empty')
            })
            
            it('should fail on blank country', () => {
                const country = ' \t    \n'
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'country is empty')
            })
        })
        describe('authenticate user', ()=>{
            let user
            beforeEach(async()=>{
                user = await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
            })
            it('should succeed on correct credentials', async () => {
                const response = await restApi.authenticateUser(email, password)
    
                expect(response).to.exist
                expect(response.token).to.be.a('string')
            })

            it('should fail on non existing user', async () => {
                const email= 'wrong@email.com'
                try{
                    
                    await restApi.authenticateUser(email, password)
                    throw Error('should not reach this point')

                }catch(error){

                    expect(error).to.exist
                }
            })

            it('should fail on undefined email', () => {
                const email = undefined
                
                expect(() => restApi.authenticateUser(email, password)).to.throw(RequirementError, `email is not optional`)
            })
            
            it('should fail on null email', () => {
                const email = null
                
                expect(() => restApi.authenticateUser(email, password)).to.throw(RequirementError, `email is not optional`)
            })
            
            it('should fail on empty email', () => {
                const email = ''
                
                expect(() => restApi.authenticateUser(email, password)).to.throw(ValueError, 'email is empty')
            })
            
            it('should fail on blank email', () => {
                const email = ' \t    \n'
                
                expect(() => restApi.authenticateUser(email, password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on incorrect password', async () => {
                const password ='123999'
                try{
                    
                    await restApi.authenticateUser(email, password)
                    throw Error('should not reach this point')

                }catch(error){

                    expect(error).to.exist
                }
            })

            it('should fail on undefined password', () => {
                const password = undefined
                
                expect(() => restApi.authenticateUser(email, password)).to.throw(RequirementError, `password is not optional`)
            })
            
            it('should fail on null password', () => {
                const password = null
                
                expect(() => restApi.authenticateUser(email, password)).to.throw(RequirementError, `password is not optional`)
            })
        
            it('should fail on empty password', () => {
                const password = ''
                
                expect(() => restApi.authenticateUser(email, password)).to.throw(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'
                
                expect(() => restApi.registerUser(name, surname, email, password, profile, country)).to.throw(ValueError, 'password is empty')
            })


        })
        describe('retrieve user', ()=>{
            let token
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token               
            })
            it('should succeed on correct id from existing user', async ()=>{
                
                const _user= await restApi.retrieveUser(token)
                
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
                    await restApi.retrieveUser(token)
                    throw Error('should not reach this point')
                }catch(error){
                    expect(error).to.exist
                }
            })
            it('should fail on undefined token', () => {
                const token = undefined
                
                expect(() => restApi.retrieveUser(token)).to.throw(RequirementError, `token is not optional`)
            })
            
            it('should fail on null token', () => {
                const token = null
                
                expect(() => restApi.retrieveUser(token)).to.throw(RequirementError, `token is not optional`)
            })
            
            it('should fail on empty token', () => {
                const token = ''
                
                expect(() => restApi.retrieveUser(token)).to.throw(ValueError, 'token is empty')
            })
            
            it('should fail on blank token', () => {
                const token = ' \t    \n'
                
                expect(() => restApi.retrieveUser(token)).to.throw(ValueError, 'token is empty')
            })
        })
        describe('update user', ()=>{
            let token
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token               
            })
            it('should succeed on correct data', async ()=>{
                const name='Updated'
                const surname='Surname'
                const country = 'AR'
                await restApi.updateUser(token, name, surname, country)
                const updatedUser= await User.findOne({email})
                expect(updatedUser.name).to.equal(name)
                expect(updatedUser.surname).to.equal(surname)
                expect(updatedUser.country).to.equal(country) 
            })
            it('should fail on non-existent user', async ()=>{
                const id = 'non-existent'
                try{
                    await restApi.updateUser(token, name, surname, country)
                    throw Error('should not reach this point')
                }catch(error){

                    expect(error).to.exist

                }
            })
            it('should fail on undefined token', () => {
                const token = undefined
                
                expect(() => restApi.updateUser(token, name, surname, country)).to.throw(RequirementError, `token is not optional`)
            })
            
            it('should fail on null token', () => {
                const token = null
                
                expect(() => restApi.updateUser(token, name, surname, country)).to.throw(RequirementError, `token is not optional`)
            })
            
            it('should fail on empty token', () => {
                const token = ''
                
                expect(() => restApi.updateUser(token, name, surname, country)).to.throw(ValueError, 'token is empty')
            })
            
            it('should fail on blank token', () => {
                const token = ' \t    \n'
                
                expect(() => restApi.updateUser(token, name, surname, country)).to.throw(ValueError, 'token is empty')
            })

        })
        describe('delete user', ()=> {
            let token
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token               
            })
            it('shoul succeed on correct data', async ()=> {
                await restApi.deleteUser(token)
                const collection = await User.estimatedDocumentCount()
                expect(collection).is.equal(0)
            })
            it('should fail on non-existent user', async ()=>{
                await User.deleteMany()
                try{
                    await restApi.deleteUser(restApi)
                }catch(error){
                    expect(error).to.exist
                }
            })
            it('should fail on undefined token', () => {
                const token = undefined
                
                expect(() => restApi.deleteUser(token)).to.throw(RequirementError, `token is not optional`)
            })
            
            it('should fail on null token', () => {
                const token = null
                
                expect(() => restApi.deleteUser(token)).to.throw(RequirementError, `token is not optional`)
            })
            
            it('should fail on empty token', () => {
                const token = ''
                
                expect(() => restApi.deleteUser(token)).to.throw(ValueError, 'token is empty')
            })
            
            it('should fail on blank token', () => {
                const token = ' \t    \n'
                
                expect(() => restApi.deleteUser(token)).to.throw(ValueError, 'token is empty')
            })
                
        })
    })
    describe('issues', ()=>{

        describe('load issues by month', function(){
            this.timeout(3000000)
            let token, month='May'
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token               
            })
            it('should succeed on correct data', async ()=>{
                await restApi.loadJirasByMonth(token, month)
                
                const issues= await Issue.find()
                expect(issues).to.exist
            })
            it('should succeed on correct data loading more tha one month', async ()=>{
                const monthBefore= 'April'
                await restApi.loadJirasByMonth(token, monthBefore)
                await restApi.loadJirasByMonth(token, month)
                const issues= await Issue.find()
                expect(issues).to.exist
            })
            it('should fail on inexistent token', async ()=>{
                const token='5cefc8d029db9f0ba2664b16'
                try{
                    await restApi.loadJirasByMonth(token, month)
                    throw Error('should not reach this point')
    
                }catch(error){
                    expect(error).to.exist
                }
            })

            it('should fail on null month', () => {
                const month = null
                
                expect(() => restApi.loadJirasByMonth(token, month)).to.throw(RequirementError, `month is not optional`)
            })
            
            it('should fail on empty month', () => {
                const month = ''
                
                expect(() => restApi.loadJirasByMonth(token, month)).to.throw(ValueError, 'month is empty')
            })
            
            it('should fail on blank month', () => {
                const month = ' \t    \n'
                
                expect(() => restApi.loadJirasByMonth(token, month)).to.throw(ValueError, 'month is empty')
            })
    
            it('should fail on undefined token', () => {
                const token = undefined
                
                expect(() => restApi.loadJirasByMonth(token, month)).to.throw(RequirementError, `token is not optional`)
            })
    
            it('should fail on null token', () => {
                const token = null
                
                expect(() => restApi.loadJirasByMonth(token, month)).to.throw(RequirementError, `token is not optional`)
            })
    
            it('should fail on empty token', () => {
                const token = ''
                
                expect(() => restApi.loadJirasByMonth(token, month)).to.throw(ValueError, 'token is empty')
            })
    
            it('should fail on blank token', () => {
                const token = ' \t    \n'
                
                expect(() => restApi.loadJirasByMonth(token, month)).to.throw(ValueError, 'token is empty')
            })

        })
        describe.only('calculate overdue', ()=>{
            let token, month='May'
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token    
                let _month= moment().month(month)
                let start = moment(_month).startOf('month').format('YYYY-MM-DD')
                let end =moment(_month).endOf('month').format('YYYY-MM-DD') 
                let days = helper.diffBetweenDates(start,end)
                let countries=['ES', 'PL', 'CO', 'MX', 'TR']
                let issueType = ['HotFix', 'BugFix', 'Bug', 'Request']
                let status = ['To Do', 'Done', 'Validation']
                let resolution = ["Won't Fix", 'Done', 'Is not a bug']
                let due 
                due = moment(start).add(1, 'days').format('YYYY-MM-DD')
                debugger
                for (let i=0; i<days; i++){
                    await Issue.create({
                                key: `DOC-${i}`, 
                                issueType: helper.randomHelper(issueType),
                                country: helper.randomHelper(countries),
                                createdDate: start, 
                                dueDate : due,
                                status: helper.randomHelper(status),
                                resolutionType: helper.randomHelper(resolution),
                                resolutionDate: momentRandom(end, start).format('YYYY-MM-DD')
                            })
                            start=moment(start).add(1, 'days').format('YYYY-MM-DD')
                            due=moment(due).add(1, 'days').format('YYYY-MM-DD')
                }
    
            })
            it('algo', ()=>{
                expect(true).to.be.true
            })

        })
    })
    after(() => mongoose.disconnect())
})
