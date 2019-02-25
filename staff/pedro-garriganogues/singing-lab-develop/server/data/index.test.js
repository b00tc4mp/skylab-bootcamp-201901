'use strict'

require('dotenv').config()

const { mongoose, models: { User, Category, Product, Order } } = require('.')
const { expect } = require('chai')

const { env: { DB_URL } } = process

describe('models (singin-lab)', () => {
    let jackData, annaData, beginnerCourseCategoryData, advancedCourseCategoryData, beginnerCourseData, advancedCourseData

    before(() => mongoose.connect(DB_URL))

    beforeEach(() => {
        jackData = { name: 'Jack', surname: 'Johnson', phone: '+34 933 666 777', address: 'Roc Boronat 35', email: 'jj@mail.com', password: '123' }
        annaData = { name: 'Anna', surname: 'Kennedy', phone: '+34 933 666 778', address: 'Llull 69', email: 'ak@mail.com', password: '456' }
        beginnerCourseCategoryData = { name: 'Beginner Course', description: 'Beginner Course desc', image: 'http://images.com/230957' }
        advancedCourseCategoryData = { name: 'Advanced Course', description: 'Advanced Course desc', image: 'http://images.com/259827' }
        beginnerCourseData = { name: 'Beginner Course I', price: 50, discount: 15, description: 'Beginner Course I desc', image: 'http://images.com/5678', stock: 123 }
        advancedCourseData = { name: 'Advanced Course I', price: 100, discount: 20, description: 'Advanced Course I desc', image: 'http://images.com/1234', stock: 77 }

        return Promise.all([User.remove(), Category.deleteMany(), Product.deleteMany()])
    })

    describe('create user', () => {
        it('should succeed on correct data', () => {
            const jack = new User(jackData)

            return jack.save()
                .then(user => {
                    expect(user).to.exist
                    expect(user._id).to.exist
                    expect(user.name).to.equal(jackData.name)
                    expect(user.surname).to.equal(jackData.surname)
                    expect(user.phone).to.equal(jackData.phone)
                    expect(user.email).to.equal(jackData.email)
                    expect(user.password).to.equal(jackData.password)
                })
        })
    })

    describe('retrieve user', () => {
        it('should succeed on correct data', () => {
            const jack = new User(jackData)

            return jack.save()
                .then(user => {
                    expect(user).to.exist
                    expect(user._id).to.exist

                    return User.findById(user._id)
                        .then(user => {
                            expect(user.name).to.equal(jackData.name)
                            expect(user.surname).to.equal(jackData.surname)
                            expect(user.phone).to.equal(jackData.phone)
                            expect(user.email).to.equal(jackData.email)
                            expect(user.password).to.equal(jackData.password)
                        })
                })
        })
    })

    describe('create order', () => {
        it('should succeed on correct data', () =>
            Promise.all([
                Category.create(beginnerCourseCategoryData),
                Category.create(advancedCourseCategoryData)
            ])
                .then(res => {
                    const [{ _doc: beginnerCourseCategory }, { _doc: advancedCourseCategory }] = res

                    expect(beginnerCourseCategory._id).to.exist
                    expect(beginnerCourseCategory.name).to.equal(beginnerCourseCategoryData.name)

                    expect(advancedCourseCategory._id).to.exist
                    expect(advancedCourseCategory.name).to.equal(advancedCourseCategoryData.name)

                    beginnerCourseData.category = beginnerCourseCategory._id
                    advancedCourseData.category = advancedCourseCategory._id

                    return Promise.all([
                        Product.create(beginnerCourseData),
                        Product.create(advancedCourseData),
                        new User(jackData).save()
                    ])
                        .then(res => {
                        
                            const [{ _doc: beginnerCourse }, { _doc: advancedCourse }, user] = res

                            expect(beginnerCourse._id).to.exist
                            expect(beginnerCourse.name).to.equal(beginnerCourseData.name)

                            expect(advancedCourse._id).to.exist
                            expect(advancedCourse.name).to.equal(advancedCourseData.name)

                            const order = new Order({
                                date: new Date(),
                                paymentMethod: 'paypal',
                                products: [
                                    beginnerCourse._id,
                                    advancedCourse._id
                                ]
                            })

                            user.orders.push(order)

                            return user.save()
                                .then(user => {
                                    expect(user._id).to.exist
                                    
                                    expect(user.orders).to.exist
                                    expect(user.orders.length).to.equal(1)

                                    const { orders: [order] } = user

                                    expect(order._id).to.exist
                                    expect(order.products).to.exist
                                    expect(order.products.length).to.equal(2)

                                    const { products: [productId1, productId2] } = order

                                    expect(productId1.toString()).to.equal(beginnerCourse._id.toString())
                                    expect(productId2.toString()).to.equal(advancedCourse._id.toString())
                                })
                        })
                })
        )
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})