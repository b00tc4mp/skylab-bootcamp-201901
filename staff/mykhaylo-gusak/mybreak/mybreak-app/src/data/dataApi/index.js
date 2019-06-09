const Joi = require('@hapi/joi');
const call = require('../../common/call')
const { ValidationError } = require('../../common/error/error')

const dataApi = {
    __url__: 'http://localhost:3030',
    __timeout__: 0,

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

    createOrder(ubication, token) {
        const validator = {
            token: Joi.string().regex(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/).required(),
            ubication: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }
        const validation = Joi.validate({ token, ubication }, validator);
        if (validation.error) throw new ValidationError(validation.error.message)
        return (async () => {
            try {
                await call(`${this.__url__}/order/add`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ubication }),
                    timeout: this.__timeout__
                })
            } catch (err) {
                throw Error(err.message)
            }
        })()


    },

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