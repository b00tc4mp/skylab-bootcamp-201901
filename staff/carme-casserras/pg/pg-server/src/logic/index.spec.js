require('dotenv').config()
const mongoose = require('mongoose')
const logic = require('.')
const {RequirementError, ValueError, LogicError} = require('../../common/errors')

const { UserData, Stuff } = require('../data/models')

describe('logic', () => {

    beforeAll(async ()=> {

        try {
            await mongoose.connect('mongodb://localhost:27017/pg-test', { useNewUrlParser: true, useFindAndModify:false, useCreateIndex: true })
    
            console.log('connected to database')
            } catch (error) {
                throw Error(error)}
    })

    afterAll(() => mongoose.disconnect())

    const name = 'carme'
    let email
    const password = '123'

    beforeEach(async ()=> {
        await UserData.deleteMany()
        email = `cc-${Math.random()}@gmail.com`
        // await Junk.deleteMany()
    })

    describe('users', () => {
        xdescribe('register user', () => {
            xit('should succeed on correct user data', async ()=> {

                const res = await logic.registerUser(name, email, password)
                
                const users = await UserData.find(user => user.matches({ name, surname, email, password }))

                expect(res).toBeUndefined()
                expect(users).toBeDefined()
                expect(users).toHaveLength(1)
                // expect(users).toHaveLength(1)
                
                // const [user] = users

                // expect(user.name).toBe(name)
                // expect(user.email).toBe(email)
                // expect(user.password).toBeDefined()
            })

            xit('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            xit('should fail on nul name', () => {
                const name = null
                expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `name is not optional`)
            })
            xit('should fail on empty name', () =>{
                const name = ''
                expect(()=> logic.registerUser(name, email, password)).toThrowError(ValueError, `name is not optional`)
            } )
            xit('should fail on blank name', () => {
                const name = '\t   \n'
                expect(()=> logic.registerUser(name, email, password)).toThrowError(ValueError, `name is not optional`)
            })

            xit('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            xit('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            xit('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'email is empty')
            })

            xit('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, email, password)).toThrowError(ValueError, 'email is empty')
            })

            xdescribe('on already existing user', () => {
                beforeEach(() => UserData.create({name, email, password}))

                    it('should fail on retrying to register', async() => {
                        try {
                            await logic.registerUser(name, email, password)

                            throw Error('should not reach this point')
                        } catch(err) {
                            expect(err).toBeDefined()
                            expect(err).toBeInstanceOf(LogicError) 
                            expect(err.message).toBe(`user with email ${email} already exists`)
                        }
                })
            })
        })

        describe('authenticate user', () => {
            beforeEach(() => {
                UserData.create(name, email, password)
            })

            it('should succedd on correct user credentials', async () => {
                const id = await logic.authenticateUser(email, password)

                expect(typeof id).toBe('string')
                expect(id.length).toBeGreaterThan(0)
            })
        })

    })
()


})

