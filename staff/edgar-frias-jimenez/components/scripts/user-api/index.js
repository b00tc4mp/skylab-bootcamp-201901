'use strict'

const userApi = {
    __url__: 'https://skylabcoders.herokuapp.com/api',

    __call__(path, method, body, callback) {
        validate.arguments([
            { name: 'path', value: path, type: 'string', notEmpty: true },
            { name: 'method', value: method, type: 'string', notEmpty: true },
            { name: 'body', value: body, type: 'object', notEmpty: true, optional: true },
            { value: callback, type: 'function' }
        ])

        const xhr = new XMLHttpRequest

        xhr.open(method, `${this.__url__}/${path}`)

        xhr.addEventListener('load', function () {
            callback(JSON.parse(this.responseText))
        })

        if (method === 'GET') {
            if (body) throw Error('cannot send body in GET request')
            else xhr.send()
        } else {
            if (body) {
                xhr.setRequestHeader('content-type', 'application/json')
                xhr.send(JSON.stringify(body))
            } else xhr.send()
        }
    },

    create(name, surname, username, password, callback) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { value: callback, type: 'function' }
        ])

        // TODO validate inputs

        this.__call__('/user', 'POST', { name, surname, username, password }, callback)
        // this.__call__('/user', 'POST', undefined, callback)
    },

    authenticate(username, password, callback) {
        validate.arguments([
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { value: callback, type: 'function' }
        ])

        this.__call__('/auth', 'POST', { username, password }, callback)
    },

    retrieve(id, token, callback) {
        // TODO
    }
}