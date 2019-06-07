const { mongoose, models } = require('mybreak-data')
const { User, Product, Order } = models
const { expect } = require('chai')
const logic = require('./index');

const url = 'mongodb://localhost/mybreak';

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
        age = Math.random()

        name2 = `name-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        email2 = `email-${Math.random()}`
        password2 = `password-${Math.random()}`
        age2 = Math.random()

    })


    describe('User register', () => {
        beforeEach(async () => {
            await User.create(userData)
        })

        it('should succeed on correct user data', async () => {
            const response = await logic.registerUser(name, surname, email, password, age)
            expect(response).not.to.exist

            const data = await User.findOne({ email }).lean()

            expect(data).to.exist
            expect(data.name).to.have.string(name)
            expect(data.surname).to.have.string(surname)
            expect(data.email).to.have.string(email)
            expect(data.password).to.have.string(password)
            expect(data.age).to.have.number(age)


        })
        // it('should fail on already existing user', async () => {
        //     const response = await logic.registerUser(userData.name, userData.surname, userData.email, userData.password)
        //     
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

    describe('update user', () => {

        beforeEach(async () => {
            await User.create({ name, surname, email, password, age })
        })

        it('should succed on correct user data update', async () => {
            const id = await logic.authenticateUser(email, password)
            expect(id).to.exist

            const user = await logic.retrieveUser(id)
            expect(user).to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.age).to.equal(age)

            const userUpdated = await logic.updateUser(id, { name: name2, surname: surname2, email: email2, age: age2 })
            expect(userUpdated).to.exist
            expect(userUpdated.name).to.equal(name2)
            expect(userUpdated.surname).to.equal(surname2)
            expect(userUpdated.email).to.equal(email2)
            expect(userUpdated.age).to.equal(age2)

        })
    })

    describe('delete user', () => {

        beforeEach(async () => {
            await User.create({ name, surname, email, password, age })
        })

        it('should succed on correct user data deleting', async () => {
            const id = await logic.authenticateUser(email, password)
            expect(id).to.exist

            const user = await logic.retrieveUser(id)
            expect(user).to.exist

            const userDeleted = await logic.deleteUser(id, password)
            expect(userDeleted).not.to.exist

            const userCheck = await User.findById(id).lean()
            expect(userCheck).not.to.exist

        })
    })

    describe('product', () => {


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

            it('should succed on correct product url', async () => {
                const products = await logic.retrieveProducts('drink')
                expect(products).to.exist
                expect(products).to.have.length(4)

            })
        })
    })


    describe('order', () => {

        beforeEach(async () => {

            await Product.deleteMany()
            await Order.deleteMany()

            await Product.create({ title: 'Coffee', price: '1.5', category: 'drink', subCategory: 'Coffee', image: 'https://picsum.photos/200' })
            await Product.create({ title: 'Capuccino', price: '1.75', category: 'drink', subCategory: 'Coffee', image: 'https://picsum.photos/200' })
            await Product.create({ title: 'Water', price: '1', category: 'drink', subCategory: 'Refreshing drinks', image: 'https://picsum.photos/200' })
            await Product.create({ title: 'Cola', price: '1.25', category: 'drink', subCategory: 'Refreshing drinks', image: 'https://picsum.photos/200' })
            await Product.create({ title: 'Fanta', price: '1', category: 'drink', subCategory: 'Refreshing drinks', image: 'https://picsum.photos/200' })


        })

        describe('add order', () => {
            let name, surname, email, password, age, products, ubication, user, author, token
            beforeEach(async () => {

                ubication = `ubication-${Math.random()}`

                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}`
                password = `password-${Math.random()}`
                age = Math.random()

                await User.create({ name, surname, email, password, age })
                user = await User.findOne({ email }).lean()
                author = user._id.toString()

            })

            it.only('should succed on correct data order', async () => {
                const order = await logic.addOrder(author, ubication)
                expect(order).not.to.exist
                author = mongoose.Types.ObjectId(author)
                const _order = await Order.find({ author }).lean()

                expect(_order).to.exist
                expect(_order[0].author).to.deep.equal(author)

                expect(_order[0].products[0]).to.deep.equal(products[0]._id)
                expect(_order[0].products[1]).to.deep.equal(products[1]._id)
                expect(_order[0].products[2]).to.deep.equal(products[2]._id)
                expect(_order[0].products[3]).to.deep.equal(products[3]._id)
                expect(_order[0].products[4]).to.deep.equal(products[4]._id)

            })
        })
    })






    after(async () => {
        await Product.deleteMany()
        await Order.deleteMany()
        mongoose.disconnect()
    })
})