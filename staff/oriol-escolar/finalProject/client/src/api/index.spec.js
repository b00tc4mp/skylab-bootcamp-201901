'use strict'

import homeSwappApi from '.'

describe('user api', () => {

    describe('register', () => {

        const email = `manolo${Math.random}@hotmail.com`
        const username = `ManoloSkywalker-${Math.random()}`
        const password = '123'

        it('should succeed on correct data', () =>
                        
        homeSwappApi.register(username, email, password,password)

                .then(id => expect(id).toBeDefined())
        )

        it('should fail on undefined', () => {
            try {
                            homeSwappApi.register(username, email, password,password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on already existing user', () =>
                        homeSwappApi.register(username, email, password,password)

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
                            homeSwappApi.register(username, email, password,password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('username is empty')
            }
        })

        it('should fail on empty email', () => {

            const email = ''

            try {
                            homeSwappApi.register(username, email, password,password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('email is empty')
            }
        })


        it('should fail on empty email', () => {

            const email = ''

            try {
                            homeSwappApi.register(username, email, password,password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('email is empty')
            }
        })


        it('should fail on empty password', () => {

            const password = ''

            try {
                            homeSwappApi.register(username, email, password,password)

            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('password is empty')
            }
        })

        // TODO more unit test cases
    })
})