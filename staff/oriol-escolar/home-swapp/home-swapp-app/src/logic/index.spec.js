'use strict'

import logic from '.'
import homeSwappApi from '../api';
import expect from 'expect'


describe('logic', () => {

    describe('registerUser', () => {

        let email 
        let username
        let password = '123'

        beforeEach (() => {

            email = `manolo${Math.random()}@hotmail.com`
            username = `ManoloSkywalker-${Math.random()}`

        })

        it('should succeed on correct data', () =>

            logic.registerUser(username, email, password, password)

                .then(id => { expect(id).toBeDefined() })
        )

        it('should fail on undefined username', () => {
            try {
                logic.registerUser(undefined, email, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined email', () => {
            try {
                logic.registerUser(username, undefined, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined password', () => {
            try {
                logic.registerUser(username, email, undefined, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined password confirmation', () => {
            try {
                logic.registerUser(username, email, password, undefined)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on already existing user', () =>
            logic.registerUser(username, email, password, password)

                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                })
        )

        it('should fail on empty username', () => {

            const username = ''

            try {
                logic.registerUser(username, email, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('username cannot be empty')
            }
        })

        it('should fail on empty email', () => {

            const email = ''

            try {
                logic.registerUser(username, email, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('email cannot be empty')
            }
        })


        it('should fail on empty email', () => {

            const email = ''

            try {
                logic.registerUser(username, email, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('email cannot be empty')
            }
        })


        it('should fail on empty password', () => {

            const password = ''

            try {
                logic.registerUser(username, email, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('password cannot be empty')
            }
        })

    })
    describe('loginUser', () => {

        let email
        let username
        let password = '123'

        beforeEach ( () => {

            email = `manolo${Math.random()}@hotmail.com`
            username = `ManoloSkywalker-${Math.random()}`
            return homeSwappApi.registerUser(username, email, password, password)

        })

        it('should succeed on correct data', () =>

            logic.loginUser(email, password)

                .then(token => expect(token).toBeDefined())
        )

        it('should fail on undefined email', () => {
            try {
                logic.loginUser(undefined, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined password', () => {
            try {
                logic.loginUser(email, undefined)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

    })

    describe('retrieveUser', () => {

        const email = `manolo${Math.random()}@hotmail.com`
        const username = `ManoloSkywalker-${Math.random()}`
        const password = '123'

        let _token;

        beforeEach(() =>

            homeSwappApi.registerUser(username, email, password, password)
                .then(() => homeSwappApi.authenticateUser(email, password))
                .then(token => {
                    console.log(token)
                    _token = token
                    logic.setUserApiToken(_token)
                    console.log(logic.__userApiToken__)
                })

        )

        it('should succeed on correct data', () =>

            logic.retrieveUser()

                .then(({ id, myHouses, username, email }) => {

                    expect(id).toBeDefined()
                    expect(myHouses).toBeDefined()
                    expect(username).toBeDefined()
                    expect(email).toBeDefined()


                })
        )

       


    })
})