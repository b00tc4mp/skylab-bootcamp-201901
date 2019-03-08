'use strict'

require('dotenv').config()
import arshopApi from '.'
const { mongoose, models: { User, Product } } = require('arshop-data')
const { env: { TEST_DB_URL } } = process
import bcrypt from 'bcrypt'

jest.setTimeout(10000)

describe('arshop api', () => {

    beforeAll(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            Product.deleteMany(),
            User.deleteMany()
        ])
    )

    //#region REGISTER USER
    describe('register user', () => {
        const name = 'sergio'
        const surname = 'costa'
        const email = `sergiocosta@mail.com`
        const password = `password-${Math.random()}`

        it('should succeed on correct data', () =>
            arshopApi.registerUser(name, surname, email, password, password)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on already existing user', () =>
            arshopApi.registerUser(name, surname, email, password, password)
                // .then(() => {
                //     throw Error(`user with email ${email} already exists`)
                // })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with email ${email} already exists`)
                })
        )

        it('should fail on non-matching password and its confirmation', () =>
            arshopApi.registerUser(name, surname, email, password, `non-matching ${password}`)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe('passwords do not match')
                })
        )

        describe('incorrect type name', () => {
            it('should fail on object name', () => {
                try {
                    arshopApi.registerUser({}, surname, email, password, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe({} + ' is not a string')
                }
            })
            it('should fail on array name', () => {
                try {
                    arshopApi.registerUser([], surname, email, password, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe([] + ' is not a string')
                }
            })
            it('should fail on number name', () => {
                try {
                    arshopApi.registerUser(123, surname, email, password, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(123 + ' is not a string')
                }
            })
            it('should fail on empty name', () => {
                try {
                    arshopApi.registerUser('', surname, email, password, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('name is empty')
                }
            })
        })
        describe('incorrect type surname', () => {
            it('should fail on object surname', () => {
                try {
                    arshopApi.registerUser(name, {}, email, password, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe({} + ' is not a string')
                }
            })
            it('should fail on array surname', () => {
                try {
                    arshopApi.registerUser(name, [], email, password, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe([] + ' is not a string')
                }
            })
            it('should fail on number surname', () => {
                try {
                    arshopApi.registerUser(name, 123, email, password, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(123 + ' is not a string')
                }
            })
            it('should fail on empty surname', () => {
                try {
                    arshopApi.registerUser(name, '', email, password, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('surname is empty')
                }
            })
        })
        describe('incorrect type email', () => {
            it('should fail on object email', () => {
                try {
                    arshopApi.registerUser(name, surname, {}, password, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe({} + ' is not a string')
                }
            })
            it('should fail on array email', () => {
                try {
                    arshopApi.registerUser(name, surname, [], password, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe([] + ' is not a string')
                }
            })
            it('should fail on number email', () => {
                try {
                    arshopApi.registerUser(name, surname, 123, password, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(123 + ' is not a string')
                }
            })
            it('should fail on empty email', () => {
                try {
                    arshopApi.registerUser(name, surname, '', password, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('email is empty')
                }
            })
        })
        describe('incorrect type password', () => {
            it('should fail on object password', () => {
                try {
                    arshopApi.registerUser(name, surname, email, {}, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe({} + ' is not a string')
                }
            })
            it('should fail on array name', () => {
                try {
                    arshopApi.registerUser(name, surname, email, [], password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe([] + ' is not a string')
                }
            })
            it('should fail on number name', () => {
                try {
                    arshopApi.registerUser(name, surname, email, 123, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(123 + ' is not a string')
                }
            })
            it('should fail on empty name', () => {
                try {
                    arshopApi.registerUser(name, surname, email, '', password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('password is empty')
                }
            })
        })
    })
    //#endregion

    //#region AUTHENTICATE USER
    describe('authenticate user', () => {
        const name = 'sergio'
        const surname = 'costa'
        let email, password

        beforeEach(() => {
            email = `sergiocosta-${Math.random()}@mail.com`
            password = `123-${Math.random()}`
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
        })

        it('should succeed on correct data', () =>
            arshopApi.authenticateUser(email, password)
                .then(token => expect(token).toBeDefined())
        )

        it('should throw an error on incorrect email', () => {
            arshopApi.authenticateUser('hola@gmail.com', password)
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with email hola@gmail.com not found`)
                })
        })

        it('should throw an error on incorrect password', () => {
            arshopApi.authenticateUser(email, 'adsads')
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                })
        })

        describe('incorrect type email', () => {
            it('should fail on object email', () => {
                try {
                    arshopApi.authenticateUser({}, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe({} + ' is not a string')
                }
            })
            it('should fail on array email', () => {
                try {
                    arshopApi.authenticateUser([], password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe([] + ' is not a string')
                }
            })
            it('should fail on number email', () => {
                try {
                    arshopApi.authenticateUser(123, password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(123 + ' is not a string')
                }
            })
            it('should fail on empty email', () => {
                try {
                    arshopApi.authenticateUser('', password)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('email is empty')
                }
            })
        })
        describe('incorrect type password', () => {
            it('should fail on object password', () => {
                try {
                    arshopApi.authenticateUser(email, {})
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe({} + ' is not a string')
                }
            })
            it('should fail on array password', () => {
                try {
                    arshopApi.authenticateUser(email, [])
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe([] + ' is not a string')
                }
            })
            it('should fail on number password', () => {
                try {
                    arshopApi.authenticateUser(email, 123)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(123 + ' is not a string')
                }
            })
            it('should fail on empty password', () => {
                try {
                    arshopApi.authenticateUser(email, '')
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('password is empty')
                }
            })
        })
    })
    //#endregion

    //#region RETRIEVE USER
    describe('retrieve user', () => {
        const name = 'sergio'
        const surname = 'costa'
        const email = `sergiocosta-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        let userId, token

        beforeEach(() =>
            arshopApi.registerUser(name, surname, email, password, password)
                .then(id => userId = id)
                .then(() => arshopApi.authenticateUser(email, password))
                .then(_token => token = _token)
        )

        it('should succeed on correct data', () =>
            arshopApi.retrieveUser(token)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        )

        it('should throw an error on incorrect token', () =>
            arshopApi.retrieveUser('dsa')
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('jwt malformed')
                })
        )
        describe('incorrect type token', () => {
            it('should fail on object instead string', () => {
                try {
                    arshopApi.retrieveUser({})
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe({} + ' is not a string')
                }
            })
            it('should fail on array instead string', () => {
                try {
                    arshopApi.retrieveUser([])
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe([] + ' is not a string')
                }
            })
            it('should fail on number instead string', () => {
                try {
                    arshopApi.retrieveUser(123)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(123 + ' is not a string')
                }
            })
            it('should fail on empty instead string', () => {
                try {
                    arshopApi.retrieveUser('')
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('token is empty')
                }
            })
        })
    })
    //#endregion

    //#region UPDATE USER
    describe('update user', () => {
        const name = 'sergio'
        const surname = 'costa'
        let email, password

        let userId, token

        beforeEach(() => {
            email = `sergiocosta-${Math.random()}@mail.com`
            password = `password-${Math.random()}`
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(id => userId = id)
                .then(() => arshopApi.authenticateUser(email, password))
                .then(_token => token = _token)
        })

        it('should succed on correct credentials', () => {
            const data = { name: 'alex' }
            return arshopApi.updateUser(token, data)
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.name).toBe(data.name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        })

        it('should update more than one key', () => {
            const data = { name: 'hola', surname: 'adios' }
            return arshopApi.updateUser(token, data)
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.name).toBe(data.name)
                    expect(user.surname).toBe(data.surname)
                    expect(user.email).toBe(email)
                })
        })

        it('should throw an error on incorrect token', () => {
            const data = { name: 'yo' }
            arshopApi.updateUser('dsa', data)
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('jwt malformed')
                })
        })
        describe('incorrect type token', () => {
            it('should fail on object instead string', () => {
                const data = { name: 'yo' }
                try {
                    arshopApi.updateUser({}, data)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe({} + ' is not a string')
                }
            })
            it('should fail on array instead string', () => {
                const data = { name: 'yo' }
                try {
                    arshopApi.updateUser([], data)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe([] + ' is not a string')
                }
            })
            it('should fail on number instead string', () => {
                const data = { name: 'yo' }
                try {
                    arshopApi.updateUser(123, data)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(123 + ' is not a string')
                }
            })
            it('should fail on empty instead string', () => {
                const data = { name: 'yo' }
                try {
                    arshopApi.updateUser('', data)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('token is empty')
                }
            })
        })
        describe('incorrect type data', () => {
            it('should fail on array instead object', () => {
                try {
                    arshopApi.updateUser(token, [])
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe([] + ' is not an object')
                }
            })
            it('should fail on number instead string', () => {
                try {
                    arshopApi.updateUser(token, 123)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(123 + ' is not an object')
                }
            })
            it('should fail on empty instead string', () => {
                try {
                    arshopApi.updateUser(token, '')
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(' is not an object')
                }
            })
        })
    })
    //#endregion

    //#region CREATE PRODUCT
    describe('create product', () => {
        const name = 'sergio'
        const surname = 'costa'
        let email, password

        let userId, token

        const product = {
            tittle: 'audi',
            description: 'en buen estado',
            price: 1000,
            category: 'vehicle',
            city: 'Barcelona'
        }

        beforeEach(() => {
            email = `sergiocosta-${Math.random()}@mail.com`
            password = `password-${Math.random()}`
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(id => userId = id)
                .then(() => arshopApi.authenticateUser(email, password))
                .then(_token => token = _token)
        })

        it('should succed on correct credentials', () =>
            arshopApi.createProduct(token, product)
                .then(productId => {
                    expect(productId).toBeDefined()
                    return Product.findOne({ tittle: 'audi' })
                        .then(_product => {
                            expect(_product).toBeDefined()
                            expect(_product.tittle).toBe(product.tittle)
                            expect(_product.description).toBe(product.description)
                            expect(_product.price).toBe(product.price)
                            expect(_product.city).toBe(product.city)
                        })
                })
        )

        it('should throw an error on incorrect token', () => {
            const data = { name: 'yo' }
            arshopApi.createProduct('dsa', data)
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('jwt malformed')
                })
        })
        describe('incorrect type token', () => {
            it('should fail on object instead string', () => {
                const data = { name: 'yo' }
                try {
                    arshopApi.createProduct({}, data)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe({} + ' is not a string')
                }
            })
            it('should fail on array instead string', () => {
                const data = { name: 'yo' }
                try {
                    arshopApi.createProduct([], data)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe([] + ' is not a string')
                }
            })
            it('should fail on number instead string', () => {
                const data = { name: 'yo' }
                try {
                    arshopApi.createProduct(123, data)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(123 + ' is not a string')
                }
            })
            it('should fail on empty instead string', () => {
                const data = { name: 'yo' }
                try {
                    arshopApi.createProduct('', data)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('token is empty')
                }
            })
        })
        describe('incorrect type data', () => {
            it('should fail on array instead object', () => {
                try {
                    arshopApi.createProduct(token, [])
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe([] + ' is not an object')
                }
            })
            it('should fail on number instead string', () => {
                try {
                    arshopApi.createProduct(token, 123)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(123 + ' is not an object')
                }
            })
            it('should fail on empty instead string', () => {
                try {
                    arshopApi.createProduct(token, '')
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('product should be defined')
                }
            })
        })
    })
    //#endregion

    //#region RETRIEVE ALL PRODUCTS
    const product = {
        tittle: 'coche',
        description: 'bueno, bonito, barato',
        price: 20000,
        category: 'vehicle',
        city: 'Barcelona'
    }

    const product2 = {
        tittle: 'barco',
        description: 'bueno, bonito, barato',
        price: 9999,
        category: 'vehicle',
        city: 'Madrid'
    }

    beforeEach(() => {
        return Product.create(product)
            .then(() =>
                Product.create(product2)
            )
    })

    it('should retireve all products', () =>
        arshopApi.retrieveProducts()
            .then(products => {
                expect(products).toBeDefined()
                expect(products[0].tittle).toBe(product.tittle)
                expect(products[0].description).toBe(product.description)
                expect(products[0].price).toBe(product.price)
                expect(products[0].category).toBe(product.category)
                expect(products[0].city).toBe(product.city)

                expect(products[1].tittle).toBe(product2.tittle)
                expect(products[1].description).toBe(product2.description)
                expect(products[1].price).toBe(product2.price)
                expect(products[1].category).toBe(product2.category)
                expect(products[1].city).toBe(product2.city)
            })
    )

    describe('not finding products', () => {
        it('should not find products', () =>
            Product.deleteMany()
                .then(() =>
                    arshopApi.retrieveProducts()
                        .then((arr) => {
                            expect(arr).toBeDefined()
                            expect(arr.length).toBe(0)
                        })
                )
        )
    })
    //#endregion

    //#region RETRIEVE ONE PRODUCT
    describe('retrieve one product', () => {
        const product = {
            tittle: 'barco',
            description: 'bueno, bonito, barato',
            price: 9999,
            category: 'vehicle',
            city: 'Madrid',
        }
        let _id

        beforeEach(() => {
            return Product.create(product)
                .then(({ id }) => _id = id)
        })

        it('should succed on correct credentials', () =>
            arshopApi.retrieveProduct(_id)
                .then(_product => {
                    expect(_product).toBeDefined()
                    expect(_product.tittle).toBe(product.tittle)
                    expect(_product.description).toBe(product.description)
                    expect(_product.price).toBe(product.price)
                    expect(_product.category).toBe(product.category)
                    expect(_product.city).toBe(product.city)
                })
        )

    })
    //#endregion

    //#region RETRIEVE PRODUCTS FROM USER
    describe('retrive products from user', () => {
        const name = 'sergio'
        const surname = 'costa'
        let email, password

        let userId, token

        const product = {
            tittle: 'audi',
            description: 'en buen estado',
            price: 1000,
            category: 'vehicle',
            city: 'Barcelona'
        }

        beforeEach(() => {
            email = `sergiocosta-${Math.random()}@mail.com`
            password = `password-${Math.random()}`
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(id => userId = id)
                .then(() => arshopApi.authenticateUser(email, password))
                .then(_token => token = _token)
                .then((token) => arshopApi.createProduct(token, product))
        })

        it('should retrieve products from user', () =>
            arshopApi.retrieveUserProducts(token)
                .then(products => {
                    expect(products[0].tittle).toBe(product.tittle)
                    expect(products[0].description).toBe(product.description)
                    expect(products[0].price).toBe(product.price)
                    expect(products[0].category).toBe(product.category)
                    expect(products[0].city).toBe(product.city)

                    expect(products.length).toBe(1)
                })
        )

        it('should fail on wrong userid', () =>
            arshopApi.retrieveUserProducts('hola')
                .catch(err => {
                    expect(err).toBeDefined()
                })
        )
        it('should fail on object instead string', () =>
            expect(() => {
                arshopApi.retrieveUserProducts({})
            }).toThrow(TypeError({} + ' is not a string'))
        )
        it('should fail on array instead string', () =>
            expect(() => {
                arshopApi.retrieveUserProducts([])
            }).toThrow(TypeError([] + ' is not a string'))
        )

        it('should fail on undefined instead string', () =>
            expect(() => {
                arshopApi.retrieveUserProducts(undefined)
            }).toThrow(TypeError(undefined + ' is not a string'))
        )

        it('should fail on empty userid', () =>
            expect(() => {
                arshopApi.retrieveUserProducts('')
            }).toThrow(TypeError('token cannot be empty'))
        )
    })
    //#endregion

    //#region UPDATE PRODUCT
    false && describe('update products', () => {
        let name = 'sergio'
        let surname = 'costa'
        let email = `sergiocosta-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`
        let token
        let _id

        const product = {
            tittle: 'coche',
            description: 'bueno, bonito, barato',
            price: 20000,
            category: 'vehicle',
            city: 'Barcelona'
        }

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(() => arshopApi.authenticateUser(email, password))
                .then(_token => token = _token)
                .then(() => arshopApi.createProduct(token, product))
                .then(({ id }) => _id = id)
        )

        it('should succed on correct credentials', () => {
            const data = { tittle: 'moto' }
            return arshopApi.updateProduct(token, _id, data)
                .then(_product => {
                    expect(_product.tittle).toBe(data.tittle)
                    expect(_product.description).toBe(product.description)
                    expect(_product.price).toBe(_product.price)
                    expect(_product.category).toBe(product.category)
                    expect(_product.city).toBe(product.city)
                })
        })

        it('should not change anything', () => {
            const data = { whatever: 'dsasad' }
            return arshopApi.updateProduct(token, _id, data)
                .then(_product => {
                    expect(_product.tittle).toBe(product.tittle)
                    expect(_product.description).toBe(product.description)
                    expect(_product.price).toBe(product.price)
                    expect(_product.category).toBe(product.category)
                    expect(_product.city).toBe(product.city)
                })
        })
        describe('incorrect type token', () => {
            it('should fail on object instead string', () => {
                const data = { name: 'yo' }
                try {
                    arshopApi.updateProduct({}, _id, data)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe({} + ' is not a string')
                }
            })
            it('should fail on array instead string', () => {
                const data = { name: 'yo' }
                try {
                    arshopApi.updateProduct([], _id, data)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe([] + ' is not a string')
                }
            })
            it('should fail on number instead string', () => {
                const data = { name: 'yo' }
                try {
                    arshopApi.updateProduct(123, _id, data)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(123 + ' is not a string')
                }
            })
            it('should fail on empty instead string', () => {
                const data = { name: 'yo' }
                try {
                    arshopApi.updateProduct('', _id, data)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('token is empty')
                }
            })
        })
        describe('incorrect type productId', () => {
            it('should fail on array instead object', () => {
                const data = { name: 'yo' }
                try {
                    arshopApi.updateProduct(token, [], data)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe([] + ' is not an object')
                }
            })
            it('should fail on number instead object', () => {
                const data = { name: 'yo' }
                try {
                    arshopApi.updateProduct(token, 123, data)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe(123 + ' is not an object')
                }
            })
            it('should fail on empty instead object', () => {
                const data = { name: 'yo' }
                try {
                    arshopApi.updateProduct(token, '', data)
                } catch (err) {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('product should be defined')
                }
            })
        })
    })
    //#endregion

    //#region TOOGLE SOLD
    false && describe('toogle sold', () => {
        let name = 'sergio'
        let surname = 'costa'
        let email = `sergiocosta-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`
        let token
        let _id

        const product = {
            tittle: 'coche',
            description: 'bueno, bonito, barato',
            price: 20000,
            category: 'vehicle',
            city: 'Barcelona',
            sold: false
        }

        beforeEach(() => 
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(() => arshopApi.authenticateUser(email, password))
                .then(_token => token = _token)
                .then(() => arshopApi.createProduct(token, product))
                .then(__id => _id = __id)
        )

        it('should succed on correct credentials', () =>
            arshopApi.toogleSold(token, _id)
                .then(() => Product.findById(_id)
                    .then(_product => {
                        expect(_product).toBeDefined()
                        expect(_product.sold).toBe(true)
                    })
                )
        )

        // it('should remove fav', () =>
        //     User.findOne({ name: 'sergio' })
        //         .then(user => {
        //             return arshopApi.toogleSold(user.id, _id)
        //                 .then((_product) => {
        //                     expect(_product).toBeDefined()
        //                     expect(_product.sold).toBe(true)
        //                 })
        //                 .then(() => {
        //                     return arshopApi.toogleSold(token, _id)
        //                         .then(__product => {
        //                             expect(__product).toBeDefined()
        //                             expect(__product.sold).toBe(false)
        //                         })
        //                 })
        //         })
        // )
    })
    //#endregion

    afterAll(() =>
        Promise.all([
            Product.deleteMany(),
            User.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})