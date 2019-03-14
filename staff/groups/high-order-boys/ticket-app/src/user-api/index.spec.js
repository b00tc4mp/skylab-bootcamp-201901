'use strict'

import userApi from '.'

describe('user api', () => {

    describe('register', () => {
        const name = 'Manolo'
        const surname = 'Skywalker'
        const username = `ManoloSkywalker-${Math.random()}`
        const password = '123'

        it('should succeed on correct data', () =>
            userApi.register(name, surname, username, password)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on undefined', () => {
            try {
                userApi.register()
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

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

        it('should fail on empty name', () => {

            const name = ''

            try {
                userApi.register(name, surname, username, password)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('name is empty')
            }
        })

        it('should fail on empty username', () => {

            const username = ''

            try {
                userApi.register(name, surname, username, password)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('username is empty')
            }
        })


        it('should fail on empty surname', () => {

            const surname = ''

            try {
                userApi.register(name, surname, username, password)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('surname is empty')
            }
        })


        it('should fail on empty password', () => {

            const password = ''

            try {
                userApi.register(name, surname, username, password)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('password is empty')
            }
        })

        // TODO more unit test cases
    })

    describe('authenticate', () => {
        let name = 'Manolo'
        let surname = 'Skywalker'
        let username
        let password
        let _id

        beforeEach(() => {
            username = `ManoloSkywalker-${Math.random()}`
            password = '123'
            return userApi.register(name, surname, username, password)
                .then(id => _id = id)
        }
        )

        it('should succeed on correct data', () =>
            userApi.authenticate(username, password)
                .then(({ id, token }) => {
                    expect(id).toBe(_id)
                    expect(token).toBeDefined()
                })
        )

        it('should fail on undefined', () => {

            try {
                userApi.authenticate()
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })


        it('should fail on empty username', () => {


            try {
                userApi.authenticate('', password)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('username is empty')
            }
        })


        it('should fail on empty password', () => {


            try {
                userApi.authenticate(username, '')
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('password is empty')
            }
        })

        // TODO more unit test cases
    })

    describe('retrieve', () => {
        let name = 'Manolo'
        let surname = 'Skywalker'
        let username
        let password = '123'

        let _id, _token

        beforeEach(() => {

            username = `ManoloSkywalker-${Math.random()}`

            return userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        }
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

        it('should fail on undefined', () => {

            try {
                userApi.retrieve()
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on empty id', () => {

            let _id = ''
            let _token = 'token'

            try {
                userApi.retrieve(_id, _token)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('id is empty')
            }
        })

        it('should fail on empty token', () => {

            let _id = 'id'
            let _token = ''

            try {
                userApi.retrieve(_id, _token)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('token is empty')
            }
        })



        // TODO more unit test cases
    })

    describe('update', () => {
        let name = 'Manolo'
        let surname = 'Skywalker'
        let username
        let password = '123'

        let _id, _token

        beforeEach(() => {

            username = `ManoloSkywalker-${Math.random()}`

            return userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        }
        )
        it('should succeed on correct data', () => {
            let data = { name: 'Pepito', surname: 'Grillo', age: 32 }

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

        it('should fail on undefined', () => {

            try {
                userApi.update()
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on empty id', () => {

            try {
                userApi.update('')
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('id is empty')
            }
        })

        it('should fail on empty token', () => {

            let id = 'id'
            let token = ''
            let data = 'data'

            try {
                userApi.update(id, token, data)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('token is empty')
            }
        })







        // TODO more unit test cases
    })

    describe('remove', () => {
        let name = 'Manolo'
        let surname = 'Skywalker'
        let username
        let password = '123'

        let _id, _token

        beforeEach(() => {
            username = `ManoloSkywalker-${Math.random()}`

            return userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        }
        )



        it('should succeed on correct data', () => {

            return userApi.remove(_id, _token, username, password)
                .then(() => userApi.retrieve(_id, _token))
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({ message }) => expect(message).toBe(`user with id \"${_id}\" does not exist`))
        })


        it('should fail on undefined', () => {

            try {
                userApi.remove(_id, _token, username, password)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`undefined is not a string`)
            }
        })

        it('should fail on empty id', () => {

            let _id = ''
            let _token = 'token'
            let username = 'username'
            let password = '123'

            try {
                userApi.remove(_id, _token, username, password)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('id is empty')
            }
        })


        it('should fail on empty token', () => {

            let _id = 'id'
            let _token = ''
            let username = 'username'
            let password = '123'

            try {
                userApi.remove(_id, _token, username, password)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('token is empty')
            }
        })

        it('should fail on empty username', () => {

            let _id = 'id'
            let _token = 'token'
            let username = ''
            let password = '123'

            try {
                userApi.remove(_id, _token, username, password)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('username is empty')
            }
        })


        it('should fail on empty password', () => {

            let _id = 'id'
            let _token = 'token'
            let username = 'username'
            let password = ''

            try {
                userApi.remove(_id, _token, username, password)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('password is empty')
            }
        })







        // TODO more unit test cases
    })
})