import { validate, call } from 'kaori-utils'

const { REACT_PORT } = process.env

const kaoriApi = {
    __url__: `http://localhost:${REACT_PORT}/api`,
    __timeout__: 0,

    registerUser(name, surname, phone, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'phone', value: phone, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return call(`${this.__url__}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, phone, email, password }),
            timeout: this.__timeout__
        })
            .then(response => response.json())
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return call(`${this.__url__}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            timeout: this.__timeout__
        })
            .then(response => response.json())
    },

    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },

        ])

        return call(`${this.__url__}/users`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
            .then(response => response.json())
    },

    createProduct(title, image, description, price, category) {
        validate.arguments([
            { name: 'title', value: title, type: 'string', notEmpty: true },
            { name: 'image', value: image, type: 'string', notEmpty: true },
            { name: 'description', value: description, type: 'string', notEmpty: true },
            { name: 'price', value: price, type: 'number', notEmpty: true },
            { name: 'category', value: category, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, image, description, price, category }),
            timeout: this.__timeout__
        })
            .then(response => response.json())
    },

    retrieveProduct(productId) {
        validate.arguments([
            { name: 'productId', value: productId, type: 'string', notEmpty: true },

        ])

        return call(`${this.__url__}/product/${productId}`, {
            timeout: this.__timeout__
        })
            .then(response => response.json())
    },

    retrieveProductsByCategory(category) {
        validate.arguments([
            { name: 'category', value: category, type: 'string', notEmpty: true },

        ])

        return call(`${this.__url__}/products/${category}`, {
            timeout: this.__timeout__
        })
            .then(response => response.json())
    },

    addToCart(productId, token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'productId', value: productId, type: 'string', notEmpty: true },
        ])

        return call(`${this.__url__}/products/${productId}/cart`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
            .then(response => response.json())
    },

    deleteToCart(productId, token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'productId', value: productId, type: 'string', notEmpty: true },
        ])

        return call(`${this.__url__}/products/${productId}/cart`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
            .then(response => response.json())
    },

    retrieveCart(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },

        ])

        return call(`${this.__url__}/cart`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
            .then(response => response.json())
    },

    cartToOrder(token){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },

        ])

        return call(`${this.__url__}/order`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
            .then(response => response.json())
    }

}

export default kaoriApi