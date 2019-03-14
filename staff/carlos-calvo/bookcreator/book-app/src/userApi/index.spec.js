'use strict'

const sasaa = require('dotenv').config()
const userApi = require('.')
const bookApi = require('../bookApi')
const expect = require('expect')
const logic  = require('.')
const fetch = require('isomorphic-fetch')

const { mongoose, User, Book, BookTemplate  } = require('book-data')
const { env: { TEST_DB_URL } } = process

describe('userApi', () => {
    describe('register user', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password
        it('should succeed on valid data', () =>{
            return userApi.registerUser(name, surname, email, password, passwordConfirm)
                .then(result => {
                    expect(result).toBeDefined()})
                .catch(err => expect(err).toBeUndefined())
        })
        it('should fail on non-string name', () => {
            expect(() => {
                userApi.registerUser(true, surname, email, password, passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on empty name', () => {
            expect(() => {
                userApi.registerUser('', surname, email, password, passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on non-string surname', () => {
            expect(() => {
                userApi.registerUser(name, true, email, password, passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on empty surname', () => {
            expect(() => {
                userApi.registerUser(name, '', email, password, passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on non-string email', () => {
            expect(() => {
                userApi.registerUser(name, surname, {}, password, passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on empty email', () => {
            expect(() => {
                userApi.registerUser(name, surname, '', password, passwordConfirm)
            }).toThrow(Error)
        })

        it('should fail on non-string password', () => {
            expect(() => {
                userApi.registerUser(name, surname, email, {} , passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on empty password', () => {
            expect(() => {
                userApi.registerUser(name, surname, email, '', passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on non-string passwordConfirm', () => {
            expect(() => {
                userApi.registerUser(name, surname, email, password , true)
            }).toThrow(Error)
        })
        it('should fail on empty password', () => {
            expect(() => {
                userApi.registerUser(name, surname, email, password, '')
            }).toThrow(Error)
        })

        it('should fail on non-matching passwords', () => {
            expect(() => {
                userApi.registerUser(name, surname, email, password, '--invented---password')
            }).toThrow(Error)
        })  
    })
    describe('authenticate user', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
            const result = await userApi.authenticateUser(email, password)
            expect(result).toBeDefined()
        })

        it('should fail on invalid data', async () => {
            try {
                const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
                const result = await userApi.authenticateUser(email, '--inventedPassword12biybisdbhsd-')
            } catch (error) {
                expect(error).toBeDefined()
            }
            
        })
        it('should fail on non-string email', () => {
            const email = true
            const password = '123'

            expect(() => {
                userApi.authenticateUser(email, password)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const email = ''
            const password = '123'

            expect(() => {
                userApi.authenticateUser(email, password)
            }).toThrow(Error)
        })

        it('should fail on empty password', () => {
            const email = 'Carlosan@mail.com'
            const password = ''

            expect(() => {
                userApi.authenticateUser(email, password)
            }).toThrow(Error)
        })

        it('should fail on non-string password', () => {
            const email = 'Carlosan@mail.com'
            const password = true

            expect(() => {
                userApi.authenticateUser(email, password)
            }).toThrow(Error)
        })
    })

    describe('retrieve user', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should fail on invalid data', async () => {
            try {
                token = '1234'
                const id = await logic.registerUser(name, surname, email, password, passwordConfirm)
                const result = await userApi.retrieveUser(token)
            } catch (error) {
                expect(error).toBeDefined()
            }  
        })
        it('should fail on empty token', () => {
            expect(() => {
                userApi.retrieveUser(token)
            }).toThrow(Error)
        })
        it('should fail on non-string token', () => {
            expect(() => {
                userApi.retrieveUser({})
            }).toThrow(Error)
        }) 
    })

    describe('Update user', () => {
        const name = 'Carlos'
        const surname = 'Calvo'
        const email = `Carlos-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password
        it('should succeed on valid data', async () => {
            let newPassword = '12345'
            const id = await logic.registerUser(name, surname, email, password, password)
            expect(id).toBeDefined()
            const updation = await userApi.updateUser('Carlos123', 'Calvo123', email, newPassword, newPassword)
            const result = await logic.authenticateUser(email, newPassword)
            expect(result).toBeDefined()
        })
        it('should fail on non-string name', () => {
            expect(() => {
                userApi.updateUser(true, surname, email, password, passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on empty name', () => {
            expect(() => {
                userApi.updateUser('', surname, email, password, passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on non-string surname', () => {
            expect(() => {
                userApi.updateUser(name, true, email, password, passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on empty surname', () => {
            expect(() => {
                userApi.updateUser(name, '', email, password, passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on non-string email', () => {
            expect(() => {
                userApi.updateUser(name, surname, {}, password, passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on empty email', () => {
            expect(() => {
                userApi.updateUser(name, surname, '', password, passwordConfirm)
            }).toThrow(Error)
        })

        it('should fail on non-string password', () => {
            expect(() => {
                userApi.updateUser(name, surname, email, {} , passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on empty password', () => {
            expect(() => {
                userApi.updateUser(name, surname, email, '', passwordConfirm)
            }).toThrow(Error)
        })
        it('should fail on non-string passwordConfirm', () => {
            expect(() => {
                userApi.updateUser(name, surname, email, password , true)
            }).toThrow(Error)
        })
        it('should fail on empty password', () => {
            expect(() => {
                userApi.updateUser(name, surname, email, password, '')
            }).toThrow(Error)
        })

        it('should fail on non-matching passwords', () => {
            expect(() => {
                userApi.updateUser(name, surname, email, password, '--invented---password')
            }).toThrow(Error)
        })
    })
})