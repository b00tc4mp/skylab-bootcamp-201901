'use strict'

require('dotenv').config()

require('isomorphic-fetch')

const { mongoose, models: { User, Product } } = require('arshop-data')
const expect = require('expect')
const logic = require('.')
const bcrypt = require('bcrypt')

const { env: { TEST_DB_URL } } = process

describe('logic', () => {
    before(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

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
        const email = `sergiocosta-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on valid data', async () => {
            const id = await logic.registerUser(name, surname, email, password, passwordConfirm)

            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            const user = await User.findOne({ email })

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const name = 'sergio'
            const surname = undefined
            const email = 'sergiocosta@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'sergio'
            const surname = 10
            const email = 'sergiocosta@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'sergio'
            const surname = false
            const email = 'sergiocosta@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'sergio'
            const surname = {}
            const email = 'sergiocosta@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'sergio'
            const surname = []
            const email = 'sergiocosta@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'sergio'
            const surname = ''
            const email = 'sergiocosta@mail.com'
            const password = `123-${Math.random()}`

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname cannot be empty'))
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

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then(id => expect(id).toBeDefined())
        )

        describe('wrong email', () => {

            const wrongEmail = 'dsa@mail.com'

            it('should fail on wrong email', () =>
                logic.authenticateUser(wrongEmail, password)
                    .catch(err => {
                        expect(err).toBeDefined()
                        expect(err.message).toBe(`user with email ${wrongEmail} not found`)
                    })
            )

            it('should fail on object instead string', () =>
                expect(() => {
                    logic.authenticateUser({}, password)
                }).toThrow(TypeError({} + ' is not a string'))
            )

            it('should fail on array instead string', () =>
                expect(() => {
                    logic.authenticateUser([], password)
                }).toThrow(TypeError([] + ' is not a string'))
            )

            it('should fail on number instead string', () =>
                expect(() => {
                    logic.authenticateUser(12345, password)
                }).toThrow(TypeError(12345 + ' is not a string'))
            )

            it('should fail on null instead string', () =>
                expect(() => {
                    logic.authenticateUser(null, password)
                }).toThrow(TypeError(null + ' is not a string'))
            )

            it('should fail on undefined instead string', () =>
                expect(() => {
                    logic.authenticateUser(undefined, password)
                }).toThrow(TypeError(undefined + ' is not a string'))
            )

            it('should fail on empty email', () =>
                expect(() => {
                    logic.authenticateUser('', password)
                }).toThrow(TypeError('email cannot be empty'))
            )
        })

        describe('wrong password', () => {

            const wrongPassword = 'edgrdgf'

            it('should fail on wrong password', () =>
                logic.authenticateUser(email, wrongPassword)
                    .catch(err => {
                        expect(err).toBeDefined()
                    })
            )

            it('should fail on object instead string', () =>
                expect(() => {
                    logic.authenticateUser(email, {})
                }).toThrow(TypeError({} + ' is not a string'))
            )

            it('should fail on array instead string', () =>
                expect(() => {
                    logic.authenticateUser(email, [])
                }).toThrow(TypeError([] + ' is not a string'))
            )

            it('should fail on null instead string', () =>
                expect(() => {
                    logic.authenticateUser(email, null)
                }).toThrow(TypeError(null + ' is not a string'))
            )

            it('should fail on undefined instead string', () =>
                expect(() => {
                    logic.authenticateUser(email, undefined)
                }).toThrow(TypeError(undefined + ' is not a string'))
            )

            it('should fail on empty password', () =>
                expect(() => {
                    logic.authenticateUser(email, '')
                }).toThrow(TypeError('password cannot be empty'))
            )
        })
    })
    //#endregion

    //#region RETRIEVE USER
    describe('retrieve user', () => {
        const name = 'sergio'
        const surname = 'costa'
        let email, password
        let userId

        beforeEach(() => {
            email = `sergiocosta-${Math.random()}@mail.com`
            password = `123-${Math.random()}`
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        })

        it('should succeed on correct credentials', () =>
            logic.retrieveUser(userId)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.save).toBeUndefined()
                })
        )

        it('should fail on wrong userId', () => {
            User.deleteMany()
            return logic.retrieveUser('dsadsa')
                .catch((err) => {
                    expect(err).toBeDefined()
                })
        })

        it('should fail on object instead string', () =>
            expect(() => {
                logic.retrieveUser({})
            }).toThrow(TypeError({} + ' is not a string'))
        )

        it('should fail on array instead string', () =>
            expect(() => {
                logic.retrieveUser([])
            }).toThrow(TypeError([] + ' is not a string'))
        )

        it('should fail on number instead string', () =>
            expect(() => {
                logic.retrieveUser(12345)
            }).toThrow(TypeError(12345 + ' is not a string'))
        )

        it('should fail on empty', () =>
            expect(() => {
                logic.retrieveUser('')
            }).toThrow(TypeError('userId cannot be empty'))
        )

    })
    //#endregion

    //#region UPDATE USER
    describe('update user', () => {
        let name = 'sergio'
        let surname = 'costa'
        let email = `sergiocosta-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`
        let userId
        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(({ id }) => userId = id)
        )
        it('should succed on correct credentials', () => {
            const data = { surname: 'sans' }
            return logic.updateUser(userId, data)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.name).toBe(name)
                    expect(user.password).toBeUndefined()
                    expect(user.email).toBe(email)
                    expect(user.surname).toBe(data.surname)

                    expect(user.save).toBeUndefined()
                })
        })

        it('should fail on wrong userId', () => {
            User.deleteMany()
            const data = { surname: 'sans' }
            return logic.updateUser(userId, data)
                .then(() => expect(Error).toBeDefined())
        })

        describe('wrong data', () => {
            it('should fail on string instead object', () =>
                expect(() => {
                    logic.updateUser(userId, 'asd')
                }).toThrow(TypeError('asd' + ' is not an object'))
            )

            it('should fail on number instead object', () =>
                expect(() => {
                    logic.updateUser(userId, 123)
                }).toThrow(TypeError(123 + ' is not an object'))
            )

            it('should fail on array instead object', () =>
                expect(() => {
                    logic.updateUser(userId, [])
                }).toThrow(TypeError([] + ' is not an object'))
            )

            it('should fail on null instead object', () =>
                expect(() => {
                    logic.updateUser(userId, null)
                }).toThrow(TypeError('data should be defined'))
            )

            it('should fail on undefined instead object', () =>
                expect(() => {
                    logic.updateUser(userId, undefined)
                }).toThrow(TypeError('data should be defined'))
            )
        })
    })
    //#endregion

    //#region ADD PRODUCT
    describe('should add a product', () => {
        let name = 'sergio'
        let surname = 'costa'
        let email = `sergiocosta-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`
        let userId

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
                .then(({ id }) => userId = id)
        )

        it('should succed on correct credentials', () =>
            logic.createProduct(userId, product)
                .then(productId => {
                    expect(productId).toBeDefined()
                    return Product.findById(productId)
                        .then(_product => {
                            expect(_product.id).toBe(productId)
                            expect(_product.tittle).toBe(product.tittle)
                            expect(_product.description).toBe(product.description)
                            expect(_product.price).toBe(product.price)
                            expect(_product.city).toBe(product.city)
                        })
                })
        )

        it('should add product id to user.product', () =>
            logic.createProduct(userId, product)
                .then(productId => {
                    return User.findById(userId)
                        .then(user => {
                            expect(user.products[0].toString()).toBe(productId)
                        })
                })
        )

        describe('incorrect userId', () => {
            it('should fail on wrong userId', () => {
                User.deleteMany()
                return logic.createProduct(userId, product)
                    .then(() => expect(Error).toBeDefined())
            })

            it('should fail on object instead string', () =>
                expect(() => {
                    logic.createProduct({}, product)
                }).toThrow(TypeError({} + ' is not a string'))
            )

            it('should fail on array instead string', () =>
                expect(() => {
                    logic.createProduct([], product)
                }).toThrow(TypeError([] + ' is not a string'))
            )

            it('should fail on number instead string', () =>
                expect(() => {
                    logic.createProduct(12345, product)
                }).toThrow(TypeError(12345 + ' is not a string'))
            )

            it('should fail on empty userId', () =>
                expect(() => {
                    logic.createProduct('', product)
                }).toThrow(TypeError('userId cannot be empty'))
            )
        })

        describe('incorrect Product', () => {
            it('should fail on wrong product', () => {
                Product.deleteMany()
                return logic.createProduct(userId, product)
                    .then(() => expect(Error).toBeDefined())
            })

            it('should fail on array instead object', () =>
                expect(() => {
                    logic.createProduct(userId, [])
                }).toThrow(TypeError([] + ' is not an object'))
            )

            it('should fail on number instead object', () =>
                expect(() => {
                    logic.createProduct(userId, 12345)
                }).toThrow(TypeError(12345 + ' is not an object'))
            )

            it('should fail on string instead object', () => {
                expect(() => {
                    logic.createProduct(userId, 'asd')
                }).toThrow(TypeError('asd' + ' is not an object'))
            })

            it('should fail on empty userId', () =>
                expect(() => {
                    logic.createProduct(userId, '')
                }).toThrow(Error('product should be defined'))
            )
        })
    })
    //#endregion

    //#region RETRIEVE ALL PRODUCTS
    describe('retrieve all products', () => {
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
            logic.retrieveProducts()
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
                        logic.retrieveProducts()
                            .then((arr) => {
                                expect(arr).toBeDefined()
                                expect(arr.length).toBe(0)
                            })
                    )
            )
        })
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

        it('should retrieve one product', () =>
            logic.retrieveProduct(_id)
                .then(_product => {
                })
        )

        describe('wrong productId', () => {
            it('should throw an error on not finding product id', () =>
                logic.retrieveProduct('asdasd')
                    .catch(() => expect(Error).toBeDefined())
            )
            it('should fail on number instead string', () =>
                expect(() => {
                    logic.retrieveProduct(12345)
                }).toThrow(TypeError(12345 + ' is not a string'))
            )
            it('should fail on object instead string', () =>
                expect(() => {
                    logic.retrieveProduct({})
                }).toThrow(TypeError({} + ' is not a string'))
            )
            it('should fail on array instead string', () =>
                expect(() => {
                    logic.retrieveProduct([])
                }).toThrow(TypeError([] + ' is not a string'))
            )
            it('should fail on undefined instead string', () =>
                expect(() => {
                    logic.retrieveProduct(undefined)
                }).toThrow(TypeError(undefined + ' is not a string'))
            )
            it('should fail on null instead string', () =>
                expect(() => {
                    logic.retrieveProduct(null)
                }).toThrow(TypeError(null + ' is not a string'))
            )
            it('should fail on id', () =>
                expect(() => {
                    logic.retrieveProduct('')
                }).toThrow(TypeError('' + 'productId cannot be empty'))
            )

        })
    })
    //#endregion

    //#region RETRIEVE PRODUCTS FROM USER
    describe('retrive products from user', () => {
        let name = 'sergio'
        let surname = 'costa'
        let email = `sergiocosta-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`
        let userId
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
                .then(({ id }) => userId = id)
                .then(() => logic.createProduct(userId, product))
                .then((id) => {
                    _id = id
                })
        )

        it('should retrieve products from user', () =>
            logic.retrieveUserProducts(userId)
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
            logic.retrieveUserProducts('hola')
                .catch(err => {
                    expect(err).toBeDefined()
                })
        )
        it('should fail on object instead string', () =>
            expect(() => {
                logic.retrieveUserProducts({})
            }).toThrow(TypeError({} + ' is not a string'))
        )
        it('should fail on array instead string', () =>
            expect(() => {
                logic.retrieveUserProducts([])
            }).toThrow(TypeError([]+ ' is not a string'))
        )

        it('should fail on undefined instead string', () =>
            expect(() => {
                logic.retrieveUserProducts(undefined)
            }).toThrow(TypeError(undefined + ' is not a string'))
        )

        it('should fail on empty userid', () =>
            expect(() => {
                logic.retrieveUserProducts('')
            }).toThrow(TypeError('userId cannot be empty'))
        )
    })
    //#endregion

    //#region TOOGLE FAV
    describe('toogleFav', () => {
        let name = 'sergio'
        let surname = 'costa'
        let email = `sergiocosta-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`
        let userId
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
                .then(({ id }) => userId = id)
                .then(() => Product.create(product))
                .then(({ id }) => _id = id)
        )

        it('should succed on correct credentials', () =>
            logic.toogleFav(userId, _id)
                .then(favproducts => {
                    expect(favproducts).toBeDefined()
                    expect(favproducts[0].toString()).toBe(_id)
                })
        )

        it('should remove fav', () =>
            User.findById(userId)
                .then(user => {
                    return logic.toogleFav(user.id, _id)
                        .then((favproducts) => {
                            expect(favproducts.length).toBe(1)
                            expect(user.favoriteProducts[0]).toBeUndefined()
                        })
                        .then(() => {
                            return logic.toogleFav(userId, _id)
                                .then(_favproduct => {
                                    expect(_favproduct.length).toBe(0)
                                })
                        })
                })
        )

        it('should fail on wrong product id', () =>
            logic.toogleFav(userId, 'ads')
                .catch(err => {
                    expect(err).toBeDefined()
                })
        )

        it('should fail on object instead string', () =>
            expect(() => {
                logic.toogleFav(userId, {})
            }).toThrow(TypeError({} + ' is not a string'))
        )

        it('should fail on array instead string', () =>
            expect(() => {
                logic.toogleFav(userId, [])
            }).toThrow(TypeError([] + ' is not a string'))
        )

        it('should fail on number instead string', () =>
            expect(() => {
                logic.toogleFav(userId, 12345)
            }).toThrow(TypeError(12345 + ' is not a string'))
        )

        it('should fail on empty userId', () =>
            expect(() => {
                logic.toogleFav(userId, '')
            }).toThrow(TypeError('productId cannot be empty'))
        )

        it('should fail on wrong user id', () =>
            logic.toogleFav('adsdsa', _id)
                .catch(err => {
                    expect(err).toBeDefined()
                })
        )

        it('should fail on object instead string', () =>
            expect(() => {
                logic.toogleFav({}, product)
            }).toThrow(TypeError({} + ' is not a string'))
        )

        it('should fail on array instead string', () =>
            expect(() => {
                logic.toogleFav([], product)
            }).toThrow(TypeError([] + ' is not a string'))
        )

        it('should fail on number instead string', () =>
            expect(() => {
                logic.toogleFav(12345, product)
            }).toThrow(TypeError(12345 + ' is not a string'))
        )

        it('should fail on empty userId', () =>
            expect(() => {
                logic.toogleFav('', product)
            }).toThrow(TypeError('userId cannot be empty'))
        )
    })
    //#endregion

    //#region RETRIEVE ALL FAVS
    describe('retrieve favs from user', () => {
        let name = 'sergio'
        let surname = 'costa'
        let email = `sergiocosta-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`
        let userId
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
                .then(({ id }) => userId = id)
                .then(() => Product.create(product))
                .then(({ id }) => _id = id)
                .then(() => logic.toogleFav(userId, _id))
        )

        it('should retrieve all favs from a user', () =>
            logic.retrieveFavs(userId)
                .then((favorites) => {
                    expect(favorites).toBeDefined()
                    expect(favorites.length).toBe(1)
                    expect(favorites[0].toString()).toBe(_id)
                })
        )

        it('should fail on wrong user id', () =>
            logic.retrieveFavs('adsdsa')
                .catch(err => {
                    expect(err).toBeDefined()
                })
        )

        it('should fail on object instead string', () =>
            expect(() => {
                logic.retrieveFavs({})
            }).toThrow(TypeError({} + ' is not a string'))
        )

        it('should fail on array instead string', () =>
            expect(() => {
                logic.retrieveFavs([])
            }).toThrow(TypeError([] + ' is not a string'))
        )

        it('should fail on number instead string', () =>
            expect(() => {
                logic.retrieveFavs(12345)
            }).toThrow(TypeError(12345 + ' is not a string'))
        )

        it('should fail on empty userId', () =>
            expect(() => {
                logic.updateProduct('')
            }).toThrow(TypeError('userId cannot be empty'))
        )
    })

    //#endregion

    //#region SEARCH PRODUCTS BY CATEGORY
    describe('search products by category', () => {
        const product = {
            tittle: 'coche',
            description: 'bueno, bonito, barato',
            price: 20000,
            category: 'vehicle',
            city: 'Barcelona'
        }

        const product2 = {
            tittle: 'tablet',
            description: 'bueno, bonito, barato',
            price: 9999,
            category: 'electronic',
            city: 'Madrid'
        }

        beforeEach(() => {
            return Product.create(product)
                .then(() =>
                    Product.create(product2)
                )
        })

        it('should search products by category', () =>
            logic.searchProductsByCategory('vehicle')
                .then(products => {
                    expect(products).toBeDefined()
                    expect(products[0].tittle).toBe(product.tittle)
                    expect(products[0].description).toBe(product.description)
                    expect(products[0].price).toBe(product.price)
                    expect(products[0].category).toBe(product.category)
                    expect(products[0].city).toBe(product.city)
                    expect(products.length).toBe(1)
                })
        )

        it('should fail on wrong category', () => {
            logic.searchProductsByCategory('dsa')
                .then(() => {
                    expect(Error).toBeDefined()
                })
        })

        describe('wrong q typeError', () => {
            it('should fail on object instead string', () =>
                expect(() => {
                    logic.searchProductsByCategory({})
                }).toThrow(TypeError({} + ' is not a string'))
            )
            it('should fail on array instead string', () =>
                expect(() => {
                    logic.searchProductsByCategory([])
                }).toThrow(TypeError([] + ' is not a string'))
            )
            it('should fail on number instead string', () =>
                expect(() => {
                    logic.searchProductsByCategory(12345)
                }).toThrow(TypeError(12345 + ' is not a string'))
            )
            it('should fail on empty query', () =>
                expect(() => {
                    logic.searchProductsByCategory('')
                }).toThrow(TypeError('' + 'query cannot be empty'))
            )
        })
    })
    //#endregion

    //#region SEARCH PRODUTS BY TITTLE AND DESCRIPTION
    describe('search products by tittle and description', () => {
        const product = {
            tittle: 'seat',
            description: 'car seat ibiza',
            price: 1500,
            category: 'vehicle',
            city: 'Barcelona'
        }

        const product2 = {
            tittle: 'audi',
            description: 'car in good contitions',
            price: 20000,
            category: 'vehicle',
            city: 'Madrid'
        }

        const product3 = {
            tittle: 'mobile',
            description: 'samsung galaxi',
            price: 400,
            category: 'electronic',
            city: 'Barcelona'
        }

        beforeEach(() => {
            return Product.create(product)
                .then(() =>
                    Product.create(product2)
                )
                .then(() =>
                    Product.create(product3)
                )
        })

        it('should search products by query car ', () =>
            logic.searchProducts('car')
                .then(products => {
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

                    expect(products.length).toBe(2)
                })
        )

        it('should search products by query samsung', () =>
            logic.searchProducts('samsung')
                .then(products => {
                    expect(products[0].tittle).toBe(product3.tittle)
                    expect(products[0].description).toBe(product3.description)
                    expect(products[0].price).toBe(product3.price)
                    expect(products[0].category).toBe(product3.category)
                    expect(products[0].city).toBe(product3.city)

                    expect(products.length).toBe(1)
                })
        )

        it('should not find anything', () =>
            logic.searchProducts('dadsa')
                .then(products => {
                    expect(products.length).toBe(0)
                })
        )

        it('should fail on wrong query', () => {
            logic.searchProducts('dsa')
                .then(() => {
                    expect(Error).toBeDefined()
                })
        })

        describe('wrong q typeError', () => {
            it('should fail on object instead string', () =>
                expect(() => {
                    logic.searchProducts({})
                }).toThrow(TypeError({} + ' is not a string'))
            )
            it('should fail on array instead string', () =>
                expect(() => {
                    logic.searchProducts([])
                }).toThrow(TypeError([] + ' is not a string'))
            )
            it('should fail on number instead string', () =>
                expect(() => {
                    logic.searchProducts(12345)
                }).toThrow(TypeError(12345 + ' is not a string'))
            )
            it('should fail on empty query', () =>
                expect(() => {
                    logic.searchProducts('')
                }).toThrow(TypeError('' + 'query cannot be empty'))
            )
        })
    })
    //#endregion

    //#region UPDATE PRODUCTS
    describe('update products', () => {
        let name = 'sergio'
        let surname = 'costa'
        let email = `sergiocosta-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`
        let userId
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
                .then(({ id }) => userId = id)
                .then(() => logic.createProduct(userId, product))
                .then((id) => {
                    _id = id
                })
        )

        it('should succed on correct credentials', () => {
            const data = { tittle: 'moto' }
            return logic.updateProduct(userId, _id, data)
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
            return logic.updateProduct(userId, _id, data)
                .then(_product => {
                    expect(_product.tittle).toBe(product.tittle)
                    expect(_product.description).toBe(product.description)
                    expect(_product.price).toBe(product.price)
                    expect(_product.category).toBe(product.category)
                    expect(_product.city).toBe(product.city)
                })
        })

        it('should fail on wrong product id', () => {
            const data = { tittle: 'dsa' }
            return logic.updateProduct(userId, 'adsadsdsa', data)
                .catch(err => {
                    expect(err).toBeDefined()
                    expect(err.message).toBe('this user do not have any product with id adsadsdsa')
                })
        })

        it('should fail on object instead string', () =>
            expect(() => {
                logic.updateProduct(userId, {})
            }).toThrow(TypeError({} + ' is not a string'))
        )

        it('should fail on number instead string', () =>
            expect(() => {
                logic.updateProduct(userId, 12345)
            }).toThrow(TypeError(12345 + ' is not a string'))
        )

        it('should fail on empty userId', () =>
            expect(() => {
                logic.updateProduct(userId, '')
            }).toThrow(TypeError('productId cannot be empty'))
        )

        it('should fail on wrong user id', () => {
            const data = { tittle: 'dsa' }
            return logic.updateProduct('adsdsa', _id, data)
                .catch(err => {
                    expect(err).toBeDefined()
                })
        })

        it('should fail on object instead string', () =>
            expect(() => {
                logic.updateProduct({}, _id)
            }).toThrow(TypeError({} + ' is not a string'))
        )

        it('should fail on array instead string', () =>
            expect(() => {
                logic.updateProduct([], _id)
            }).toThrow(TypeError([] + ' is not a string'))
        )

        it('should fail on number instead string', () =>
            expect(() => {
                logic.updateProduct(12345, _id)
            }).toThrow(TypeError(12345 + ' is not a string'))
        )

        it('should fail on empty userId', () =>
            expect(() => {
                logic.updateProduct('', _id)
            }).toThrow(TypeError('userId cannot be empty'))
        )

        describe('wrong data', () => {
            it('should fail on string instead object', () =>
                expect(() => {
                    logic.updateProduct(userId, _id, 'sad')
                }).toThrow(TypeError('sad is not an object'))
            )
            it('should fail on array instead object', () =>
                expect(() => {
                    logic.updateProduct(userId, _id, [])
                }).toThrow(TypeError([] + ' is not an object'))
            )
            it('should fail on number instead object', () =>
                expect(() => {
                    logic.updateProduct(userId, _id, 12345)
                }).toThrow(TypeError(12345 + ' is not an object'))
            )
        })
    })
    //#endregion

    after(() =>
        Promise.all([
            Product.deleteMany(),
            User.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})