
const { mongoose, models } = require('mybreak-data')
const { User, Product, Order } = models
const Joi = require('@hapi/joi');
const { LogicError, ValidationError, UnauthorizedError } = require('../common/error/index')

const logic = {

    // USER

    registerUser(name, surname, email, password, age) {

        const validator = {
            name: Joi.string().min(3).max(30).required(),
            surname: Joi.string().min(3).max(30).required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            age: Joi.number().required(),
        }
        const validation = Joi.validate({ name, surname, email, password, age }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const user = await User.find({ email }).lean()

                if (user === true) throw new LogicError(`User with email:${email} already exists!`)
                const _user = await new User({ name, surname, email, password, age })
                await _user.save()
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    authenticateUser(email, password) {
        const validator = {
            email: Joi.string().required(),
            password: Joi.string().required(),
        }

        const validation = Joi.validate({ email, password }, validator);

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
            id: Joi.string().required()
        }
        const validation = Joi.validate({ id }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                debugger
                const _id = mongoose.Types.ObjectId(id)
                debugger
                const user = await User.findOne({ _id }).select('name surname email age card orders -_id').populate('card orders').lean()
                debugger
                if (!user) throw new LogicError(`User with id:${id} not exists.`)
                debugger
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
        debugger
        const validation = Joi.validate({ id }, validator);
        if (validation.error) throw new ValidationError(validation.error.message)
        return (async () => {
            try {
                const user = await User.findById(id).select('name surname email age orders card -_id').lean()
                debugger
                if (!user) throw new LogicError(`User with id:${id} not exists.`)
                debugger
                if (data.name) user.name = data.name
                if (data.surname) user.surname = data.surname
                debugger
                if (data.email) user.email = data.email
                if (data.age) user.age = data.age
                debugger
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

        const validation = Joi.validate({ id, password }, validator);
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

    // PRODUCTS

    retrieveProducts(category) {
        // TODO validate ??


        return (async () => {
            try {
                const products = await Product.find({ category }).lean()
                debugger
                if (!products) throw Error(`Product with category:${category} not exists.`)
                debugger
                return products
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },


    // CARD

    updateCard(id, productId) {

        const validator = {
            id: Joi.string().required(),
            productId: Joi.string().required()
        }
        const validation = Joi.validate({ id, productId }, validator);
        debugger
        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                debugger
                const user = await User.findById(id).select('card -_id').lean()
                if (!user) throw new LogicError(`User with id:${id} not exists.`)
                debugger
                const _productId = mongoose.Types.ObjectId(productId)
                const index = user.card.findIndex(elem => elem.toString() == productId)
                if (index > -1) user.card.splice(index, 1)
                else user.card.push(_productId)
                debugger
                await User.findByIdAndUpdate(id, user)

            } catch (err) {
                throw Error(err.message)
            }
        })()

    },

    // ORDERS

    addOrder(id, ubication) {
        const validator = {
            id: Joi.string().required(),
            ubication: Joi.string()
        }
        const validation = Joi.validate({ id, ubication }, validator);
        if (validation.error) throw new ValidationError(validation.error.message)
        return (async () => {
            try {
                const user = await User.findById(id).select('card orders').lean()
                if (!user) throw new LogicError(`User with id:${id} not exists.`)

                const order = await Order.create({ author: user._id, products: user.card, ubication })
                user.orders.push(order._id)
                await User.findByIdAndUpdate(id, user)

            } catch (err) {
                throw Error(err.message)
            }
        })()

    },

    retrieveOrderByAuthor(author) {
        const validator = {
            author: Joi.string().required()
        }
        debugger
        const validation = Joi.validate({ author }, validator);
        debugger
        if (validation.error) throw new ValidationError(validation.error.message)
        debugger
        return (async () => {
            try {
                debugger
                const orders = await Order.find({ author }).select('date products ubication -_id').populate('products').lean()
                if (!orders) throw new LogicError(`Orders made by author with id:${author} not exists.`)
                debugger
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