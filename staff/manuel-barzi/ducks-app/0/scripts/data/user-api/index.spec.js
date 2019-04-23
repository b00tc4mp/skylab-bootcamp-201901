'use strict'

describe('user api', () => {
    const name = 'Manuel'
    const surname = 'Barzi'
    let username
    const password = '123'

    beforeEach(() => username = `manuelbarzi-${Math.random()}@gmail.com`)

    describe('create', () => {
        it('should succeed on correct user data', done => {
            userApi.create(name, surname, username, password, function (error, response) {
                expect(error).toBeUndefined()
                expect(response).toBeDefined()

                const { status, data } = response

                expect(status).toBe('OK')
                expect(data).toBeDefined()

                const { id } = data
                expect(typeof id).toBe('string')
                expect(id.length).toBeGreaterThan(0)

                done()
            })
        })

        describe('on already existing user', () => {
            beforeEach(done => userApi.create(name, surname, username, password, done))

            it('should fail on retrying to register', done => {
                userApi.create(name, surname, username, password, function (error, response) {
                    expect(error).toBeUndefined()
                    expect(response).toBeDefined()

                    const { status, error: _error } = response

                    expect(status).toBe('KO')
                    expect(_error).toBe(`user with username \"${username}\" already exists`)

                    done()
                })
            })
        })

        it('should fail on undefined name', () => {
            const name = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `name is not optional`)
        })

        it('should fail on null name', () => {
            const name = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `name is not optional`)
        })

        it('should fail on empty name', () => {
            const name = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'name is empty')
        })

        it('should fail on blank name', () => {
            const name = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'name is empty')
        })

        it('should fail on undefined surname', () => {
            const surname = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `surname is not optional`)
        })

        it('should fail on null surname', () => {
            const surname = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `surname is not optional`)
        })

        it('should fail on empty surname', () => {
            const surname = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'surname is empty')
        })

        it('should fail on blank surname', () => {
            const surname = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'surname is empty')
        })

        it('should fail on undefined username', () => {
            const username = undefined

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on null username', () => {
            const username = null

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(RequirementError, `username is not optional`)
        })

        it('should fail on empty username', () => {
            const username = ''

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        it('should fail on blank username', () => {
            const username = ' \t    \n'

            expect(() => userApi.create(name, surname, username, password, () => { })).toThrowError(ValueError, 'username is empty')
        })

        // TODO password fail cases
    })

    describe('authenticate', () => {
        let _id

        beforeEach(done => userApi.create(name, surname, username, password, function (error, response) {
            _id = response.data.id

            done()
        }))

        it('should succeed on correct user credential', done => {
            userApi.authenticate(username, password, function (error, response) {
                expect(error).toBeUndefined()
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

                const [,payloadB64,] = token.split('.')
                const payloadJson = atob(payloadB64)
                const payload = JSON.parse(payloadJson)

                expect(payload.id).toBe(id)

                done()
            })
        })

        it('should fail on non-existing user', done => {
            userApi.authenticate(username = 'unexisting-user@mail.com', password, function (error, response) {
                expect(error).toBeUndefined()
                expect(response).toBeDefined()

                const { status, error: _error } = response

                expect(status).toBe('KO')
                expect(_error).toBe(`user with username \"${username}\" does not exist`)

                done()
            })
        })
    })

    describe('retrieve', () => {
        let _id, token

        beforeEach(done => userApi.create(name, surname, username, password, function (error, response) {
            _id = response.data.id

            userApi.authenticate(username, password, function (error, response) {
                token = response.data.token

                done()
            })
        }))

        it('should succeed on correct user id and token', done => {
            userApi.retrieve(_id, token, function (error, response) {
                expect(error).toBeUndefined()

                const { status, data } = response

                expect(status).toBe('OK')
                expect(data).toBeDefined()

                expect(data.id).toBe(_id)
                expect(data.name).toBe(name)
                expect(data.surname).toBe(surname)
                expect(data.username).toBe(username)
                expect(data.password).toBeUndefined()

                done()
            })
        })

        it('should fail on incorrect user id', done => {
            const wrongId = '5cb9998f2e59ee0009eac02c'

            userApi.retrieve(wrongId, token, function (error, response) {
                expect(error).toBeUndefined()

                const { status, error: _error } = response

                expect(status).toBe('KO')
                expect(_error).toBe(`token id \"${_id}\" does not match user \"${wrongId}\"`)

                done()
            })
        })
    })

    describe('when api url fails', () => {
        let url

        beforeEach(() => {
            url = userApi.__url__

            userApi.__url__ = 'https://this-is-a-fake-url'
        })

        it('should fail on wrong api url', done => {
            userApi.create(name, surname, username, password, function (error, response) {
                expect(error).toBeDefined()
                expect(error instanceof ConnectionError).toBeTruthy()
                expect(error.message).toBe('cannot connect')
                expect(response).toBeUndefined()

                done()
            })
        })

        afterEach(() => userApi.__url__ = url)
    })

    describe('when server responds too late', () => {
        const timeout = 1

        beforeEach(() => userApi.__timeout__ = timeout)

        it('should fail on too long wait', done => {
            userApi.create(name, surname, username, password, function (error, response) {
                expect(error).toBeDefined()
                expect(error instanceof TimeoutError).toBeTruthy()
                expect(error.message).toBe(`time out, exceeded limit of ${timeout}ms`)
                expect(response).toBeUndefined()

                done()
            })
        })

        afterEach(() => userApi.__timeout__ = 0)
    })
})