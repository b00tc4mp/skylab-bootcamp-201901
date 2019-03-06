'use strict'

const { models: { User, Product } } = require('arshop-data')
const bcrypt = require('bcrypt')

/**
 * Abstraction of business logic.
 */
const logic = {
    /**
    * Registers a user.
    * 
    * @param {string} name 
    * @param {string} surname 
    * @param {string} email 
    * @param {string} password 
    * @param {string} passwordConfirmation 
    */
    registerUser(name, surname, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(surname + ' is not a string')
        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string')
        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return (async () => {
            const user = await User.findOne({ email })

            if (user) throw Error(`user with email ${email} already exists`)

            const hash = await bcrypt.hash(password, 10)

            const { id } = await User.create({ name, surname, email, password: hash })

            return id
        })()
    },

    /**
     * Authenticates user by its credentials.
     * 
     * @param {string} email 
     * @param {string} password 
     */
    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(password + ' is not a string')
        if (!password.trim().length) throw Error('password cannot be empty')

        return (async () => {
            const user = await User.findOne({ email })

            if (!user) throw Error(`user with email ${email} not found`)

            const match = await bcrypt.compare(password, user.password)

            if (!match) throw Error('wrong credentials')

            return user.id
        })()
    },

    /**
     * retrieves a user by his id
     * 
     * @param {string} userId 
     */
    retrieveUser(userId) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findById(userId).select('-password -__v').lean()
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                user.id = user._id.toString()

                delete user._id

                return user
            })
    },

    /**
     * updates an user with his credentials
     * 
     * @param {string} userId 
     * @param {object} data 
     */
    updateUser(userId, data) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (!data) throw Error(`data should be defined`)
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return User.findByIdAndUpdate(userId, data, { runValidators: true, new: true }).select('-password -__v').lean()
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                user.id = user._id.toString()

                delete user._id

                return user
            })

    },

    // removeUser

    /**
     * 
     * add a product with user credentials
     * 
     * @param {string} userId 
     * @param {object} product 
     */
    createProduct(userId, product) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (!product) throw Error('product should be defined')
        if (product.constructor !== Object) throw TypeError(`${product} is not an object`)

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                const { tittle, description, price, category, zone } = product
                return Product.create({ tittle, description, price, owner: userId, category, zone })
                    .then((_product) => {

                        user.products.push(_product.id)

                        return user.save()
                            .then(() => _product.id)
                    })
            })
    },

    /**
     *Get all products
     *   
     */
    retrieveProducts() {
        return Product.find().select('-__v').lean()
            .then(products => {
                if (!products) throw Error('there are no products')

                products.forEach(product => {
                    product.id = product._id.toString()
                    delete product._id
                })
                return products
            })
    },

    /**
     * retrieve one product by his ID
     * 
     * @param {string} productId 
     */
    retrieveProduct(productId) {
        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return Product.findById(productId).select('-__v').lean()
            .then(product => {
                if (!product) throw Error(`cannot find product with id ${productId}`)

                product.id = product._id.toString()

                delete product._id

                return product
            })
    },

    toogleFav(userId, productId) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                const index = user.favoriteProducts.findIndex(_productId => _productId == productId)

                if (index < 0) user.favoriteProducts.push(productId)
                else user.favoriteProducts.splice(index, 1)

                return user.save()
                    .then(({favoriteProducts}) => favoriteProducts)
            })
    },

    retrieveFavs(userId) {

        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                return user.favoriteProducts
            })
    },

    searchProductsByCategory(q) {

        if (typeof q !== 'string') throw TypeError(`${q} is not a string`)
        if (!q.trim().length) throw Error('query cannot be empty')

        return Product.find({ category: q }).select('-__v').lean()
            .then(products => {
                if (!products) throw Error('there are no products')

                products.forEach(product => {
                    product.id = product._id.toString()
                    delete product._id
                })
                return products
            })
    },

    searchProducts(q) {

        if (typeof q !== 'string') throw TypeError(`${q} is not a string`)
        if (!q.trim().length) throw Error('query cannot be empty')

        return Product.find({$or: [{ tittle: q }, { description: {$regex: q, $options: 'i'} }]}).select('-__v').lean()
            .then(products => {
                if (!products) throw Error('there are no products')

                products.forEach(product => {
                    product.id = product._id.toString()
                    delete product._id
                })
                return products
            })
    },

    updateProduct(userId, productId, data) {
        if (typeof userId !== 'string') throw TypeError(`${userId} is not a string`)
        if (!userId.trim().length) throw Error('userId cannot be empty')

        if (typeof productId !== 'string') throw TypeError(`${productId} is not a string`)
        if (!productId.trim().length) throw Error('productId cannot be empty')

        if (!data) throw Error(`data should be defined`)
        if (data.constructor !== Object) throw TypeError(`${data} is not an object`)

        return User.findById(userId)
            .then(user => {
                if (!user) throw Error(`user with id ${userId} not found`)

                const index = user.products.findIndex(_productid => _productid == productId)

                if (index < 0) throw Error(`this user do not have any product with id ${productId}`)
                else return productId
            })
            .then((productId) => {
                return Product.findByIdAndUpdate(productId, data, { runValidators: true, new: true }).select('-__v').lean()
                    .then(product => {
                        if (!product) throw Error(`user with id ${productId} not found`)

                        product.id = product._id.toString()

                        delete product._id

                        return product
                    })
            })

    },

}

module.exports = logic