'use strict'

require('dotenv').config()

require('isomorphic-fetch')

const mongoose = require('mongoose')
const { User } = require('../models')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')

const { env: { TEST_DB_URL, SPOTIFY_API_TOKEN } } = process

// spotifyApi.token = SPOTIFY_API_TOKEN

describe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany()
        ])
    )

    describe('register user', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(username, email, password, passwordConfirm)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            const user = await User.findOne({ email })

            expect(user.username).toBe(username)
            expect(user.email).toBe(email)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })


        it('should fail on undefined username', () => {
            const username = undefined
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on numeric username', () => {
            const username = 10
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })


        it('should fail on boolean username', () => {
            const username = false
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on object username', () => {
            const username = {}
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on array username', () => {
            const username = []
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(username + ' is not a string'))
        })

        it('should fail on empty username', () => {
            const username = ''
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(Error('username cannot be empty'))
        })

        it('should fail on array email', () => {
            const username = 'manu'
            const email = []
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })
        it('should fail on numeric email', () => {
            const username = 'manu'
            const email = 1
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on boolean email', () => {
            const username = 'manu'
            const email = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on object email', () => {
            const username = 'manu'
            const email = {}
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on undefined email', () => {
            const username = 'manu'
            const email = undefined
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const username = 'manuel'
            const email = ''
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(Error('email cannot be empty'))
        })

        it('should fail on undefined password', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = undefined

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on numeric password', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = 1

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on boolean password', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = true

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on array password', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = []

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on object password', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = {}

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(TypeError(password + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const username = 'manuel'
            const email = 'manuelbarzi@mail.com'
            const password = ''

            expect(() => {
                logic.registerUser(username, email, password, password)
            }).toThrow(Error('password cannot be empty'))
        })

        it('should fail on object password confirmation', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, {})
            }).toThrow(TypeError({} + ' is not a string'))
        })

        it('should fail on array password confirmation', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, [])
            }).toThrow(TypeError([] + ' is not a string'))
        })

        it('should fail on numeric password confirmation', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, 1)
            }).toThrow(TypeError(1 + ' is not a string'))
        })

        it('should fail on bool password confirmation', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, true)
            }).toThrow(TypeError(true + ' is not a string'))
        })

        it('should fail on undefined password confirmation', () => {
            const username = 'manu'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, undefined)
            }).toThrow(TypeError(undefined + ' is not a string'))
        })

        it('should fail on empty password confirmation', () => {
            const username = 'manuel'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, password, "")
            }).toThrow(Error('password confirmation cannot be empty'))
        })

        it('should fail on differences between password and password confirmation', () => {
            const username = 'manuel'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(username, email, 'password', "111")
            }).toThrow(Error('passwords do not match'))
        })
        
    })

    

    describe('authenticate user', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
        )

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on empty email', () => {
            const email = ''
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error('email cannot be empty'))
        })

        it('should fail on numeric email', () => {
            const email = 1
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${email} is not a string`))
        })

        it('should fail on array email', () => {
            const email = []
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${email} is not a string`))
        })

        it('should fail on undefined email', () => {
            const email = undefined
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${email} is not a string`))
        })
        it('should fail on object email', () => {
            const email = {}
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${email} is not a string`))
        })
        it('should fail on boolean email', () => {
            const email = true
            const password = `123-${Math.random()}`

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${email} is not a string`))
        })

        it('should fail on empty password', () => {
            const password = ''

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error('password cannot be empty'))
        })

        it('should fail on numeric password', () => {
            
            const password = 123

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${password} is not a string`))
        })

        it('should fail on array password', () => {
            
            const password = []

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${password} is not a string`))
        })

        it('should fail on undefined password', () => {
            
            const password = undefined

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${password} is not a string`))
        })
        it('should fail on object password', () => {
            
            const password = {}

            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${password} is not a string`))
        })
        it('should fail on boolean password', () => {
            
            const password = true
            expect(() => {
                logic.authenticateUser(email, password)
            }).toThrow(Error(`${password} is not a string`))
        })
    })

    describe('retrieve user', () => {
        const username = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUser(userId)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.username).toBe(username)
                    expect(user.email).toBe(email)

                    expect(user.save).toBeUndefined()
                })

            
        )

        it('should fail on boolean id', () => {
            
            expect(() => {
                logic.retrieveUser(true)
            }).toThrow(Error(`${true} is not a string`))
        })

        it('should fail on object id', () => {
            
            expect(() => {
                logic.retrieveUser({})
            }).toThrow(Error(`${{}} is not a string`))
        })

        it('should fail on undefined id', () => {
            
            expect(() => {
                logic.retrieveUser(undefined)
            }).toThrow(Error(`${undefined} is not a string`))
        })

        it('should fail on array id', () => {
            
            expect(() => {
                logic.retrieveUser([])
            }).toThrow(Error(`${[]} is not a string`))
        })

        it('should fail on numeric id', () => {
            
            expect(() => {
                logic.retrieveUser(1)
            }).toThrow(Error(`${1} is not a string`))
        })

        it('should fail on empty id', () => {
            
            expect(() => {
                logic.retrieveUser("")
            }).toThrow(Error('userId cannot be empty'))
        })
    })






    // TODO updateUser and removeUser


    after(() =>
        Promise.all([
            User.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})