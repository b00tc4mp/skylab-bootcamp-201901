'use stric'

require('dotenv').config()
require('isomorphic-fetch')

const { mongoose, models: { User } } = require('flyme-data')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')

const { env: { TEST_DB_URL } } = process

describe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() => User.deleteMany())

    describe('register user', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const passwordConfirmation = password

        it('should succeed on correct data', () => {
            return logic.registerUser(name, surname, email, password, passwordConfirmation)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id).toBe('string')
                })
        })

        it('should fail on undefined name', () => {
            const badName = undefined
            expect(() => {
                logic.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badName} is not a string`))
        })

        it('should fail on numeric name', () => {
            const badName = 123
            expect(() => {
                logic.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badName} is not a string`))
        })

        it('should fail on boolean name', () => {
            const badName = true
            expect(() => {
                logic.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badName} is not a string`))
        })

        it('should fail on array name', () => {
            const badName = ['leia']
            expect(() => {
                logic.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badName} is not a string`))
        })

        it('should fail on object name', () => {
            const badName = { name: 'leia' }
            expect(() => {
                logic.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badName} is not a string`))
        })

        it('should fail on empty name', () => {
            const badName = ''
            expect(() => {
                logic.registerUser(badName, surname, email, password, passwordConfirmation)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const badSurname = undefined
            expect(() => {
                logic.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badSurname} is not a string`))
        })

        it('should fail on numeric surname', () => {
            const badSurname = 123
            expect(() => {
                logic.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badSurname} is not a string`))
        })

        it('should fail on boolean surname', () => {
            const badSurname = true
            expect(() => {
                logic.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badSurname} is not a string`))
        })

        it('should fail on array surname', () => {
            const badSurname = ['leia']
            expect(() => {
                logic.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badSurname} is not a string`))
        })

        it('should fail on object surname', () => {
            const badSurname = { name: 'leia' }
            expect(() => {
                logic.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(TypeError(`${badSurname} is not a string`))
        })

        it('should fail on empty surname', () => {
            const badSurname = ''
            expect(() => {
                logic.registerUser(name, badSurname, email, password, passwordConfirmation)
            }).toThrow(Error('surname cannot be empty'))
        })

        it('should fail on undefined email', () => {
            const badEmail = undefined
            expect(() => {
                logic.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on numeric email', () => {
            const badEmail = 123
            expect(() => {
                logic.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on boolean email', () => {
            const badEmail = true
            expect(() => {
                logic.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on array email', () => {
            const badEmail = ['leia']
            expect(() => {
                logic.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on object email', () => {
            const badEmail = { name: 'leia' }
            expect(() => {
                logic.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on empty email', () => {
            const badEmail = ''
            expect(() => {
                logic.registerUser(name, surname, badEmail, password, passwordConfirmation)
            }).toThrow(Error('email cannot be empty'))
        })

        it('should fail on undefined password', () => {
            const badPassword = undefined
            expect(() => {
                logic.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on numeric password', () => {
            const badPassword = 123
            expect(() => {
                logic.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on boolean password', () => {
            const badPassword = true
            expect(() => {
                logic.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on array password', () => {
            const badPassword = ['leia']
            expect(() => {
                logic.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on object password', () => {
            const badPassword = { name: 'leia' }
            expect(() => {
                logic.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on empty password', () => {
            const badPassword = ''
            expect(() => {
                logic.registerUser(name, surname, email, badPassword, passwordConfirmation)
            }).toThrow(Error('password cannot be empty'))
        })

        it('should fail on undefined passwordConfirmation', () => {
            const badPasswordConfirmation = undefined
            expect(() => {
                logic.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(TypeError(`${badPasswordConfirmation} is not a string`))
        })

        it('should fail on numeric passwordConfirmation', () => {
            const badPasswordConfirmation = 123
            expect(() => {
                logic.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(TypeError(`${badPasswordConfirmation} is not a string`))
        })

        it('should fail on boolean passwordConfirmation', () => {
            const badPasswordConfirmation = true
            expect(() => {
                logic.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(TypeError(`${badPasswordConfirmation} is not a string`))
        })

        it('should fail on array passwordConfirmation', () => {
            const badPasswordConfirmation = ['leia']
            expect(() => {
                logic.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(TypeError(`${badPasswordConfirmation} is not a string`))
        })

        it('should fail on object passwordConfirmation', () => {
            const badPasswordConfirmation = { name: 'leia' }
            expect(() => {
                logic.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(TypeError(`${badPasswordConfirmation} is not a string`))
        })

        it('should fail on empty passwordConfirmation', () => {
            const badPasswordConfirmation = ''
            expect(() => {
                logic.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(Error('password confirmation cannot be empty'))
        })

        it('should fail on empty passwordConfirmation', () => {
            const badPasswordConfirmation = '123'
            expect(() => {
                logic.registerUser(name, surname, email, password, badPasswordConfirmation)
            }).toThrow(Error('passwords do not match'))
        })
    })


    describe('authenticate user', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
        )

        it('should succeed on correct data', () =>
            logic.authenticateUser(email, password)
                .then(res => {
                    expect(res).toBeDefined()
                    expect(typeof res).toBe('object')
                    expect(res.id).toBeDefined()
                })
        )

        it('should fail on undefined email', () => {
            const badEmail = undefined
            expect(() => {
                logic.registerUser(name, surname, badEmail, password)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on numeric email', () => {
            const badEmail = 123
            expect(() => {
                logic.registerUser(name, surname, badEmail, password)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on boolean email', () => {
            const badEmail = true
            expect(() => {
                logic.registerUser(name, surname, badEmail, password)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on array email', () => {
            const badEmail = ['leia']
            expect(() => {
                logic.registerUser(name, surname, badEmail, password)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on object email', () => {
            const badEmail = { name: 'leia' }
            expect(() => {
                logic.registerUser(name, surname, badEmail, password)
            }).toThrow(TypeError(`${badEmail} is not a string`))
        })

        it('should fail on empty email', () => {
            const badEmail = ''
            expect(() => {
                logic.registerUser(name, surname, badEmail, password)
            }).toThrow(Error('email cannot be empty'))
        })

        it('should fail on undefined password', () => {
            const badPassword = undefined
            expect(() => {
                logic.registerUser(name, surname, email, badPassword)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on numeric password', () => {
            const badPassword = 123
            expect(() => {
                logic.registerUser(name, surname, email, badPassword)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on boolean password', () => {
            const badPassword = true
            expect(() => {
                logic.registerUser(name, surname, email, badPassword)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on array password', () => {
            const badPassword = ['leia']
            expect(() => {
                logic.registerUser(name, surname, email, badPassword)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on object password', () => {
            const badPassword = { name: 'leia' }
            expect(() => {
                logic.registerUser(name, surname, email, badPassword)
            }).toThrow(TypeError(`${badPassword} is not a string`))
        })

        it('should fail on empty password', () => {
            const badPassword = ''
            expect(() => {
                logic.registerUser(name, surname, email, badPassword)
            }).toThrow(Error('password cannot be empty'))
        })
    })

    describe('retrieve user', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )


        it('should succeed on correct data', () =>
            logic.retrieveUser(userId)
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        )

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.retrieveUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.retrieveUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.retrieveUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.retrieveUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.retrieveUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on empty userId', () => {
            const badUserId = ''
            expect(() => {
                logic.retrieveUser(badUserId)
            }).toThrow(Error('userId cannot be empty'))
        })

    })

    describe('update user', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`
        const newName = 'Princess'
        const newSurname = 'Leia'

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succeed on correct data', () =>
            logic.updateUser(userId, { name: newName, surname: newSurname })
                .then(res => {
                    expect(res).toBeDefined()
                    expect(typeof res).toBe('object')
                    expect(res.status).toBe('OK')
                    expect(res.id).toBeDefined()
                    expect(typeof res.id).toBe('string')
                })
        )

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.updateUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.updateUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.updateUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.updateUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.updateUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on undefined object', () => {
            const badObject = undefined
            expect(() => {
                logic.updateUser(userId, badObject)
            }).toThrow(TypeError(`${badObject} is not an Object`))
        })

        it('should fail on numeric Object', () => {
            const badObject = 123
            expect(() => {
                logic.updateUser(userId, badObject)
            }).toThrow(TypeError(`${badObject} is not an Object`))
        })

        it('should fail on boolean Object', () => {
            const badObject = true
            expect(() => {
                logic.updateUser(userId, badObject)
            }).toThrow(TypeError(`${badObject} is not an Object`))
        })

        it('should fail on array userId', () => {
            const badObject = ['leia']
            expect(() => {
                logic.updateUser(userId, badObject)
            }).toThrow(TypeError(`${badObject} is an array`))
        })

        it('should fail on empty data', () => {
            expect(() => {
                logic.updateUser(userId, {})
            }).toThrow(Error('Data cannot be empty'))
        })


    })

    describe('delete user', () => {
        const name = 'Leia'
        const surname = 'Organa'
        const email = `leia${Math.random()}@mail.com`
        const password = `starwars${Math.random()}`

        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )

        it('should succed on correct data', () =>
            logic.deleteUser(userId)
                .then(res => {
                    expect(res).toBeDefined()
                    expect(res.status).toBe('OK')

                    return User.findOne({ email })
                })
                .then(res => expect(res).toBeNull())
                .catch(err => {
                    expect(err).toBeDefined()
                })
        )

        it('should fail on undefined userId', () => {
            const badUserId = undefined
            expect(() => {
                logic.deleteUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on numeric userId', () => {
            const badUserId = 123
            expect(() => {
                logic.deleteUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on boolean userId', () => {
            const badUserId = true
            expect(() => {
                logic.deleteUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on array userId', () => {
            const badUserId = ['leia']
            expect(() => {
                logic.deleteUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })

        it('should fail on object userId', () => {
            const badUserId = { name: 'leia' }
            expect(() => {
                logic.deleteUser(badUserId)
            }).toThrow(TypeError(`${badUserId} is not a string`))
        })
    })

    after(() => {
        return User.deleteMany()
            .then(() => mongoose.disconnect())
    })
})