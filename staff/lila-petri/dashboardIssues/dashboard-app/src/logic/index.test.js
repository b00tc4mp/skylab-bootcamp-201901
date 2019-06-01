const logic = require ('.')
const { LogicError, RequirementError, ValueError, FormatError } = require ('dashboard-errors')
const {models:{Issue, User}, mongoose} = require ('dashboard-data')
const { expect } = require ('chai') 
const argon2 = require ('argon2')
const restApi = require('.')
const dotenv = require ('dotenv')
//const helper = require ('./helper')
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
        describe('retrive user')
    })

    after(() => mongoose.disconnect())
})
