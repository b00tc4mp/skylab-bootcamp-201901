import dataApi from '../data/dataApi/index.js'
import { normalize, LogicError, ValidationError } from 'mybreak-utils'
const Joi = require('@hapi/joi');

/**
 * Abstraction of business logic.
 */
const logic = {

    /**
    * Set token to sessionStorage.
    */
    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    /**
    * Return token from sessionStorage.
    */
    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    /**
    * Checks if user is logged in.
    */
    get isUserLoggedIn() {
        return !!(this.__userToken__)
    },

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
     * @throws {Error} - throw an error in the lower layer
     *
     */
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
                throw new Error(err.message)
            }
        })()

    },

    /**
     * Log in with user accout.
     *
     * @param {String} email
     * @param {String} password
     *
     * @throws {ValidationError} - if emails is not a string, if password has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {LogicError} - if any param is empty, email is not found or password does not match.
     * @throws {Error} - throw an error in the lower layer
     *
     */
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
                this.__userToken__ = token
                return
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
     * @throws {Error} - throw an error in the lower layer
     *
     * @returns {Object} - user.
     */
    retrieveUser() {
        return (async () => {
            try {
                const user = await dataApi.retrieve(this.__userToken__)
                return user
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    /**
     * Log out user's session
     */
    logOut() {
        sessionStorage.clear()
    },

    /**
     * Retrieves products by category
     * 
     * @param {String} category
     * 
     * @throws {ValidationError} - if category is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {Error} - connection error.
     *
     * @returns {Array} - products.
     */
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

    /**
     * Retrieve all products.
     * 
     * @throws {Error} - connection error.
     * 
     * @returns {Array} - products.
     * 
     */
    retrieveAllProducts() {
        return (async () => {
            try {
                return await dataApi.retrieveAllProducts(this.__userToken__)
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    /**
     * Add order
     * 
     * @param {String} productId
     * 
     * @throws {ValidationError} - if uication is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {Error} - connection error.
     *
     * @returns {Object} - order id.
     */
    addOrder(ubication) {
        const validator = {
            ubication: Joi.string().regex(/^[a-zA-Z0-9\s]{3,30}$/).required()
        }

        const validation = Joi.validate({ ubication }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                return await dataApi.createOrder(ubication, this.__userToken__)
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    /**
     * Retrieve all user's orders
     * 
     * @throws {Error} - connection error.
     *
     * @returns {Array} - orders.
     */
    retrieveMyOrders() {
        return (async () => {
            try {
                return await dataApi.retrieveOrder(this.__userToken__)
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    /**
     * Retrieve all orders
     * 
     * @throws {Error} - connection error.
     *
     * @returns {Array} - orders.
     */
    retrieveAllOrders() {
        return (async () => {
            try {
                return await dataApi.retrieveAllOrders(this.__userToken__)
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    /**
     * Retrieve orders by id
     * 
     * @throws {ValidationError} - if author is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {Error} - connection error.
     *
     * @returns {Array} - order.
     */
    retrieveOrderById(id) {
        const validator = {
            id: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }

        const validation = Joi.validate({ id }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                return await dataApi.retrieveOrderById(id)
            } catch (err) {
                throw Error(err.message)
            }
        })()


    },

    /**
     * Add a product to the user's shopping cart.
     * 
     * @param {String} id
     * 
     * @throws {ValidationError} - if id is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {Error} - connection error.
     *
     */
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
