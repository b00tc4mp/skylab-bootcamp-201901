'use strict'

const userApi = {
    __url__: 'https://skylabcoders.herokuapp.com/api',
    __timeout__: 0,

    __call__(path, method, body, token, callback) {
        validate.arguments([
            { name: 'path', value: path, type: 'string', notEmpty: true },
            { name: 'method', value: method, type: 'string', notEmpty: true },
            { name: 'body', value: body, type: 'object', notEmpty: true, optional: true },
            { name: 'token', value: token, type: 'string', notEmpty: true, optional: true },
            { value: callback, type: 'function' }
        ])

        const xhr = new XMLHttpRequest

        xhr.timeout = this.__timeout__

        xhr.open(method, `${this.__url__}/${path}`)

        // xhr.addEventListener('load', function () {
        //     callback(JSON.parse(this.responseText))
        // })

        xhr.onload = function () {
            callback(undefined, JSON.parse(this.responseText))
        }

        xhr.onerror = function() {
            callback(new ConnectionError('cannot connect'))
        }

        xhr.ontimeout = () => {
            callback(new TimeoutError(`time out, exceeded limit of ${this.__timeout__}ms`))
        }
        
        if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`)

        if (method === 'GET') {
            if(!token) throw Error('token not provided') // WARN this is because all our GET requests require token (Alicia's idea!)

            if (body) throw Error('cannot send body in GET request')
            else xhr.send()
        } else {
            if (body) {
                xhr.setRequestHeader('Content-Type', 'application/json')
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

        this.__call__('/user', 'POST', { name, surname, username, password }, undefined, callback)
    },

    authenticate(username, password, callback) {
        validate.arguments([
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { value: callback, type: 'function' }
        ])

        this.__call__('/auth', 'POST', { username, password }, undefined, callback)
    },

    retrieve(id, token, callback) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { value: callback, type: 'function' }
        ])

        this.__call__(`/user/${id}`, 'GET', undefined, token, callback)
    }
}