import userApi from '.'
import { TimeoutError, ConnectionError, ValueError, RequirementError } from '../../common/errors'

describe('user api', () => {
    const name = 'Manuel'
    const surname = 'Barzi'
    let username
    const password = '123'

    beforeEach(() => username = `manuelbarzi-${Math.random()}@gmail.com`)

    describe('create', () => {
        it('should succeed on correct user data', () =>
            userApi.create(username, password, { name, surname })
                .then(response => {
                    expect(response).toBeDefined()

                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeDefined()

                    const { id } = data
                    expect(typeof id).toBe('string')
                    expect(id.length).toBeGreaterThan(0)
                })
        )

        describe('on already existing user', () => {
            beforeEach(() => userApi.create(username, password, { name, surname }))

            it('should fail on retrying to register', () =>
                userApi.create(username, password, { name, surname })
                    .then(response => {
                        expect(response).toBeDefined()

                        const { status, error: _error } = response

                        expect(status).toBe('KO')
                        expect(_error).toBe(`user with username \"${username}\" already exists`)
                    })
            )
        })


        describe('on validate parameters', () => {

            it('should fail on empty username', () => {
                const username = ''

                expect(() => userApi.create(username, password, { name, surname })).toThrowError(ValueError, 'username is empty')
            })

            it('should fail on blank username', () => {
                const username = ' \t    \n'

                expect(() => userApi.create(username, password, { name, surname })).toThrowError(ValueError, 'username is empty')
            })

            it('should fail on undefined password', () => {
                const password = undefined
    
                expect(() => userApi.create(username, password, { name, surname })).toThrowError(RequirementError, `password is not optional`)
            })
    
            it('should fail on empty password', () => {
                const password = ''
    
                expect(() => userApi.create(username, password, { name, surname })).toThrowError(ValueError, 'password is empty')
            })
    
            it('should fail on blank password', () => {
                const password = ' \t    \n'
    
                expect(() => userApi.create(username, password, { name, surname })).toThrowError(ValueError, 'password is empty')
            })

       })

    })

    describe('authenticate', () => {
        let _id

        beforeEach(() =>
            userApi.create(username, password, { name, surname })
                .then(response => _id = response.data.id)
        )

        it('should succeed on correct user credential', () =>
            userApi.authenticate(username, password)
                .then(response => {
                    expect(response).toBeDefined()

                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeDefined()

                    const { id, token } = data

                    expect(typeof id).toBe('string')
                    expect(id.length).toBeGreaterThan(0)
                    expect(id).toBe(_id)

                    expect(typeof token).toBe('string')
                    expect(token.length).toBeGreaterThan(0)

                    const [, payloadB64,] = token.split('.')
                    const payloadJson = atob(payloadB64)
                    const payload = JSON.parse(payloadJson)

                    expect(payload.id).toBe(id)
                })
        )


        it('should fail on a wrong password', () => {
            const wrongPassword = 'aqwrdd'
            userApi.authenticate(username, wrongPassword)
                .then(response => {               
                    expect(response).toBeDefined()
                    const { status, error: _error } = response

                    expect(status).toBe('KO')
                    expect(_error).toBe(`username and/or password wrong`)
                }
            )
        })


        it('should fail on non-existing user', () =>
            userApi.authenticate(username = 'unexisting-user@mail.com', password)
                .then(response => {
                    expect(response).toBeDefined()

                    const { status, error: _error } = response

                    expect(status).toBe('KO')
                    expect(_error).toBe(`user with username \"${username}\" does not exist`)
                })
        )

        describe('on validate parameters', () => {

            it('should fail on undefined username', () => {
                const username = undefined

                expect(() => userApi.authenticate(username, password, { name, surname })).toThrowError(RequirementError, `username is not optional`)
            })

            it('should fail on empty username', () => {
                const username = ''

                expect(() => userApi.authenticate(username, password, { name, surname })).toThrowError(ValueError, 'username is empty')
            })

            it('should fail on blank username', () => {
                const username = ' \t    \n'

                expect(() => userApi.authenticate(username, password, { name, surname })).toThrowError(ValueError, 'username is empty')
            })

            it('should fail on undefined password', () => {
                const password = undefined
                expect(() => userApi.authenticate(username, password, { name, surname })).toThrowError(RequirementError, `password is not optional`)
            })
    
            it('should fail on empty password', () => {
                const password = ''
                expect(() => userApi.authenticate(username, password, { name, surname })).toThrowError(ValueError, 'password is empty')
            })
    
            it('should fail on blank password', () => {
                const password = ' \t    \n'
                expect(() => userApi.authenticate(username, password, { name, surname })).toThrowError(ValueError, 'password is empty')
            })
       })

    })

    describe('retrieve', () => {
        let _id, token

        beforeEach(() =>
            userApi.create(username, password, { name, surname })
                .then(response => {
                    _id = response.data.id

                    return userApi.authenticate(username, password)
                })
                .then(response => token = response.data.token)
        )

        it('should succeed on correct user id and token', () =>
            userApi.retrieve(_id, token)
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeDefined()

                    expect(data.id).toBe(_id)
                    expect(data.name).toBe(name)
                    expect(data.surname).toBe(surname)
                    expect(data.username).toBe(username)
                    expect(data.password).toBeUndefined()
                })
        )

        it('should fail on incorrect user id', () => {
            const wrongId = '5cb9998f2e59ee0009eac02c'

            return userApi.retrieve(wrongId, token)
                .then(response => {
                    const { status, error: _error } = response

                    expect(status).toBe('KO')
                    expect(_error).toBe(`token id \"${_id}\" does not match user \"${wrongId}\"`)
                })
        })

        it('should fail on a wrong token', () => {
            const wrongUserToken = "123456"
            userApi.retrieve(_id, wrongUserToken)
                .then(response => {
                    const { status, error: _error } = response
                    expect(status).toBe('KO')
                    expect(_error).toBe(`invalid token`)
                }
            )
        })

    })

    describe('on validate parameters', () => {
        it('should fail on undefined id', () => {
            const id = undefined
            const token = '1234567890abcdefghijk'
            expect(() => userApi.retrieve(id, token, () => { }, () => { })).toThrowError(RequirementError, `id is not optional`)
        })

        it('should fail on empty id', () => {
            const id = ''
            const token = '1234567890abcdefghijk'
            expect(() => userApi.retrieve(id, token, () => { }, () => { })).toThrowError(ValueError, 'id is empty')
        })

        it('should fail on blank id', () => {
            const id = ' \t    \n'
            const token = '1234567890abcdefghijk'
            expect(() => userApi.retrieve(id, token, () => { }, () => { })).toThrowError(ValueError, 'id is empty')
        })

        it('should fail on undefined token', () => {
            const id = '123456'
            const token = undefined
            expect(() => userApi.retrieve(id, token, () => { }, () => { })).toThrowError(RequirementError, `token is not optional`)
        })

        it('should fail on empty token', () => {
            const id = '123456'
            const token = ''
            expect(() => userApi.retrieve(id, token, () => { }, () => { })).toThrowError(ValueError, 'token is empty')
        })

        it('should fail on blank token', () => {
            const id = '123456'
            const token = ' \t    \n'
            expect(() => userApi.retrieve(id, token, () => { }, () => { })).toThrowError(ValueError, 'token is empty')
        })
      
    })


    describe('when api url fails', () => {
        let url

        beforeEach(() => {
            url = userApi.__url__

            userApi.__url__ = 'https://this-is-a-fake-url'
        })

        it('should fail on wrong api url', () =>
            userApi.create(username, password, { name, surname })
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof ConnectionError).toBeTruthy()
                    expect(error.message).toBe('cannot connect')
                })
        )

        afterEach(() => userApi.__url__ = url)
    })

    describe('when server responds too late', () => {
        const timeout = 1

        beforeEach(() => userApi.__timeout__ = timeout)

        it('should fail on too long wait', () =>
            userApi.create(username, password, { name, surname })
                .then(() => { throw Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error instanceof TimeoutError).toBeTruthy()
                    expect(error.message).toBe(`time out, exceeded limit of ${timeout}ms`)
                })
        )

        afterEach(() => userApi.__timeout__ = 0)
    })

    describe('update', () => {
        let _id, token, _data

        beforeEach(() => {
            _data = { array: [1, "2", true], hello: 'world', object: { key: 'value' } }

            return userApi.create(username, password, { name, surname })
                .then(response => {
                    _id = response.data.id

                    return userApi.authenticate(username, password)
                })
                .then(response => token = response.data.token)
        })

        it('should succeed on correct data', () =>
            userApi.update(_id, token, _data)
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeUndefined()
                })
                .then(() => userApi.retrieve(_id, token))
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeDefined()

                    expect(data.id).toBe(_id)
                    expect(data.name).toBe(name)
                    expect(data.surname).toBe(surname)
                    expect(data.username).toBe(username)
                    expect(data.password).toBeUndefined()

                    expect(data.array).toEqual(_data.array)
                    expect(data.hello).toBe(_data.hello)
                    expect(data.object).toEqual(_data.object)
                })
        )

        it('should succeed on correct data re-updating', () =>
            userApi.update(_id, token, _data)
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeUndefined()
                })
                .then(() => {
                    _data.array = [2, 'b', false]
                    _data.hello = 'mundo'
                    _data.object = { property: 'something' }

                    return userApi.update(_id, token, _data)
                })
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeUndefined()
                })
                .then(() => userApi.retrieve(_id, token))
                .then(response => {
                    const { status, data } = response

                    expect(status).toBe('OK')
                    expect(data).toBeDefined()

                    expect(data.id).toBe(_id)
                    expect(data.name).toBe(name)
                    expect(data.surname).toBe(surname)
                    expect(data.username).toBe(username)
                    expect(data.password).toBeUndefined()

                    expect(data.array).toEqual(_data.array)
                    expect(data.hello).toBe(_data.hello)
                    expect(data.object).toEqual(_data.object)
                })
        )
    })
})