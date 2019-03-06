'use strict'

require('dotenv').config()

require('isomorphic-fetch')

const {
    SchemaTypes:{ObjectId}
} = require("mongoose");

const {
    User,
    Events,
    Comments
} = require("../models");

const mongoose = require('mongoose')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { env: { MONGO_URL, JWT_SECRET } } = process

logic.jwtSecret = JWT_SECRET

describe('logic', () => {

    before(() => mongoose.connect(MONGO_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const age = 22
        const description = 'Hola muy buenas'
        const email = `TachiFernandez@mail.com-${Math.random()}`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, age, description, email, password, passwordConfirm)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id).toBe('string')

                    return users.findByEmail(email)
                })
                .then(user => {
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.age).toBe(age)
                    expect(user.description).toBe(description)
                    expect(user.email).toBe(email)

                    return bcrypt.compare(password, user.password)
                        .then(match => expect(match).toBeTruthy())
                })
        )

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Fernandez'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Fernandez'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Fernandez'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Fernandez'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Fernandez'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Fernandez'
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Tachi'
            const surname = undefined
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Tachi'
            const surname = 10
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'Tachi'
            const surname = false
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Tachi'
            const surname = {}
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Tachi'
            const surname = []
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Tachi'
            const surname = ''
            const email = 'TachiFernandez@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname cannot be empty'))
        })
    })

    describe('authenticate user', () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const email = `TachiFernandez@mail.com-${Math.random()}`
        const password = `123-${Math.random()}`

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => users.add({ name, surname, email, password: hash }))
        )

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then(({ id, token }) => {
                    expect(id).toBeDefined()
                    expect(token).toBeDefined()
                })
        )
    })

    describe('retrieve user', () => {
        const name = 'Tachi'
        const surname = 'Fernandez'
        const email = `TachiFernandez@mail.com-${Math.random()}`
        const password = `123-${Math.random()}`
        let _id, _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => users.add({ name, surname, email, password: hash }))
                .then(id => {
                    _id = id
                    _token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '30m' })
                })
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUser(_id, _token)
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        )
    })

    describe("create events" , () => {

        const name = 'Tachi'
        const surname = 'Fernandez'
        const email = `TachiFernandez@mail.com-${Math.random()}`
        const password = `123-${Math.random()}`
        let _id, _token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => users.add({ name, surname, email, password: hash }))
                .then(id => {
                    _id = id
                    _token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '30m' })
                })
        )
        it('should succed on correct data' , () => {
            const title = "Fiesta pagana"
            const description = "lo peta"
            const date = "11/04/2019"
            const ubicacion = "pau piferrer 6"
            const category = "fiesta"

            logic.createEvents(id,title,description,date,ubicacion,category)
            debugger
            (events => {
                expect(events.id).toBe(_id)
                expect(events.title).toBe(title)
                expect(events.description).toBe(description)
                expect(events.date).toBe(date)
                expect(events.ubication).toBe(ubication)
                expect(events.category).toBe(category)
            })
        })
    })

    after(() =>
    Promise.all([
        User.deleteMany()
    ])
        .then(() => mongoose.disconnect())
)
})