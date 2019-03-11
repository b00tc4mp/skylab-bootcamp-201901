const cleanUpApi = require('../api')

import logic from '.'



jest.setTimeout(10000)

describe('logic', () => {
    describe('register user', () => {
        const name = 'User'
        const surname = 'test'
        const email = `test-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirmation = password

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, email, password, passwordConfirmation)
                .then(result => expect(result).toBeUndefined())
        )

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'test'
            const email = 'test@mail.com'
            const password = '123'
            const passwordConfirmation = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordConfirmation)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        // it('should fail on numeric name', () => {
        //     const name = 10
        //     const surname = 'test'
        //     const email = 'test@mail.com'
        //     const password = '123'

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(name + ' is not a string'))
        // })


        // it('should fail on boolean name', () => {
        //     const name = true
        //     const surname = 'test'
        //     const email = 'test@mail.com'
        //     const password = '123'

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(name + ' is not a string'))
        // })

        // it('should fail on object name', () => {
        //     const name = {}
        //     const surname = 'test'
        //     const email = 'test@mail.com'
        //     const password = '123'

        //     expect(() => {
        //         logic.registerUser(name, surname, email, password, password)
        //     }).toThrow(TypeError(name + ' is not a string'))
        // })





    })

    // describe('log in user', () => {
    //     const name = 'User'
    //     const surname = 'test'
    //     const email = `test-${Math.random()}@mail.com`
    //     const password = '123'
    //     const passwordConfirmation = password

    //     beforeEach(() =>
    //         cleanUpApi.registerUser(name, surname, email, password, passwordConfirmation)
    //     )

    //     it('should succeed on correct credentials', () =>
    //         logic.logInUser(email, password)
    //             .then(() => expect(__userApiToken__).toBeDefined())
    //     )
    // })

    // describe('check user is logged in', () => {
    //     const name = 'User'
    //     const surname = 'test'
    //     const email = `test-${Math.random()}@mail.com`
    //     const password = '123'
    //     const passwordConfirmation = password

    //     beforeEach(() =>
    //         cleanUpApi.registerUser(name, surname, email, password, passwordConfirmation)
    //     )

    //     it('should succeed on correct credentials', () =>
    //         logic.logInUser(email, password)
    //             .then(() => expect(logic.isUserLoggedIn).toBeTruthy())
    //     )
    // })

    // describe('log out user', () => {
    //     const name = 'User'
    //     const surname = 'test'
    //     const email = `test-${Math.random()}@mail.com`
    //     const password = '123'
    //     const passwordConfirmation = password

    //     beforeEach(() =>
    //         cleanUpApi.registerUser(name, surname, email, password, passwordConfirmation)
    //             .then(() => logic.logInUser(email, password))
    //     )

    //     it('should succeed on correct credentials', () => {
    //         logic.logOutUser()

    //         expect(__userApiToken__).toBeNull()
    //     })
    // })

    // describe('retrieve user', () => {
    //     const name = 'User'
    //     const surname = 'test'
    //     const email = `test-${Math.random()}@mail.com`
    //     const password = '123'
    //     const passwordConfirmation = password

    //     beforeEach(() =>
    //         cleanUpApi.registerUser(name, surname, email, password, passwordConfirmation)
    //             .then(() => logic.logInUser(email, password))
    //     )

    //     it('should succeed on correct credentials', () =>
    //         logic.retrieveUser()
    //             .then(user => {
    //                 expect(user.name).toBe(name)
    //                 expect(user.surname).toBe(surname)
    //                 expect(user.email).toBe(email)
    //             })
    //     )
    // })


})