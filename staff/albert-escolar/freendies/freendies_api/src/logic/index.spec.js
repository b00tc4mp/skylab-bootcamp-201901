'use strict'

require('dotenv').config()


const { User, Game, mongoose } = require('freendies_data')
const expect = ('expect')
const logic = require('.')
const bcrypt = require('bcrypt')

const { env: { TEST_DB_URL } } = process

describe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Game.deleteMany()
        ])
    )

        describe('register user', ()=> {
            
            const username = 'TestUser'
            const email = `testmail-${Math.random()}@mail.com`
            const password = `123-${Math.random()}`
            const passwordConfirm = password

            it('should succeed on registering a user with valid data', async ()=>{
                const id = await logic.registerUser(username, email, password, passwordConfirm)

                expect(id).toBeDefined()
                expect(typeof id).toBe('string')

                const user = await User.findOne({email})

                expect(user.username)=toBe(username)
                expect(user.email).toBe(email)

                const match = await bcrypt.compare(password, user.password)

                expect(match).toBeTruthy()
            })


        })







})