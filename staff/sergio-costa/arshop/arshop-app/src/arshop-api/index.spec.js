'use strict'

import arshopApi from '.'

jest.setTimeout(10000)

describe('arshop api', () => {

    //#region REGISTER USER
    describe('register user', () => {
        const name = 'sergio'
        const surname = 'costa'
        const email = `sergiocosta-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        it('should succeed on correct data', () =>
            arshopApi.registerUser(name, surname, email, password, password)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on already existing user', () =>
            arshopApi.registerUser(name, surname, email, password, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with email ${email} already exists`)
                })
        )

        it('should fail on non-matching password and its confirmation', () =>
            arshopApi.registerUser(name, surname, email, password, `non-matching ${password}`)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe('passwords do not match')
                })
        )

        // TODO more unit test cases
    })
    //#endregion

    //#region AUTHENTICATE USER
    describe('authenticate user', () => {
        const name = 'sergio'
        const surname = 'costa'
        const email = `sergiocosta-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        beforeEach(() =>
            arshopApi.registerUser(name, surname, email, password, password)
        )

        it('should succeed on correct data', () =>
            arshopApi.authenticateUser(email, password)
                .then(token => expect(token).toBeDefined())
        )

        // TODO more unit test cases
    })
    //#endregion

    //#region RETRIEVE USER
    describe('retrieve user', () => {
        const name = 'sergio'
        const surname = 'costa'
        const email = `sergiocosta-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        let userId, token

        beforeEach(() =>
            arshopApi.registerUser(name, surname, email, password, password)
                .then(id => userId = id)
                .then(() => arshopApi.authenticateUser(email, password))
                .then(_token => token = _token)
        )

        it('should succeed on correct data', () =>
            arshopApi.retrieveUser(token)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        )

        // TODO more unit test cases
    })
    //#endregion

    // describe('update user', () => {
    //     const name = 'sergio'
    //     const surname = 'costa'
    //     const email = `sergiocosta-${Math.random()}@mail.com`
    //     const password = `password-${Math.random()}`

    //     let userId, token

    //     beforeEach(() =>
    //         arshopApi.updateUser(name, surname, email, password, password)
    //             .then(id => userId = id)
    //             .then(() => arshopApi.authenticateUser(email, password))
    //             .then(_token => token = _token)
    //     )
    // })

})