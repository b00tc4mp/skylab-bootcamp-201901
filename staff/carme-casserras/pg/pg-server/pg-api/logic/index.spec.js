require('dotenv').config()
const logic = require('.')
const {RequirementError, ValueError, LogicError} = require('../../common/errors')
const bcrypt = require('bcrypt')
require('../../common/util/math-random.polyfill')

const { models, mongoose} = require('pg-data')
const { UserData, Things } = models

describe('logic', () => {
    let name
    let email
    let password

    beforeAll(async ()=> {

        try {
            await mongoose.connect('mongodb://localhost:27017/pg-test', { useNewUrlParser: true, useFindAndModify:false, useCreateIndex: true })
    
            console.log('connected to database')
            } catch (error) {
                throw Error(error)}
    })

    beforeEach(async ()=> {
        
        await UserData.deleteMany()
        // await Thing.deleteMany()
        name = 'carme'
        email = `cc-${Math.random()}@gmail.com`
        password = '123'
    })

    describe('register user', () => {
        
        it('should succeed on correct user data', async ()=> {

            const res = await logic.registerUser(name, email, password)
            
            const users = await UserData.find()

            expect(res).toBeUndefined()
            expect(users).toBeDefined()
            expect(users).toHaveLength(1)
            expect(users.length).toBeGreaterThan(0)
            expect(users).toHaveLength(1)
            
            const [user] = users

            expect(user.name).toBe(name)
            expect(user.email).toBe(email)
            expect(user.password).toBeDefined()
        })

        it('should fail on undefined name', () => {
            const name = undefined

            expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `name is not optional`)
        })

        it('should fail on nul name', () => {
            const name = null
            expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `name is not optional`)
        })
        it('should fail on empty name', () =>{
            const name = ''
            expect(()=> logic.registerUser(name, email, password)).toThrowError(ValueError, `name is not optional`)
        } )
        it('should fail on blank name', () => {
            const name = '\t   \n'
            expect(()=> logic.registerUser(name, email, password)).toThrowError(ValueError, `name is not optional`)
        })

        it('should fail on undefined email', () => {
            const email = undefined

            expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `email is not optional`)
        })

        it('should fail on null email', () => {
            const email = null

            expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `email is not optional`)
        })

        it('should fail on empty email', () => {
            const email = ''

            expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'email is empty')
        })

        it('should fail on blank email', () => {
            const email = ' \t    \n'

            expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'email is empty')
        })

        describe('on already existing user', () => {
            beforeEach(() => UserData.create({name, email, password}))

                it('should fail on retrying to register', async() => {
                    try {
                        await logic.registerUser(name, email, password)

                        throw Error('should not reach this point')
                    } catch(err) {
                        console.log(err)
                        expect(err).toBeDefined()
                        expect(err).toBeInstanceOf(LogicError) 
                        expect(err.message).toBe(`user with email ${email} already exists`)
                    }
            })
        })
    })

    describe('authenticate user', () => {
                          
        beforeEach(async () => user = await UserData.create({ name, email, password: await bcrypt.hash(password,5)}))   
        
        it('should succedd on correct user credentials', async () => {

            const id = await logic.authenticateUser(email, password)
            
            expect(typeof id).toBe('string')
            expect(id.length).toBeGreaterThan(0)
            expect(id).toBeDefined()
        })

        it('should fail on non-exixting user', async () => {
            try {
                await logic.authenticateUser(email = 'unexisting-user@mail.com', password)

                throw Error('should not reach this point')
            } catch (err){
                expect(err).toBeDefined()
                expect(err).toBeInstanceOf(LogicError)
                expect(err.message).toBe(`user with email ${email} does not exist`)
            }
        })
    })

    describe('retrieve user', () => {
        let user, id
        beforeEach(async () => user = await UserData.create({ name, email, password: await bcrypt.hash(password,5)}))

        it('should succeed on correct id from existing user',async () => {
            const _user = await logic.retrieveUser(user.id)
            
            expect(_user.id).toBeUndefined()
            expect(_user.name).toEqual(name)
            expect(_user.email).toEqual(email)
            expect(_user.password).toBeUndefined()
        })
         it('should fail on unexisting user id', async () => {
            id = '01234567887654'
            try {
                await logic.retrieveUser(user.id)
                throw Error('should not reach this point')
            } catch (err) {
                expect(err).toBeDefined()
                expect(err).toBeInstanceOf(LogicError)
                expect(err.message).toBe(`user with id ${id} does not exist`)
            }
         })
    })
    afterAll(() => mongoose.disconnect())
})

