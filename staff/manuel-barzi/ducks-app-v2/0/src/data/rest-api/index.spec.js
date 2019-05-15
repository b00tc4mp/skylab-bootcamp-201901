import restApi from '.'
import { TimeoutError, ConnectionError, ValueError, RequirementError } from '../../common/errors'

jest.setTimeout(100000)

describe('rest api', () => {
    describe('users', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let email
        const password = '123'

        beforeEach(() => email = `manuelbarzi-${Math.random()}@gmail.com`)

        describe('create', () => {
            it('should succeed on correct user data', () =>
                restApi.create(email, password, { name, surname })
                    .then(response => {
                        expect(response).toBeDefined()

                        const { message, error } = response

                        expect(error).toBeUndefined()
                        expect(message).toBe('Ok, user registered.')
                    })
            )

            describe('on already existing user', () => {
                beforeEach(() => restApi.create(email, password, { name, surname }))

                it('should fail on retrying to register', () =>
                    restApi.create(email, password, { name, surname })
                        .then(response => {
                            expect(response).toBeDefined()

                            const { error: _error } = response

                            expect(_error).toBe(`user with username \"${email}\" already exists`)
                        })
                )
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => restApi.create(email, password, { name, surname })).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => restApi.create(email, password, { name, surname })).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => restApi.create(email, password, { name, surname })).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => restApi.create(email, password, { name, surname })).toThrowError(ValueError, 'email is empty')
            })

            // TODO password fail cases
        })

        describe('authenticate', () => {
            beforeEach(() =>
                restApi.create(email, password, { name, surname })
            )

            it('should succeed on correct user credential', () =>
                restApi.authenticate(email, password)
                    .then(response => {
                        expect(response).toBeDefined()

                        const { error, token } = response

                        expect(error).toBeUndefined()

                        expect(typeof token).toBe('string')
                        expect(token.length).toBeGreaterThan(0)

                        const [, payloadB64,] = token.split('.')
                        const payloadJson = atob(payloadB64)
                        const payload = JSON.parse(payloadJson)

                        expect(typeof payload.id).toBe('string')
                        expect(payload.id.length).toBeGreaterThan(0)
                    })
            )

            it('should fail on non-existing user', () =>
                restApi.authenticate(email = 'unexisting-user@mail.com', password)
                    .then(response => {
                        expect(response).toBeDefined()

                        const { error } = response

                        expect(error).toBe(`user with username \"${email}\" does not exist`)
                    })
            )
        })

        describe('retrieve', () => {
            let token

            beforeEach(() =>
                restApi.create(email, password, { name, surname })
                    .then(response => 
                        restApi.authenticate(email, password)
                    )
                    .then(response => token = response.token)
            )

            it('should succeed on correct user id and token', () =>
                restApi.retrieve(token)
                    .then(response => {
                        expect(response.id).toBeUndefined()
                        expect(response.name).toBe(name)
                        expect(response.surname).toBe(surname)
                        expect(response.email).toBe(email)
                        expect(response.password).toBeUndefined()
                    })
            )

            it('should fail on incorrect user token', () => {
                return restApi.retrieve('wrong-token')
                    .then(response => {
                        const { error } = response

                        expect(error).toBe('invalid token')
                    })
            })
        })

        describe('when api url fails', () => {
            let url

            beforeEach(() => {
                url = restApi.__url__

                restApi.__url__ = 'https://this-is-a-fake-url'
            })

            it('should fail on wrong api url', () =>
                restApi.create(email, password, { name, surname })
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof ConnectionError).toBeTruthy()
                        expect(error.message).toBe('cannot connect')
                    })
            )

            afterEach(() => restApi.__url__ = url)
        })

        describe('when server responds too late', () => {
            const timeout = 1

            beforeEach(() => restApi.__timeout__ = timeout)

            it('should fail on too long wait', () =>
                restApi.create(email, password, { name, surname })
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof TimeoutError).toBeTruthy()
                        expect(error.message).toBe(`time out, exceeded limit of ${timeout}ms`)
                    })
            )

            afterEach(() => restApi.__timeout__ = 0)
        })

        xdescribe('update', () => {
            let token, _data

            beforeEach(() => {
                _data = { array: [1, "2", true], hello: 'world', object: { key: 'value' } }

                return restApi.create(name, surname, email, password)
                    .then(response => {
                        _id = response.data.id

                        return restApi.authenticate(email, password)
                    })
                    .then(response => token = response.data.token)
            })

            it('should succeed on correct data', () =>
                restApi.update(_id, token, _data)
                    .then(response => {
                        const { status, data } = response

                        expect(status).toBe('OK')
                        expect(data).toBeUndefined()
                    })
                    .then(() => restApi.retrieve(_id, token))
                    .then(response => {
                        const { status, data } = response

                        expect(status).toBe('OK')
                        expect(data).toBeDefined()

                        expect(data.id).toBe(_id)
                        expect(data.name).toBe(name)
                        expect(data.surname).toBe(surname)
                        expect(data.email).toBe(email)
                        expect(data.password).toBeUndefined()

                        expect(data.array).toEqual(_data.array)
                        expect(data.hello).toBe(_data.hello)
                        expect(data.object).toEqual(_data.object)
                    })
            )

            it('should succeed on correct data re-updating', () =>
                restApi.update(_id, token, _data)
                    .then(response => {
                        const { status, data } = response

                        expect(status).toBe('OK')
                        expect(data).toBeUndefined()
                    })
                    .then(() => {
                        _data.array = [2, 'b', false]
                        _data.hello = 'mundo'
                        _data.object = { property: 'something' }

                        return restApi.update(_id, token, _data)
                    })
                    .then(response => {
                        const { status, data } = response

                        expect(status).toBe('OK')
                        expect(data).toBeUndefined()
                    })
                    .then(() => restApi.retrieve(_id, token))
                    .then(response => {
                        const { status, data } = response

                        expect(status).toBe('OK')
                        expect(data).toBeDefined()

                        expect(data.id).toBe(_id)
                        expect(data.name).toBe(name)
                        expect(data.surname).toBe(surname)
                        expect(data.email).toBe(email)
                        expect(data.password).toBeUndefined()

                        expect(data.array).toEqual(_data.array)
                        expect(data.hello).toBe(_data.hello)
                        expect(data.object).toEqual(_data.object)
                    })
            )
        })
    })
})