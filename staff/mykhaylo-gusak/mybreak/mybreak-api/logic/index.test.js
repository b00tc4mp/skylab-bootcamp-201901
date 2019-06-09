const { mongoose, models } = require('mybreak-data')
const { User, Product, Order } = models
const { expect } = require('chai')
const logic = require('./index')
const faker = require('faker')

const url = 'mongodb://localhost/test-mybreak-api-logic';

describe('logic', () => {
    let name, surname, email, password, age, name2, surname2, email2, password2, age2

    before(() => mongoose.connect(url, { useNewUrlParser: true }))

    beforeEach(async () => {
        await User.deleteMany()

        name = faker.name.firstName()
        surname = faker.name.lastName()
        email = faker.internet.email()
        password = 'da33ddf'
        age = faker.random.number()

        name2 = faker.name.firstName()
        surname2 = faker.name.lastName()
        email2 = faker.internet.email()
        password2 = '33d332ddf'
        age2 = faker.random.number()
    })

    describe('User register', () => {

        it('should succeed on correct user data', async () => {
            const response = await logic.registerUser(name, surname, email, password, age)
            expect(response).not.to.exist

            const data = await User.findOne({ email }).lean()
            expect(data).to.exist
            expect(data.name).to.have.string(name)
            expect(data.surname).to.have.string(surname)
            expect(data.email).to.have.string(email)
            expect(data.password).to.have.string(password)
            expect(data.age).to.equal(age).that.is.a('number')
            expect(data._id).to.be.an.instanceof(Object)
        })

        describe('on already existing user', () => {

            beforeEach(async () => {
                await User.deleteMany()
                await User.create({ name, surname, email, password, age })
            })

            it('should fail on already existing user', async () => {
                try {
                    await logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exist
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error)
                    expect(err.message).to.equal(`User with email:${email} already exists`)
                }
            })
        })

        describe('name fails', () => {

            it('should fail on undefined name', () => {
                const name = undefined
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "name" fails because ["name" is required]')
                }
            })

            it('should fail on null name', () => {
                const name = null
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "name" fails because ["name" must be a string]')
                }
            })

            it('should fail on empty name', () => {
                const name = ''
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "name" fails because ["name" is not allowed to be empty]')
                }

            })

            it('should fail on blank name', () => {
                const name = '     '
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "name" fails because ["name" must only contain alpha-numeric characters]')
                }
            })
        })

        describe('surname fails', () => {

            it('should fail on undefined surname', () => {
                const surname = undefined
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "surname" fails because ["surname" is required]')
                }
            })

            it('should fail on null surname', () => {
                const surname = null
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "surname" fails because ["surname" must be a string]')
                }
            })

            it('should fail on empty surname', () => {
                const surname = ''
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "surname" fails because ["surname" is not allowed to be empty]')
                }

            })

            it('should fail on blank surname', () => {
                const surname = '     '
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "surname" fails because ["surname" must only contain alpha-numeric characters]')
                }
            })

        })

        describe('email fails', () => {

            it('should fail on undefined email', () => {
                const email = undefined
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "email" fails because ["email" is required]')
                }
            })

            it('should fail on null email', () => {
                const email = null
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "email" fails because ["email" must be a string]')
                }
            })

            it('should fail on empty email', () => {
                const email = ''
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "email" fails because ["email" is not allowed to be empty]')
                }

            })

            it('should fail on no valid email', () => {
                const email = 'email.com'
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "email" fails because ["email" must be a valid email]')
                }

            })

            it('should fail on blank email', () => {
                const email = '     '
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "email" fails because ["email" must be a valid email]')
                }
            })

        })

        describe('password fails', () => {

            it('should fail on undefined password', () => {
                const password = undefined
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "password" fails because ["password" is required]')
                }
            })

            it('should fail on null password', () => {
                const password = null
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "password" fails because ["password" must be a string]')
                }
            })

            it('should fail on empty password', () => {
                const password = ''
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "password" fails because ["password" is not allowed to be empty]')
                }
            })

            it('should fail on no valid password', () => {
                const password = 'bad password'
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', `child "password" fails because ["password" with value "${password}" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/]`)
                }
            })

            it('should fail on blank password', () => {
                const password = '     '
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', `child "password" fails because ["password" with value "${password}" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/]`)
                }
            })

        })

        describe('age fails', () => {

            it('should fail on undefined age', () => {
                const age = undefined
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "age" fails because ["age" is required]')
                }
            })

            it('should fail on null age', () => {
                const age = null
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "age" fails because ["age" must be a number]')
                }
            })

            it('should fail on empty age', () => {
                const age = ''
                try {
                    logic.registerUser(name, surname, email, password, age)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "age" fails because ["age" must be a number]')
                }
            })

        })

    })

    describe('User login', () => {

        beforeEach(async () => {
            await User.create({ name, surname, email, password, age })
        })

        it('should succed on correct user data', async () => {

            const id = await logic.authenticateUser(email, password)
            expect(id).to.exist
            expect(id).to.have.lengthOf(24)

            let user = await User.findOne({ email }).lean()
            expect(user).to.exist
            expect(user._id.toString()).to.equal(id)
            expect(user.name).to.have.string(name)
            expect(user.surname).to.have.string(surname)
            expect(user.email).to.have.string(email)
            expect(user.password).to.have.string(password)
            expect(user.age).to.equal(age).that.is.a('number')
            expect(user._id).to.be.an.instanceof(Object)

        })

        describe('email fails', () => {

            it('should fail on undefined email', () => {
                const email = undefined
                try {
                    logic.authenticateUser(email, password)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "email" fails because ["email" is required]')
                }
            })

            it('should fail on null email', () => {
                const email = null
                try {
                    logic.authenticateUser(email, password)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "email" fails because ["email" must be a string]')
                }
            })

            it('should fail on empty email', () => {
                const email = ''
                try {
                    logic.authenticateUser(email, password)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "email" fails because ["email" is not allowed to be empty]')
                }

            })

            it('should fail on no valid email', () => {
                const email = 'email.com'
                try {
                    logic.authenticateUser(email, password)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "email" fails because ["email" must be a valid email]')
                }

            })

            it('should fail on blank email', () => {
                const email = '     '
                try {
                    logic.authenticateUser(email, password)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "email" fails because ["email" must be a valid email]')
                }
            })

        })

        describe('password fails', () => {

            it('should fail on undefined password', () => {
                const password = undefined
                try {
                    logic.authenticateUser(email, password)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "password" fails because ["password" is required]')
                }
            })

            it('should fail on null password', () => {
                const password = null
                try {
                    logic.authenticateUser(email, password)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "password" fails because ["password" must be a string]')
                }
            })

            it('should fail on empty password', () => {
                const password = ''
                try {
                    logic.authenticateUser(email, password)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "password" fails because ["password" is not allowed to be empty]')
                }
            })

            it('should fail on no valid password', () => {
                const password = 'bad password'
                try {
                    logic.authenticateUser(email, password)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', `child "password" fails because ["password" with value "${password}" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/]`)
                }
            })

            it('should fail on blank password', () => {
                const password = '     '
                try {
                    logic.authenticateUser(email, password)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', `child "password" fails because ["password" with value "${password}" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/]`)
                }
            })

        })


    })

    describe('User retrieve', () => {

        beforeEach(async () => {
            await User.create({ name, surname, email, password, age })
        })

        it('should succed on user correct data', async () => {
            const id = await logic.authenticateUser(email, password)

            const user = await logic.retrieveUser(id)
            expect(user).to.exist
            expect(user._id).not.to.exist
            expect(user.id).not.to.exist
            expect(user.name).to.have.string(name)
            expect(user.surname).to.have.string(surname)
            expect(user.email).to.have.string(email)
            expect(user.password).not.to.exist
            expect(user.age).to.equal(age).that.is.a('number')
            expect(user.card).to.be.an('array').that.is.empty;
            expect(user.orders).to.be.an('array').that.is.empty;
        })

        describe('id fails', () => {

            it('should fail on undefined id', () => {
                const id = undefined
                try {
                    logic.retrieveUser(id)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "id" fails because ["id" is required]')
                }
            })

            it('should fail on null id', () => {
                const id = null
                try {
                    logic.retrieveUser(id)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "id" fails because ["id" must be a string]')
                }
            })

            it('should fail on empty id', () => {
                const id = ''
                try {
                    logic.retrieveUser(id)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "id" fails because ["id" is not allowed to be empty]')
                }

            })

            it('should fail on no valid id', () => {
                const id = 12345
                try {
                    logic.retrieveUser(id)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', 'child "id" fails because ["id" must be a string]')
                }

            })

            it('should fail on blank id', () => {
                const id = '     '
                try {
                    logic.retrieveUser(id)
                    expect('should not reach this point').to.exis
                } catch (err) {
                    expect(err).to.be.an.instanceof(Error).with.property('message', `child "id" fails because ["id" with value "${id}" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/]`)
                }
            })

        })

    })

    xdescribe('User update', () => {

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

    xdescribe('User delate', () => {

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

    describe('Products', () => {

        describe('Products retrieve', () => {
            let productData, category
            beforeEach(async () => {

                await Product.deleteMany()

                productData = {
                    title: faker.commerce.productName(),
                    price: faker.commerce.price(),
                    category: 'Drink',
                    subCategory: 'Water',
                    image: faker.image.imageUrl()
                }
                await Product.create(productData)
                category = 'Drink'
            })

            it('should succed on correct product data', async () => {
                const products = await logic.retrieveProducts(category)

                expect(products).to.exist
                expect(products).to.have.length(1)
                expect(products[0].title).to.have.string(productData.title)
                expect(products[0].price).to.have.string(productData.price)
                expect(products[0].category).to.have.string(productData.category)
                expect(products[0].subCategory).to.have.string(productData.subCategory)
                expect(products[0].image).to.have.string(productData.image)
                expect(products[0]._id).to.be.an.instanceof(Object)

            })

            describe('category fails', () => {

                it('should fail on undefined category', () => {
                    const category = undefined
                    try {
                        logic.retrieveProducts(category)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "category" fails because ["category" is required]')
                    }
                })

                it('should fail on null category', () => {
                    const category = null
                    try {
                        logic.retrieveProducts(category)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "category" fails because ["category" must be a string]')
                    }
                })

                it('should fail on empty category', () => {
                    const category = ''
                    try {
                        logic.retrieveProducts(category)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "category" fails because ["category" is not allowed to be empty]')
                    }

                })

                it('should fail on blank category', () => {
                    const category = '     '
                    try {
                        logic.retrieveProducts(category)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', `child "category" fails because ["category" with value "${category}" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/]`)
                    }
                })
            })
        })
        describe('Products retrieve all', () => {
            let productData, category
            beforeEach(async () => {

                await Product.deleteMany()

                productData1 = {
                    title: faker.commerce.productName(),
                    price: faker.commerce.price(),
                    category: 'Drink',
                    subCategory: 'Water',
                    image: faker.image.imageUrl()
                }

                productData2 = {
                    title: faker.commerce.productName(),
                    price: faker.commerce.price(),
                    category: 'Drink',
                    subCategory: 'Water',
                    image: faker.image.imageUrl()
                }

                productData3 = {
                    title: faker.commerce.productName(),
                    price: faker.commerce.price(),
                    category: 'Drink',
                    subCategory: 'Water',
                    image: faker.image.imageUrl()
                }

                await Product.create(productData1)
                await Product.create(productData2)
                await Product.create(productData3)
                category = 'Drink'
            })

            it('should succed on correct product data', async () => {
                const products = await logic.retrieveAllProducts()

                expect(products).to.exist
                expect(products).to.have.length(3)

                expect(products[0].title).to.have.string(productData1.title)
                expect(products[0].price).to.have.string(productData1.price)
                expect(products[0].category).to.have.string(productData1.category)
                expect(products[0].subCategory).to.have.string(productData1.subCategory)
                expect(products[0].image).to.have.string(productData1.image)
                expect(products[0]._id).to.be.an.instanceof(Object)

                expect(products[1].title).to.have.string(productData2.title)
                expect(products[1].price).to.have.string(productData2.price)
                expect(products[1].category).to.have.string(productData2.category)
                expect(products[1].subCategory).to.have.string(productData2.subCategory)
                expect(products[1].image).to.have.string(productData2.image)
                expect(products[1]._id).to.be.an.instanceof(Object)

                expect(products[2].title).to.have.string(productData3.title)
                expect(products[2].price).to.have.string(productData3.price)
                expect(products[2].category).to.have.string(productData3.category)
                expect(products[2].subCategory).to.have.string(productData3.subCategory)
                expect(products[2].image).to.have.string(productData3.image)
                expect(products[2]._id).to.be.an.instanceof(Object)

            })
        })
    })

    describe('Orders', () => {
        let product1, product2, product3, ubication, id, author, user, productId
        beforeEach(async () => {

            await User.deleteMany()
            await Product.deleteMany()
            await Order.deleteMany()

            product1 = {
                title: faker.commerce.productName(),
                price: faker.commerce.price(),
                category: 'Drink',
                subCategory: 'Water',
                image: faker.image.imageUrl()
            }

            product2 = {
                title: faker.commerce.productName(),
                price: faker.commerce.price(),
                category: 'Drink',
                subCategory: 'Water',
                image: faker.image.imageUrl()
            }

            product3 = {
                title: faker.commerce.productName(),
                price: faker.commerce.price(),
                category: 'Drink',
                subCategory: 'Water',
                image: faker.image.imageUrl()
            }

            await Product.create(product1)
            await Product.create(product2)
            await Product.create(product3)

            ubication = 'Barcelona'
        })

        describe('Update user cart', () => {

            beforeEach(async () => {

                await User.create({ name, surname, email, password, age })
                user = await User.findOne({ email }).lean()
                id = user._id.toString()

                _product1 = await Product.find({ title: product1.title }).lean()
                productId = _product1[0]._id.toString()
            })

            it('should succed on correct data update', async () => {
                const response = await logic.updateCard(id, productId)
                expect(response).not.to.exist

                const _user = await User.findById(id).lean()
                expect(_user.card).to.have.length(1)
                expect(_user.card[0]).to.be.an.instanceof(Object)
                expect(_user.card[0].toString()).to.have.string(productId)

                const response2 = await logic.updateCard(id, productId)
                expect(response2).not.to.exist

                const _user2 = await User.findById(id).lean()
                expect(_user2.card).to.have.length(0)
            })

            describe('id fails', () => {

                it('should fail on undefined id', () => {
                    const id = undefined
                    try {
                        logic.updateCard(id, productId)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "id" fails because ["id" is required]')
                    }
                })

                it('should fail on null id', () => {
                    const id = null
                    try {
                        logic.updateCard(id, productId)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "id" fails because ["id" must be a string]')
                    }
                })

                it('should fail on empty id', () => {
                    const id = ''
                    try {
                        logic.updateCard(id, productId)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "id" fails because ["id" is not allowed to be empty]')
                    }

                })

                it('should fail on no valid id', () => {
                    const id = 12345
                    try {
                        logic.updateCard(id, productId)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "id" fails because ["id" must be a string]')
                    }

                })

                it('should fail on blank id', () => {
                    const id = '     '
                    try {
                        logic.updateCard(id, productId)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', `child "id" fails because ["id" with value "${id}" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/]`)
                    }
                })

            })

            describe('productId fails', () => {

                it('should fail on undefined productId', () => {
                    const productId = undefined
                    try {
                        logic.updateCard(id, productId)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "productId" fails because ["productId" is required]')
                    }
                })

                it('should fail on null productId', () => {
                    const productId = null
                    try {
                        logic.updateCard(id, productId)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "productId" fails because ["productId" must be a string]')
                    }
                })

                it('should fail on empty productId', () => {
                    const productId = ''
                    try {
                        logic.updateCard(id, productId)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "productId" fails because ["productId" is not allowed to be empty]')
                    }

                })

                it('should fail on no valid productId', () => {
                    const productId = 12345
                    try {
                        logic.updateCard(id, productId)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "productId" fails because ["productId" must be a string]')
                    }

                })

                it('should fail on blank productId', () => {
                    const productId = '     '
                    try {
                        logic.updateCard(id, productId)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', `child "productId" fails because ["productId" with value "${productId}" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/]`)
                    }
                })

            })
        })


        describe('Add order', () => {
            beforeEach(async () => {

                await User.create({ name, surname, email, password, age })
                user = await User.findOne({ email }).lean()
                id = user._id.toString()

                _product1 = await Product.find({ title: product1.title }).lean()
                productId = _product1[0]._id.toString()
                await logic.updateCard(id, productId)

            })

            it('should succed on correct data order', async () => {
                const add = await logic.addOrder(id, ubication)
                expect(add).not.to.exist

                author = mongoose.Types.ObjectId(id)
                const _order = await Order.find({ author }).lean()
                expect(_order).to.exist
                expect(_order[0].author).to.deep.equal(author)
                expect(_order[0].products).to.have.length(1)
                expect(_order[0].products[0].toString()).to.deep.equal(productId)

            })
            describe('id fails', () => {

                it('should fail on undefined id', () => {
                    const id = undefined
                    try {
                        logic.addOrder(id, ubication)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "id" fails because ["id" is required]')
                    }
                })

                it('should fail on null id', () => {
                    const id = null
                    try {
                        logic.addOrder(id, ubication)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "id" fails because ["id" must be a string]')
                    }
                })

                it('should fail on empty id', () => {
                    const id = ''
                    try {
                        logic.addOrder(id, ubication)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "id" fails because ["id" is not allowed to be empty]')
                    }

                })

                it('should fail on no valid id', () => {
                    const id = 12345
                    try {
                        logic.addOrder(id, ubication)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "id" fails because ["id" must be a string]')
                    }

                })

                it('should fail on blank id', () => {
                    const id = '     '
                    try {
                        logic.addOrder(id, ubication)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', `child "id" fails because ["id" with value "${id}" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/]`)
                    }
                })

            })

            describe('ubication fails', () => {

                it('should fail on undefined ubication', () => {
                    const ubication = undefined
                    try {
                        logic.addOrder(id, ubication)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "ubication" fails because ["ubication" is required]')
                    }
                })

                it('should fail on null ubication', () => {
                    const ubication = null
                    try {
                        logic.addOrder(id, ubication)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "ubication" fails because ["ubication" must be a string]')
                    }
                })

                it('should fail on empty ubication', () => {
                    const ubication = ''
                    try {
                        logic.addOrder(id, ubication)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "ubication" fails because ["ubication" is not allowed to be empty]')
                    }

                })

                it('should fail on no valid ubication', () => {
                    const ubication = 12345
                    try {
                        logic.addOrder(id, ubication)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "ubication" fails because ["ubication" must be a string]')
                    }

                })

                it('should fail on blank ubication', () => {
                    const ubication = '     '
                    try {
                        logic.addOrder(id, ubication)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', `child "ubication" fails because ["ubication" with value "${ubication}" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/]`)
                    }
                })

            })

        })

        describe('Orders retrieve by author', () => {
            beforeEach(async () => {

                await User.create({ name, surname, email, password, age })
                user = await User.findOne({ email }).lean()
                id = user._id.toString()

                _product1 = await Product.find({ title: product1.title }).lean()
                productId = _product1[0]._id.toString()
                await logic.updateCard(id, productId)
                await logic.addOrder(id, ubication)
                author = mongoose.Types.ObjectId(id)

            })

            it('should succed on correct order retrieve by author', async () => {
                const _order = await Order.find({ author }).lean()
                expect(_order).to.exist
                expect(_order).to.have.length(1)

                const allOrders = await logic.retrieveOrderByAuthor(author = id)
                expect(allOrders).to.have.length(1)

                expect(_order[0].products[0].toString()).to.have.string(_order[0].products[0])
                expect(_order[0].ubication).to.have.string(allOrders[0].ubication)
                expect(_order[0].date).to.deep.equal(allOrders[0].date).that.is.a('Date')

                expect(allOrders[0]._id).not.to.exist
                expect(allOrders[0].author).not.to.exist

            })
            describe('author fails', () => {

                it('should fail on undefined author', () => {
                    const author = undefined
                    try {
                        logic.retrieveOrderByAuthor(author)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "author" fails because ["author" is required]')
                    }
                })

                it('should fail on null author', () => {
                    const author = null
                    try {
                        logic.retrieveOrderByAuthor(author)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "author" fails because ["author" must be a string]')
                    }
                })

                it('should fail on empty author', () => {
                    const author = ''
                    try {
                        logic.retrieveOrderByAuthor(author)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "author" fails because ["author" is not allowed to be empty]')
                    }

                })

                it('should fail on no valid author', () => {
                    const author = 12345
                    try {
                        logic.retrieveOrderByAuthor(author)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', 'child "author" fails because ["author" must be a string]')
                    }

                })

                it('should fail on blank author', () => {
                    const author = '     '
                    try {
                        logic.retrieveOrderByAuthor(author)
                        expect('should not reach this point').to.exis
                    } catch (err) {
                        expect(err).to.be.an.instanceof(Error).with.property('message', `child "author" fails because ["author" with value "${author}" fails to match the required pattern: /^[a-zA-Z0-9]{3,30}$/]`)
                    }
                })

            })
        })

        describe('Orders retrieve all', () => {
            beforeEach(async () => {

                await User.create({ name, surname, email, password, age })
                user = await User.findOne({ email }).lean()
                id = user._id.toString()

                _product1 = await Product.find({ title: product1.title }).lean()
                productId = _product1[0]._id.toString()
                await logic.updateCard(id, productId)
                await logic.addOrder(id, ubication)
                author = mongoose.Types.ObjectId(id)

            })

            it('should succed on correct order retrieve all', async () => {
                const _order = await Order.find({ author }).lean()
                expect(_order).to.exist
                expect(_order).to.have.length(1)

                const allOrders = await logic.retrieveOrders()
                expect(allOrders).to.have.length(1)

                expect(_order[0].products[0].toString()).to.have.string(_order[0].products[0])
                expect(_order[0].ubication).to.have.string(allOrders[0].ubication)
                expect(_order[0].date).to.deep.equal(allOrders[0].date).that.is.a('Date')
                expect(_order[0].author).to.deep.equal(allOrders[0].author._id)
            })
        })
    })

    after(async () => {
        await Product.deleteMany()
        await Order.deleteMany()
        await User.deleteMany()
        mongoose.disconnect()
    })

})

