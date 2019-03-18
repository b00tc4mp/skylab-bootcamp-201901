'use strict'

const { models: { User, Product, Order } } = require('cleanup-data')


const logic = {

    registerUser(name, surname, email, password, passwordConfirmation) {

        if (name === undefined) throw new TypeError('undefined is not a string')

        if (name === null) throw new TypeError('undefined is not a string')

        if (password !== passwordConfirmation) throw new TypeError('passwords do not match')

        if (typeof email !== 'string') throw Error('email is not a string')
        return (async () => {

            const user = await User.findOne({ email })

            if (user) throw Error(`user with email ${email} already exists`)

            await User.create({ name, surname, email, password, passwordConfirmation })
        })()

    },

    authenticateUser(email, password) {

        if (typeof email !== 'string') throw Error('user email is not a string')

        if (!(email = email.trim()).length) throw Error('user email is empty or blank')

        if (typeof password !== 'string') throw Error('user password is not a string')

        if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

        return (async () => {
            const user = await User.findOne({ email, password })

            if (!user) throw Error('wrong credentials')

            return user.id
        })()
    },

    retrieveUser(id) {

        if (typeof id !== 'string') throw Error('user id is not a string')

        return (async () => {

            const user = await User.findById(id).select({ _id: 0, name: 1, surname: 1, email: 1, orders: 1 })

            if (!user) throw Error(`no user found with id ${id}`)

            return user
        })()
    },


    retrieveOrder(userId) {

        if (typeof userId !== 'string') throw Error('order order is not a string')

        return (async () => {

            const orders = await Order.find({ userId }).select({ _id: 0, paymentMethod: 1, status: 1, products: 1, userId: 1 })

            if (!orders.length) throw Error(`no order found with order ${order}`)

            return orders
        })()
    },


    listProducts(category) {
        return (async () => {
            const products = await Product.find({ category })

            if (!products) throw Error(`no products found`)

            return products
        })()


    },


    listProductsByIds(ids) {
        const idsArray = ids.split(',')

        return Promise.resolve()
            .then(() => {
                return Product.find({
                    _id: { $in: idsArray }
                })
                    .then(products => {
                        if (!products) throw Error(`no products where found`)

                        return products
                    })
            })
    },

    makeOrder(paymentMethod, status, products, userId) {
        return (async () => {

            await Order.create({ paymentMethod, status, products, userId })
        })()
    },


    getProduct(productId) {
        return (async () => {

            if (typeof productId !== 'string') throw Error('user productId is not a string')

            if (!(productId = productId.trim()).length) throw Error('user productId is empty or blank')

            const product = await Product.findById(productId)

            if (!product) throw Error(`no product found with id ${productId}`)

            return product
        })()

    },


    listTheProducts() {

        return (async () => {

            const products = await Product.find({})

            if (!products) throw Error(`no products found`)

            return products
        })()

    },

    listProductsByIds(ids) {
        return (async () => {

            const idsArray = ids.split(',')

            const products = await Product.find({
                _id: { $in: idsArray }
            })

            if (!products) throw Error(`no products found`)

            return products
        })()

    },

    addProductToCart(productId) {
        return Promise.resolve()
            .then(() => {
                const any = this.cart().some(_productId => _productId === productId)

                if (any) throw Error('product already in cart')

                this.cart().push(productId)

                this.cart(this.cart())

                return true
            })
    },


    removeProductFromCart(productId) {
        return this.cart(this.cart().filter(id => {
            return id !== productId
        }))
    },


    clearCart() {
        this.cart(null)
    },

}

module.exports = logic

// Call mode 1:

// async function login(email, password) {
//     return await logic.authenticateUser(email, password)
// }

// Call mode 2: 

// login = async (email, password) => await logic.authenticateUser(email, password)

