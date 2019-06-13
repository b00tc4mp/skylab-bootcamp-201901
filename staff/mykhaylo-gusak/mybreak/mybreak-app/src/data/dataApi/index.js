import { call, ValidationError } from 'mybreak-utils'
const Joi = require('@hapi/joi');

// const { env: { REACT_APP_URL } } = process
const { REACT_APP_URL } = process.env

const dataApi = {
    __url__: REACT_APP_URL,
    __timeout__: 0,

    /**
     * Creates a user.
     * 
     * @param {String} name 
     * @param {String} surname 
     * @param {Object} data 
     * 
     * @throws {ValidationError} - if any param is not a string or age is not a number, if params are empty or has incorrect format
     * @throws {Error} - throw an error in the lower layer
     *
     */
    create(email, password, data) {

        const { name, surname, age } = data
        const validator = {
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            name: Joi.string().alphanum().min(3).max(15).required(),
            surname: Joi.string().alphanum().min(3).max(15).required(),
            age: Joi.number().required()
        }

        const validation = Joi.validate({ email, password, name, surname, age }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                await call(`${this.__url__}/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                    body: JSON.stringify({ email, password, ...data }),
                    timeout: this.__timeout__
                })
            } catch (err) {
                throw Error(err.message)
            }
        })()

    },

    /**
     * Authenticate with user accout information.
     *
     * @param {String} email
     * @param {String} password
     *
     * @throws {ValidationError} - if emails is not a string, if password has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {Error} - throw an error in the lower layer
     *
     */
    authenticate(email, password) {

        const validator = {
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }

        const validation = Joi.validate({ email, password }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const response = await call(`${this.__url__}/auth`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                    timeout: this.__timeout__
                })
                return await response.json()
            } catch (err) {
                throw Error(err.message)
            }
        })()


    },

    /**
     * Retrieves user information
     * 
     * @param {String} token
     * 
     * @throws {ValidationError} - if token is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {ValidationError} -if token it does not have a token format 
     * @throws {Error} - throw an error in the lower layer
     *
     * @returns {Object} - user.
     */
    retrieve(token) {
        const validator = {
            token: Joi.string().regex(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/).required()
        }

        const validation = Joi.validate({ token }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const response = await call(`${this.__url__}/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                    timeout: this.__timeout__
                })

                return await response.json()
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    /**
     * Creat a order.
     * 
     * @param {String} ubication
     * @param {String} token
     * 
     * @throws {ValidationError} - if ubication is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters
     * @throws {ValidationError} -if token it does not have a token format 
     * @throws {Error} - connection error.
     * 
     */
    createOrder(ubication, token) {
        const validator = {
            token: Joi.string().regex(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/).required(),
            ubication: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }
        const validation = Joi.validate({ token, ubication }, validator);
        if (validation.error) throw new ValidationError(validation.error.message)
        return (async () => {
            try {
                const response = await call(`${this.__url__}/order/add`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ubication }),
                    timeout: this.__timeout__
                })
                return await response.json()
            } catch (err) {
                throw Error(err.message)
            }
        })()


    },

    /**
     * Retrieve all orders
     * 
     * @throws {ValidationError} -if token it does not have a token format 
     * @throws {Error} - connection error.
     *
     * @returns {Array} - orders.
     */
    retrieveAllOrders(token) {
        const validator = {
            token: Joi.string().regex(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/).required()
        }
        const validation = Joi.validate({ token }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const orders = await call(`${this.__url__}/orders`, {
                    headers: { Authorization: `Bearer ${token}` },
                    timeout: this.__timeout__
                })
                return await orders.json()
            } catch (err) {
                throw Error(err.message)
            }
        })()

    },

    /**
     * Retrieves orders by author
     * 
     * @param {String} token
     * 
     * @throws {ValidationError} -if token it does not have a token format
     * @throws {Error} - connection error.
     *
     * @returns {Array} - orders.
     */
    retrieveOrder(token) {
        const validator = {
            token: Joi.string().regex(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/).required()
        }
        const validation = Joi.validate({ token }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const response = await call(`${this.__url__}/order/retrieve`, {
                    headers: { Authorization: `Bearer ${token}` },
                    timeout: this.__timeout__
                })
                return await response.json()
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    /**
     * Retrieve orders by id
     * 
     * @param {String} id
     * 
     * @throws {ValidationError} - if id is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
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
                const response = await call(`${this.__url__}/order/${id}`, {
                    timeout: this.__timeout__
                })
                return await response.json()
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    /**
     * Retrieves products by category
     * 
     * @param {String} category
     * 
     * @throws {ValidationError} -if token it does not have a token format
     * @throws {ValidationError} - if category is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {Error} - connection error.
     *
     * @returns {Array} - products.
     */
    retrieveProducts(category, token) {
        const validator = {
            category: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            token: Joi.string().regex(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/).required()
        }

        const validation = Joi.validate({ category, token }, validator);
        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const response = await call(`${this.__url__}/products/${category}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    timeout: this.__timeout__
                })
                return await response.json()
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    /**
     * Retrieve all products.
     * 
     * @throws {ValidationError} -if token it does not have a token format
     * @throws {Error} - connection error.
     * 
     * @returns {Array} - products.
     * 
     */
    retrieveAllProducts(token) {
        const validator = {
            token: Joi.string().regex(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/).required()
        }
        const validation = Joi.validate({ token }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const response = await call(`${this.__url__}/products`, {
                    headers: { Authorization: `Bearer ${token}` },
                    timeout: this.__timeout__
                })
                return await response.json()
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
     * @throws {ValidationError} -if token it does not have a token format
     * @throws {ValidationError} - if id is not a string, has less than 3 or more than 30 digits and if it is not composed of only numbers or letters 
     * @throws {Error} - connection error.
     *
     */
    cardUpdate(productId, token) {
        const validator = {
            productId: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            token: Joi.string().regex(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/).required()
        }

        const validation = Joi.validate({ productId, token }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                await call(`${this.__url__}/card/update`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ productId }),
                    timeout: this.__timeout__
                })

            } catch (err) {
                throw Error(err.message)
            }
        })()
    }
}

export default dataApi