const Joi = require('@hapi/joi');
const call = require('../../common/call')
const { ValidationError } = require('../../common/error/error')

const dataApi = {
    __url__: 'http://localhost:3030',
    __timeout__: 0,

    create(email, password, data) {

        const validator = {
            data: Joi.object().required(),
            password: Joi.string().required(),
            email: Joi.string().required(),
        }
        const validation = Joi.validate({ email, password, data }, validator);
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
            password: Joi.string().required(),
            email: Joi.string().required()
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
            token: Joi.string().required()
        }
        const validation = Joi.validate({ token }, validator);

        if (validation.error) throw new ValidationError(validation.error.message)

        return (async () => {
            try {
                const response = await call(`${this.__url__}/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                    timeout: this.__timeout__
                })
                debugger
                return await response.json()
            } catch (err) {
                throw Error(err.message)
            }
        })()
    },

    // Order

    createOrder() {



    },

    retrieveOrders() {


    },

    retrieveOrder(id) {



    },

    retrieveProducts(category, token) {
        const validator = {
            category: Joi.string().required(),
            token: Joi.string().required()
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

    cardUpdate(productId, token) {
        const validator = {
            productId: Joi.string().required(),
            token: Joi.string().required()
        }
        debugger
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