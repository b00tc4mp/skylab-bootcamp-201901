import restApi from '.'
import { TimeoutError, LogicError, ValueError, RequirementError } from '../../common/errors'

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
                        .then(() => { throw Error('should not reach this point') })
                        .catch(({message}) => {
                            expect(message).toBe(`user with email \"${email}\" already exists`)
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
                        
                        const { token } = response

                        expect(typeof token).toBe('string')
                        expect(token.length).toBeGreaterThan(0)

                        const [, payloadB64,] = token.split('.')
                        const payloadJson = atob(payloadB64)
                        const payload = JSON.parse(payloadJson)
                        
                        expect(typeof payload.sub).toBe('string')
                        expect(payload.sub.length).toBeGreaterThan(0)
                    })
            )

            it('should fail on non-existing user', () =>
                restApi.authenticateUser(email = 'unexisting-user@mail.com', password)
                    .then(() => { throw Error('should not reach this point') })
                    .catch(({message}) => {
                        expect(message).toBe(`user with email \"${email}\" does not exist`)
                    })
            )
        })

        describe('retrieve user', () => {
            let token

            beforeEach(() =>
                restApi.registerUser(name, surname, email, password)
                    .then(() => restApi.authenticateUser(email, password))
                    .then(response => token = response.token)
            )

            it('should succeed on correct user token', () =>
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
                    .then(() => { throw Error('should not reach this point') })
                    .catch(({message}) => {
                        expect(message).toBe('jwt malformed')
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
                        expect(error.message).toBe("Network Error")
                    })
            )

            afterEach(() => restApi.__url__ = url)
        })

        xdescribe('when server responds too late', () => {
            const timeout = 1

            beforeEach(() => restApi.__timeout__ = timeout)

            it('should fail on too long wait', () =>
                restApi.registerUser(name, surname, email, password)
                    .then(() => { throw Error('should not reach this point') })
                    .catch(error => {
                        debugger
                        expect(error).toBeDefined()
                        expect(error instanceof TimeoutError).toBeTruthy()
                        expect(error.message).toBe(`time out, exceeded limit of ${timeout}ms`)
                    })
            )

            afterEach(() => restApi.__timeout__ = 0)
        })

        describe('update', () => {
            let token, data, _data 

            beforeEach(() => {
                data = { name: 'peter', surname: 'pan', email: 'peterpan@gmail.com' }

                return restApi.registerUser(name, surname, email, password)
                    .then(() => restApi.authenticateUser(email, password))
                    .then(response => token = response.token)
            })

            it('should succeed on correct data', () =>
                restApi.updateUser(token, data)
                    .then(response => {
                        const { message } = response

                        expect(message).toBe('Ok, user updated.')
                    })
                    .then(() => restApi.retrieveUser(token))
                    .then(user => {
                        expect(user).toBeDefined()

                        expect(user.name).toBe(data.name)
                        expect(user.surname).toBe(data.surname)
                        expect(user.email).toBe(data.email)
                        expect(user.password).toBeUndefined()
                    })
            )

            it('should succeed on correct data re-updating', () =>
                restApi.updateUser(token, data)
                    .then(response => {
                        const { message } = response

                        expect(message).toBe('Ok, user updated.')
                    })
                    .then(() => {
                        _data = { name: 'captain', surname: 'hook', email: 'hook@mail.com' }

                        return restApi.updateUser(token, _data)
                    })
                    .then(response => {
                        const { message } = response

                        expect(message).toBe('Ok, user updated.')
                    })
                    .then(() => restApi.retrieveUser(token))
                    .then(user => {
                        expect(user).toBeDefined()

                        expect(user.name).toBe(_data.name)
                        expect(user.surname).toBe(_data.surname)
                        expect(user.email).toBe(_data.email)
                        expect(user.password).toBeUndefined()
                    })
            )
        })

        describe('delete', () => {
            let token

            beforeEach(() => restApi.registerUser(name, surname, email, password)
                    .then(() => restApi.authenticateUser(email, password))
                    .then(response => token = response.token)
            )
            
            it('should succed on correct id', () => {
                return restApi.deleteUser(token, email, password)
                    .then(response => {
                        const { message } = response
                        expect(message).toBe('Ok, user deleted.')
                        
                        return restApi.retrieveUser(token) 
                    })
                    .then(() => { throw Error('should not reach this point') })
                    .catch(({message}) => {
                        const [, payloadB64,] = token.split('.')
                        const payloadJson = atob(payloadB64)
                        const payload = JSON.parse(payloadJson)
                        
                        expect(typeof payload.sub).toBe('string')
                        expect(payload.sub.length).toBeGreaterThan(0)
                        expect(message).toBe(`user with id \"${payload.sub}\" does not exist`)
                    })
            })
    
            it('should fail on incorrect token', () => {
                let token = 'wrong_token'
                
                return restApi.deleteUser(token, email, password)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error.message).toBe('jwt malformed')
                    })
            })

            it('should fail on incorrect email', () => {
                let email = 'fake_email@gmail.com' 

                return restApi.deleteUser(token, email, password)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error.message).toBe('wrong credentials')
                    })
            })

            it('should fail on incorrect password', () => {
                let password = '423'

                return restApi.deleteUser(token, email, password)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error.message).toBe('wrong credentials')
                    })
            })
        })
    })

    describe('ducks', () => {
        let token

        beforeEach(() =>
            restApi.registerUser(name, surname, email, password)
                .then(() => restApi.authenticateUser(email, password))
                .then(response => token = response.token)
        )

        describe('search ducks', () => {
            it('should succeed on correct query', () => {
                return restApi.searchDucks(token, 'yellow')
                    .then(ducks => {
                        expect(ducks).toBeDefined()
                        expect(ducks instanceof Array).toBeTruthy()
                        expect(ducks.length).toBe(13)
                    })
            })
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

    describe('cart', () => {
        let token, duckId, _duckId

        beforeEach(() => {
            return restApi.registerUser(name, surname, email, password)
                .then(() => restApi.authenticateUser(email, password))
                .then(response => {
                    token = response.token
                    return restApi.searchDucks(token, '')
                })
                .then(ducks => {
                    duckId = ducks[0].id
                    _duckId = ducks[1].id
                })
        })

        describe('add items', () => {
            it('should succed adding one item', () => 
                restApi.addToCart(token, duckId)
                    .then(response => {
                        const { message } = response

                        expect(message).toBe('Ok, item added.')
                    })
                    .then(() => restApi.retrieveCartItems(token))
                    .then(cart => {
                        expect(cart).toBeDefined()
                        expect(cart).toBeInstanceOf(Array)
                        expect(cart).toHaveLength(1)
                        expect(cart[0]).toBeInstanceOf(Object)
                        expect(cart[0].id).toBe(duckId)
                        expect(cart[0].qty).toBe(1)
                    })
            )

            it('should succed adding an item twice', () => 
                restApi.addToCart(token, duckId)
                    .then(response => {
                        const { message } = response

                        expect(message).toBe('Ok, item added.')
                        
                        return  restApi.addToCart(token, duckId)
                    })
                    .then(response => {
                        const { message } = response

                        expect(message).toBe('Ok, item added.')
                    })
                    .then(() => restApi.retrieveCartItems(token))
                    .then(cart => {
                        expect(cart).toBeDefined()
                        expect(cart).toBeInstanceOf(Array)
                        expect(cart).toHaveLength(1)
                        expect(cart[0]).toBeInstanceOf(Object)
                        expect(cart[0].id).toBe(duckId)
                        expect(cart[0].qty).toBe(2)
                    })
            )

            it('should succed adding two different items', () => {
                return restApi.addToCart(token, duckId)
                    .then(() => restApi.addToCart(token, _duckId))
                    .then(() => restApi.retrieveCartItems(token))
                    .then(cart => {
                        expect(cart).toBeDefined()
                        expect(cart).toBeInstanceOf(Array)
                        expect(cart).toHaveLength(2)
                        expect(cart[0]).toBeInstanceOf(Object)
                        expect(cart[0].id).toBe(duckId)
                        expect(cart[0].qty).toBe(1)
                        expect(cart[1]).toBeInstanceOf(Object)
                        expect(cart[1].id).toBe(_duckId)
                        expect(cart[1].qty).toBe(1)
                    })
            })
        })

        describe('retrieve cart', () => {
            let _cart

            beforeEach(() => {
                _cart = []

                return restApi.searchDucks(token, '')
                    .then(ducks => {
                        for (let i = 0; i < 10; i++) {
                            const randomIndex = Math.floor(Math.random() * ducks.length)

                            _cart[i] = {}
                            _cart[i].id = ducks.splice(randomIndex, 1)[0].id
                            _cart[i].qty = Math.ceil(Math.random() * 10)
                        }

                        return restApi.updateUser(token, { cart: _cart })
                    })
            })

            it('should succeed on correct user id', () =>
                restApi.retrieveCartItems(token)
                    .then(cart => {
                        cart.forEach(({ id: _id, qty, title, price, imageUrl }, i) => {
                            expect(_id).toBe(_cart[i].id)
                            expect(typeof _id).toBe('string')
                            expect(_id.length).toBeGreaterThan(0)
                            expect(typeof qty).toBe('number')
                            expect(typeof title).toBe('string')
                            expect(title.length).toBeGreaterThan(0)
                            expect(typeof imageUrl).toBe('string')
                            expect(imageUrl.length).toBeGreaterThan(0)
                            expect(typeof price).toBe('number')
                        })
                    })
            )
        })
    })
})