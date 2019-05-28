import logic from '.'
import { LogicError, RequirementError, ValueError, FormatError } from '../common/errors'
import restApi from '../data/rest-api'

jest.setTimeout(100000)

describe('logic', () => {
    describe('users', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        let email
        const password = '123'

        beforeEach(() => {
            email = `manuelbarzi-${Math.random()}@gmail.com`

            logic.__userToken__ = null
        })

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

                            expect(error.message).toBe(`user with email \"${email}\" already exists`)
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

        describe('login user', () => {
            beforeEach(() =>
                restApi.registerUser(name, surname, email, password)
            )

            it('should succeed on correct user credential', () =>
                logic.loginUser(email, password)
                    .then(() => {
                        const { __userToken__ } = logic

                        expect(typeof __userToken__).toBe('string')
                        expect(__userToken__.length).toBeGreaterThan(0)

                        const [, payloadB64,] = __userToken__.split('.')
                        const payloadJson = atob(payloadB64)
                        const payload = JSON.parse(payloadJson)

                        expect(typeof payload.sub).toBe('string')
                        expect(payload.sub.length).toBeGreaterThan(0)

                        expect(logic.isUserLoggedIn).toBeTruthy()
                    })
            )

            it('should fail on non-existing user', () =>
                logic.loginUser(email = 'unexisting-user@mail.com', password)
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()

                        expect(error.message).toBe(`user with email \"${email}\" does not exist`)
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
                    .then(response => {
                        token = response.token

                        logic.__userToken__ = token
                    })
            )

            it('should succeed on correct user id and token', () =>
                logic.retrieveUser()
                    .then(user => {
                        expect(user.id).toBeUndefined()
                        expect(user.name).toBe(name)
                        expect(user.surname).toBe(surname)
                        expect(user.email).toBe(email)
                        expect(user.password).toBeUndefined()
                    })
            )

            it('should fail on incorrect user token', () => {
                logic.__userToken__ = 'wrong-token'

                return logic.retrieveUser()
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error instanceof LogicError).toBeTruthy()

                        //expect(error.message).toBe(`invalid token`)
                        expect(error.message).toBe('jwt malformed')
                    })
            })
        })

        describe('ducks', () => {
            let token

            beforeEach(() =>
                restApi.registerUser(name, surname, email, password)
                    .then(() =>
                        restApi.authenticateUser(email, password)
                    )
                    .then(response => {
                        token = response.token

                        logic.__userToken__ = token
                    })
            )

            describe('toggle fav duck', () => {
                let duckId

                beforeEach(() =>
                    restApi.searchDucks(token, '')
                        .then(ducks => duckId = ducks[0].id)
                )

                it('should succeed adding fav on first time', () =>
                    logic.toggleFavDuck(duckId)
                        .then(response => expect(response).toBeUndefined())
                        .then(() => restApi.retrieveFavDucks(token))
                        .then(favs => {
                            expect(favs).toBeDefined()
                            expect(favs instanceof Array).toBeTruthy()
                            expect(favs.length).toBe(1)
                            expect(favs[0].id).toBe(duckId)
                        })
                )

                it('should succeed removing fav on second time', () =>
                    logic.toggleFavDuck(duckId)
                        .then(() => logic.toggleFavDuck(duckId))
                        .then(() => restApi.retrieveFavDucks(token))
                        .then(favs => {
                            expect(favs).toBeDefined()
                            expect(favs instanceof Array).toBeTruthy()
                            expect(favs.length).toBe(0)
                        })
                )

                it('should fail on null duck id', () => {
                    duckId = null

                    expect(() => logic.toggleFavDuck(duckId)).toThrowError(RequirementError, 'id is not optional')
                })

                // TODO more cases
            })

            describe('retrieve fav ducks', () => {
                let _favs

                beforeEach(() => {
                    _favs = []

                    return restApi.searchDucks(token, '')
                        .then(ducks => {
                            for (let i = 0; i < 10; i++) {
                                const randomIndex = Math.floor(Math.random() * ducks.length)

                                _favs[i] = ducks.splice(randomIndex, 1)[0].id
                            }
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


            describe('toggle cart duck', () => {
                let duckId

                beforeEach(() =>
                    restApi.searchDucks(token, '')
                        .then(ducks => duckId = ducks[0].id)
                )

                it('should succeed adding duck to cart on first time', () =>
                    logic.toggleCartDuck(duckId)
                        .then(response => expect(response).toBeUndefined())
                        .then(() => restApi.retrieveCartDucks(token))
                        .then(cart => {
                            expect(cart).toBeDefined()
                            expect(cart instanceof Array).toBeTruthy()
                            expect(cart.length).toBe(1)
                            expect(cart[0].id).toBe(duckId)
                        })
                )

                it('should succeed removing duck from cart on second time', () =>
                    logic.toggleCartDuck(duckId)
                        .then(() => logic.toggleCartDuck(duckId))
                        .then(() => restApi.retrieveCartDucks(token))
                        .then(cart => {
                            expect(cart).toBeDefined()
                            expect(cart instanceof Array).toBeTruthy()
                            expect(cart.length).toBe(0)
                        })
                )

                it('should fail on null duck id', () => {
                    duckId = null

                    expect(() => logic.toggleCartDuck(duckId)).toThrowError(RequirementError, 'id is not optional')
                })

                // TODO more cases
            })

            describe('retrieve cart ducks', () => {
                let _cart

                beforeEach(() => {
                    _cart = []

                    return restApi.searchDucks(token, '')
                        .then(ducks => {
                            for (let i = 0; i < 10; i++) {
                                const randomIndex = Math.floor(Math.random() * ducks.length)

                                _cart[i] = ducks.splice(randomIndex, 1)[0].id
                            }
                        })
                })

                it('should succeed on cart', () =>
                    logic.retrieveCartDucks(token)
                        .then(ducks => {
                            ducks.forEach(({ id, title, imageUrl, description, price }) => {
                                const isInCart = _cart.some(cartItem => cartItem === id)

                                expect(isInCart).toBeTruthy()
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

            describe('delete cart ducks', () => {
                // TODO
            })
    
            describe('cart ducks to orders', () => {
                // TODO
            })

            describe('search ducks', () => {
                it('should succeed on correct query', () =>
                    logic.searchDucks('yellow')
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
})