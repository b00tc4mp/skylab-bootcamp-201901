'use strict'

require('dotenv').config()

const { User, Game, mongoose } = require('freendies_data')
const logic = require('.')
const bcrypt = require('bcrypt')

const { env: { TEST_DB_URL } } = process

describe('logic', () => {
    beforeAll(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Game.deleteMany()
        ])
    )

    describe('register user', () => {

        const username = 'TestUser'
        const email = `testmail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on registering a user with valid data', async () => {
            const id = await logic.registerUser(username, email, password, passwordConfirm)
            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            const user = await User.findOne({ email })

            expect(user.username).toBe(username)
            expect(user.email).toBe(email)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on undefined username', async () => {
            const username = undefined

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${username} is not a string`))
            })

        })

        it('should fail on numeric username', async () => {
            const username = 123

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${username} is not a string`))
            })

        })

        it('should fail on boolean username', async () => {
            const username = true

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${username} is not a string`))
            })
        })

        it('should fail on spaced username', async () => {
            const username = '  '

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${username} is not a string`))
            })
        })

        it('should fail on empty username', async () => {
            const username = ''

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${username} is not a string`))
            })
        })

        it('should fail on undefined email', async () => {
            const email = undefined

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${email} is not a string`))
            })

        })

        it('should fail on numeric email', async () => {
            const email = 123

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${email} is not a string`))
            })

        })

        it('should fail on boolean email', async () => {
            const email = true

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${email} is not a string`))
            })

        })
        it('should fail on spaced email', async () => {
            const email = '  '

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${email} is not a string`))
            })
        })

        it('should fail on empty email', async () => {
            const email = ''

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${email} is not a string`))
            })
        })

        it('should fail on undefined password', async () => {
            const password = undefined

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${password} is not a string`))
            })

        })

        it('should fail on numeric password', async () => {
            const password = 123

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${password} is not a string`))
            })

        })

        it('should fail on boolean password', async () => {
            const password = true

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${password} is not a string`))
            })

        })

        it('should fail on spaced password', async () => {
            const password = '  '

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${password} is not a string`))
            })
        })

        it('should fail on empty password', async () => {
            const password = ''

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${password} is not a string`))
            })
        })


        it('should fail on undefined passwordConfirm', async () => {
            const passwordConfirm = undefined

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${passwordConfirm} is not a string`))
            })

        })

        it('should fail on numeric passwordConfirm', async () => {
            const passwordConfirm = 123

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${passwordConfirm} is not a string`))
            })

        })

        it('should fail on boolean passwordConfirm', async () => {
            const passwordConfirm = true

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${passwordConfirm} is not a string`))
            })

        })
        it('should fail on spaced passwordConfirm', async () => {
            const passwordConfirm = '  '

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${passwordConfirm} is not a string`))
            })
        })

        it('should fail on empty passwordConfirm', async () => {
            const passwordConfirm = ''

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${passwordConfirm} is not a string`))
            })
        })

        it('should fail on password confirmation not matching password', async () => {
            const passwordConfirm = 'fail'

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(Error(`${passwordConfirm} does not match password`))
            })
        })

    })

    describe('authenticate user', () => {

        const username = 'TestUser'
        const email = `testmail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
        )

        it('should succeed to authenicate with valid credentials', () => {
            logic.authenticateUser(email, password)
                .then(id => expect(id).toBeDefined())

        })

        it('should fail on empty email', () => {
            const email = ''

            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${email} cannot be empty`))
            })
        })


        it('should fail on spaced email', () => {
            const email = '  '

            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${email} is not a string`))
            })
        })


        it('should fail on numeric email', () => {
            const email = 1233

            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${email} is not a string`))
            })
        })


        it('should fail on array email', () => {
            const email = []

            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${email} is not a string`))
            })
        })


        it('should fail on object email', () => {
            const email = {}
            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${email} is not a string`))
            })
        })


        it('should fail on object email', () => {
            const email = undefined
            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${email} is not a string`))
            })
        })


        it('should fail on empty password', () => {
            const password = ''

            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${password} cannot be empty`))
            })
        })


        it('should fail on spaced password', () => {
            const password = '  '

            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${password} is not a string`))
            })
        })


        it('should fail on numeric password', () => {
            const password = 1233

            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${password} is not a string`))
            })
        })


        it('should fail on array password', () => {
            const password = []

            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${password} is not a string`))
            })
        })


        it('should fail on object password', () => {
            const password = {}
            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${password} is not a string`))
            })
        })


        it('should fail on undefined password', () => {
            const password = undefined
            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${password} is not a string`))
            })
        })
    })


    describe('retrieve user', () => {

        const username = 'TestUser'
        const email = `testmail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succeed retrieving the user on correct credentials', () => {
            logic.retrieveUser(userId)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.username).toBe(username)
                    expect(user.email).toBe(email)
                })
        })
        //TODO NEGATIVE CASES
    })
    //TODO RETRIEVE GAME TESTS
})