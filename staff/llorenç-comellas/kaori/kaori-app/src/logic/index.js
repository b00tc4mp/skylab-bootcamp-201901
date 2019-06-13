import { validate, normalize } from 'kaori-utils'
import kaoriApi from '../data/kaori-api'
const { errors: { LogicError } } = require('kaori-utils')

const logic = {
    set __userToken__(token) {
        sessionStorage.userToken = token

    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        return !!this.__userToken__
    },

    /**
     * Register user
     * 
     * @param {String} name The user name
     * @param {String} surname The user surname
     * @param {String} phone The user phone 
     * @param {String} email The user email 
     * @param {String} password The user password 
     * 
     */

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
            const res = await kaoriApi.registerUser(name, surname, phone, email, password)
            const { error } = res
            if (error) throw new LogicError(error)
        })()
    },

    /**
     * Login a user and verifies if the user exists and the password is correct
     * 
     * @param {String} email The user email
     * @param {String} password The user password
     * 
     */

    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])
        validate.email(email)

        return (async () => {

            const res = await kaoriApi.authenticateUser(email, password)
            const { error, token } = res

            if (error) throw new LogicError(error)

            this.__userToken__ = token
        })()
    },

    /**
     * Retrieves the user's information 
     * 
     * 
     * @returns {Object} The user's information
     */

    retrieveUser() {
        return (async () => {

            const res = await kaoriApi.retrieveUser(this.__userToken__)
            const { error } = res

            if (error) throw new LogicError(error)

            return res
        })()
    },

    /**
     * Logout user, clear token from session storage
     */
    logoutUser() {
        sessionStorage.clear()
    },

     /**
     * Creates products 
     *
     * @param {String} title The name of the product 
     * @param {String} image The url image of the product
     * @param {String} description The description of the product
     * @param {Number} price The price of the product
     * @param {String} category The category of the product
     * 
     */

    createProduct(title, image, description, price, category) {
        validate.arguments([
            { name: 'title', value: title, type: 'string', notEmpty: true },
            { name: 'image', value: image, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'price', value: price, type: 'number', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const res = await kaoriApi.createProduct(title, image, description, price, category)
            const { error } = res

            if (error) throw new LogicError(error)

        })()
    },

     /**
     * Retrieves a product and verifies if the product exists
     * 
     * @param {String} id The product's id
     * 
     * @returns {Object} The product information 
     */

    retrieveProduct(productId) {
        validate.arguments([
            { name: 'productId', value: productId, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const res = await kaoriApi.retrieveProduct(productId)
            const { error } = res
            if (error) throw new LogicError(error)

            return res
        })()
    },

    /**
     * Retrieves products by category and verifies if the category exists
     * 
     * @param {String} category The category of the products
     * 
     * @returns {Object} The products' information
     */

    retrieveProductsByCategory(category) {
        validate.arguments([
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const res = await kaoriApi.retrieveProductsByCategory(category)
            
            const { error } = res
            if (error) throw new LogicError(error)

            return res
        })()
    },

    /**
     * Adds a product to the cart and verifies if user and product exists
     * 
     * @param {String} productId The product's Id
     * 
     */

    addToCart(productId) {
        return (async () => {
            const res = await kaoriApi.addToCart(productId, this.__userToken__)
            const { error } = res
            if (error) throw new LogicError(error)
        })()
    },

    /**
     * Deletes a product of the cart
     * 
     * @param {*} idProduct The product's id
     * 
     */

    deleteToCart(productId) {
        return (async () => {
            const res = await kaoriApi.deleteToCart(productId, this.__userToken__)

            const { error } = res
            if (error) throw new LogicError(error)

            return res
        })()
    },

    /**
     * Retrieve the user's cart and verifies if the user exists
     * 
     * 
     * @returns {Array} Array of objects with the cart's products
     */

    retrieveCart() {
        return (async () => {
            const res = await kaoriApi.retrieveCart(this.__userToken__)
            
            const { error } = res
            if (error) throw new LogicError(error)

            return res
        })()
    },
    
    /**
     * Move the products to the buying order
     * 
     * @returns {String} The order's id
     */

    cartToOrder() {
        return (async () => {
            const res = await kaoriApi.cartToOrder(this.__userToken__)

            const { error } = res
            if (error) throw new LogicError(error)

            return res
        })()
    }
}

export default logic