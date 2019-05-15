const logic = require('.')
const { LogicError, RequirementError, ValueError, FormatError } = require('../common/errors')
const userApi = require('../data/user-api')
const duckApi = require('../data/duck-api')
const atob = require('atob')
const _token = require('../common/token')

describe('logic', () => {
    const name = 'Manuel'
    const surname = 'Barzi'
    let email
    const password = '123'

    beforeEach(() => email = `manuelbarzi-${Math.random()}@gmail.com`)

    describe('users', () => {

        describe('register user', () => {
            it('should succeed on correct user data', () =>
                logic.registerUser(name, surname, email, password)
                    .then(response => expect(response).toBeUndefined())
            )

            describe('on already existing user', () => {
                beforeEach(() => logic.registerUser(name, surname, email, password))

                it('should fail on retrying to register', () =>
                    logic.registerUser(name, surname, email, password)
                        .then(() => { throw Error('should not reach this point') })
                        .catch(error => {
                            expect(error).toBeDefined()
                            expect(error instanceof LogicError).toBeTruthy()

                            expect(error.message).toBe(`user with username \"${email}\" already exists`)
                        })
                )
            })

            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on undefined email', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on non-email email', () => {
                const nonEmail = 'non-email'

                expect(() => logic.registerUser(name, surname, nonEmail, password)).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })

            // TODO password fail cases
        })

        describe('authenticate user', () => {
            let id

            beforeEach(() =>
                userApi.create(email, password, { name, surname })
                    .then(response => id = response.data.id)
            )

            it('should succeed on correct user credential', () =>
                logic.authenticateUser(email, password)
                    .then(token => {
                        expect(typeof token).toBe('string')
                        expect(token.length).toBeGreaterThan(0)

                        const [, payloadB64,] = token.split('.')
                        const payloadJson = atob(payloadB64)
                        const payload = JSON.parse(payloadJson)

                        expect(payload.id).toBe(id)
                    })
            )

            it('should fail on non-existing user', () =>
                logic.authenticateUser(email = 'unexisting-user@mail.com', password)
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()

                        expect(error.message).toBe(`user with username \"${email}\" does not exist`)
                    })
            )
        })

        describe('retrieve user', () => {
            let id, token

            beforeEach(() =>
                userApi.create(email, password, { name, surname })
                    .then(response => {
                        id = response.data.id

                        return userApi.authenticate(email, password)
                    })
                    .then(response => {
                        token = response.data.token
                    })
            )

            it('should succeed on correct user id and token', () =>
                logic.retrieveUser(token)
                    .then(user => {
                        expect(user.id).toBeUndefined()
                        expect(user.name).toBe(name)
                        expect(user.surname).toBe(surname)
                        expect(user.email).toBe(email)
                        expect(user.password).toBeUndefined()
                    })
            )
        })

        describe('update user', () => {
            let _id, token, _data
            
            beforeEach(() => {
                _data = { array: [1, "2", true], hello: 'world', object: { key: 'value' } }
    
                return userApi.create(email, password, { name, surname })
                    .then(() => userApi.authenticate(email, password))
                    .then(response => {
                        token = response.data.token
                        const { id } = _token.payload(token)
                        _id = id
                    })
            })
    
            it('should succeed on correct data', () =>
                logic.updateUser(token, _data)
                    .then(response => {
                        expect(response).toBeUndefined()
                    })
                    .then(() => userApi.retrieve(_id, token))
                    .then(response => {
                        const { status, data } = response
    
                        expect(status).toBe('OK')
                        expect(data).toBeDefined()
    
                        expect(data.id).toBe(_id)
                        expect(data.name).toBe(name)
                        expect(data.surname).toBe(surname)
                        expect(data.username).toBe(email)
                        expect(data.password).toBeUndefined()
    
                        expect(data.array).toEqual(_data.array)
                        expect(data.hello).toBe(_data.hello)
                        expect(data.object).toEqual(_data.object)
                    })
            )
    
            it('should succeed on correct data re-updating', () =>
                logic.updateUser(token, _data)
                    .then(response => {
                        expect(response).toBeUndefined()
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
                        expect(data.username).toBe(email)
                        expect(data.password).toBeUndefined()
    
                        expect(data.array).toEqual(_data.array)
                        expect(data.hello).toBe(_data.hello)
                        expect(data.object).toEqual(_data.object)
                    })
            )
        })

        describe('delete user', () => {
            let _id, token, _data
            
            beforeEach(() => {
                return userApi.create(email, password, { name, surname })
                    .then(() => userApi.authenticate(email, password))
                    .then(response => {
                        token = response.data.token
                        _id = response.data.id
                    })
            })
    
            it('should succeed on correct data', () =>
                logic.deleteUser(token, email, password)
                    .then(response => {
                        expect(response).toBeUndefined()
                    })
                    .then(() => userApi.retrieve(_id, token))
                    .then(response => {
                        const { status, error } = response
                        debugger
                        expect(status).toBe('KO')
                        expect(error).toBe(`user with id \"${_id}\" does not exist`)
                    })
            )
        })

        describe('toggle fav duck', () => {
            let id, token, duckId

            beforeEach(() => {
                duckId = `${Math.random()}`

                return userApi.create(email, password, { name, surname })
                    .then(response => {
                        id = response.data.id

                        return userApi.authenticate(email, password)
                    })
                    .then(response => {
                        token = response.data.token
                    })
            })

            it('should succeed adding fav on first time', () =>
                logic.toggleFavDuck(token, duckId)
                    .then(response => expect(response).toBeUndefined())
                    .then(() => userApi.retrieve(id, token))
                    .then(response => {
                        const { data: { favs } } = response

                        expect(favs).toBeDefined()
                        expect(favs instanceof Array).toBeTruthy()
                        expect(favs.length).toBe(1)
                        expect(favs[0]).toBe(duckId)
                    })
            )

            it('should succeed removing fav on second time', () =>
                logic.toggleFavDuck(token, duckId)
                    .then(() => logic.toggleFavDuck(token, duckId))
                    .then(() => userApi.retrieve(id, token))
                    .then(response => {
                        const { data: { favs } } = response

                        expect(favs).toBeDefined()
                        expect(favs instanceof Array).toBeTruthy()
                        expect(favs.length).toBe(0)
                    })
            )

            it('should fail on null duck id', () => {
                duckId = null

                expect(() => logic.toggleFavDuck(token, duckId)).toThrowError(RequirementError, 'id is not optional')
            })

            // TODO more cases
        })

        describe('retrieve fav ducks', () => {
            let token, _favs

            beforeEach(() => {
                _favs = []

                return duckApi.searchDucks('')
                    .then(ducks => {
                        for (let i = 0; i < 10; i++) {
                            const randomIndex = Math.floor(Math.random() * ducks.length)

                            _favs[i] = ducks.splice(randomIndex, 1)[0].id
                        }

                        return userApi.create(email, password, { name, surname, favs: _favs })
                    })
                    .then(response => {
                        id = response.data.id

                        return userApi.authenticate(email, password)
                    })
                    .then(response => {
                        token = response.data.token
                    })
            })

            it('should succeed adding fav on first time', () =>
                logic.retrieveFavDucks(token)
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
    })

    describe('ducks', () => {
        let token

        beforeEach(() => {
            return userApi.create(email, password, { name, surname })
                .then(response => {
                    id = response.data.id

                    return userApi.authenticate(email, password)
                })
                .then(response => {
                    token = response.data.token
                })
        })

        describe('search ducks', () => {
            it('should succeed on correct query', () =>
                logic.searchDucks(token, 'yellow')
                    .then(ducks => {
                        expect(ducks).toBeDefined()
                        expect(ducks instanceof Array).toBeTruthy()
                        expect(ducks.length).toBe(13)
                    })

                // TODO other cases
            )
        })
    })
})