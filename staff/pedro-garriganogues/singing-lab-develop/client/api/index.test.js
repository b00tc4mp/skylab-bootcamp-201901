'use strict'

require('dotenv').config()

const { mongoose, models: { User, Category, Product, Order } } = require('data')
const { expect } = require('chai')
const singingLabApi = require('./index')
const _ = require('lodash')
const sinon = require('sinon')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const { env: { DB_URL, API_URL, TOKEN_SECRET } } = process

singingLabApi.url = API_URL

describe('api client (singingLab)', () => {
    let jackData, annaData, otherjackData, beginnerCourseCategoryData, advancedCourseCategoryData, beginnerCourseData, advancedCourseData
    const dummyUserId = '123456781234567812345678'
    const dummyNoteId = '123456781234567812345678'
    const fakeUserId = '123456781234567812345678'
    const fakeNoteId = '123456781234567812345678'

    before(() => mongoose.connect(DB_URL))

    beforeEach(() => {
        jackData = { name: 'Jack', surname: 'Johnson', phone: '+34 933 666 777', address: 'Roc Boronat 35', email: 'jj@mail.com', password: '123' }
        annaData = { name: 'Anna', surname: 'Kennedy', phone: '+34 933 666 778', address: 'Llull 69', email: 'ak@mail.com', password: '456' }
        otherjackData = { name: 'Jack', surname: 'Doe', phone: '+34 933 665 778', address: 'Londres 32', email: 'jd@mail.com', password: '789' }
        beginnerCourseCategoryData = { name: 'Beginner Course', description: 'Beginner Course desc', image: 'http://images.com/230957' }
        advancedCourseCategoryData = { name: 'Advanced Course', description: 'Advanced Course desc', image: 'http://images.com/259827' }
        beginnerCourseData = { name: 'Beginner Course I', price: 50, discount: 15, description: 'Beginner Course I desc', image: 'http://images.com/5678', stock: 123 }
        advancedCourseData = { name: 'Advanced Course I', price: 100, discount: 20, description: 'Advanced Course I desc', image: 'http://images.com/1234', stock: 77 }

        return Promise.all([User.remove(), Category.deleteMany(), Product.deleteMany()])
    })

    describe('register user', () => {
        it('should succeed on correct dada', () =>
            singingLabApi.registerUser('John', 'Doe', 'Roc Boronat 35', 'jd@mail.com', '123')
                .then(res => {
                    expect(res).to.be.true
                })

        )

        it('should fail on already registered user', () =>
            User.create(jackData)
                .then(() => {
                    const { name, surname, address, email, password } = jackData

                    return singingLabApi.registerUser(name, surname, address, email, password)
                })
                .catch(({ message }) => {
                    expect(message).to.equal(`user with email ${jackData.email} already exists`)
                })
        )

        it('should fail on no user name', () =>
            singingLabApi.registerUser()
                .catch(({ message }) => expect(message).to.equal('user name is not a string'))
        )

        it('should fail on empty user name', () =>
            singingLabApi.registerUser('')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on blank user name', () =>
            singingLabApi.registerUser('     ')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on no user surname', () =>
            singingLabApi.registerUser(jackData.name)
                .catch(({ message }) => expect(message).to.equal('user surname is not a string'))
        )

        it('should fail on empty user surname', () =>
            singingLabApi.registerUser(jackData.name, '')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on blank user surname', () =>
            singingLabApi.registerUser(jackData.name, '     ')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on no user address', () =>
            singingLabApi.registerUser(jackData.name, jackData.surname)
                .catch(({ message }) => expect(message).to.equal('user address is not a string'))
        )

        it('should fail on empty user address', () =>
            singingLabApi.registerUser(jackData.name, jackData.surname, '')
                .catch(({ message }) => expect(message).to.equal('user address is empty or blank'))
        )

        it('should fail on blank user address', () =>
            singingLabApi.registerUser(jackData.name, jackData.surname, '     ')
                .catch(({ message }) => expect(message).to.equal('user address is empty or blank'))
        )

        it('should fail on no user email', () =>
            singingLabApi.registerUser(jackData.name, jackData.surname, jackData.address)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            singingLabApi.registerUser(jackData.name, jackData.surname, jackData.address, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            singingLabApi.registerUser(jackData.name, jackData.surname, jackData.address, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            singingLabApi.registerUser(jackData.name, jackData.surname, jackData.address, jackData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            singingLabApi.registerUser(jackData.name, jackData.surname, jackData.address, jackData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            singingLabApi.registerUser(jackData.name, jackData.surname, jackData.address, jackData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        describe('on unexpected server behavior', () => {
            let sandbox

            beforeEach(() => sandbox = sinon.createSandbox())

            afterEach(() => sandbox.restore())

            it('should fail on response status hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    resolve({ status: 201, data: { status: 'KO' } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { name, surname, address, email, password } = jackData

                return singingLabApi.registerUser(name, surname, address, email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal(`unexpected response status 201 (KO)`)
                    })
            })

            it('should fail on email hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ response: { data: { error: 'email is not a string' } } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { name, surname, address, email, password } = jackData

                return singingLabApi.registerUser(name, surname, address, email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal('email is not a string')
                    })
            })

            it('should fail on server down', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ code: 'ECONNREFUSED' })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { name, surname, address, email, password } = jackData

                return singingLabApi.registerUser(name, surname, address, email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal('could not reach server')
                    })
            })
        })
    })


    describe('authenticate user', () => {
        it('should succeed on correct data', () =>
            User.create(jackData)
                .then(() =>
                    singingLabApi.authenticateUser('jj@mail.com', '123')
                        .then(id => {
                            expect(id).to.exist

                            expect(singingLabApi.token()).not.to.equal('NO-TOKEN')
                        })
                )
        )

        it('should fail on no user email', () =>
            singingLabApi.authenticateUser()
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            singingLabApi.authenticateUser('')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            singingLabApi.authenticateUser('     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            singingLabApi.authenticateUser(jackData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            singingLabApi.authenticateUser(jackData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            singingLabApi.authenticateUser(jackData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        describe('on unexpected server behavior', () => {
            let sandbox

            beforeEach(() => sandbox = sinon.createSandbox())

            afterEach(() => sandbox.restore())

            it('should fail on response status hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    resolve({ status: 200, data: { status: 'KO' } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { email, password } = jackData

                return singingLabApi.authenticateUser(email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal(`unexpected response status 200 (KO)`)
                    })
            })

            it('should fail on email hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ response: { data: { error: 'email is not a string' } } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { email, password } = jackData

                return singingLabApi.authenticateUser(email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal('email is not a string')
                    })
            })

            it('should fail on server down', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ code: 'ECONNREFUSED' })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { email, password } = jackData

                return singingLabApi.authenticateUser(email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal('could not reach server')
                    })
            })
        })
    })

    describe('retrieve user', () => {
        it('should succeed on correct data', () =>
            User.create(jackData)
                .then(({ id }) => {
                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    singingLabApi.token(token)

                    return singingLabApi.retrieveUser(id)
                })
                .then(user => {
                    expect(user).to.exist

                    const { name, surname, address, email, _id, password, notes } = user

                    expect(name).to.equal('Jack')
                    expect(surname).to.equal('Johnson')
                    expect(address).to.equal('Roc Boronat 35')
                    expect(email).to.equal('jj@mail.com')

                    expect(_id).to.be.undefined
                    expect(password).to.be.undefined
                    expect(notes).to.be.undefined
                })
        )

        it('should fail on no user id', () =>
            singingLabApi.retrieveUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            singingLabApi.retrieveUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            singingLabApi.retrieveUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        describe('on unexpected server behavior', () => {
            let sandbox

            beforeEach(() => sandbox = sinon.createSandbox())

            afterEach(() => sandbox.restore())

            it('should fail on response status hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    resolve({ status: 200, data: { status: 'KO' } })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return singingLabApi.retrieveUser(fakeUserId)
                    .catch(({ message }) => {
                        expect(message).to.equal(`unexpected response status 200 (KO)`)
                    })
            })

            it('should fail on id hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ response: { data: { error: 'user id is not a string' } } })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return singingLabApi.retrieveUser(fakeUserId)
                    .catch(({ message }) => {
                        expect(message).to.equal('user id is not a string')
                    })
            })

            it('should fail on server down', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ code: 'ECONNREFUSED' })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return singingLabApi.retrieveUser(fakeUserId)
                    .catch(({ message }) => {
                        expect(message).to.equal('could not reach server')
                    })
            })
        })
    })

    describe('udpate user', () => {
        it('should succeed on correct data', () =>
            User.create(jackData)
                .then(({ id }) => {
                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    singingLabApi.token(token)

                    return singingLabApi.updateUser(id, 'Jack', 'Wayne', '+34 111 222 333', 'colorado', 'jj@mail.com', '123', 'jw@mail.com', '456')
                        .then(res => {

                            expect(res).to.be.true

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).to.exist

                            const { name, surname, phone, address, email, password } = user

                            expect(user.id).to.equal(id)
                            expect(name).to.equal('Jack')
                            expect(surname).to.equal('Wayne')
                            expect(phone).to.equal('+34 111 222 333')
                            expect(address).to.equal('colorado')
                            expect(email).to.equal('jw@mail.com')
                            expect(password).to.equal('456')
                        })
                })
        )

        it('should fail on changing email to an already existing user\'s email', () =>
            Promise.all([
                User.create(jackData),
                User.create(otherjackData)
            ])
                .then(([{ id: id1 }, { id: id2 }]) => {
                    const token = jwt.sign({ id: id1 }, TOKEN_SECRET)

                    singingLabApi.token(token)

                    const { name, surname, phone, address, email, password } = jackData

                    return singingLabApi.updateUser(id1, name, surname, phone, address, email, password, otherjackData.email)
                })
                .catch(({ message }) => expect(message).to.equal(`user with email ${otherjackData.email} already exists`))
        )

        it('should fail on no user id', () =>
            singingLabApi.updateUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            singingLabApi.updateUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            singingLabApi.updateUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no user name', () =>
            singingLabApi.updateUser(fakeUserId)
                .catch(({ message }) => expect(message).to.equal('user name is not a string'))
        )

        it('should fail on empty user name', () =>
            singingLabApi.updateUser(fakeUserId, '')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on blank user name', () =>
            singingLabApi.updateUser(fakeUserId, '     ')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on no user surname', () =>
            singingLabApi.updateUser(fakeUserId, jackData.name)
                .catch(({ message }) => expect(message).to.equal('user surname is not a string'))
        )

        it('should fail on empty user surname', () =>
            singingLabApi.updateUser(fakeUserId, jackData.name, '')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on blank user surname', () =>
            singingLabApi.updateUser(fakeUserId, jackData.name, '     ')
                .catch(({ message }) => expect(message).to.equal('user surname is empty or blank'))
        )

        it('should fail on no user phone', () =>
            singingLabApi.updateUser(fakeUserId, jackData.name, jackData.surname)
                .catch(({ message }) => expect(message).to.equal('user phone is not a string'))
        )

        it('should fail on empty user phone', () =>
            singingLabApi.updateUser(fakeUserId, jackData.name, jackData.surname, '')
                .catch(({ message }) => expect(message).to.equal('user phone is empty or blank'))
        )

        it('should fail on blank user phone', () =>
            singingLabApi.updateUser(fakeUserId, jackData.name, jackData.surname, '     ')
                .catch(({ message }) => expect(message).to.equal('user phone is empty or blank'))
        )

        it('should fail on no user address', () =>
            singingLabApi.updateUser(fakeUserId, jackData.name, jackData.surname, jackData.phone)
                .catch(({ message }) => expect(message).to.equal('user address is not a string'))
        )

        it('should fail on empty user address', () =>
            singingLabApi.updateUser(fakeUserId, jackData.name, jackData.surname, jackData.phone, '')
                .catch(({ message }) => expect(message).to.equal('user address is empty or blank'))
        )

        it('should fail on blank user address', () =>
            singingLabApi.updateUser(fakeUserId, jackData.name, jackData.surname, jackData.address, '     ')
                .catch(({ message }) => expect(message).to.equal('user address is empty or blank'))
        )

        it('should fail on no user email', () =>
            singingLabApi.updateUser(fakeUserId, jackData.name, jackData.surname, jackData.address, jackData.address)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            singingLabApi.updateUser(fakeUserId, jackData.name, jackData.surname, jackData.address, jackData.address, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            singingLabApi.updateUser(fakeUserId, jackData.name, jackData.surname, jackData.address, jackData.address, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            singingLabApi.updateUser(fakeUserId, jackData.name, jackData.surname, jackData.address, jackData.address, jackData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            singingLabApi.updateUser(fakeUserId, jackData.name, jackData.surname, jackData.address, jackData.address, jackData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            singingLabApi.updateUser(fakeUserId, jackData.name, jackData.surname, jackData.address, jackData.address, jackData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

    describe('unregister user', () => {
        it('should succeed on correct data', () =>
            User.create(jackData)
                .then(({ id }) => {
                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    singingLabApi.token(token)

                    const { email, password } = jackData

                    return singingLabApi.unregisterUser(id, email, password)
                        .then(res => {
                            expect(res).to.be.true

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).to.be.null
                        })
                })
        )

        it('should fail on no user id', () =>
            singingLabApi.unregisterUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            singingLabApi.unregisterUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            singingLabApi.unregisterUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no user email', () =>
            singingLabApi.unregisterUser(fakeUserId)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            singingLabApi.unregisterUser(fakeUserId, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            singingLabApi.unregisterUser(fakeUserId, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            singingLabApi.unregisterUser(fakeUserId, jackData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            singingLabApi.unregisterUser(fakeUserId, jackData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            singingLabApi.unregisterUser(fakeUserId, jackData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })

    describe('list categories', () => {
        it('should succeed on correct data', () =>
            Promise.all([
                Category.create(beginnerCourseCategoryData),
                Category.create(advancedCourseCategoryData)
            ])
                .then(res => {
                    return singingLabApi.listCategories()
                        .then(category => {

                            expect(category[0]._id).to.exist
                            expect(category[0].name).to.equal(beginnerCourseCategoryData.name)

                            expect(category[1]._id).to.exist
                            expect(category[1].name).to.equal(advancedCourseCategoryData.name)
                        })
                })
        )
    })


    describe('list products', () => {
        it('should succeed on correct data', () =>
            Promise.all([
                Category.create(beginnerCourseCategoryData),
                Category.create(advancedCourseCategoryData)
            ])
                .then(res => {

                    beginnerCourseData.category = res[0]._id
                    advancedCourseData.category = res[1]._id

                    return Promise.all([
                        Product.create(beginnerCourseData),
                        Product.create(advancedCourseData),
                    ])
                        .then(res => {

                            return Promise.all([
                                singingLabApi.listProducts(res[0].category),
                                singingLabApi.listProducts(res[1].category)
                            ])
                                .then(product => {
                                    expect(product[0][0]._id).to.exist
                                    expect(product[0][0].name).to.equal(beginnerCourseData.name)

                                    expect(product[1][0]._id).to.exist
                                    expect(product[1][0].name).to.equal(advancedCourseData.name)
                                })
                        })
                })
        )
    })

    describe('retrieve product', () => {
        it('should succeed on correct data', () =>
            Category.create(beginnerCourseCategoryData)
                .then(res => {
                    beginnerCourseData.category = res._id

                    return Product.create(beginnerCourseData)
                        .then(res => {

                            return singingLabApi.listProducts(res.category)
                                .then(products => {
                                    expect(products[0]._id).to.exist
                                    expect(products[0].name).to.equal(beginnerCourseData.name)

                                    return singingLabApi.retrieveProduct(products[0]._id)
                                        .then(product => {
                                            expect(product.name).to.equal('Beginner Course I')
                                            expect(product.price).to.equal(50)
                                            expect(product.discount).to.equal(15)
                                            expect(product.description).to.equal('Beginner Course I desc')
                                        })
                                })
                        })
                })
        )
    })


    describe('list all products', () => {
        it('should succeed on correct data', () =>
            Promise.all([
                Category.create(beginnerCourseCategoryData),
                Category.create(advancedCourseCategoryData)
            ])
                .then(res => {
                    beginnerCourseData.category = res[0]._id
                    advancedCourseData.category = res[1]._id

                    return Promise.all([
                        Product.create(beginnerCourseData),
                        Product.create(advancedCourseData)
                    ])
                        .then(res => {
                            singingLabApi.listAllProducts()
                                .then(products => {
                                    expect(products[0].name).to.equal('Beginner Course I')
                                    expect(products[0].price).to.equal(50)
                                    expect(products[0].discount).to.equal(15)
                                    expect(products[0].description).to.equal('Beginner Course I desc')
                                    expect(products[0].stock).to.equal(123)

                                    expect(products[1].name).to.equal('Advanced Course I')
                                    expect(products[1].price).to.equal(100)
                                    expect(products[1].discount).to.equal(20)
                                    expect(products[1].description).to.equal('Advanced Course I desc')
                                    expect(products[1].stock).to.equal(77)
                                })
                        })
                })
        )
    })

    describe('list products by ids', () => {
        it('should succeed on correct data', () =>
            Promise.all([
                Category.create(beginnerCourseCategoryData),
                Category.create(advancedCourseCategoryData)
            ])
                .then(res => {
                    beginnerCourseData.category = res[0]._id
                    advancedCourseData.category = res[1]._id

                    return Promise.all([
                        Product.create(beginnerCourseData),
                        Product.create(advancedCourseData)
                    ])
                        .then(products => {
                            singingLabApi.listProductsByIds([products[0]._doc._id, products[1]._doc._id])
                                .then(product => {
                                    true
                                })
                        })
                })
        )
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})