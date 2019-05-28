const validate = require('../common/validate')
const { LogicError } = require('../common/errors')
const { models } = require('kaori-data')
const bcrypt = require('bcrypt')

const { User, Product, Cart } = models

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

        //TODO LOGIC
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

        //TODO LOGIC
        return (async () => {
            const user = await User.findOne({ email })
            if (!user) throw new LogicError(`user with email ${email} doesn't exists`)

            const encryptPassword = bcrypt.hashSync(password, 10)

            if (bcrypt.compareSync(password, encryptPassword)) return user.id //REVISAR
            else throw new LogicError('wrong credentials')

        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])
        //TODO LOGIC
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
            return await Product.findById(id).select('title image description price category -_id').lean()
        })()

    },

    retrieveProductsByCategory(category) {
        validate.arguments([
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])

        return (async () => {
            return await Product.find({ category }).select('title image description price category -_id').lean()
        })()
    },

    addToCart(productId, userId) {
        //TODO VALIDATE 

        //TODO LOGIC


    }


}

module.exports = logic