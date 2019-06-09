import kaoriApi from '.'
import { mongoose, models } from 'kaori-data'
import { LogicError, FormatError, ValueError, RequirementError } from 'kaori-utils'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const { User, Product } = models

const { env: { MONGO_URL_LOGIC_TEST: url } } = process

describe('kaori api', () => {

    beforeAll(() => mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }))

    let name, surname, phone, email, password

    beforeEach(async () => {

        await User.deleteMany()

        name = `llorenç-${Math.random()}`
        surname = `comellas-${Math.random()}`
        phone = `652${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

    })

    describe('users', () => {

        describe('register user', () => {
            it('should succed on correct data', async () => {
                const res = await kaoriApi.registerUser(name, surname, phone, email, password)

                expect(res).toBeDefined()
                expect(res.message).toBe('Ok, user registered.')

                const user = await User.findOne({ email }).lean()

                expect(user).toBeDefined()


                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.phone).toBe(phone)
                expect(user.email).toBe(email)
                expect(user.password).toBeDefined()
            })

            it('should fail on retrying register user', async () => {

                await User.create({ name, surname, phone, email, password })
                const res = await kaoriApi.registerUser(name, surname, phone, email, password)

                const { error } = res

                expect(error).toBe(`user with email "${email}" already exists`)


            })
        })

        //Name
        it('should fail on undefined name', () => {
            const name = undefined

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `name is not optional`)
        })

        it('should fail on null name', () => {
            const name = null

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `name is not optional`)
        })

        it('should fail on empty name', () => {
            const name = ''

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'name is empty')
        })

        it('should fail on blank name', () => {
            const name = ' \t    \n'

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'name is empty')
        })

        //Surname
        it('should fail on undefined surname', () => {
            const surname = undefined

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `surname is not optional`)
        })

        it('should fail on null surname', () => {
            const surname = null

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `surname is not optional`)
        })

        it('should fail on empty surname', () => {
            const surname = ''

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'surname is empty')
        })

        it('should fail on blank surname', () => {
            const surname = ' \t    \n'

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'surname is empty')
        })

        //Phone
        it('should fail on undefined phone', () => {
            const phone = undefined

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `phone is not optional`)
        })

        it('should fail on null phone', () => {
            const phone = null

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `phone is not optional`)
        })

        it('should fail on empty phone', () => {
            const phone = ''

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'phone is empty')
        })

        it('should fail on blank phone', () => {
            const phone = ' \t    \n'

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'phone is empty')
        })

        //Email
        it('should fail on undefined email', () => {
            const email = undefined

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `email is not optional`)
        })

        it('should fail on null email', () => {
            const email = null

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `email is not optional`)
        })

        it('should fail on empty email', () => {
            const email = ''

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'email is empty')
        })

        it('should fail on blank email', () => {
            const email = ' \t    \n'

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'email is empty')
        })
        it('should fail on error email', () => {
            const email = 'wrong-email'

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(FormatError, `${email} is not an e-mail`)
        })

        //Password
        it('should fail on undefined password', () => {
            const password = undefined

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `password is not optional`)
        })

        it('should fail on null password', () => {
            const password = null

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(RequirementError, `password is not optional`)
        })

        it('should fail on empty password', () => {
            const password = ''

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'password is empty')
        })

        it('should fail on blank password', () => {
            const password = ' \t    \n'

            expect(() => kaoriApi.registerUser(name, surname, phone, email, password)).toThrowError(ValueError, 'password is empty')
        })

        describe('authenticate user', () => {
            let user, _password, token
            beforeEach(async () => {
                _password = bcrypt.hashSync(password, 10)
                user = await User.create({ name, surname, phone, email, password: _password })

                const res = await kaoriApi.authenticateUser(email, password)

                token = res.token

            })

            it('should succed on correct user credential', async () => {
                // const _token = await kaoriApi.authenticateUser(email, password)

                const { sub } = jwt.decode(token)

                expect(sub).toBeDefined()
                expect(sub).toEqual(user.id)

            })

            it('should fail on non-existing user', async () => {
                const res = await kaoriApi.authenticateUser(email = 'unexisting-user@mail.com', password)

                const { error } = res

                expect(error).toBeDefined()
                expect(error).toBe(`user with email ${email} doesn't exists`)
            })
        })

        describe('retrieve user', () => {
            let token
            beforeEach(async () => {
                await User.create({ name, surname, phone, email, password })

                const response = await kaoriApi.authenticateUser(email, password)
                token = response.token
            })

            it('should succed on correct token from existing user', async () => {
                const _user = await kaoriApi.retrieveUser(token)

                expect(_user.id).toBeUndefined()
                expect(_user.name).toEqual(name)
                expect(_user.surname).toEqual(surname)
                expect(_user.phone).toEqual(phone)
                expect(_user.email).toEqual(email)
                expect(_user.password).toBeUndefined()

            })

            it('should fail on invalid user token', async () => {
                token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Y2YyYjk1ZjA1MDk5MmU0N2JlYTFjMDYiLCJpYXQiOjE1NTk0MTEwNDMsImV4cCI6MTU1OTQxODI0M30.NoMNZUiWPYr1jW5agziVwVQCX59kDv8vMLPf7q5c6E8as-token'
                const res = await kaoriApi.retrieveUser(token)

                const { error } = res

                expect(error).toBe('invalid signature')

            })

            it('should fail on wrong user token', async () => {
                token = 'wrong-token'

                const res = await kaoriApi.retrieveUser(token)

                const { error } = res
                expect(error).toBeDefined()
                expect(error).toBe('jwt malformed')

            })

        })

    })

    describe('Products', () => {
        let title, image, description, price, category
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
                const res = await kaoriApi.createProduct(title, image, description, price, category)
                const { message } = res

                expect(message).toBeDefined()
                expect(message).toBe('Ok, product create.')

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
            let product, productId
            beforeEach(async () => product = await Product.create({ title, image, description, price, category }))

            it('should succed on correct id from existing product', async () => {
                const _product = await kaoriApi.retrieveProduct(product.id)


                expect(_product.id).toBeUndefined()
                expect(_product.title).toEqual(title)
                expect(_product.image).toEqual(image)
                expect(_product.description).toEqual(description)
                expect(_product.price).toEqual(price)
                expect(_product.category).toEqual(category)
            })

            it('should fail on wrong product id', async () => {
                productId = 'wrong-product-id'

                const res = await kaoriApi.retrieveProduct(productId)

                const { error } = res
                expect(error).toBeDefined()
                expect(error).toBe(`Cast to ObjectId failed for value \"${productId}\" at path \"_id\" for model \"Product\"`)
            })

            it('should fail on non existing product id', async () => {
                productId = '5cf2dbfbec1df0e802963bdd'

                const res = await kaoriApi.retrieveProduct(productId)

                const { error } = res
                expect(error).toBeDefined()
                expect(error).toBe(`product whit id \"${productId}\" doesn't exists`)
            })

        })

        describe('retrieve product by category', () => {
            let products
            beforeEach(async () => products = await Product.create({ title, image, phone, description, price, category }))

            it('should succed on correct category from existing product', async () => {
                const _products = await kaoriApi.retrieveProductsByCategory(products.category)

                expect(_products[0].id).toBeDefined()
                expect(_products[0].title).toEqual(title)
                expect(_products[0].image).toEqual(image)
                expect(_products[0].description).toEqual(description)
                expect(_products[0].price).toEqual(price)
                expect(_products[0].category).toEqual(category)
            })

        })

        describe('add product to cart', () => {
            let user, token, productId
            beforeEach(async () => {
                user = await User.create({ name, surname, phone, email, password })
                const response = await kaoriApi.authenticateUser(email, password)
                token = response.token
            })

            it('should succeed adding product', async () => {
                const product = await Product.create({
                    title: 'Maki',
                    image: 'url',
                    description: 'Lorem ipsum',
                    price: 10,
                    category: 'ENTRANTES'
                })

                const res = await kaoriApi.addToCart(product.id, token)
                expect(res).toBeDefined()
                expect(res.message).toBe('Ok, product add to cart')

                const _user = await User.findById(user.id).lean()

                const { cart } = _user

                expect(cart).toBeDefined()
                expect(cart).toHaveLength(1)

                expect(cart[0].productId.toString()).toEqual(product.id)
                expect(cart[0].quantity).toBe(1)

            })

            it('should succed adding more items', async () => {
                const product = await Product.create({
                    title: 'Maki',
                    image: 'url',
                    description: 'Lorem ipsum',
                    price: 10,
                    category: 'ENTRANTES'
                })
                const _product = await Product.create({
                    title: 'Maki',
                    image: 'url',
                    description: 'Lorem ipsum',
                    price: 10,
                    category: 'ENTRANTES'
                })

                await kaoriApi.addToCart(product.id, token)
                await kaoriApi.addToCart(_product.id, token)

                const _user = await User.findById(user.id).lean()

                const { cart } = _user

                expect(cart).toBeDefined()
                expect(cart).toHaveLength(2)

                expect(cart[0].productId.toString()).toEqual(product.id)
                expect(cart[0].quantity).toBe(1)
                expect(cart[1].productId.toString()).toEqual(_product.id)
                expect(cart[1].quantity).toBe(1)
            })

            it('should succeed adding the same item', async () => {
                const product = await Product.create({
                    title: 'Maki',
                    image: 'url',
                    description: 'Lorem ipsum',
                    price: 10,
                    category: 'ENTRANTES'
                })

                await kaoriApi.addToCart(product.id, token)

                const res = await kaoriApi.addToCart(product.id, token)
                expect(res).toBeDefined()

                const _user = await User.findById(user.id).lean()

                const { cart } = _user

                expect(cart).toBeDefined()
                expect(cart).toHaveLength(1)

                expect(cart[0].productId.toString()).toEqual(product.id)
                expect(cart[0].quantity).toBe(2)

            })

            it('should fail on wrong product id', async () => {
                productId = 'wrong-product-id'

                const res = await kaoriApi.addToCart(productId, token)

                const { error } = res
                expect(error).toBeDefined()
                expect(error).toBe(`Cast to ObjectId failed for value \"${productId}\" at path \"_id\" for model \"Product\"`)

            })
        })

        describe('delete product to cart', () => {
            let user, token, productId
            beforeEach(async () => {
                user = await User.create({ name, surname, phone, email, password })
                const response = await kaoriApi.authenticateUser(email, password)
                token = response.token
            })

            it('should delete product to cart', async () => {
                const product = await Product.create({
                    title: 'Fish-roll',
                    image: 'url',
                    description: 'Lorem ipsum',
                    price: 8,
                    category: 'ENTRANTES'
                })
                await kaoriApi.addToCart(product.id, token)

                await kaoriApi.deleteToCart(product.id, token)

                const _user = await User.findById(user.id).lean()

                const { cart } = _user

                expect(cart).toBeDefined()
                expect(cart).toHaveLength(0)
            })

            // it('should fail on wrong-product-id', async () => {
            //     productId = 'wrong-id'

            //     const res = await kaoriApi.deleteToCart(productId, token)
            //     debugger
            //     const { error } = res
            //     expect(error).toBeDefined()
            //     expect(error).toBe(`Cast to ObjectId failed for value \"${productId}\" at path \"_id\" for model \"Product\"`)

            // })
        })

        describe('retrieve cart', () => {
            let user, token
            beforeEach(async () => {
                user = await User.create({ name, surname, phone, email, password })
                const response = await kaoriApi.authenticateUser(email, password)
                token = response.token
            })


            it('should succed on correct data', async () => {
                const product = await Product.create({
                    title: 'Pack',
                    image: 'url',
                    description: 'Lorem ipsum',
                    price: 12,
                    category: 'ENTRANTES'
                })

                const _product = await Product.create({
                    title: 'Oslo',
                    image: 'url',
                    description: 'Lorem ipsum',
                    price: 6,
                    category: 'MAKIS'
                })

                await kaoriApi.addToCart(product.id, token)
                await kaoriApi.addToCart(_product.id, token)

                user.save()

                const cart = await kaoriApi.retrieveCart(token)

                expect(cart).toBeDefined()
                expect(cart).toHaveLength(2)

                expect(cart[0].product.id.toString()).toBe(product.id)
                expect(cart[1].product.id.toString()).toBe(_product.id)
                expect(cart[0].quantity).toBe(1)
                expect(cart[1].quantity).toBe(1)

            })
        })

        describe('from cart to order', () => {
            let user, token
            beforeEach(async () => {
                user = await User.create({ name, surname, phone, email, password })
                const response = await kaoriApi.authenticateUser(email, password)
                token = response.token
            })

            it('should create new order', async () => {
                const productA = await Product.create({
                    title: 'Fish-roll',
                    image: 'url',
                    description: 'Lorem ipsum',
                    price: 8,
                    category: 'ENTRANTES'
                })

                const productB = await Product.create({
                    title: 'Fish-roll-sub',
                    image: 'url',
                    description: 'Lorem ipsum',
                    price: 18,
                    category: 'ENTRANTES'
                })
                await kaoriApi.addToCart(productA.id, token)

                await kaoriApi.addToCart(productB.id, token)

                const order = await kaoriApi.cartToOrder(token)

                expect(user.cart.length).toEqual(0)
                expect(order).toBeDefined()

            })
        })

    })

    afterAll(() => mongoose.disconnect())
})
