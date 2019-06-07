import dataApi from '../data/dataApi/index.js'
import normalize from '../common/normalize'
const Joi = require('@hapi/joi');
const { ValidationError, LogicError } = require('../common/error/error')

const logic = {

    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        console.log(!(this.__userToken__))
        return !!(this.__userToken__)
    },

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
                await dataApi.create(email, password, { name, surname, age })
            } catch (err) {
                throw new LogicError(err.message)
            }
        })()

    },

    loginUser(email, password) {

        const validator = {
            email: Joi.string().required(),
            password: Joi.string().required(),
        }

        const validation = Joi.validate({ email, password }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const { token } = await dataApi.authenticate(email, password)
                if (!token) throw new LogicError(`User with email${email} no exists.`)
                // sessionStorage.setItem('token', token)
                this.__userToken__ = token
                return
            } catch (err) {
                throw Error(err.message)
            }

        })()

    },

    retrieveUser() {
        return (async () => {
            try {

                const user = await dataApi.retrieve(this.__userToken__)

                if (!user) throw new LogicError(`Incorrect token:${this.__userToken__}.`)
                return user
            } catch (err) {
                throw Error(err.message)
            }
            // return name,surname, email
        })()
    },

    logOut() {
        sessionStorage.clear()
    },

    // products

    retrieveProducts(category) {
        const validator = {
            category: Joi.string().required()
        }
        const validation = Joi.validate({ category }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                return await dataApi.retrieveProducts(category, this.__userToken__)
            } catch (err) {
                throw Error(err.message)
            }
        })()

    },

    // order

    addOrder( ubication) {
        const validator = {
            ubication: Joi.string().required()
        }
        const validation = Joi.validate({ ubication }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                await dataApi.createOrder(this.__userToken__, ubication)
            } catch (err) {
                throw Error(err.message)
            }
        })()

    },

    retrieveOrders() {


    },

    retrieveOrder(id) {



    },

    cardUpdate(id) {
        const validator = {
            id: Joi.string().required()
        }

        const validation = Joi.validate({ id }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                await dataApi.cardUpdate(id, this.__userToken__)
            } catch (err) {
                throw Error(err.message)
            }
        })()

    }


}


export default logic
// module.exports = logic