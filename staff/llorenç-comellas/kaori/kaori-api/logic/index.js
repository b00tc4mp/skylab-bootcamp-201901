const { validate } = require('kaori-utils')
const { errors: { LogicError } } = require('kaori-utils')
const { models, mongoose: { Schema: { Types: { ObjectId } } } } = require('kaori-data')
const bcrypt = require('bcrypt')

const { User, Product, Order } = models

const logic = {

    /**
     * Register user
     * 
     * @param {String} name The user name
     * @param {String} surname The user surname
     * @param {String} phone The user phone 
     * @param {String} email The user email 
     * @param {String} password The user password 
     * 
     * @returns {Object} Object with new user
     */

    registerUser(name, surname, phone, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'phone', value: phone, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        const encryptPassword = bcrypt.hashSync(password, 10)
        return (async () => {
            const users = await User.find({ email })
            if (users.length) throw new LogicError(`user with email "${email}" already exists`)

            await User.create({ name, surname, phone, email, password: encryptPassword })
        })()
    },

    /**
     * Authenticates a user and verifies if the user exists and the password is correct
     * 
     * @param {String} email The user email
     * @param {String} password The user password
     * 
     * @returns {String} The user's id
     */

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await User.findOne({ email })
            if (!user) throw new LogicError(`user with email ${email} doesn't exists`)

            const encryptPassword = bcrypt.compareSync(password, user.password)

            if (!encryptPassword) throw new LogicError('wrong credentials')
            
            return user.id

        })()
    },

    /**
     * Retrieves the user's information 
     * 
     * @param {String} id The user id
     * 
     * @returns {Object} The user's information
     */

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await User.findById(id).select('name surname phone email -_id').lean()
            if (!user) throw new LogicError(`user with id ${id} doesn't exists`)

            return user
        })()

    },

    updateUser() {
        //TODO
    },

    deleteUser() {
        //TODO
    },

    /**
     * Creates products 
     *
     * @param {String} title The name of the product 
     * @param {String} image The url image of the product
     * @param {String} description The description of the product
     * @param {Number} price The price of the product
     * @param {String} category The category of the product
     * 
     */

    createProduct(title, image, description, price, category) {
        validate.arguments([
            { name: 'title', value: title, type: 'string', notEmpty: true },
            { name: 'image', value: image, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'price', value: price, type: 'number', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])

        return (async () => {
            await Product.create({ title, image, description, price, category })
        })()
    },

    /**
     * Retrieves a product and verifies if the product exists
     * 
     * @param {String} id The product's id
     * 
     * @returns {Object} The product information 
     */

    retrieveProduct(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const product = await Product.findById(id).select('_id title image description price category').lean()
            if (!product) throw new LogicError(`product whit id "${id}" doesn't exists`)
            return product
        })()

    },

    /**
     * Retrieves products by category and verifies if the category exists
     * 
     * @param {String} category The category of the products
     * 
     * @returns {Object} The products' information
     */

    retrieveProductsByCategory(category) {
        validate.arguments([
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const product = await Product.find({ category }).select('_id title image description price category').lean()

            if (!product) throw new LogicError(`product whit category ${category} doesn't exists`)

            product.forEach(item => {
                item.id = item._id.toString()
                delete item._id
            })

            return product
        })()
    },

    /**
     * Adds a product to the cart and verifies if user and product exists
     * 
     * @param {String} productId The product's Id
     * @param {String} userId The user's id
     * 
     * @returns {Object} The user's cart
     */
    
    addToCart(productId, userId) {
        validate.arguments([
            { name: 'productId', value: productId, type: 'string', notEmpty: true },
            { name: 'userId', value: userId, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await User.findById(userId)
            if (!user) throw new LogicError(`user with id ${userId} doesn't exists`)

            const product = await Product.findById(productId)
            if (!product) throw new LogicError(`product with id ${productId} doesn't exists`)

            const index = user.cart.findIndex(product => product.productId.toString() === productId)

            if (index < 0) user.cart.push({ productId, quantity: 1 })
            else user.cart[index].quantity++

            await user.save()

            return user.cart
        })()
    },
    /**
     * Deletes a product of the cart
     * 
     * @param {*} idProduct The product's id
     * @param {*} userId The user's id
     * 
     */
    deleteToCart(idProduct, userId) {
        validate.arguments([
            { name: 'idProduct', value: idProduct, type: 'string', notEmpty: true },
            { name: 'userId', value: userId, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await User.findById(userId).lean()

            if (!user) throw new LogicError(`user with id ${userId} doesn't exists`)

            if (user.cart.length > 0) {
                const cart = user.cart
                const index = cart.findIndex(p => p.productId.toString() === idProduct)

                user.cart.splice(index, 1)
            }

            user.id = user._id.toString()


            const newUser = await User.findByIdAndUpdate(user.id, { cart: user.cart }, { new: true }).populate({
                path: 'cart.productId',
                select: '-__v'
            }).lean()

            const { cart } = newUser

            return cart.map(product => {
                product.id = product._id.toString()
                delete product._id
                product.productId.id = product.productId._id.toString()
                delete product.productId._id
                product.product = product.productId
                delete product.productId
                return product
            })
        })()
    },
    /**
     * Retrieve the user's cart and verifies if the user exists
     * 
     * @param {*} userId The user's id
     * 
     * @returns {Array} Array of objects with the cart's products
     */

    retrieveCart(userId) {
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await User.findById(userId)
                .populate({
                    path: 'cart.productId',
                    select: '-__v'
                }).lean()

            if (!user) throw new LogicError(`user with id ${userId} doesn't exists`)

            const { cart } = user

            return cart.map(product => {
                product.id = product._id.toString()
                delete product._id
                product.productId.id = product.productId._id.toString()
                delete product.productId._id
                product.product = product.productId
                delete product.productId
                return product
            })

        })()
    },
    
    /**
     * Move the products to the buying order
     * 
     * @param {*} userId The user's id
     * 
     * @returns {String} The order's id
     */
    cartToOrder(userId) {
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await User.findById(userId)
            if (!user) throw new LogicError(`user with id ${userId} doesn't exists`)

            const order = await Order.create({ products: user.cart, user: user.id })

            user.cart = []

            await user.save()

            return order.id
        })()
    }

}

module.exports = logic