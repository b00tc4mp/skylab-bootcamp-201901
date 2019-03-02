'use strict'

const logic = require('.')


describe('logic', () => {
    describe('register user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(result => expect(result).toBeUndefined())
                .catch(err => expect(err).toBeUndefined())
        )

        it('should fail on non-string name', () => {
            const name = true
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on non-string surname', () => {
            const name = 'true'
            const surname = true
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'true'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname cannot be empty'))
        })


        it('should fail on non-string email', () => {
            const name = 'true'
            const surname = 'true'
            const email = true
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(email + ' is not a string'))
        })

        it('should fail on empty email', () => {
            const name = 'true'
            const surname = 'true'
            const email = ''
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('email cannot be empty'))
        })

        it('should fail on non-string password', () => {
            const name = 'true'
            const surname = 'true'
            const email = 'true@true.com'
            const password = undefined

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error(password + ' is not a string'))
        })

        it('should fail on empty password', () => {
            const name = 'true'
            const surname = 'asas'
            const email = 'manuelbarzi@mail.com'
            const password = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('password cannot be empty'))
        })

        it('should fail on non-string password Confirm', () => {
            const name = 'true'
            const surname = 'true'
            const email = 'true@true.com'
            const password = 'undefined'
            const passwordConfirm = true

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error(passwordConfirm + ' is not a string'))
        })

        it('should fail on empty password confirm', () => {
            const name = 'true'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const password = '123'
            const passwordConfirm = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirm)
            }).toThrow(Error('surname cannot be empty'))
        })
    })
})