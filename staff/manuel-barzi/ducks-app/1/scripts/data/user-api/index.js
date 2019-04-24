'use strict'

const userApi = {
    __url__: 'https://skylabcoders.herokuapp.com/api',
    __timeout__: 0,

    create(name, surname, username, password, callback) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' }
        ])

        call(`${this.__url__}/user`, 'POST', { 'Content-Type': 'application/json' }, JSON.stringify({ name, surname, username, password }), (error, response) => {
            if (error) return callback(error)

            callback(undefined, JSON.parse(response))
        }, this.__timeout__)
    },

    authenticate(username, password, callback) {
        validate.arguments([
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' }
        ])

        call(`${this.__url__}/auth`, 'POST', { 'Content-Type': 'application/json' }, JSON.stringify({ username, password }), (error, response) => {
            if (error) return callback(error)

            callback(undefined, JSON.parse(response))
        }, this.__timeout__)
    },

    retrieve(id, token, callback) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' }
        ])

        call(`${this.__url__}/user/${id}`, 'GET', { Authorization: `Bearer ${token}` }, undefined, (error, response) => {
            if (error) return callback(error)

            callback(undefined, JSON.parse(response))
        }, this.__timeout__)
    }
}