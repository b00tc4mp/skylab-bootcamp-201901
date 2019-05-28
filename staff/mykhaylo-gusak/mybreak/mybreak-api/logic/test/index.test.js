const mongoose = require('mongoose')
const models = require('../../data/index.js')
const { expect } = require('chai')
const logic = require('../index')

const { User, Product } = models;

const url = 'mongodb://localhost/test-mybreak'

describe('logic', () => {
    let userData, name, surname, email, password

    before(() => mongoose.connect(url, { useNewUrlParser: true }))

    beforeEach(async () => {
        await User.deleteMany()

        userData = {
            name: `name${Math.random()}`,
            surname: `surname${Math.random()}`,
            email: `email${Math.random()}@mail.com`,
            password: `password${Math.random()}`
        }

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}`
        password = `password-${Math.random()}`

    })


    describe('User register', () => {
        beforeEach(async () => {
            await User.create(userData)
        })

        it('should succeed on correct user data', async () => {
            const response = await logic.registerUser(name, surname, email, password)
            expect(response).not.to.exist

            const data = await User.findOne({ email }).lean()

            expect(data).to.exist
            expect(data.name).to.have.string(name)
            expect(data.surname).to.have.string(surname)
            expect(data.email).to.have.string(email)
            expect(data.password).to.have.string(password)


        })
        // it('should fail on already existing user', async () => {
        //     const response = await logic.registerUser(userData.name, userData.surname, userData.email, userData.password)
        //     debugger
        //     expect(response).to.throw(Error)


        // })

        // it('should fail on undefined name', () => {
        //     const name = undefined

        //     const response = logic.registerUser(name, surname, email, password)

        //     expect(response).to.throw(Error)
        // })

        // it('should fail on null name', () => {
        //     const name = null

        //     expect(() => logic.registerUser(name, surname, email, password)).to.throw(Error)
        // })

        // it('should fail on empty name', () => {
        //     const name = ''

        //     expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'name is empty')
        // })

        // it('should fail on blank name', () => {
        //     const name = ' \t    \n'

        //     expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'name is empty')
        // })

        // it('should fail on undefined surname', () => {
        //     const surname = undefined

        //     expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `surname is not optional`)
        // })

        // it('should fail on null surname', () => {
        //     const surname = null

        //     expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `surname is not optional`)
        // })

        // it('should fail on empty surname', () => {
        //     const surname = ''

        //     expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'surname is empty')
        // })

        // it('should fail on blank surname', () => {
        //     const surname = ' \t    \n'

        //     expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'surname is empty')
        // })

        // it('should fail on undefined email', () => {
        //     const email = undefined

        //     expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `email is not optional`)
        // })

        // it('should fail on null email', () => {
        //     const email = null

        //     expect(() => logic.registerUser(name, surname, email, password)).toThrowError(RequirementError, `email is not optional`)
        // })

        // it('should fail on empty email', () => {
        //     const email = ''

        //     expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'email is empty')
        // })

        // it('should fail on blank email', () => {
        //     const email = ' \t    \n'

        //     expect(() => logic.registerUser(name, surname, email, password)).toThrowError(ValueError, 'email is empty')
        // })

        // it('should fail on non-email email', () => {
        //     const nonEmail = 'non-email'

        //     expect(() => logic.registerUser(name, surname, nonEmail, password)).toThrowError(FormatError, `${nonEmail} is not an e-mail`)
        // })
    })

    describe('login user', () => {

        beforeEach(async () => {
            await User.create({ name, surname, email, password })
        })

        it('should succed on correct user data', async () => {
            const id = await logic.authenticateUser(email, password)

            expect(id).to.exist
            expect(id).to.have.lengthOf(24)

            let user = await User.findOne({ email }).lean()
            debugger
            expect(user).to.exist
            expect(user._id.toString()).to.equal(id)

        })

        //TODO FAILS


    })

    describe('retrieve user', () => {



        beforeEach(async () => {
            await Product.create({ name, surname, email, password })
        })

        it('should succed on user correct data', async () => {
            const id = await logic.authenticateUser(email, password)
            expect(id).to.exist

            const user = await logic.retrieveUser(id)
            expect(user).to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
        })
    })






    describe('retrieve products', () => {
        let productData
        beforeEach(async () => {
            await Product.deleteMany()
            productData = {
                title: `title${Math.random()}`,
                price: `surname${Math.random()}`,
                category: `drink`
            }
            await Product.create(productData)
            await Product.create(productData)
            await Product.create(productData)
            await Product.create(productData)

        })

        it.only('should succed on correct product url', async () => {
            const products = await logic.retrieveProduct('drink')
            expect(products).to.exist
            expect(products).to.have.length(4)

        })
    })

    after(() => mongoose.disconnect())
})