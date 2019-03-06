'use strict'

import homeSwappApi from '.'

describe('user api', () => {

    describe('register', () => {

        const email = `manolo${Math.random()}@hotmail.com`
        const username = `ManoloSkywalker-${Math.random()}`
        const password = '123'

        it('should succeed on correct data', () =>

            homeSwappApi.register(username, email, password, password)

                .then(id => expect(id).toBeDefined())
        )

        it('should fail on undefined username', () => {
            try {
                homeSwappApi.register(undefined, email, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined email', () => {
            try {
                homeSwappApi.register(username, undefined, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined password', () => {
            try {
                homeSwappApi.register(username, email, undefined, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined password confirmation', () => {
            try {
                homeSwappApi.register(username, email, password, undefined)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on already existing user', () =>
            homeSwappApi.register(username, email, password, password)

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
                homeSwappApi.register(username, email, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('username is empty')
            }
        })

        it('should fail on empty email', () => {

            const email = ''

            try {
                homeSwappApi.register(username, email, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('email is empty')
            }
        })


        it('should fail on empty email', () => {

            const email = ''

            try {
                homeSwappApi.register(username, email, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('email is empty')
            }
        })


        it('should fail on empty password', () => {

            const password = ''

            try {
                homeSwappApi.register(username, email, password, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('password is empty')
            }
        })

        // TODO more unit test cases
    })
    describe('authenticate', () => {

        const email = `manolo${Math.random()}@hotmail.com`
        const username = `ManoloSkywalker-${Math.random()}`
        const password = '123'

        beforeEach(() =>

            homeSwappApi.register(username, email, password, password)

        )

        it('should succeed on correct data', () =>

            homeSwappApi.authenticate(email, password)

                .then(token => {
                    expect(token).toBeDefined()
                })
        )

        it('should fail on undefined email', () => {
            try {
                homeSwappApi.authenticate(undefined, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined password', () => {
            try {
                homeSwappApi.authenticate(email, undefined)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

    })

    describe('retrieve', () => {

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

            homeSwappApi.retrieve(_token)

                .then(({id, myHouses, username, email}) => {
                    
                    expect(id).toBeDefined()
                    expect(myHouses).toBeDefined()
                    expect(username).toBeDefined()
                    expect(email).toBeDefined()


                })
        )

        it('should fail on undefined email', () => {
            try {
                homeSwappApi.authenticate(undefined, password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on undefined password', () => {
            try {
                homeSwappApi.authenticate(email, undefined)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

    })
})