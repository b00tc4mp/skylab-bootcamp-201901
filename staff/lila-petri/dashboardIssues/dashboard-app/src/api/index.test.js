const {models:{Issue, User}, mongoose} = require ('dashboard-data')
const { expect } = require ('chai') 
const argon2 = require ('argon2')
const {  ValueError, RequirementError } = require('dashboard-errors')
const restApi = require('.')
const dotenv = require ('dotenv')
const helper = require ('./helper')


dotenv.config()

//const { env: { MONGO_URL_LOGIC_TEST: url } } = process
const url = 'mongodb://localhost/dashboard-client-side-test'


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
                
                expect(() => restApi.authenticateUser(email, password)).to.throw(ValueError, 'password is empty')
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
        describe('calculate overdue', ()=>{
            let token, month='May'
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token    
                await helper.loadDataBase(month)
    
            })
            it('shoul succeed on correct data', async ()=>{

                await restApi.calculateOverdue(token)
                const issues= await Issue.find()
                issues.forEach(issue=> {
                    expect(issue).to.have.property('overdue');
                })
                
            })
            it('should fail on incorrect format token', async ()=>{
                const token='LL'
                try{
                    await restApi.calculateOverdue(token)
                    throw Error('should not reach this point')
    
                }catch(error){
                    expect(error).to.exist
                }
            })
            it('should fail on inexistent token', async ()=>{
                await User.deleteMany()
                try{
                    await restApi.calculateOverdue(token)
                    throw Error('should not reach this point')
    
                }catch(error){
                    expect(error).to.exist
                }
            })
            it('should fail on undefined token', () => {
                const token = undefined
                
                expect(() => restApi.calculateOverdue(token)).to.throw(RequirementError, `token is not optional`)
            })
            
            it('should fail on null token', () => {
                const token = null
                
                expect(() => restApi.calculateOverdue(token)).to.throw(RequirementError, `token is not optional`)
            })
            
            it('should fail on empty token', () => {
                const token = ''
                
                expect(() => restApi.calculateOverdue(token)).to.throw(ValueError, 'token is empty')
            })
            
            it('should fail on blank token', () => {
                const token = ' \t    \n'
            
                expect(() => restApi.calculateOverdue(token)).to.throw(ValueError, 'token is empty')
            })

        })
        describe('clean issues', ()=>{
            let token, month='May'
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token    
                await helper.loadDataBase(month)
            })
            it('should clean issues collection', async ()=>{
                await restApi.clearUp(token)
                const collection = await Issue.estimatedDocumentCount()
                expect(collection).is.equal(0)
            })
            it('should fail on incorrect format token', async ()=>{
                const token='LL'
                try{
                    await restApi.clearUp(token)
                    throw Error('should not reach this point')
    
                }catch(error){
                    expect(error).to.exist
                }
            })
            it('should fail on inexistent token', async ()=>{
                await User.deleteMany()
                try{
                    await restApi.clearUp(token)
                    throw Error('should not reach this point')
    
                }catch(error){
                    expect(error).to.exist
                }
            })
            it('should fail on undefined token', () => {
                const token = undefined
                
                expect(() => restApi.clearUp(token)).to.throw(RequirementError, `token is not optional`)
            })
    
            it('should fail on null token', () => {
                const token = null
                
                expect(() => restApi.clearUp(token)).to.throw(RequirementError, `token is not optional`)
            })
    
            it('should fail on empty token', () => {
                const token = ''
                
                expect(() => restApi.clearUp(token)).to.throw(ValueError, 'token is empty')
            })
    
            it('should fail on blank token', () => {
                const token = ' \t    \n'
                
                expect(() => restApi.clearUp(token)).to.throw(ValueError, 'token is empty')
            })

        })
        describe('issues by resolution',()=>{
            let token, month='May'
            const startDate = '2019-05-01'
            const endDate = '2019-05-29'
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token    
                await helper.loadDataBase(month)
            })
            it('should sucdeed on correct data', async ()=>{
                
                const response= await restApi.retrieveIssuesByResolution(token,'BugFix', 'PL', startDate, endDate)
                expect(response).to.exist

                let queryA= {$and:[{issueType: 'BugFix'},{country: 'PL'}, { createdDate: { $gte: startDate} }, { createdDate: { $lte: endDate} }, { resolutionType: 'Cannot Reproduce' }]}
                let _issuesCanNotR = await Issue.find(queryA)
                expect(response['Cannot Reproduce']).to.equal(_issuesCanNotR.length)

                let queryB= {$and:[{issueType: 'BugFix'},{country: 'PL'}, { createdDate: { $gte: startDate} }, { createdDate: { $lte: endDate} }, { resolutionType: 'Done' }]}
                let _issuesDone = await Issue.find(queryB)
                expect(response['Done']).to.equal(_issuesDone.length)


                let queryC= {$and:[{issueType: 'BugFix'},{country: 'PL'}, { createdDate: { $gte: startDate} }, { createdDate: { $lte: endDate} }, { resolutionType: 'Duplicate' }]}
                let _issuesDuplicate = await Issue.find(queryC)
                expect(response['Duplicate']).to.equal(_issuesDuplicate.length)

                let queryD= {$and:[{issueType: 'BugFix'},{country: 'PL'}, { createdDate: { $gte: startDate} }, { createdDate: { $lte: endDate} }, { resolutionType: 'Incomplete' }]}
                let _issuesIncomplete = await Issue.find(queryD)
                expect(response['Incomplete']).to.equal(_issuesIncomplete.length)

                let queryE= {$and:[{issueType: 'BugFix'},{country: 'PL'}, { createdDate: { $gte: startDate} }, { createdDate: { $lte: endDate} }, { resolutionType: 'Is not a Bug' }]}
                let _issuesIsNot = await Issue.find(queryE)
                expect(response['Is not a Bug']).to.equal(_issuesIsNot.length)

                let queryF= {$and:[{issueType: 'BugFix'},{country: 'PL'}, { createdDate: { $gte: startDate} }, { createdDate: { $lte: endDate} }, { resolutionType: "Won't Fix" }]}
                let _issuesWontFix = await Issue.find(queryF)
                expect(response['Won\'t Fix']).to.equal(_issuesWontFix.length)

            })
            it('should fail on incorrect range of date', async ()=>{
                const startDate = '2019-05-02'
                const endDate = '2019-05-01'
                try{
                    await restApi.retrieveIssuesByResolution(token,'Request', 'IT', startDate, endDate)
                    throw Error('should not reach this point')
                }catch(error){
                    expect(error).to.exist
                }
            })
            it('should fail on null issueType', () => {
                const issueType = null
                
                expect(() => restApi.retrieveIssuesByResolution(token, issueType, 'IT', startDate, endDate)).to.throw(RequirementError, `issueType is not optional`)
            })
            
            it('should fail on empty issueType', () => {
                const issueType = ''
                
                expect(() => restApi.retrieveIssuesByResolution(token, issueType, 'IT', startDate, endDate)).to.throw(ValueError, 'issueType is empty')
            })
            
            it('should fail on blank issueType', () => {
                const issueType = ' \t    \n'
                
                expect(() => restApi.retrieveIssuesByResolution(token, issueType, 'IT', startDate, endDate)).to.throw(ValueError, 'issueType is empty')
            })
    
            it('should fail on undefined country', () => {
                const country = undefined
                
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', country , startDate, endDate)).to.throw(RequirementError, `country is not optional`)
            })
            
            it('should fail on null issueType', () => {
                const country = null
                
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', country , startDate, endDate)).to.throw(RequirementError, `country is not optional`)
            })
            
            it('should fail on empty country', () => {
                const country = ''
                
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', country , startDate, endDate)).to.throw(ValueError, 'country is empty')
            })
            
            it('should fail on blank country', () => {
                const country = ' \t    \n'
                
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', country , startDate, endDate)).to.throw(ValueError, 'country is empty')
            })
    
            it('should fail on undefined startDate', () => {
                const startDate = undefined
                
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', 'IT' , startDate, endDate)).to.throw(RequirementError, `startDate is not optional`)
            })
            
            it('should fail on null startDate', () => {
                const startDate = null
                
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', 'IT' , startDate, endDate)).to.throw(RequirementError, `startDate is not optional`)
            })
            
            it('should fail on empty startDate', () => {
                const startDate = ''
                
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', 'IT' , startDate, endDate)).to.throw(ValueError, 'startDate is empty')
            })
            
            it('should fail on blank startDate', () => {
                const startDate = ' \t    \n'
                
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', 'IT' , startDate, endDate)).to.throw(ValueError, 'startDate is empty')
            })
    
            it('should fail on undefined endDate', () => {
                const endDate = undefined
                
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', 'IT' , startDate, endDate)).to.throw(RequirementError, `endDate is not optional`)
            })
            
            it('should fail on null endDate', () => {
                const endDate = null
                
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', 'IT' , startDate, endDate)).to.throw(RequirementError, `endDate is not optional`)
            })
            
            it('should fail on empty endDate', () => {
                const endDate = ''
                
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', 'IT' , startDate, endDate)).to.throw(ValueError, 'endDate is empty')
            })
            
            it('should fail on blank endDate', () => {
                const endDate = ' \t    \n'
                
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', 'IT' , startDate, endDate)).to.throw(ValueError, 'endDate is empty')
            })

            it('should fail on undefined token', () => {
                const token = undefined
                
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', 'IT' , startDate, endDate)).to.throw(RequirementError, `token is not optional`)
            })
            
            it('should fail on null token', () => {
                const token = null
                
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', 'IT' , startDate, endDate)).to.throw(RequirementError, `token is not optional`)
            })
            
            it('should fail on empty token', () => {
                const token = ''
                
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', 'IT' , startDate, endDate)).to.throw(ValueError, 'token is empty')
            })
            
            it('should fail on blank token', () => {
                const token = ' \t    \n'
            
                expect(() => restApi.retrieveIssuesByResolution(token,'Request', 'IT' , startDate, endDate)).to.throw(ValueError, 'token is empty')
            })


        })
        describe('issues by SLA', ()=>{
            let token, month='May'
            const startDate = '2019-05-01'
            const endDate = '2019-05-28'
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token    
                await helper.loadDataBase(month)
                await helper.setOverdue()
            })
            it('should succeed on correct data', async ()=>{
                const response = await restApi.retrieveIssuesBySLA(token, 'Bug', 'IT', startDate, endDate)
                expect(response).to.exist
                response.forEach(e=> {
                    expect(e).to.have.property('created')
                    expect(e).to.have.property('overdue')
                    expect(e).to.have.property('ontime')
                    expect(e).to.have.property('total')
                })

            })
            it('should fail on null issueType', () => {
                const issueType = null
                
                expect(() => restApi.retrieveIssuesBySLA(token, issueType, 'IT', startDate, endDate)).to.throw(RequirementError, `issueType is not optional`)
            })
            
            it('should fail on empty issueType', () => {
                const issueType = ''
                
                expect(() => restApi.retrieveIssuesBySLA(token, issueType, 'IT', startDate, endDate)).to.throw(ValueError, 'issueType is empty')
            })
            
            it('should fail on blank issueType', () => {
                const issueType = ' \t    \n'
                
                expect(() => restApi.retrieveIssuesBySLA(token, issueType, 'IT', startDate, endDate)).to.throw(ValueError, 'issueType is empty')
            })
    
            it('should fail on undefined country', () => {
                const country = undefined
                
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', country , startDate, endDate)).to.throw(RequirementError, `country is not optional`)
            })
            
            it('should fail on null issueType', () => {
                const country = null
                
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', country , startDate, endDate)).to.throw(RequirementError, `country is not optional`)
            })
            
            it('should fail on empty country', () => {
                const country = ''
                
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', country , startDate, endDate)).to.throw(ValueError, 'country is empty')
            })
            
            it('should fail on blank country', () => {
                const country = ' \t    \n'
                
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', country , startDate, endDate)).to.throw(ValueError, 'country is empty')
            })
    
            it('should fail on undefined startDate', () => {
                const startDate = undefined
                
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', 'MX' , startDate, endDate)).to.throw(RequirementError, `startDate is not optional`)
            })
            
            it('should fail on null startDate', () => {
                const startDate = null
                
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', 'MX' , startDate, endDate)).to.throw(RequirementError, `startDate is not optional`)
            })
            
            it('should fail on empty startDate', () => {
                const startDate = ''
                
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', 'MX' , startDate, endDate)).to.throw(ValueError, 'startDate is empty')
            })
            
            it('should fail on blank startDate', () => {
                const startDate = ' \t    \n'
                
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', 'MX' , startDate, endDate)).to.throw(ValueError, 'startDate is empty')
            })
    
            it('should fail on undefined endDate', () => {
                const endDate = undefined
                
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', 'MX' , startDate, endDate)).to.throw(RequirementError, `endDate is not optional`)
            })
            
            it('should fail on null endDate', () => {
                const endDate = null
                
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', 'MX' , startDate, endDate)).to.throw(RequirementError, `endDate is not optional`)
            })
            
            it('should fail on empty endDate', () => {
                const endDate = ''
                
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', 'MX' , startDate, endDate)).to.throw(ValueError, 'endDate is empty')
            })
            
            it('should fail on blank endDate', () => {
                const endDate = ' \t    \n'
                
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', 'MX' , startDate, endDate)).to.throw(ValueError, 'endDate is empty')
            })

            it('should fail on undefined token', () => {
                const token = undefined
                
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', 'MX' , startDate, endDate)).to.throw(RequirementError, `token is not optional`)
            })
            
            it('should fail on null token', () => {
                const token = null
                
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', 'MX' , startDate, endDate)).to.throw(RequirementError, `token is not optional`)
            })
            
            it('should fail on empty token', () => {
                const token = ''
                
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', 'MX' , startDate, endDate)).to.throw(ValueError, 'token is empty')
            })
            
            it('should fail on blank token', () => {
                const token = ' \t    \n'
            
                expect(() => restApi.retrieveIssuesBySLA(token,'Request', 'MX' , startDate, endDate)).to.throw(ValueError, 'token is empty')
            })



        })
        describe('issues for table', ()=>{
            let token, month='May'
            const startDate = '2019-05-01'
            const endDate = '2019-05-28'
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token    
                await helper.loadDataBase(month)
                await helper.setOverdue()
            })
            it('should succeed on correct data', async ()=>{
                const response = await restApi.retrieveIssuesByTable(token, 'IT', startDate, endDate)
                expect(response).to.exist
                expect(response[0].issueType).to.equal('HotFix')
                expect(response[1].issueType).to.equal('BugFix')
                expect(response[2].issueType).to.equal('Bug')
                expect(response[3].issueType).to.equal('Request')

                
            })
            it('should fail on empty country', () => {
                const country = ''
                
                expect(() => restApi.retrieveIssuesByTable(token, country , startDate, endDate)).to.throw(ValueError, 'country is empty')
            })
            
            it('should fail on blank country', () => {
                const country = ' \t    \n'
                
                expect(() => restApi.retrieveIssuesByTable(token, country , startDate, endDate)).to.throw(ValueError, 'country is empty')
            })
    
            it('should fail on undefined startDate', () => {
                const startDate = undefined
                
                expect(() => restApi.retrieveIssuesByTable(token, 'IT' , startDate, endDate)).to.throw(RequirementError, `startDate is not optional`)
            })
            
            it('should fail on null startDate', () => {
                const startDate = null
                
                expect(() => restApi.retrieveIssuesByTable(token, 'IT' , startDate, endDate)).to.throw(RequirementError, `startDate is not optional`)
            })
            
            it('should fail on empty startDate', () => {
                const startDate = ''
                
                expect(() => restApi.retrieveIssuesByTable(token, 'IT' , startDate, endDate)).to.throw(ValueError, 'startDate is empty')
            })
            
            it('should fail on blank startDate', () => {
                const startDate = ' \t    \n'
                
                expect(() => restApi.retrieveIssuesByTable(token, 'IT' , startDate, endDate)).to.throw(ValueError, 'startDate is empty')
            })
    
            it('should fail on undefined endDate', () => {
                const endDate = undefined
                
                expect(() => restApi.retrieveIssuesByTable(token, 'IT' , startDate, endDate)).to.throw(RequirementError, `endDate is not optional`)
            })
            
            it('should fail on null endDate', () => {
                const endDate = null
                
                expect(() => restApi.retrieveIssuesByTable(token, 'IT' , startDate, endDate)).to.throw(RequirementError, `endDate is not optional`)
            })
            
            it('should fail on empty endDate', () => {
                const endDate = ''
                
                expect(() => restApi.retrieveIssuesByTable(token, 'IT' , startDate, endDate)).to.throw(ValueError, 'endDate is empty')
            })
            
            it('should fail on blank endDate', () => {
                const endDate = ' \t    \n'
                
                expect(() => restApi.retrieveIssuesByTable(token, 'IT' , startDate, endDate)).to.throw(ValueError, 'endDate is empty')
            })

            it('should fail on undefined token', () => {
                const token = undefined
                
                expect(() => restApi.retrieveIssuesByTable(token, 'IT' , startDate, endDate)).to.throw(RequirementError, `token is not optional`)
            })
            
            it('should fail on null token', () => {
                const token = null
                
                expect(() => restApi.retrieveIssuesByTable(token, 'IT' , startDate, endDate)).to.throw(RequirementError, `token is not optional`)
            })
            
            it('should fail on empty token', () => {
                const token = ''
                
                expect(() => restApi.retrieveIssuesByTable(token, 'IT' , startDate, endDate)).to.throw(ValueError, 'token is empty')
            })
            
            it('should fail on blank token', () => {
                const token = ' \t    \n'
            
                expect(() => restApi.retrieveIssuesByTable(token, 'IT' , startDate, endDate)).to.throw(ValueError, 'token is empty')
            })

        })
    })
    after(() => mongoose.disconnect())
})
