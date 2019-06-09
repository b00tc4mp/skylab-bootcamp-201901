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
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            name: Joi.string().alphanum().min(3).max(15).required(),
            surname: Joi.string().alphanum().min(3).max(15).required(),
            age: Joi.number().required()
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
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
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
        })()
    },

    logOut() {
        sessionStorage.clear()
    },

    retrieveProducts(category) {
        const validator = {
            category: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
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

    retrieveAllProducts() {
        return (async () => {
            try {
                return await dataApi.retrieveAllProducts(this.__userToken__)
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    addOrder(ubication) {
        const validator = {
            ubication: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }

        const validation = Joi.validate({ ubication }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                await dataApi.createOrder(ubication, this.__userToken__)
            } catch (err) {
                throw Error(err.message)
            }
        })()

    },

    retrieveMyOrders() {
        return (async () => {
            try {
                return await dataApi.retrieveOrder(this.__userToken__)
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    retrieveAllOrders() {
        return (async () => {
            try {
                return await dataApi.retrieveAllOrders(this.__userToken__)
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    cardUpdate(id) {
        const validator = {
            id: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
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