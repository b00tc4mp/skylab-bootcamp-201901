const { validate } = require('kaori-utils')
const { errors: { LogicError } } = require('kaori-utils')
const { models, mongoose: { Schema: { Types: { ObjectId } } } } = require('kaori-data')
const bcrypt = require('bcrypt')

const { User, Product, CartItem, Order } = models

const logic = {
    registerUser(name, surname, phone, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'phone', value: phone, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const users = await User.find({ email })
            if (users.length) throw new LogicError(`user with email "${email}" already exists`)

            const encryptPassword = bcrypt.hashSync(password, 10)
            await User.create({ name, surname, phone, email, password: encryptPassword })
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await User.findOne({ email })
            if (!user) throw new LogicError(`user with email ${email} doesn't exists`)

            const encryptPassword = bcrypt.hashSync(password, 10)

            if (await bcrypt.compareSync(password, encryptPassword)) return user.id //REVISAR
            else throw new LogicError('wrong credentials')

        })()
    },

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