const logic = require ('.')
const { LogicError, RequirementError, ValueError, FormatError } = require('dashboard-errors')
const {models:{Issue, User}, mongoose} = require ('dashboard-data')
const { expect } = require ('chai') 
const argon2 = require ('argon2')
const restApi = require('../api')
const dotenv = require ('dotenv')
const helper = require ('../common/helper')
dotenv.config()


//const { env: { MONGO_URL_CLIENT_SIDE_TEST_LOGIC: url } } = process
const url = 'mongodb://localhost/dashboard-client-side-test'

describe('logic',()=>{
    let email
    const name = `Anna`
    const surname = `Smith`
    const password = `123`
    const profile = `product-expert`
    const  country = `PL`
    before(()=> mongoose.connect(url, {useNewUrlParser:true}))
    beforeEach(async()=>{
        await Issue.deleteMany()
        await User.deleteMany()
        email = `email-${Math.random()}@mail.com`
    })
    describe('users', ()=>{
        describe('register user', ()=>{
            it('should succeed on correct data', async ()=>{
                debugger
                await logic.registerUser(name, surname, email, password, profile, country)
                
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
                    await logic.registerUser(name, surname, email, password, profile, country)
                    throw Error('should not reach this point')

                }catch(error){
                    expect(error).to.exist

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
        describe('login user', ()=>{
            let user
            beforeEach(async()=>{
                user = await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
            })
            it('should succeed on correct credentials', async () => {

                await logic.loginUser(email, password)
                
            })
            it('should fail on non existing user', async () => {
                const email= 'wrong@email.com'
                try{
                    
                    await logic.loginUser(email, password)
                    throw Error('should not reach this point')

                }catch(error){

                    expect(error).to.exist
                }
            })
            it('should fail on undefined email', () => {
                const email = undefined
                
                expect(() => logic.loginUser(email, password)).to.throw(RequirementError, `email is not optional`)
            })
            
            it('should fail on null email', () => {
                const email = null
                
                expect(() => logic.loginUser(email, password)).to.throw(RequirementError, `email is not optional`)
            })
            
            it('should fail on empty email', () => {
                const email = ''
                
                expect(() => logic.loginUser(email, password)).to.throw(ValueError, 'email is empty')
            })
            
            it('should fail on blank email', () => {
                const email = ' \t    \n'
                
                expect(() => logic.loginUser(email, password)).to.throw(ValueError, 'email is empty')
            })

            it('should fail on incorrect password', async () => {
                const password ='123999'
                try{
                    
                    await logic.loginUser(email, password)
                    throw Error('should not reach this point')

                }catch(error){

                    expect(error).to.exist
                }
            })

            it('should fail on undefined password', () => {
                const password = undefined
                
                expect(() => logic.loginUser(email, password)).to.throw(RequirementError, `password is not optional`)
            })
            
            it('should fail on null password', () => {
                const password = null
                
                expect(() => logic.loginUser(email, password)).to.throw(RequirementError, `password is not optional`)
            })
        
            it('should fail on empty password', () => {
                const password = ''
                
                expect(() => logic.loginUser(email, password)).to.throw(ValueError, 'password is empty')
            })

            it('should fail on blank password', () => {
                const password = ' \t    \n'
                
                expect(() => logic.loginUser(email, password)).to.throw(ValueError, 'password is empty')
            })


        })
        describe('logout', ()=>{
            let user
            beforeEach(async()=>{
                user = await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
            })
            it('shoul succeed on correct user', async()=>{
                await logic.loginUser(email, password)
                await logic.logoutUser()
                expect(logic.isUserLoggedIn).to.equal(false)
            })        
        })
        describe('retrive user', ()=>{
            let token
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token 
                logic.__userToken__ = token              
            })
            it('should succeed on existing user', async ()=>{
                
                const _user= await logic.retrieveUser()
                
                expect(_user.id).to.be.undefined
                expect(_user.name).to.equal(name)
                expect(_user.surname).to.equal(surname)
                expect(_user.email).to.equal(email)
                expect(_user.password).to.be.undefined
                expect(_user.profile).to.equal(profile)
                expect(_user.country).to.equal(country)
                
            })
            it('should fail on non-existent user', async ()=>{
                await User.deleteMany()
                try{
                    await await logic.retrieveUser()
                    throw Error('should not reach this point')
                }catch(error){
                    expect(error).to.exist
                }
            })

        })
        describe('update user', ()=>{
            let token
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token 
                logic.__userToken__ = token              
            })
            it('should succeed on correct data', async ()=>{
                const _name='Updated'
                const _surname='Surname'
                const _country = 'AR'
                await logic.updateUser(_name, _surname, _country)
                const updatedUser= await User.findOne({email})
                expect(updatedUser.name).to.equal(_name)
                expect(updatedUser.surname).to.equal(_surname)
                expect(updatedUser.country).to.equal(_country) 
            })
            it('should succeed on correct data only updating name', async ()=>{
                const _name='Updated'
                
                await logic.updateUser(_name)
                const updatedUser= await User.findOne({email})
                expect(updatedUser.name).to.equal(_name)
                expect(updatedUser.surname).to.equal(surname)
                expect(updatedUser.country).to.equal(country) 
            })
            it('should fail on non-existent user', async ()=>{
                await User.deleteMany()
                try{
                    await logic.updateUser(name, surname, country)
                    throw Error('should not reach this point')
                }catch(error){

                    expect(error).to.exist

                }
            })

        })
        describe('delete user', ()=>{
            let token
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token 
                logic.__userToken__ = token              
            })
            it('shoul succeed on correct data', async ()=> {
                await logic.removeUser()
                const collection = await User.estimatedDocumentCount()
                expect(collection).is.equal(0)
            })
            it('should fail on non-existent user', async ()=>{
                await User.deleteMany()
                try{
                    await logic.removeUser()
                }catch(error){
                    expect(error).to.exist
                }
            })

        })
    })
    describe('load jiras', function (){
        this.timeout(3000000)
        let token, month='May'
        beforeEach(async ()=>{
            await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
            response = await restApi.authenticateUser(email, password)
            token= response.token 
            logic.__userToken__ = token              
        })
        it('should succeed on correct data', async ()=>{
            await logic.loadJirasByMonth(month)
            
            const issues= await Issue.find()
            expect(issues).to.exist
        })
        it('should fail on inexistent token', async ()=>{
            await User.deleteMany()
            try{
                await logic.loadJirasByMonth(token, month)
                throw Error('should not reach this point')

            }catch(error){
                expect(error).to.exist
            }
        })
    
        })
    describe('issues', ()=>{
        describe('calculate overdue', ()=>{
            let token, month='May'
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token 
                logic.__userToken__ = token 
                await helper.loadDataBase(month)
            })
            it('shoul succeed on correct data', async ()=>{

                await logic.calculateOverdue()
                const issues= await Issue.find()
                issues.forEach(issue=> {
                    expect(issue).to.have.property('overdue');
                })
            })
            it('should fail on inexistent token', async ()=>{
                await User.deleteMany()
                try{
                    await logic.calculateOverdue()
                    throw Error('should not reach this point')
    
                }catch(error){
                    expect(error).to.exist
                }
            })

        })
        describe('clean issues', ()=>{
            let token, month='May'
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token 
                logic.__userToken__ = token 
                await helper.loadDataBase(month)
            })
            it('should clean issues collection', async ()=>{
                await logic.clearUp()
                const collection = await Issue.estimatedDocumentCount()
                expect(collection).is.equal(0)
            })
            it('should fail on inexistent token', async ()=>{
                await User.deleteMany()
                try{
                    await logic.clearUp()
                    throw Error('should not reach this point')
    
                }catch(error){
                    expect(error).to.exist
                }
            })

        })
        describe('retrieve issues by resolution', ()=>{
            let token, month='May'
            const startDate = '2019-05-01'
            const endDate = '2019-05-29'
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token   
                logic.__userToken__ = token 
                await helper.loadDataBase(month)
            })
            it('should succeed on correct data', async ()=>{
                
                const response= await logic.retrieveIssuesByResolution('BugFix', 'PL', startDate, endDate)
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
                    await logic.retrieveIssuesByResolution('Request', 'IT', startDate, endDate)
                    throw Error('should not reach this point')
                }catch(error){
                    expect(error).to.exist
                }
            })
            it('should fail on inexistent token', async ()=>{
                await User.deleteMany()
                try{
                    await logic.retrieveIssuesByResolution('Request', 'IT', startDate, endDate)
                    throw Error('should not reach this point')
                }catch(error){
                    expect(error).to.exist
                }
            })
            it('should fail on null issueType', () => {
                const issueType = null
                
                expect(() => logic.retrieveIssuesByResolution( issueType, 'IT', startDate, endDate)).to.throw(RequirementError, `issueType is not optional`)
            })
            it('should fail on empty issueType', () => {
                const issueType = ''
                
                expect(() => logic.retrieveIssuesByResolution( issueType, 'IT', startDate, endDate)).to.throw(ValueError, 'issueType is empty')
            })
            it('should fail on blank issueType', () => {
                const issueType = ' \t    \n'
                
                expect(() => logic.retrieveIssuesByResolution( issueType, 'IT', startDate, endDate)).to.throw(ValueError, 'issueType is empty')
            })
            it('should fail on undefined country', () => {
                const country = undefined
                
                expect(() => logic.retrieveIssuesByResolution('Request', country , startDate, endDate)).to.throw(RequirementError, `country is not optional`)
            })
            it('should fail on null issueType', () => {
                const country = null
                
                expect(() => logic.retrieveIssuesByResolution('Request', country , startDate, endDate)).to.throw(RequirementError, `country is not optional`)
            })
            it('should fail on empty country', () => {
                const country = ''
                
                expect(() => logic.retrieveIssuesByResolution('Request', country , startDate, endDate)).to.throw(ValueError, 'country is empty')
            })
            it('should fail on blank country', () => {
                const country = ' \t    \n'
                
                expect(() => logic.retrieveIssuesByResolution('Request', country , startDate, endDate)).to.throw(ValueError, 'country is empty')
            })
            it('should fail on undefined startDate', () => {
                const startDate = undefined
                
                expect(() => logic.retrieveIssuesByResolution('Request', 'IT' , startDate, endDate)).to.throw(RequirementError, `startDate is not optional`)
            })
            it('should fail on null startDate', () => {
                const startDate = null
                
                expect(() => logic.retrieveIssuesByResolution('Request', 'IT' , startDate, endDate)).to.throw(RequirementError, `startDate is not optional`)
            })
            it('should fail on empty startDate', () => {
                const startDate = ''
                
                expect(() => logic.retrieveIssuesByResolution('Request', 'IT' , startDate, endDate)).to.throw(ValueError, 'startDate is empty')
            })
            it('should fail on blank startDate', () => {
                const startDate = ' \t    \n'
                
                expect(() => logic.retrieveIssuesByResolution('Request', 'IT' , startDate, endDate)).to.throw(ValueError, 'startDate is empty')
            })
            it('should fail on undefined endDate', () => {
                const endDate = undefined
                
                expect(() => logic.retrieveIssuesByResolution('Request', 'IT' , startDate, endDate)).to.throw(RequirementError, `endDate is not optional`)
            })
            it('should fail on null endDate', () => {
                const endDate = null
                
                expect(() => logic.retrieveIssuesByResolution('Request', 'IT' , startDate, endDate)).to.throw(RequirementError, `endDate is not optional`)
            })
            it('should fail on empty endDate', () => {
                const endDate = ''
                
                expect(() => logic.retrieveIssuesByResolution('Request', 'IT' , startDate, endDate)).to.throw(ValueError, 'endDate is empty')
            })
            it('should fail on blank endDate', () => {
                const endDate = ' \t    \n'
                
                expect(() => logic.retrieveIssuesByResolution('Request', 'IT' , startDate, endDate)).to.throw(ValueError, 'endDate is empty')
            })

        })
        describe('retrieve issues by SLA', ()=>{
            let token, month='May'
            const startDate = '2019-05-01'
            const endDate = '2019-05-28'
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token  
                logic.__userToken__ = token   
                await helper.loadDataBase(month)
                await helper.setOverdue()
            })
            it('should succeed on correct data', async ()=>{
                const response = await logic.retrieveIssuesBySLA('Bug', 'IT', startDate, endDate)
                expect(response).to.exist
                response.forEach(e=> {
                    expect(e).to.have.property('created')
                    expect(e).to.have.property('overdue')
                    expect(e).to.have.property('ontime')
                    expect(e).to.have.property('total')
                })

            })
            it('should fail on incorrect range of date', async ()=>{
                const startDate = '2019-05-02'
                const endDate = '2019-05-01'
                try{
                    await logic.retrieveIssuesBySLA('Request', 'IT', startDate, endDate)
                    throw Error('should not reach this point')
                }catch(error){
                    expect(error).to.exist
                }
            })
            it('should fail on inexistent token', async ()=>{
                await User.deleteMany()
                try{
                    await logic.retrieveIssuesBySLA('Request', 'IT', startDate, endDate)
                    throw Error('should not reach this point')
                }catch(error){
                    expect(error).to.exist
                }
            })
            it('should fail on null issueType', () => {
                const issueType = null
                
                expect(() => logic.retrieveIssuesBySLA( issueType, 'IT', startDate, endDate)).to.throw(RequirementError, `issueType is not optional`)
            })
            
            it('should fail on empty issueType', () => {
                const issueType = ''
                
                expect(() => logic.retrieveIssuesBySLA( issueType, 'IT', startDate, endDate)).to.throw(ValueError, 'issueType is empty')
            })
            
            it('should fail on blank issueType', () => {
                const issueType = ' \t    \n'
                
                expect(() => logic.retrieveIssuesBySLA( issueType, 'IT', startDate, endDate)).to.throw(ValueError, 'issueType is empty')
            })
    
            it('should fail on undefined country', () => {
                const country = undefined
                
                expect(() => logic.retrieveIssuesBySLA('Request', country , startDate, endDate)).to.throw(RequirementError, `country is not optional`)
            })
            
            it('should fail on null country', () => {
                const country = null
                
                expect(() => logic.retrieveIssuesBySLA('Request', country , startDate, endDate)).to.throw(RequirementError, `country is not optional`)
            })
            
            it('should fail on empty country', () => {
                const country = ''
                
                expect(() => logic.retrieveIssuesBySLA('Request', country , startDate, endDate)).to.throw(ValueError, 'country is empty')
            })
            
            it('should fail on blank country', () => {
                const country = ' \t    \n'
                
                expect(() => logic.retrieveIssuesBySLA('Request', country , startDate, endDate)).to.throw(ValueError, 'country is empty')
            })
    
            it('should fail on undefined startDate', () => {
                const startDate = undefined
                
                expect(() => logic.retrieveIssuesBySLA('Request', 'IT' , startDate, endDate)).to.throw(RequirementError, `startDate is not optional`)
            })
            
            it('should fail on null startDate', () => {
                const startDate = null
                
                expect(() => logic.retrieveIssuesBySLA('Request', 'IT' , startDate, endDate)).to.throw(RequirementError, `startDate is not optional`)
            })
            
            it('should fail on empty startDate', () => {
                const startDate = ''
                
                expect(() => logic.retrieveIssuesBySLA('Request', 'IT' , startDate, endDate)).to.throw(ValueError, 'startDate is empty')
            })
            
            it('should fail on blank startDate', () => {
                const startDate = ' \t    \n'
                
                expect(() => logic.retrieveIssuesBySLA('Request', 'IT' , startDate, endDate)).to.throw(ValueError, 'startDate is empty')
            })
    
            it('should fail on undefined endDate', () => {
                const endDate = undefined
                
                expect(() => logic.retrieveIssuesBySLA('Request', 'IT' , startDate, endDate)).to.throw(RequirementError, `endDate is not optional`)
            })
            
            it('should fail on null endDate', () => {
                const endDate = null
                
                expect(() => logic.retrieveIssuesBySLA('Request', 'IT' , startDate, endDate)).to.throw(RequirementError, `endDate is not optional`)
            })
            
            it('should fail on empty endDate', () => {
                const endDate = ''
                
                expect(() => logic.retrieveIssuesBySLA('Request', 'IT' , startDate, endDate)).to.throw(ValueError, 'endDate is empty')
            })
            
            it('should fail on blank endDate', () => {
                const endDate = ' \t    \n'
                
                expect(() => logic.retrieveIssuesBySLA('Request', 'IT' , startDate, endDate)).to.throw(ValueError, 'endDate is empty')
            })

        })
        describe('retrieve issues for table', ()=>{
            let token, month='May'
            const startDate = '2019-05-01'
            const endDate = '2019-05-28'
            beforeEach(async ()=>{
                await User.create({name, surname, email, password: await argon2.hash(password), profile, country})
                response = await restApi.authenticateUser(email, password)
                token= response.token  
                logic.__userToken__ = token   
                await helper.loadDataBase(month)
                await helper.setOverdue()
            })
            it('should succeed on correct data', async ()=>{
                const response = await logic.retrieveIssuesByTable('IT', startDate, endDate)
                expect(response).to.exist
                expect(response[0].issueType).to.equal('HotFix')
                expect(response[1].issueType).to.equal('BugFix')
                expect(response[2].issueType).to.equal('Bug')
                expect(response[3].issueType).to.equal('Request')
                
            })
            it('should fail on incorrect range of date', async ()=>{
                const startDate = '2019-05-02'
                const endDate = '2019-05-01'
                try{
                    await logic.retrieveIssuesByTable('IT', startDate, endDate)
                    throw Error('should not reach this point')
                }catch(error){
                    expect(error).to.exist
                }
            })
            it('should fail on inexistent token', async ()=>{
                await User.deleteMany()
                try{
                    await logic.retrieveIssuesByTable('IT', startDate, endDate)
                    throw Error('should not reach this point')
                }catch(error){
                    expect(error).to.exist
                }
            })
            it('should fail on undefined country', () => {
                const country = undefined
                
                expect(() => logic.retrieveIssuesByTable(country , startDate, endDate)).to.throw(RequirementError, `country is not optional`)
            })
            
            it('should fail on null country', () => {
                const country = null
                
                expect(() => logic.retrieveIssuesByTable(country , startDate, endDate)).to.throw(RequirementError, `country is not optional`)
            })
            
            it('should fail on empty country', () => {
                const country = ''
                
                expect(() => logic.retrieveIssuesByTable(country , startDate, endDate)).to.throw(ValueError, 'country is empty')
            })
            
            it('should fail on blank country', () => {
                const country = ' \t    \n'
                
                expect(() => logic.retrieveIssuesByTable(country , startDate, endDate)).to.throw(ValueError, 'country is empty')
            })
    
            it('should fail on undefined startDate', () => {
                const startDate = undefined
                
                expect(() => logic.retrieveIssuesByTable('IT' , startDate, endDate)).to.throw(RequirementError, `startDate is not optional`)
            })
            
            it('should fail on null startDate', () => {
                const startDate = null
                
                expect(() => logic.retrieveIssuesByTable('IT' , startDate, endDate)).to.throw(RequirementError, `startDate is not optional`)
            })
            
            it('should fail on empty startDate', () => {
                const startDate = ''
                
                expect(() => logic.retrieveIssuesByTable('IT' , startDate, endDate)).to.throw(ValueError, 'startDate is empty')
            })
            
            it('should fail on blank startDate', () => {
                const startDate = ' \t    \n'
                
                expect(() => logic.retrieveIssuesByTable('IT' , startDate, endDate)).to.throw(ValueError, 'startDate is empty')
            })
    
            it('should fail on undefined endDate', () => {
                const endDate = undefined
                
                expect(() => logic.retrieveIssuesByTable('IT' , startDate, endDate)).to.throw(RequirementError, `endDate is not optional`)
            })
            
            it('should fail on null endDate', () => {
                const endDate = null
                
                expect(() => logic.retrieveIssuesByTable('IT' , startDate, endDate)).to.throw(RequirementError, `endDate is not optional`)
            })
            
            it('should fail on empty endDate', () => {
                const endDate = ''
                
                expect(() => logic.retrieveIssuesByTable('IT' , startDate, endDate)).to.throw(ValueError, 'endDate is empty')
            })
            
            it('should fail on blank endDate', () => {
                const endDate = ' \t    \n'
                
                expect(() => logic.retrieveIssuesByTable('IT' , startDate, endDate)).to.throw(ValueError, 'endDate is empty')
            })


        })

    })

    after(() => mongoose.disconnect())
})
