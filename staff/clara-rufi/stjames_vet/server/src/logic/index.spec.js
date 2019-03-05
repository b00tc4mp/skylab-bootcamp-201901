'use strict'

///////////////falta update remove  user!!!!!!!!!!!!!!!!!
require('dotenv').config()

require('isomorphic-fetch')

const { mongoose, models: { User, Pet, Appointments } } = require('vet-data')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')


const { env: { TEST_DB_URL } } = process


escribe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            Comment.deleteMany(),
            User.deleteMany()
        ])
    )

   describe('register user', () => {
        const name = 'Clara'
        const surname = 'Rufí'
        const email = `clararufi-${Math.random()}@mail.com`
        const password = `257-${Math.random()}`
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
            const surname = 'Rufí'
            const email = 'clararufi@mail.com'
            const password = `257-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Rufí'
            const email = 'clararufi@mail.com'
            const password = `257-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Rufí'
            const email = 'clararufi@mail.com'
            const password = `257-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Rufí'
            const email = 'clararufi@mail.com'
            const password = `257-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Rufí'
            const email = 'clararufi@mail.com'
            const password = `257-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Rufí'
            const email = 'clararufi@mail.com'
            const password = `257-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Clara'
            const surname = undefined
            const email = 'clararufi@mail.com'
            const password = `257-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Clara'
            const surname = 10
            const email = 'clararufi@mail.com'
            const password = `257-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'Clara'
            const surname = false
            const email = 'clararufi@mail.com'
            const password = `257-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Clara'
            const surname = {}
            const email = 'clararufi@mail.com'
            const password = `257-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Clara'
            const surname = []
            const email = 'clararufi@mail.com'
            const password = `257-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Clara'
            const surname = ''
            const email = 'clararufi@mail.com'
            const password = `257-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname cannot be empty'))
        })
    })

    describe('authenticate user', () => {
        const name = 'Clara'
        const surname = 'Rufí'
        const email = `clararufi-${Math.random()}@mail.com`
        const password = `257-${Math.random()}`

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
        const name = 'Clara'
        const surname = 'Rufí'
        const email = `clararufi-${Math.random()}@mail.com`
        const password = `257-${Math.random()}`

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
    
    after(() =>
    Promise.all([
        Comment.deleteMany(),
        User.deleteMany()
    ])
        .then(() => mongoose.disconnect())
)
})