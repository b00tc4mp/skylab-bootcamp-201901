import logic from '.'
import { LogicError, RequirementError, ValueError, FormatError } from 'auction-errors'
import auctionliveApi from '../data/auctionlive-api'

jest.setTimeout(100000)

describe('logic', () => {
    const name = 'Manuel'
    const surname = 'Barzi'
    let email
    const password = '123'
    
    beforeEach(() => {
        email = `manuelbarzi-${Math.random()}@gmail.com`
        
        logic.__userToken__ = null
    })
    
    describe('users', () => {
        describe('register user', () => {
            it('should succeed on correct user data', () =>
                logic.registerUser(name, surname, email, password)
                .then(response => {
                    expect(response).toBeDefined()
                    
                    const { message, error } = response

                    expect(error).toBeUndefined()
                    expect(message).toBe('Ok, user registered.')
                })
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
            beforeEach(() =>
                restApi.registerUser(name, surname, email, password)
                    .then(() => restApi.authenticateUser(email, password))
                    .then(response => {
                        logic.__userToken__ = response.token
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

                        expect(error.message).toBe('jwt malformed')
                    })
            })
        })

        describe('update', () => {
            let data, _data 

            beforeEach(() => {
                data = { name: 'peter', surname: 'pan', email: 'peterpan@gmail.com' }

                return restApi.registerUser(name, surname, email, password)
                    .then(() => restApi.authenticateUser(email, password))
                    .then(response => {
                        logic.__userToken__ = response.token
                    })
            })

            it('should succeed on correct data', () =>
                logic.updateUser(data)
                    .then(response => {
                        const { message } = response

                        expect(message).toBe('Ok, user updated.')
                    })
                    .then(() => restApi.retrieveUser(logic.__userToken__))
                    .then(user => {
                        expect(user).toBeDefined()

                        expect(user.name).toBe(data.name)
                        expect(user.surname).toBe(data.surname)
                        expect(user.email).toBe(data.email)
                        expect(user.password).toBeUndefined()
                    })
            )

            it('should succeed on correct data re-updating', () =>
                logic.updateUser(data)
                    .then(response => {
                        const { message } = response

                        expect(message).toBe('Ok, user updated.')
                    })
                    .then(() => {
                        _data = { name: 'captain', surname: 'hook', email: 'hook@mail.com' }

                        return restApi.updateUser(logic.__userToken__, _data)
                    })
                    .then(response => {
                        const { message } = response

                        expect(message).toBe('Ok, user updated.')
                    })
                    .then(() => restApi.retrieveUser(logic.__userToken__))
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

            beforeEach(() => restApi.registerUser(name, surname, email, password)
                    .then(() => restApi.authenticateUser(email, password))
                    .then(response => {
                        logic.__userToken__ = response.token
                    })
            )
            
            it('should succed on correct id', () => {
                return logic.deleteUser(email, password)
                    .then(response => {
                        const { message } = response
                        expect(message).toBe('Ok, user deleted.')
                        
                        return restApi.retrieveUser(logic.__userToken__) 
                    })
                    .then(() => { throw Error('should not reach this point') })
                    .catch(({message}) => {
                        const [, payloadB64,] = logic.__userToken__.split('.')
                        const payloadJson = atob(payloadB64)
                        const payload = JSON.parse(payloadJson)
                        
                        expect(typeof payload.sub).toBe('string')
                        expect(payload.sub.length).toBeGreaterThan(0)
                        expect(message).toBe(`user with id \"${payload.sub}\" does not exist`)
                    })
            })
    
            it('should fail on incorrect token', () => {
                logic.__userToken__ = 'wrong-token'
                
                return logic.deleteUser(email, password)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error.message).toBe('jwt malformed')
                    })
            })

            it('should fail on incorrect email', () => {
                let email = 'fake_email@gmail.com' 

                return logic.deleteUser(email, password)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error.message).toBe('wrong credentials')
                    })
            })

            it('should fail on incorrect password', () => {
                let password = '423'

                return logic.deleteUser(email, password)
                    .then(() => { throw new Error('should not reach this point') })
                    .catch(error => {
                        expect(error).toBeDefined()
                        expect(error.message).toBe('wrong credentials')
                    })
            })
        })
    })

    describe('ducks', () => {
      
        beforeEach(() =>
            restApi.registerUser(name, surname, email, password)
                .then(() =>
                    restApi.authenticateUser(email, password)
                )
                .then(response => {
                    logic.__userToken__ = response.token
                })
        )

        describe('toggle fav duck', () => {
            let duckId

            beforeEach(() =>
                restApi.searchDucks(logic.__userToken__, '')
                    .then(ducks => duckId = ducks[0].id)
            )

            it('should succeed adding fav on first time', () =>
                logic.toggleFavDuck(duckId)
                    .then(response => {
                        expect(response.message).toBe('Ok, duck toggled.')
                    })
                    .then(() => restApi.retrieveFavDucks(logic.__userToken__))
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
                    .then(() => restApi.retrieveFavDucks(logic.__userToken__))
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

                return restApi.searchDucks(logic.__userToken__, '')
                    .then(ducks => {
                        for (let i = 0; i < 10; i++) {
                            const randomIndex = Math.floor(Math.random() * ducks.length)

                            _favs[i] = ducks.splice(randomIndex, 1)[0].id
                        }
                    })
            })

            it('should succeed adding fav on first time', () =>
                logic.retrieveFavDucks(logic.__userToken__)
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

    describe('cart', () => {
        let duckId, _duckId

        beforeEach(() => {
            return restApi.registerUser(name, surname, email, password)
                .then(() => restApi.authenticateUser(email, password))
                .then(response => {
                    logic.__userToken__ = response.token
                    return restApi.searchDucks(logic.__userToken__, '')
                })
                .then(ducks => {
                    duckId = ducks[0].id
                    _duckId = ducks[1].id
                })
        })

        describe('add items', () => {
            it('should succed adding one item', () => 
                logic.addToCart(duckId)
                    .then(response => {
                        const { message } = response

                        expect(message).toBe('Ok, item added.')
                    })
                    .then(() => restApi.retrieveCartItems(logic.__userToken__))
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
                logic.addToCart(duckId)
                    .then(response => {
                        const { message } = response

                        expect(message).toBe('Ok, item added.')
                        
                        return  restApi.addToCart(logic.__userToken__, duckId)
                    })
                    .then(response => {
                        const { message } = response

                        expect(message).toBe('Ok, item added.')
                    })
                    .then(() => restApi.retrieveCartItems(logic.__userToken__))
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
                return logic.addToCart(duckId)
                    .then(() => logic.addToCart(_duckId))
                    .then(() => restApi.retrieveCartItems(logic.__userToken__))
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

                return restApi.searchDucks(logic.__userToken__, '')
                    .then(ducks => {
                        for (let i = 0; i < 10; i++) {
                            const randomIndex = Math.floor(Math.random() * ducks.length)

                            _cart[i] = {}
                            _cart[i].id = ducks.splice(randomIndex, 1)[0].id
                            _cart[i].qty = Math.ceil(Math.random() * 10)
                        }

                        return restApi.updateUser(logic.__userToken__, { cart: _cart })
                    })
            })

            it('should succeed on correct user id', () =>
                logic.retrieveCartItems()
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