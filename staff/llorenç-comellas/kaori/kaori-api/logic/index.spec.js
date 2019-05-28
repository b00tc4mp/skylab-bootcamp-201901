require('dotenv').config()
const mongoose = require('mongoose')
const models = require('../data/models')
const logic = require('.')
const { LogicError } = require('../common/errors')

const { User, Product } = models
const { env: { MONGO_URL_LOGIC_TEST: url } } = process

describe('logic', () => {

    beforeAll(() => mongoose.connect(url, { useNewUrlParser: true }))

    describe('users', () => {
        let name, surname, phone, email, password
        beforeEach(async () => {
            await User.deleteMany()

            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            phone = `652${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `password-${Math.random()}`
        })

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

        })

        describe('authenticate user', () => {
            let user
            beforeEach(async () => user = await User.create({ name, surname, phone, email, password }))

            it('should succed on correct user credential', async () => {
                const id = await logic.authenticateUser(email, password)

                expect(id).toBeDefined()
                expect(id).toEqual(user.id)

            })
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

        describe('create products', () => {
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
        describe('retrieve product', () =>{
            let product
            beforeEach(async () => product = await Product.create({ title, image, description, price, category }))
            
            it('should succed on correct id from existing product', async () =>{
                const _product = await logic.retrieveProduct(product.id)
                
                expect(_product.id).toBeUndefined()
                expect(_product.title).toEqual(title)
                expect(_product.image).toEqual(image)
                expect(_product.description).toEqual(description)
                expect(_product.price).toEqual(price)
                expect(_product.category).toEqual(category)
            }) 
        })
    })


    afterAll(() => mongoose.disconnect())
})