
const mongoose = require('mongoose')
const models = require('../data/index.js')
const { User, Product } = models
const Joi = require('@hapi/joi');

const logic = {

    // USER

    registerUser(name, surname, email, password) {

        const validator = {
            name: Joi.string().min(3).max(30).required(),
            surname: Joi.string().min(3).max(30).required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        }
        const validation = Joi.validate({ name, surname, email, password }, validator);

        if (validation.error) throw Error(validation.error.message)

        return (async () => {
            try {
                const user = await User.find({ email }).lean()

                if (user === true) throw Error(`User with email:${email} already exists!`)
                const _user = await new User({ name, surname, email, password })
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

        if (validation.error) throw Error(validation.error.message)

        return (async () => {
            try {
                const user = await User.findOne({ email }).lean()

                if (!user) throw Error(`User with email${email} no exists.`)
                if (user.password != password) throw Error(`Password is incorrect!`)

                return user._id.toString()
            } catch (err) {
                throw Error(err.message)
            }

        })()
    },

    retrieveUser(id) {
        // TODO validate

        return (async () => {
            try {
                const user = await User.findById(id).lean()
                debugger
                if (!user) throw Error(`User with id:${id} not exists.`)
                const { name, surname, email } = user
                return { name, surname, email }
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },


    // PRODUCTS

    // Separar por categorias de productors ??? sii

    retrieveProduct(category) {
        // TODO validate ??


        return (async () => {
            try {
                const products = await Product.find({ category }).lean()
                debugger
                if (!products) throw Error(`Product with category:${category} not exists.`)
                return products
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    addOrder() {

        // TODO Validate

        // TODO Logic

    }




    // ORDERS











}

module.exports = logic