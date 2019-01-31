'use strict'

import userApi from '.'

describe('user api', () => {
    const username = `manuelbarzi-${Math.random()}`
    const password = '123'

    describe('register', () => {
        it('should succeed on correct data', () =>
            userApi.register(username, password)
                .then(id => expect(id).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        )

        it('should fail on already existing user', () =>
            userApi.register(username, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
        )
    })

    false && describe('update', () => {
        let _token

        beforeEach(() =>
            userApi.auth(username, password)
                .then(({ id, token }) => _token = token)
                .then(() => console.log('TODO'))
        )

        it('should update on correct data', () => 
            userApi.update()
        )
    })
})