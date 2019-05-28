require('dotenv').config()
const { mongoose, models } = require('kaori-data')
const logic = require('.')
const bcrypt = require('bcrypt')
const { LogicError, RequirementError, ValueError, FormatError } = require('../common/errors')

const { User, Product, Cart } = models
const { env: { MONGO_URL_LOGIC_TEST: url } } = process

describe('logic', () => {

    beforeAll(() => mongoose.connect(url, { useNewUrlParser: true }))

    let name, surname, phone, email, password

    beforeEach(async () => {
        await User.deleteMany()

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        phone = `652${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
    })

    describe('users', () => {


        describe('register user', () => {
            it('should succed on correct data', async () => {
                const res = await logic.registerUser(name, surname, phone, email, password)

                expect(res).toBeUndefined()

                const users = await User.find().lean()

                expect(users).toBeDefined()
                expect(users).toHaveLength(1)

                const [user] = users

                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.phone).toBe(phone)
                expect(user.email).toBe(email)
                expect(user.password).toBeDefined()
            })


            it('should fail on retrying register user', async () => {
                try {
                    await User.create({ name, surname, phone, email, password })
                    await logic.registerUser(name, surname, phone, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)

                    expect(error.message).toBe(`user with email "${email}" already exists`)
                }
            })

            //Name
            it('should fail on undefined name', () => {
                const name = undefined

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on null name', () => {
                const name = null

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `name is not optional`)
            })

            it('should fail on empty name', () => {
                const name = ''

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'name is empty')
            })

            it('should fail on blank name', () => {
                const name = ' \t    \n'

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'name is empty')
            })

            //Surname
            it('should fail on undefined surname', () => {
                const surname = undefined

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on null surname', () => {
                const surname = null

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `surname is not optional`)
            })

            it('should fail on empty surname', () => {
                const surname = ''

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'surname is empty')
            })

            it('should fail on blank surname', () => {
                const surname = ' \t    \n'

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'surname is empty')
            })

            //Phone
            it('should fail on undefined phone', () => {
                const phone = undefined

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `phone is not optional`)
            })

            it('should fail on null phone', () => {
                const phone = null

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `phone is not optional`)
            })

            it('should fail on empty phone', () => {
                const phone = ''

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'phone is empty')
            })

            it('should fail on blank phone', () => {
                const phone = ' \t    \n'

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'phone is empty')
            })

            //Email
            it('should fail on undefined phone', () => {
                const email = undefined

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on null email', () => {
                const email = null

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `email is not optional`)
            })

            it('should fail on empty email', () => {
                const email = ''

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'email is empty')
            })

            it('should fail on blank email', () => {
                const email = ' \t    \n'

                expect(() => logic.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'email is empty')
            })
            it('should fail on error email', () => {
                const nonEmail = 'wrong-email'

                expect(() => logic.registerUser(name, surname, phone, nonEmail, password)).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
            })
        })

        describe('authenticate user', () => {
            let user, _password
            beforeEach(async () => {
                _password = bcrypt.hashSync(password, 10)
                user = await User.create({ name, surname, phone, email, password: _password })
            })

            it('should succed on correct user credential', async () => {
                const id = await logic.authenticateUser(email, password)

                expect(id).toBeDefined()
                expect(id).toEqual(user.id)

            })

            // it('should fail on non-existing user', async () => {
            //     try {
            //         await logic.authenticateUser(email = 'unexisting-user@mail.com', password)

            //         throw Error('should not reach this point')
            //     } catch (error) {
            //         expect(error).toBeDefined()
            //         expect(error).toBeInstanceOf(TypeError)

            //         expect(error.message).toBe(`user with email "${email}" does not exist`)
            //     }
            // })
        })

        describe('retrieve user', () => {
            let user
            beforeEach(async () => user = await User.create({ name, surname, phone, email, password }))

            it('should succed on correct id from existing user', async () => {
                const _user = await logic.retrieveUser(user.id)

                expect(_user.id).toBeUndefined()
                expect(_user.name).toEqual(name)
                expect(_user.surname).toEqual(surname)
                expect(_user.phone).toEqual(phone)
                expect(_user.email).toEqual(email)
                expect(_user.password).toBeUndefined()

            })
        })
    })

    describe('Products', () => {

        beforeEach(async () => {
            await Product.deleteMany()

            title = `title-${Math.random()}`
            image = `image-${Math.random()}`
            description = `description-${Math.random()}`
            price = Math.random()
            category = 'MAKIS'
        })

        describe('create product', () => {
            it('should succed on correct data', async () => {
                const res = await logic.createProduct(title, image, description, price, category)

                expect(res).toBeUndefined()

                const products = await Product.find().lean()

                expect(products).toBeDefined()
                expect(products).toHaveLength(1)

                const [product] = products

                expect(product.title).toBe(title)
                expect(product.image).toBe(image)
                expect(product.description).toBe(description)
                expect(product.price).toBe(price)
                expect(product.category).toBe(category)
            })
        })
        describe('retrieve product', () => {
            let product
            beforeEach(async () => product = await Product.create({ title, image, description, price, category }))

            it('should succed on correct id from existing product', async () => {
                const _product = await logic.retrieveProduct(product.id)

                expect(_product.id).toBeUndefined()
                expect(_product.title).toEqual(title)
                expect(_product.image).toEqual(image)
                expect(_product.description).toEqual(description)
                expect(_product.price).toEqual(price)
                expect(_product.category).toEqual(category)
            })
        })

        describe('retrieve product by category', () => {
            let products
            beforeEach(async () => products = await Product.create({ title, image, description, price, category }))

            it('should succed on correct category from existing product', async () => {
                const _products = await logic.retrieveProductsByCategory(products.category)

                expect(_products[0].id).toBeUndefined()
                expect(_products[0].title).toEqual(title)
                expect(_products[0].image).toEqual(image)
                expect(_products[0].description).toEqual(description)
                expect(_products[0].price).toEqual(price)
                expect(_products[0].category).toEqual(category)
            })

        })
    })

    afterAll(() => mongoose.disconnect())
})