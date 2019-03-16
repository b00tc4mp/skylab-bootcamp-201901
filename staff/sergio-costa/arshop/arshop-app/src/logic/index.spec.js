import arshopApi from '../arshop-api'
import logic from '.'

require('dotenv').config()
const { mongoose, models: { User, Product } } = require('arshop-data')
const { env: { TEST_DB_URL } } = process
import bcrypt from 'bcrypt'
jest.setTimeout(10000)

describe('logic', () => {

    beforeAll(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            Product.deleteMany(),
            User.deleteMany()
        ])
    )
    //#region REGISTER
    describe('register user', () => {
        const name = 'sergio'
        const surname = 'costa'
        const email = `sergiocosta-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(result => expect(result).toBeUndefined())
        )

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'costa'
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const name = 'sergio'
            const surname = undefined
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'sergio'
            const surname = 10
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'sergio'
            const surname = false
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'sergio'
            const surname = {}
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'sergio'
            const surname = []
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'sergio'
            const surname = ''
            const email = 'sergiocosta@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname cannot be empty'))
        })
    })
    //#endregion

    //#region LOGIN
    describe('log in user', () => {
        const name = 'sergio'
        const surname = 'costa'
        const email = `sergiocosta-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        beforeEach(() =>
            arshopApi.registerUser(name, surname, email, password, passwordConfirm)
        )

        it('should succeed on correct credentials', () =>
            logic.logInUser(email, password)
                .then(() => expect(logic.__userApiToken__).toBeDefined())
        )
    })
    //#endregion

    //#region CHECK IF USER IS LOGIN
    describe('check user is logged in', () => {
        const name = 'sergio'
        const surname = 'costa'
        const email = `sergiocosta-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        beforeEach(() =>
            arshopApi.registerUser(name, surname, email, password, passwordConfirm)
        )

        it('should succeed on correct credentials', () =>
            logic.logInUser(email, password)
                .then(() => expect(logic.isUserLoggedIn).toBeTruthy())
        )
    })
    //#endregion

    //#region LOGOUT
    describe('log out user', () => {
        const name = 'sergio'
        const surname = 'costa'
        const email = `sergiocosta-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        beforeEach(() =>
            arshopApi.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.logInUser(email, password))
        )

        it('should succeed on correct credentials', () => {
            logic.logOutUser()

            expect(logic.__userApiToken__).toBeNull()
        })
    })
    //#endregion

    //#region RETRIEVE USER
    describe('retrieve user', () => {
        const name = 'sergio'
        const surname = 'costa'
        const email = `sergiocosta-${Math.random()}@mail.com`
        const password = '123'
        const passwordConfirm = password

        beforeEach(() =>
            arshopApi.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.logInUser(email, password))
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUser()
                .then(user => {
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        )
    })
    //#endregion

    //#region UPDATE USER
    describe('update user', () => {
        const name = 'sergio'
        const surname = 'costa'
        const data = { surname: 'sans' }
        let email, password

        beforeEach(() => {
            email = `sergiocosta-${Math.random()}@mail.com`
            password = `123-${Math.random()}`
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(() => logic.logInUser(email, password))
                .then(() => arshopApi.authenticateUser(email, password))
                .then(token => logic.__userApiToken__ = token)
        })

        it('should succed on correct credentials', () =>
            logic.updateUser(data)
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(data.surname)
                    expect(user.email).toBe(email)
                })
        )
        it('should fail on empty data', () =>
            expect(() => logic.updateUser('')).toThrowError(' is not an object'))

        it('should fail when data is a number', () =>
            expect(() => logic.updateUser(1)).toThrowError(`1 is not an object`))

        it('should fail when data is an object', () =>
            expect(() => logic.updateUser('hola')).toThrowError(`hola is not an object`))

        it('should fail when data is an array', () =>
            expect(() => logic.updateUser([1, 2, 3])).toThrowError(`1,2,3 is not an object`))

        it('should fail when data is a boolean', () =>
            expect(() => logic.updateUser(true)).toThrowError(`true is not an object`))
    })
    //#endregion

    //#region CREATE PRODUCT
    describe('create product', () => {
        const name = 'sergio'
        const surname = 'costa'
        let email, password

        const product = {
            tittle: 'audi',
            description: 'en buen estado',
            price: 20000,
            category: 'vehicle',
            city: 'Barcelona'
        }

        beforeEach(() => {
            email = `sergiocosta-${Math.random()}@mail.com`
            password = `123-${Math.random()}`
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(() => logic.logInUser(email, password))
                .then(() => arshopApi.authenticateUser(email, password))
                .then(token => logic.__userApiToken__ = token)
        })

        it('should succed on correct credentials', () =>
            logic.createProduct(product)
                .then(({ id }) => {
                    expect(id).toBeDefined()
                })
        )
        it('should fail on empty data', () =>
            expect(() => logic.createProduct('')).toThrowError(' is not an object'))

        it('should fail when data is a number', () =>
            expect(() => logic.createProduct(1)).toThrowError(`1 is not an object`))

        it('should fail when data is an object', () =>
            expect(() => logic.createProduct('hola')).toThrowError(`hola is not an object`))

        it('should fail when data is an array', () =>
            expect(() => logic.createProduct([1, 2, 3])).toThrowError(`1,2,3 is not an object`))

        it('should fail when data is a boolean', () =>
            expect(() => logic.createProduct(true)).toThrowError(`true is not an object`))
    })
    //#endregion

    //#region RETRIEVE ALL PRODUCTS
    describe('retrieve all products', () => {
        const name = 'sergio'
        const surname = 'costa'
        let email, password
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

        it('should succed on correct credentials', () => {
            return logic.retrieveProducts()
                .then(products => {
                    expect(products[0].tittle).toBe(product.tittle)
                })
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
                .then(id => console.log(id))
        })

        it('should succed on correct credentials', () =>
            logic.retrieveProduct(_id)
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
    false && describe('retrive products from user', () => {
        const name = 'sergio'
        const surname = 'costa'
        let email, password

        let token

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
                .then(() => arshopApi.authenticateUser(email, password))
                .then(_token => token = _token)
                .then((token) => arshopApi.createProduct(token, product))
        })

        it('should retrieve products from user', () =>
            logic.retrieveUserProducts(token)
                .then(products => {
                    expect(products[0].tittle).toBe(product.tittle)
                    expect(products[0].description).toBe(product.description)
                    expect(products[0].price).toBe(product.price)
                    expect(products[0].category).toBe(product.category)
                    expect(products[0].city).toBe(product.city)

                    expect(products.length).toBe(1)
                })
        )
    })
    //#endregion

    //#region UPDATE PRODUCT
    describe('update product', () => {
        const name = 'sergio'
        const surname = 'costa'
        const data = { surname: 'sans' }
        let email, password
        let _token
        let _id

        const product = {
            tittle: 'coche',
            description: 'bueno, bonito, barato',
            price: 2000,
            category: 'vehicle',
            city: 'Barcelona'
        }

        beforeEach(() => {
            email = `sergiocosta-${Math.random()}@mail.com`
            password = `123-${Math.random()}`
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(() => logic.logInUser(email, password))
                .then(() => arshopApi.authenticateUser(email, password))
                .then(token => {
                    _token = token
                    return logic.__userApiToken__ = token
                })
                .then(() => arshopApi.createProduct(_token, product))
                .then(({ id }) => _id = id)
        })

        it('should succed on correct credentials', () => {
            const data = { tittle: 'moto' }
            return logic.updateProduct(_id, data)
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
            return logic.updateProduct(_id, data)
                .then(_product => {
                    expect(_product.tittle).toBe(product.tittle)
                    expect(_product.description).toBe(product.description)
                    expect(_product.price).toBe(product.price)
                    expect(_product.category).toBe(product.category)
                    expect(_product.city).toBe(product.city)
                })
        })
    })
    //#endregion

    //#region TOOGLE SOLD
    describe('toogle sold', () => {
        const name = 'sergio'
        const surname = 'costa'
        let email, password
        let _token
        let _id

        const product = {
            tittle: 'coche',
            description: 'bueno, bonito, barato',
            price: 2000,
            category: 'vehicle',
            city: 'Barcelona'
        }

        beforeEach(() => {
            email = `sergiocosta-${Math.random()}@mail.com`
            password = `123-${Math.random()}`
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(() => logic.logInUser(email, password))
                .then(() => arshopApi.authenticateUser(email, password))
                .then(token => {
                    _token = token
                    return logic.__userApiToken__ = token
                })
                .then(() => arshopApi.createProduct(_token, product))
                .then(({ id }) => _id = id)
        })

        it('should succed on correct credentials', () =>
            logic.toogleSold(_id)
                .then(() => Product.findById(_id)
                    .then(_product => {
                        expect(_product).toBeDefined()
                        expect(_product).toBe(true)
                    })
                )
        )

        it('should remove fav', () =>
            logic.toogleSold(_id)
                .then(() => Product.findById(_id)
                    .then(_product => {
                        expect(_product).toBeDefined()
                        expect(_product).toBe(true)
                    })
                )
                .then(() => logic.toogleSold(_id))
                .then(() => Product.findById(_id))
                .then(_product => {
                    expect(_product).toBeDefined()
                    expect(_product).toBe(false)
                })
        )
    })
    //#endregion

    //#region TOOGLE FAV
    describe('toogleFav', () => {
        const name = 'sergio'
        const surname = 'costa'
        let email, password
        let _token
        let _id

        const product = {
            tittle: 'coche',
            description: 'bueno, bonito, barato',
            price: 2000,
            category: 'vehicle',
            city: 'Barcelona'
        }

        beforeEach(() => {
            email = `sergiocosta-${Math.random()}@mail.com`
            password = `123-${Math.random()}`
            return bcrypt.hash(password, 10)
                .then(hash => User.create({ name, surname, email, password: hash }))
                .then(() => logic.logInUser(email, password))
                .then(() => arshopApi.authenticateUser(email, password))
                .then(token => {
                    _token = token
                    return logic.__userApiToken__ = token
                })
                .then(() => arshopApi.createProduct(_token, product))
                .then(({ id }) => _id = id)
        })

        it('should succed on correct credentials', () =>
            logic.toogleFav(_id)
                .then(bool => {
                    expect(bool).toBeDefined()
                    expect(bool).toBe(true)
                })
        )

        it('should remove fav', () =>
            logic.toogleFav(_id)
                .then(bool => {
                    expect(bool).toBe(true)
                })
                .then(() => logic.toogleFav(_id))
                .then(_bool => {
                    expect(_bool).toBe(false)
                })
        )
    })
    //#endregion

    //#region RETRIEVE FAVS
    describe('retrieve favs from user', () => {
        let name = 'sergio'
        let surname = 'costa'
        let email = `sergiocosta-${Math.random()}@mail.com`
        let password = `123-${Math.random()}`
        let _token
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
                .then(token => {
                    _token = token
                    return logic.__userApiToken__ = token
                })
                .then(() => Product.create(product))
                .then(({ id }) => _id = id)
                .then(() => arshopApi.toogleFav(_token, _id))
        )

        it('should retrieve all favs from a user', () =>
            logic.retrieveFavs()
                .then((favorites) => {
                    expect(favorites).toBeDefined()
                    expect(favorites.length).toBe(1)
                    expect(favorites[0].toString()).toBe(_id)
                })
        )

    })
    //#endregion

    //#region SEARCH PRODUCTS
    
    //#endregion

    afterAll(() =>
        Promise.all([
            Product.deleteMany(),
            User.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})