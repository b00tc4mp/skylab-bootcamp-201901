'use strict'

import userApi from '.'

describe('user api', () => {
    const username = 'vacadery'
    const surname = 'cowdery'
    const email = 'e2maaa@gmail.com'
    const password = '123'
    const passwordConfirmation = '123'

    describe('register', () => {
        it('should succeed on correct data', () =>
            userApi.register(username, surname, email, password, passwordConfirmation)
                .then(id => expect(id).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        )

        it('should fail on already existing user', () =>
            userApi.register(username, surname, email, password, passwordConfirmation )
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
        )
    })

    describe('auth', () => {
        it('should match existing data', () =>
        userApi.auth('manu', password)
            .then(data => {
                expect(data.token).toBeDefined()
                expect(data.id).toBeDefined()
            })
            .catch(error => expect(error).toBeUndefined())
        )

        it('should fail on nonexistent data', () => {
            try {
                userApi.auth()
            } catch(error) {
                expect(error.message).toBe('undefined is not a string')
            }
        })

    })

    describe('retrieve', () => {
        it('should succeed on retrieving data', () =>
        userApi.auth(username, password)
            .then(data => {
                return userApi.retrieve(data.id, data.token)
                .then(() => {
                    expect(data.id).toBeDefined()
                    expect(data.token).toBeDefined()
                })     
            })
        )

        it('should fail on wrong id', () => {
            try {
                userApi.retrieve()
            } catch(error) {
                expect(error.message).toBe('undefined is not a string')
            }

        })
    })

    describe('update', () => {
        it('should succeed on updating data', () =>
        userApi.auth(username, password)
            .then(data => {
                return userApi.update(data.id, data.token, {username: "vacadery", lala: "vmkgmdk"})
                .then(() => {
                    expect(data.id).toBeDefined()
                    expect(data.token).toBeDefined()
                })     
            })
        )

        it('should fail on wrong data', () => {
            try {
                userApi.update()
            } catch(error) {
                expect(error.message).toBeDefined()
            }
        })
    })

    describe('removed', () => {
        it('should succeed on removing data', () =>
        userApi.auth(username, password)
            .then(data => {
                return userApi.removed(username, password, data.id, data.token)
                .then((res) => {
                    expect(res).toBe('deleted')
                })     
            })
        )

        it('should fail on wrong data', () => {
            try {
                userApi.removed()
            } catch(error) {
                expect(error.message).toBeDefined()
            }
        })
    })
})