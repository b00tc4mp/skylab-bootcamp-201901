require('dotenv').config()
const mongoose = require('mongoose')
const logic = require('.')
const {RequirementError} = require('../../common/errors')

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
        describe('register user', () => {
            fit('should succeed on correct user data', async ()=> {

                const res = await logic.registerUser(name, email, password)

                const users = UserData.find()

                expect(res).toBeUndefined()
                expect(users).toBeDefined()
                // expect(users).toHaveLength(1)

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
                expect(()=> logic.registerUser(name, email, password)).toThrowError(RequirementError, `name is not optional`)
            } )
            it('should fail on blank name', () => {
                const name = '\t   \n'
                expect(()=> logic.registerUser(name, email, password)).toThrowError(RequirementError, `name is not optional`)
            })
        })

    })
()


})

// module.exports = {
//     testEnvironment: 'node'
//   };