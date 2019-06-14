import validate from '../../common/validate'
import call from '../../common/call'

const { REACT_APP_PORT } = process.env

const restApi = {
    __url__: `http://localhost:${REACT_APP_PORT}/api`,
    __timeout__: 0,

    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
        ])

        return call(`${this.__url__}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { name, surname, email, password },
            timeout: this.__timeout__
        })
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { email, password },
            timeout: this.__timeout__
        })
    },

    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/users`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },

    updateUser(token, data) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return call(`${this.__url__}/users/update`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: data,
            timeout: this.__timeout__
        })
    },

    deleteUser(token, email, password) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/users/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: { email, password },
            timeout: this.__timeout__
        })
    },

    searchDucks(token, query) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'query', value: query, type: 'string' }
        ])
        
        return call(`${this.__url__}/ducks?query=${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            timeout: this.__timeout__
        })
    },

    retrieveDuck(token, id) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/ducks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            timeout: this.__timeout__
        })
    },

    toggleFavDuck(token, id) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/ducks/${id}/fav`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            timeout: this.__timeout__
        })
    },

    retrieveFavDucks(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/ducks/fav`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            timeout: this.__timeout__
        })
    },

    addToCart(token, id) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/cart/${id}/add`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            timeout: this.__timeout__
        })
    },

    retrieveCartItems(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/cart`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            timeout: this.__timeout__
        })
    }
}

export default restApi