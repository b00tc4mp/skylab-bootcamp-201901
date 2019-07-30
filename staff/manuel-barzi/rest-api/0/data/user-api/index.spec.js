const userApi = require('.')
const { TimeoutError, ConnectionError, ValueError, RequirementError } = require('../../common/errors')
const atob = require('atob')

fdescribe('user api', () => {
    const name = 'Manuel'
    const surname = 'Barzi'
    let username
    const password = '123'

    beforeEach(() => username = `manuelbarzi-${Math.random()}@gmail.com`)

    describe('create', () => {
        it('should succeed on correct user data', () =>
            userApi.create(username, password, { name, surname })
                .then(response => {
                    debugger
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

        it('should fail on undefined username', () => {
            const username = undefined

            expect(() => userApi.create(username, password, { name, surname })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on null username', () => {
            const username = null

            expect(() => userApi.create(username, password, { name, surname })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on empty username', () => {
            const username = ''

            expect(() => userApi.create(username, password, { name, surname })).toThrowError(ValueError, 'username is empty')
        })

        it('should fail on blank username', () => {
            const username = ' \t    \n'

            expect(() => userApi.create(username, password, { name, surname })).toThrowError(ValueError, 'username is empty')
        })

        // TODO password fail cases
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

        it('should fail on non-existing user', () =>
            userApi.authenticate(username = 'unexisting-user@mail.com', password)
                .then(response => {
                    expect(response).toBeDefined()

                    const { status, error: _error } = response

                    expect(status).toBe('KO')
                    expect(_error).toBe(`user with username \"${username}\" does not exist`)
                })
        )
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