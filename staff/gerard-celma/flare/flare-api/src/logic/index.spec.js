'use strict'

require('dotenv').config()

require('isomorphic-fetch')

const { mongoose, models: { User, Message } } = require('datify')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')

const { env: { TEST_DB_URL } } = process

describe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            Message.deleteMany(),
            User.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            const user = await User.findOne({ email })

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Manuel'
            const surname = undefined
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Manuel'
            const surname = 10
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'Manuel'
            const surname = false
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Manuel'
            const surname = {}
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Manuel'
            const surname = []
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Manuel'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname cannot be empty'))
        })
    })

    describe('authenticate user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
        )

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then(id => expect(id).toBeDefined())
        )
    })

    describe('retrieve user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUser(userId)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.save).toBeUndefined()
                })
        )
    })

    // describe('update user', () => {

    // })

    // describe('remove user', () => {

    // })

    describe('create message', () => {
        const nameFrom = 'Peter'
        const surnameFrom = 'McGregor'
        const emailFrom = `peter-mc-greg-${Math.random()}@mail.com`
        const passwordFrom = `123-${Math.random()}`

        const nameTo = 'Peter'
        const surnameTo = 'McGregor'
        const emailTo = `peter-mc-greg-${Math.random()}@mail.com`
        const passwordTo = `123-${Math.random()}`

        let date = new Date
        let launchDate = new Date
        let position = [41.234, 2.897]
        let text = 'kwjhfwef lifwelfiu 3loiru2pdoje'
        let userIdFrom
        let userIdTo

        bcrypt.hash(passwordFrom, 10)
            .then(hash => User.create({ nameFrom, surnameFrom, emailFrom, passwordFrom: hash }))
            .then(({ id }) => userIdFrom = id)
            
        bcrypt.hash(passwordTo, 10)
            .then(hash => User.create({ nameTo, surnameTo, emailTo, passwordTo: hash }))
            .then(({ id }) => userIdTo = id)
        

        it('should succeed on correct credentials', () => {
            logic.createMessage(userIdFrom, userIdTo, date, launchDate, position, text)
                .then(message => {
                    expect(message.userIdFrom).toBe(userIdFrom)
                    expect(message.userIdTo).toBe(userIdTo)
                    expect(message.date).toBeDefined()
                    expect(message.launchDate).toBeDefined()
                    expect(message.position).toBe(position)
                    expect(message.text).toBe(text)
                })
        })
    })

    after(() =>
        Promise.all([
            Message.deleteMany(),
            User.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})