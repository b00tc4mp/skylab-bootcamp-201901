import arshopApi from '../arshop-api'
import logic from '.'

jest.setTimeout(10000)

describe('logic', () => {
    describe('register user', () => {
        const name = 'sergio'
        const surname = 'costa'
        const email = `sergiocosta-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(result => expect(result).toBeUndefined())
        )

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const name = 'sergio'
            const surname = undefined
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'sergio'
            const surname = 10
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'sergio'
            const surname = false
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'sergio'
            const surname = {}
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'sergio'
            const surname = []
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'sergio'
            const surname = ''
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname cannot be empty'))
        })
    })

    describe('log in user', () => {
        const name = 'sergio'
        const surname = 'costa'
        const email = `sergiocosta-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        beforeEach(() =>
            arshopApi.registerUser(name, surname, email, password, passwordConfirm)
        )

        it('should succeed on correct credentials', () =>
            logic.logInUser(email, password)
                .then(() => expect(logic.__userApiToken__).toBeDefined())
        )
    })

    describe('check user is logged in', () => {
        const name = 'sergio'
        const surname = 'costa'
        const email = `sergiocosta-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        beforeEach(() =>
            arshopApi.registerUser(name, surname, email, password, passwordConfirm)
        )

        it('should succeed on correct credentials', () =>
            logic.logInUser(email, password)
                .then(() => expect(logic.isUserLoggedIn).toBeTruthy())
        )
    })

    describe('log out user', () => {
        const name = 'sergio'
        const surname = 'costa'
        const email = `sergiocosta-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        beforeEach(() =>
            arshopApi.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.logInUser(email, password))
        )

        it('should succeed on correct credentials', () => {
            logic.logOutUser()

            expect(logic.__userApiToken__).toBeNull()
        })
    })

    describe('retrieve user', () => {
        const name = 'sergio'
        const surname = 'costa'
        const email = `sergiocosta-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        beforeEach(() =>
            arshopApi.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.logInUser(email, password))
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUser()
                .then(user => {
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        )
    })

    // TODO updateUser and removeUser

})