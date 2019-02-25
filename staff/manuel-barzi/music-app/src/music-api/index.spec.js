'use strict'

import musicApi from '.'

jest.setTimeout(10000)

describe('music api', () => {
    describe('register', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        it('should succeed on correct data', () =>
            musicApi.register(name, surname, username, password, password)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on already existing user', () =>
            musicApi.register(name, surname, username, password, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with email ${username} already exists`)
                })
        )

        // TODO more unit test cases
    })

    describe('authenticate', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id

        beforeEach(() =>
            musicApi.register(name, surname, username, password, password)
                .then(id => _id = id)
        )

        it('should succeed on correct data', () =>
            musicApi.authenticate(username, password)
                .then(({ id, token }) => {
                    expect(id).toBe(_id)
                    expect(token).toBeDefined()
                })
        )

        // TODO more unit test cases
    })

    // describe('retrieve', () => {
    //     const name = 'Manuel'
    //     const surname = 'Barzi'
    //     const username = `manuelbarzi-${Math.random()}`
    //     const password = '123'

    //     let _id, _token

    //     beforeEach(() =>
    //         musicApi.register(name, surname, username, password, passwordConfirm)
    //             .then(id => _id = id)
    //             .then(() => musicApi.authenticate(username, password, passwordConfirm))
    //             .then(({ token }) => _token = token)
    //     )

    //     it('should succeed on correct data', () =>
    //         musicApi.retrieve(_id, _token)
    //             .then(user => {
    //                 expect(user.id).toBe(_id)
    //                 expect(user.name).toBe(name)
    //                 expect(user.surname).toBe(surname)
    //                 expect(user.username).toBe(username)
    //             })
    //     )

    //     // TODO more unit test cases
    // })

    // describe('update', () => {
    //     const name = 'Manuel'
    //     const surname = 'Barzi'
    //     const username = `manuelbarzi-${Math.random()}`
    //     const password = '123'

    //     let _id, _token

    //     beforeEach(() =>
    //         musicApi.register(name, surname, username, password, passwordConfirm)
    //             .then(id => _id = id)
    //             .then(() => musicApi.authenticate(username, password, passwordConfirm))
    //             .then(({ token }) => _token = token)
    //     )

    //     it('should succeed on correct data', () => {
    //         const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

    //         return musicApi.update(_id, _token, data)
    //             .then(() => musicApi.retrieve(_id, _token))
    //             .then(user => {
    //                 expect(user.id).toBe(_id)
    //                 expect(user.name).toBe(data.name)
    //                 expect(user.surname).toBe(data.surname)
    //                 expect(user.age).toBe(data.age)
    //                 expect(user.username).toBe(username)
    //             })
    //     })

    //     // TODO more unit test cases
    // })

    // describe('remove', () => {
    //     const name = 'Manuel'
    //     const surname = 'Barzi'
    //     const username = `manuelbarzi-${Math.random()}`
    //     const password = '123'

    //     let _id, _token

    //     beforeEach(() =>
    //         musicApi.register(name, surname, username, password, passwordConfirm)
    //             .then(id => _id = id)
    //             .then(() => musicApi.authenticate(username, password, passwordConfirm))
    //             .then(({ token }) => _token = token)
    //     )

    //     it('should succeed on correct data', () => {
    //         return musicApi.remove(_id, _token, username, password, passwordConfirm)
    //             .then(() => musicApi.retrieve(_id, _token))
    //             .then(() => {
    //                 throw Error('should not pass by here')
    //             })
    //             .catch(({message}) => expect(message).toBe(`user with id \"${_id}\" does not exist`))
    //     })

    //     // TODO more unit test cases
    // })
})