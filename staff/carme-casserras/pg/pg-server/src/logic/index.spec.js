require('dotenv').config()
const mongoose = require('mongoose')
const logic = require('.')

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
            it('should succeed on correct user data', async ()=> {

                debugger
                const res = await logic.registerUser(name, email, password)
                debugger
                expect(res).toBeUndefined()


            })
        })
    })
()


})

// module.exports = {
//     testEnvironment: 'node'
//   };