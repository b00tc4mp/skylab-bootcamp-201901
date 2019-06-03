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
    retrieveUser() {
        return (async () => {

            const res = await kaoriApi.retrieveUser(this.__userToken__)
            const { error } = res

            if (error) throw new LogicError(error)

            return res
        })()
    },

    logoutUser() {
        sessionStorage.clear()
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
            const res = await kaoriApi.createProduct(title, image, description, price, category)
            const { error } = res

            if (error) throw new LogicError(error)

        })()
    },

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

    addToCart(productId) {
        return (async () => {
            const res = await kaoriApi.addToCart(productId, this.__userToken__)
            const { error } = res
            if (error) throw new LogicError(error)
        })()
    }


}

export default logic