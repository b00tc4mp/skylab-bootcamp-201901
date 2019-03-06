'use strict'

import logic from '.'
import homeSwappApi from '../api';

describe('user api', () => {

    describe('registerUser', () => {

        const email = `manolo${Math.random()}@hotmail.com`
        const username = `ManoloSkywalker-${Math.random()}`
        const password = '123'

        it('should succeed on correct data', () =>

            logic.registerUser(username, email, password, password)

                .then(id => {expect(id).toBeDefined()})
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

        // TODO more unit test cases
    })
    describe('loginUser', () => {

        const email = `manolo${Math.random()}@hotmail.com`
        const username = `ManoloSkywalker-${Math.random()}`
        const password = '123'

        beforeEach(() =>

            homeSwappApi.register(username, email, password, password)

        )

        it('should succeed on correct data', () =>

            logic.loginUser(email, password)

                .then(token => {
                    expect(token).toBeDefined()
                })
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

            homeSwappApi.register(username, email, password, password)
                .then(() => homeSwappApi.authenticate(email, password))
                .then(token => {
                    _token = token
                    
                })

        )

        it('should succeed on correct data', () =>

            logic.retrieveUser(_token)

                .then(({id, myHouses, username, email}) => {
                    
                    expect(id).toBeDefined()
                    expect(myHouses).toBeDefined()
                    expect(username).toBeDefined()
                    expect(email).toBeDefined()


                })
        )

        it('should fail on undefined email', () => {
            try {
                logic.retrieveUser(undefined, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined password', () => {
            try {
                logic.retrieveUser(email, undefined)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

    })
})