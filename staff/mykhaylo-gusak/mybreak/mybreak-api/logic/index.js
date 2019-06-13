
const { mongoose, models } = require('mybreak-data')
const { User, Product, Order } = models
const Joi = require('@hapi/joi');
const { LogicError, ValidationError, UnauthorizedError } = require('../common/error')

/**
 * Abstraction of business logic.
 */
const logic = {
    /**
     * Registers a user.
     * 
     * @param {String} name 
     * @param {String} surname 
     * @param {String} email 
     * @param {String} password 
     * @param {Number} age 
     * 
     * @throws {ValidationError} - if any param is not a string or age is not a number, if params are empty or has incorrect format
     * @throws {LogicError} - if user with the same email already exists.
     * @throws {Error} - connection error.
     *
     */

    registerUser(name, surname, email, password, age) {
        const validator = {
            name: Joi.string().alphanum().min(3).max(15).required(),
            surname: Joi.string().alphanum().min(3).max(15).required(),
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            age: Joi.number().required(),
        }

        const validation = Joi.validate({ name, surname, email, password, age }, validator)
        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const user = await User.findOne({ email })

                if (user === true) throw new LogicError(`User with email:${email} already exists`)
                const _user = await new User({ name, surname, email, password, age })
                await _user.save()
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    /**
     * Authenticates a user.
     *
     * @param {String} email
     * @param {String} password
     *
     * @throws {ValidationError} - if emails is not a string, if password has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {LogicError} - if any param is empty, email is not found or password does not match.
     * @throws {Error} - connection error.
     *
     */
    authenticateUser(email, password) {
        const validator = {
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }

        const validation = Joi.validate({ email, password }, validator)
        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const user = await User.findOne({ email }).lean()

                if (!user) throw new LogicError(`User with email${email} no exists.`)
                if (user.password != password) throw new LogicError(`Password is incorrect!`)

                return user._id.toString()
            } catch (err) {
                throw Error(err.message)
            }

        })()
    },


    /**
     * Retrieves user information
     * 
     * @param {String} id
     * 
     * @throws {ValidationError} - if the id is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {LogicError} - if user with id not exists.
     * @throws {Error} - connection error.
     *
     * @returns {Object} - user.
     */
    retrieveUser(id) {
        const validator = {
            id: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }

        const validation = Joi.validate({ id }, validator)
        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {

                const _id = mongoose.Types.ObjectId(id)

                const user = await User.findOne({ _id }).select('name surname email age card orders -_id').populate('card orders').lean()

                if (!user) throw new LogicError(`User with id:${id} not exists.`)

                return user
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    // updateUser(id, data) {
    //     const validator = {
    //         id: Joi.string().required()
    //     }

    //     const validation = Joi.validate({ id }, validator);
    //     if (validation.error) throw new ValidationError(validation.error.message)

    //     return (async () => {
    //         try {
    //             const user = await User.findById(id).select('name surname email age orders card -_id').lean()

    //             if (!user) throw new LogicError(`User with id:${id} not exists.`)

    //             if (data.name) user.name = data.name
    //             if (data.surname) user.surname = data.surname

    //             if (data.email) user.email = data.email
    //             if (data.age) user.age = data.age

    //             await User.findByIdAndUpdate(id, user)

    //             return user
    //         } catch (err) {
    //             throw Error(err.message)
    //         }
    //     })()
    // },

    // deleteUser(id, password) {
    //     const validator = {
    //         id: Joi.string().required(),
    //         password: Joi.string().required(),
    //     }

    //     const validation = Joi.validate({ id, password }, validator)
    //     if (validation.error) throw new ValidationError(validation.error.message)

    //     return (async () => {
    //         try {
    //             const user = await User.findById(id).select('password -_id').lean()
    //             if (!user) throw new LogicError(`User with id:${id} not exists.`)
    //             if (user.password != password) throw new UnauthorizedError('Password is incorrect!')
    //             await User.findByIdAndDelete(id)

    //         } catch (err) {
    //             throw Error(err.message)
    //         }
    //     })()
    // },

    /**
     * Retrieves products by category
     * 
     * @param {String} category
     * 
     * @throws {ValidationError} - if the category is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {LogicError} - if there are no products with this category
     * @throws {Error} - connection error.
     *
     * @returns {Array} - products.
     */
    retrieveProducts(category) {
        const validator = {
            category: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }

        const validation = Joi.validate({ category }, validator)
        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const products = await Product.find({ category }).lean()
                if (!products) throw new LogicError(`Product with category:${category} not exists.`)

                return products
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },


    /**
     * Retrieve all products.
     *
     * @returns {Array} - products.
     */
    retrieveAllProducts() {
        return (async () => {
            try {
                const products = await Product.find({}).lean()
                if (!products) throw Error(`There are no products.`)
                return products
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    /**
     * Add a product to the user's shopping cart.
     * 
     * @param {String} id
     * @param {String} productId
     * 
     * @throws {ValidationError} - if id is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {ValidationError} - if productId is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {LogicError} - if there is no product with this id
     * @throws {Error} - connection error.
     *
     */
    updateCard(id, productId) {
        const validator = {
            id: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            productId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }

        const validation = Joi.validate({ id, productId }, validator)
        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const user = await User.findById(id).select('card -_id').lean()
                if (!user) throw new LogicError(`User with id:${id} not exists.`)

                const index = user.card.findIndex(elem => elem.toString() == productId)
                const _productId = mongoose.Types.ObjectId(productId)

                if (index > -1) user.card.splice(index, 1)
                else user.card.push(_productId)

                await User.findByIdAndUpdate(id, user)
            } catch (err) {
                throw Error(err.message)
            }
        })()

    },

    /**
     * Add order
     * 
     * @param {String} id
     * @param {String} productId
     * 
     * @throws {ValidationError} - if id is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {ValidationError} - if uication is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {LogicError} - if there is no products user this id
     * @throws {Error} - connection error.
     *
     * @returns {Object} - order id.
     */
    addOrder(id, ubication) {
        const validator = {
            id: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            ubication: Joi.string().regex(/^[a-zA-Z0-9\s]{3,30}$/).required()
        }

        const validation = Joi.validate({ id, ubication }, validator)
        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const user = await User.findById(id).select('card orders').lean()
                if (!user) throw new LogicError(`User with id:${id} not exists.`)

                const order = await Order.create({ author: user._id, products: user.card, ubication })
                user.orders.push(order._id)
                user.card = []

                await User.findByIdAndUpdate(id, user)

                return order._id
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    /**
     * Retrieve orders by author
     * 
     * @param {String} author
     * 
     * @throws {ValidationError} - if author is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {LogicError} - if there is no author with this id
     * @throws {Error} - connection error.
     *
     * @returns {Array} - orders.
     */
    retrieveOrderByAuthor(author) {
        const validator = {
            author: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }

        const validation = Joi.validate({ author }, validator)

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const orders = await Order.find({ author }).select('date products ubication -_id').populate('products').lean()
                if (!orders) throw new LogicError(`Orders made by author with id:${author} not exists.`)
                return orders
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    /**
     * Retrieve all orders
     * 
     * @throws {LogicError} - if there are no orders
     * @throws {Error} - connection error.
     *
     * @returns {Array} - orders.
     */
    retrieveOrders() {
        return (async () => {
            try {
                const orders = await Order.find().select('products date ubication author -_id').populate('products').populate('author', 'name surname').lean()
                if (!orders) throw new LogicError('Orders are not exists.')
                return orders
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    /**
     * Retrieve orders by id
     * 
     * @throws {ValidationError} - if author is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {LogicError} - if there is no order with this id
     * @throws {Error} - connection error.
     *
     * @returns {Array} - order.
     */
    retrieveOrderById(id) {
        const validator = {
            id: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        }

        const validation = Joi.validate({ id }, validator)
        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const order = await Order.findById(id).select('products date ubication author -_id').populate('products').populate('author', 'name surname').lean()
                if (!order) throw Error('Order do not exist.')
                return order
            } catch (err) {
                throw Error(err.message)
            }
        })()
    }
}

module.exports = logic