'use strict'

import userApi from '.'

describe('user api', () => {

    describe('register', () => {
        const name = 'sergio'
        const surname = 'costa'
        const username = `sergio-${Math.random()}`
        const password = '123'

        it('should succeed on correct data', () =>
            userApi.register(name, surname, username, password)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on already existing user', () =>
            userApi.register(name, surname, username, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
        )


        describe('fail on typeError name', () => {
            it('should fail on name typeof number instead of string ', () =>
                expect(() => userApi.register(12345, surname, username, password)).toThrowError(`12345 is not a string`)
            )

            it('should fail on name typeof boolean instead of string ', () =>
                expect(() => userApi.register(true, surname, username, password)).toThrowError(`true is not a string`)
            )

            it('should fail on name typeof object instead of string ', () =>
                expect(() => userApi.register({}, surname, username, password)).toThrowError(`[object Object] is not a string`)
            )

            it('should fail on name typeof array instead of string ', () =>
                expect(() => userApi.register([], surname, username, password)).toThrowError(` is not a string`)
            )
        })

        describe('fail on typeError surname', () => {
            it('should fail on surname typeof number instead of string ', () =>
                expect(() => userApi.register(name, 12345, username, password)).toThrowError(`12345 is not a string`)
            )

            it('should fail on surname typeof boolean instead of string ', () =>
                expect(() => userApi.register(name, true, username, password)).toThrowError(`true is not a string`)
            )

            it('should fail on surname typeof object instead of string ', () =>
                expect(() => userApi.register(name, {}, username, password)).toThrowError(`[object Object] is not a string`)
            )

            it('should fail on surname typeof array instead of string ', () =>
                expect(() => userApi.register(name, [], username, password)).toThrowError(` is not a string`)
            )
        })

        describe('fail on typeError username', () => {
            it('should fail on username typeof number instead of string ', () =>
                expect(() => userApi.register(name, surname, 12345, password)).toThrowError(`12345 is not a string`)
            )

            it('should fail on username typeof boolean instead of string ', () =>
                expect(() => userApi.register(name, surname, true, password)).toThrowError(`true is not a string`)
            )

            it('should fail on username typeof object instead of string ', () =>
                expect(() => userApi.register(name, surname, {}, password)).toThrowError(`[object Object] is not a string`)
            )

            it('should fail on username typeof array instead of string ', () =>
                expect(() => userApi.register(name, surname, [], password)).toThrowError(` is not a string`)
            )
        })

        describe('fail on typeError password', () => {
            it('should fail on username typeof number instead of string ', () =>
                expect(() => userApi.register(name, surname, username, 12345)).toThrowError(`12345 is not a string`)
            )

            it('should fail on username typeof boolean instead of string ', () =>
                expect(() => userApi.register(name, surname, username, true)).toThrowError(`true is not a string`)
            )

            it('should fail on username typeof object instead of string ', () =>
                expect(() => userApi.register(name, surname, username, {})).toThrowError(`[object Object] is not a string`)
            )

            it('should fail on username typeof array instead of string ', () =>
                expect(() => userApi.register(name, surname, username, [])).toThrowError(` is not a string`)
            )
        })
        

    })

    describe('authenticate', () => {
        const name = 'sergio'
        const surname = 'costa'
        const username = `sergio-${Math.random()}`
        const password = '123'

        let _id

        beforeEach(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
        )

        it('should succeed on correct data', () =>
            userApi.authenticate(username, password)
                .then(({ id, token }) => {
                    expect(id).toBe(_id)
                    expect(token).toBeDefined()
                })
        )

        // TODO more unit test cases
    })

    describe('retrieve', () => {
        const name = 'sergio'
        const surname = 'costa'
        const username = `sergio-${Math.random()}`
        const password = '123'

        let _id, _token

        beforeEach(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () =>
            userApi.retrieve(_id, _token)
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.username).toBe(username)
                })
        )

        // TODO more unit test cases
    })

    describe('update', () => {
        const name = 'sergio'
        const surname = 'costa'
        const username = `sergio-${Math.random()}`
        const password = '123'

        let _id, _token

        beforeEach(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            return userApi.update(_id, _token, data)
                .then(() => userApi.retrieve(_id, _token))
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(data.name)
                    expect(user.surname).toBe(data.surname)
                    expect(user.age).toBe(data.age)
                    expect(user.username).toBe(username)
                })
        })

        // TODO more unit test cases
    })

    describe('remove', () => {
        const name = 'sergio'
        const surname = 'costa'
        const username = `sergio-${Math.random()}`
        const password = '123'

        let _id, _token

        beforeEach(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () => {
            return userApi.remove(_id, _token, username, password)
                .then(() => userApi.retrieve(_id, _token))
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({message}) => expect(message).toBe(`user with id \"${_id}\" does not exist`))
        })

        // TODO more unit test cases
    })
})