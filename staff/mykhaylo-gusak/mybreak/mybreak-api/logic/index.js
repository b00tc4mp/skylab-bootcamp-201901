
const { mongoose, models } = require('mybreak-data')
const { User, Product, Order } = models
const Joi = require('@hapi/joi');
const { LogicError, ValidationError, UnauthorizedError } = require('../common/error')

const logic = {

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

    updateUser(id, data) {
        const validator = {
            id: Joi.string().required()
        }

        const validation = Joi.validate({ id }, validator);
        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const user = await User.findById(id).select('name surname email age orders card -_id').lean()

                if (!user) throw new LogicError(`User with id:${id} not exists.`)

                if (data.name) user.name = data.name
                if (data.surname) user.surname = data.surname

                if (data.email) user.email = data.email
                if (data.age) user.age = data.age

                await User.findByIdAndUpdate(id, user)

                return user
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    deleteUser(id, password) {
        const validator = {
            id: Joi.string().required(),
            password: Joi.string().required(),
        }

        const validation = Joi.validate({ id, password }, validator)
        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const user = await User.findById(id).select('password -_id').lean()
                if (!user) throw new LogicError(`User with id:${id} not exists.`)
                if (user.password != password) throw new UnauthorizedError('Password is incorrect!')
                await User.findByIdAndDelete(id)

            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    retrieveProducts(category) {
        const validator = {
            category: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }

        const validation = Joi.validate({ category }, validator)
        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const products = await Product.find({ category }).lean()

                if (!products) throw Error(`Product with category:${category} not exists.`)

                return products
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    retrieveAllProducts() {
        return (async () => {
            try {
                const products = await Product.find({ }).lean()
                if (!products) throw Error(`There are no products.`)
                return products
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

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

    addOrder(id, ubication) {
        const validator = {
            id: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            ubication: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
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
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

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

    retrieveOrders() {
        return (async () => {
            try {
                const orders = await Order.find().select('products date ubication author -_id').populate('products').populate('author', 'name surname').lean()
                if (!orders) throw Error('Products are not exists.')
                return orders
            } catch (err) {
                throw Error(err.message)
            }
        })()
    }
}

module.exports = logic