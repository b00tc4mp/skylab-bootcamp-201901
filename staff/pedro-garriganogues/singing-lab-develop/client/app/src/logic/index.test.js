'use strict'

const { expect } = require('chai')
const logic = require('.')
const singingLabApi = require('api')

describe('logic (singingLab)', () => {
    const userData = { name: 'John', surname: 'Doe', phone: '+34 111 222 333', address: 'Roc Boronat 35', email: 'jd@mail.com', password: '123' }
    const maryDoeData = { name: 'mary', surname: 'doe', phone: '+34 444 555 111', address: 'colorado', email: 'md@mail.com', password: '456' }

    beforeEach(done => {
        const { email, password } = userData

        singingLabApi.authenticateUser(email, password)
            .then(id =>
                singingLabApi.unregisterUser(id, email, password)
            )
            .then(() => done())
            .catch(() => done())
    })

    describe('register', () => {
        it('should succeed on correct data', () => {
            const { name, surname, address, email, password } = userData

            return logic.registerUser(name, surname, address, email, password)
                .then(res => {
                    expect(res).to.be.true
                })
        })
    })

    describe('login', () => {
        it('should succeed on correct data', () => {
            const { name, surname, address, email, password } = userData

            return singingLabApi.registerUser(name, surname, address, email, password)
                .then(() => logic.login(email, password))
                .then(res => {
                    expect(res).to.be.true
                    expect(logic.userId).not.to.equal('NO-ID')
                })
        })
    })

    describe('retrieve user', () => {
        it('should succeed on correct data', () => {
            const { name, surname, address, email, password } = userData

            return singingLabApi.registerUser(name, surname, address, email, password)
                .then(() => logic.login(email, password))
                .then(res => {

                    expect(res).to.be.true
                    expect(logic.userId).not.to.equal('NO-ID')

                    return logic.retrieveUser()
                        .then(res => {
                            expect(res.name).to.equal('John')
                            expect(res.surname).to.equal('Doe')
                            expect(res.address).to.equal('Roc Boronat 35')
                            expect(res.email).to.equal('jd@mail.com')
                        })
                })
        })
    })

    describe('update user', () => {
        it('should succeed on correct data', () => {
            const { name, surname, address, email, password } = userData

            return singingLabApi.registerUser(name, surname, address, email, password)
                .then(() => logic.login(email, password))
                .then(res => {
                    expect(res).to.be.true
                    expect(logic.userId()).not.to.equal('NO-ID')

                    return logic.updateUser('James', 'Bond', '+34 111 222 333', 'Roc Boronat 35', 'jd@mail.com', '123', 'jb@mail.com', '456')
                        .then(res => {
                            expect(res).to.be.true

                            return singingLabApi.retrieveUser(logic.userId())
                                .then(res => {
                                    expect(res.name).to.equal('James')
                                    expect(res.surname).to.equal('Bond')
                                    expect(res.address).to.equal('Roc Boronat 35')
                                    expect(res.email).to.equal('jb@mail.com')
                                
                                    return singingLabApi.unregisterUser(logic.userId(), res.email, '456')
                                        .then(res => {
                                            expect(res).to.be.true
                                        })
                                })

                        })
                })
        })
    })

    describe('unregister user', () => {
        it('should succeed on correct data', () => {
            const { name, surname, address, email, password } = userData

            return logic.registerUser(name, surname, address, email, password)
                .then(res => {

                })

        })
    })

    describe('list categories', () => {
        it('should succeed on correct data', () => {

            return logic.listCategories()
                .then(res => {
                    expect(res).to.exist
                })

        })
    })

    describe('list products', () => {
        it('should succeed on correct data', () => {

            return logic.listCategories()
                .then(res => {
                    return logic.listProducts(res[0]._id)
                        .then(res => {
                            expect(res).to.exist
                        

                        })
                })

        })
    })

    describe('retrieve product', () => {
        it('should succeed on correct data', () => {

            return logic.listCategories()
                .then(res => {
                    return logic.listProducts(res[0]._id)
                        .then(res => {
                            expect(res).to.exist

                            return logic.retrieveProduct(res[0]._id)
                                .then(product => {
                                    expect(product).to.exist
                                 
                                })
                        })
                })
        })
    })

    describe('list all products', () => {
        it('should succeed on correct data', () => {

            return logic.listAllProducts()
                .then(res => {
                    expect(res).to.exist
                    expect(res[0].name).to.equal('Beginner Course I')
                    expect(res[0].price).to.equal(50)

                })
        })
    })

    describe('add to cart', () => {
        it('should fail on already added product', () => 
            logic.addProductToCart('123')
                .then(res => expect(res).to.be.true)
                .then(() => logic.addProductToCart('123'))
                .catch(err => expect(err.message).to.equal('product already in cart'))
        )
    })
})