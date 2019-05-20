const validate = require('../../common/validate')
const call = require('../../common/call')

const userApi = {
    __url__: 'https://skylabcoders.herokuapp.com/api',

    create(username, password, data) {
        validate.arguments([
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true, optional: true }
        ])

        return call(`${this.__url__}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { username, password, ...data }
        })
    },

    authenticate(username, password) {
        validate.arguments([
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { username, password }
        })
    },

    retrieve(id, token) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    update(id, token, data) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        return call(`${this.__url__}/user/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data
        })
    },
}

module.exports = userApi