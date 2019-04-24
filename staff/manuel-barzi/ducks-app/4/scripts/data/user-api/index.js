'use strict'

const userApi = {
    __url__: 'https://skylabcoders.herokuapp.com/api',
    __timeout__: 0,

    create(name, surname, username, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, username, password }),
            timeout: this.__timeout__
        })
            .then(response => JSON.parse(response))
    },

    authenticate(username, password) {
        validate.arguments([
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            timeout: this.__timeout__
        })
            .then(response => JSON.parse(response))
    },

    retrieve(id, token) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
            .then(response => JSON.parse(response))
    }
}