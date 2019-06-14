const restApi = require('.')
const { errors:{TimeoutError, ConnectionError, ValueError, RequirementError} } = require('track-utils')

jest.setTimeout(100000)

describe('rest api', () => {
    const name = 'Manuel'
    const surname = 'Barzi'
    let email
    const password = '123'

    beforeEach(() => email = `manuelbarzi-${Math.random()}@gmail.com`)

    describe('users', () => {
        describe('register user', () => {
            it('should succeed on correct user data', () =>
                restApi.registerUser(name, surname, email, password)
                    .then(response => {
                        expect(response).toBeDefined()

                        const { message, error } = response

                        expect(error).toBeUndefined()
                        expect(message).toBe('Ok, user registered.')
                    })
            )

            describe('on already existing user', () => {
                beforeEach(() => restApi.registerUser(name, surname, email, password))

                it('should fail on retrying to register', () =>
                    restApi.registerUser(name, surname, email, password)
                        .then(response => {
                            expect(response).toBeDefined()

                            const { error: _error } = response

                            expect(_error).toBe(`user with username \"${email}\" already exists`)
                        })
                )
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => restApi.registerUser(name, surname, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => restApi.registerUser(name, surname, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => restApi.registerUser(name, surname, email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => restApi.registerUser(name, surname, email, password)).toThrowError(ValueError, 'email is empty')
            })

            // TODO password fail cases
        })

        describe('authenticate user', () => {
            beforeEach(() =>
                restApi.registerUser(name, surname, email, password)
            )

            it('should succeed on correct user credential', () =>
                restApi.authenticateUser(email, password)
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
                restApi.authenticateUser(email = 'unexisting-user@mail.com', password)
                    .then(response => {
                        expect(response).toBeDefined()

                        const { error } = response

                        expect(error).toBe(`user with username \"${email}\" does not exist`)
                    })
            )
        })

        describe('retrieve user', () => {
            let token

            beforeEach(() =>
                restApi.registerUser(name, surname, email, password)
                    .then(response =>
                        restApi.authenticateUser(email, password)
                    )
                    .then(response => token = response.token)
            )

            it('should succeed on correct user id and token', () =>
                restApi.retrieveUser(token)
                    .then(response => {
                        expect(response.id).toBeUndefined()
                        expect(response.name).toBe(name)
                        expect(response.surname).toBe(surname)
                        expect(response.email).toBe(email)
                        expect(response.password).toBeUndefined()
                    })
            )

            it('should fail on incorrect user token', () => {
                return restApi.retrieveUser('wrong-token')
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
                restApi.registerUser(name, surname, email, password)
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
                restApi.registerUser(name, surname, email, password)
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof TimeoutError).toBeTruthy()
                        expect(error.message).toBe(`time out, exceeded limit of ${timeout}ms`)
                    })
            )

            afterEach(() => restApi.__timeout__ = 0)
        })

        xdescribe('update', () => { // TODO refactor
            let token, _data

            beforeEach(() => {
                _data = { array: [1, "2", true], hello: 'world', object: { key: 'value' } }

                return restApi.registerUser(name, surname, email, password)
                    .then(response => {
                        _id = response.data.id

                        return restApi.authenticateUser(email, password)
                    })
                    .then(response => token = response.data.token)
            })

            it('should succeed on correct data', () =>
                restApi.updateUser(_id, token, _data)
                    .then(response => {
                        const { status, data } = response

                        expect(status).toBe('OK')
                        expect(data).toBeUndefined()
                    })
                    .then(() => restApi.retrieveUser(_id, token))
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
                restApi.updateUser(_id, token, _data)
                    .then(response => {
                        const { status, data } = response

                        expect(status).toBe('OK')
                        expect(data).toBeUndefined()
                    })
                    .then(() => {
                        _data.array = [2, 'b', false]
                        _data.hello = 'mundo'
                        _data.object = { property: 'something' }

                        return restApi.updateUser(_id, token, _data)
                    })
                    .then(response => {
                        const { status, data } = response

                        expect(status).toBe('OK')
                        expect(data).toBeUndefined()
                    })
                    .then(() => restApi.retrieveUser(_id, token))
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

    describe('ducks', () => {
        let token

        beforeEach(() =>
            restApi.registerUser(name, surname, email, password)
                .then(() =>
                    restApi.authenticateUser(email, password)
                )
                .then(response => token = response.token)
        )

        describe('search ducks', () => {
            it('should succeed on correct query', () =>
                restApi.searchDucks(token, 'yellow')
                    .then(ducks => {
                        expect(ducks).toBeDefined()
                        expect(ducks instanceof Array).toBeTruthy()
                        expect(ducks.length).toBe(13)
                    })
            )
        })

        describe('toggle fav duck', () => {
            let duckId

            beforeEach(() =>
                restApi.searchDucks(token, '')
                    .then(ducks => duckId = ducks[0].id)
            )

            it('should succeed adding fav on first time', () =>
                restApi.toggleFavDuck(token, duckId)
                    .then(response => {
                        const { message } = response

                        expect(message).toBe('Ok, duck toggled.')
                    })
                    .then(() => restApi.retrieveFavDucks(token))
                    .then(favs => {
                        debugger
                        expect(favs).toBeDefined()
                        expect(favs instanceof Array).toBeTruthy()
                        expect(favs.length).toBe(1)
                        expect(favs[0].id).toBe(duckId)
                    })
            )

            it('should succeed removing fav on second time', () =>
                restApi.toggleFavDuck(token, duckId)
                    .then(() => restApi.toggleFavDuck(token, duckId))
                    .then(() => restApi.retrieveFavDucks(token))
                    .then(favs => {
                        expect(favs).toBeDefined()
                        expect(favs instanceof Array).toBeTruthy()
                        expect(favs.length).toBe(0)
                    })
            )

            it('should fail on null duck id', () => {
                duckId = null

                expect(() => restApi.toggleFavDuck(token, duckId)).toThrowError(RequirementError, 'id is not optional')
            })

            // TODO more cases
        })

        describe('retrieve fav ducks', () => {
            let _favs

            beforeEach(() => {
                _favs = []

                return restApi.searchDucks(token, '')
                    .then(ducks => {
                        const toggles = []

                        for (let i = 0; i < 10; i++) {
                            const randomIndex = Math.floor(Math.random() * ducks.length)

                            const duckId = _favs[i] = ducks.splice(randomIndex, 1)[0].id

                            toggles.push(restApi.toggleFavDuck(token, duckId))
                        }

                        return Promise.all(toggles)
                    })
            })

            it('should succeed adding fav on first time', () =>
                restApi.retrieveFavDucks(token)
                    .then(ducks => {
                        ducks.forEach(({ id, title, imageUrl, description, price }) => {
                            const isFav = _favs.some(fav => fav === id)

                            expect(isFav).toBeTruthy()
                            expect(typeof title).toBe('string')
                            expect(title.length).toBeGreaterThan(0)
                            expect(typeof imageUrl).toBe('string')
                            expect(imageUrl.length).toBeGreaterThan(0)
                            expect(typeof description).toBe('string')
                            expect(description.length).toBeGreaterThan(0)
                            expect(typeof price).toBe('string')
                            expect(price.length).toBeGreaterThan(0)
                        })
                    })
            )
        })

        // TODO other cases
    })
})