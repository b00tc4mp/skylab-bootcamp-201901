const validate = require('../common/validate')
const { LogicError } = require('../common/errors')
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
            const product = await Product.findById(id).select('-_id title image description price category').lean()
            if (!product) throw new LogicError(`product whit id "${id}" doesn't exists`)
            return product
        })()

    },

    retrieveProductsByCategory(category) {
        validate.arguments([
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const product = await Product.find({ category }).select('-_id title image description price category').lean()
            if (!product) throw new LogicError(`product whit category ${category} doesn't exists`)

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

            const index = user.cart.findIndex(product => product.productId.toString() === productId)

            if (index < 0) user.cart.push({ productId, quantity: 1 })
            else user.cart[index].quantity++

            await user.save()

            return user.cart
        })()
    },

    deleteToCart(productId, userId) {
        validate.arguments([
            { name: 'productId', value: productId, type: 'string', notEmpty: true },
            { name: 'userId', value: userId, type: 'string', notEmpty: true }
        ])
        return (async () => {
            const user = await User.findById(userId)
            if (!user) throw new LogicError(`user with id ${userId} doesn't exists`)


            if (user.cart.length) {
                const index = await user.cart.indexOf(({ id }) => id === productId)
                user.cart.splice(index, 1)
            }

            await user.save()

            return user.cart

        })()
    },

    retrieveCart(userId) {
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await User.findById(userId)
            if (!user) throw new LogicError(`user with id ${userId} doesn't exists`)
            
            const { cart } = user
            
            if (cart.length){
                cart.forEach(product =>{
                    product.id = product._id.toString()
                    delete product._id
                })
            }
            return cart

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