'use strict'

const userApi = {
    __url__: 'https://skylabcoders.herokuapp.com/api',
    
    __call__(path, method, body, token, callback, callbackError) {
        validate.arguments([
            { name: 'path', value: path, type: 'string', notEmpty: true },
            { name: 'method', value: method, type: 'string', notEmpty: true },
            { name: 'body', value: body, type: 'object', notEmpty: true, optional: true },
            { name: 'token', value: token, type: 'string', notEmpty: true, optional: true },
            { name: 'callback', value: callback, type: 'function' },
            { name: 'callbackError', value: callbackError, type: 'function' }
        ])

        const xhr = new XMLHttpRequest

        xhr.open(method, `${this.__url__}/${path}`)

        xhr.addEventListener('load', function () {
            const response = JSON.parse(this.responseText)
            if (response.status === 'OK'){
                callback(response) 
            }
            else {
                callbackError(response) 
            }
        })

        xhr.addEventListener('error', function () {
            callbackError(this.status);
        })

        if (method === 'GET') {
            if (body) throw Error('cannot send body in GET request')
            else {
                if (!token) throw Error('must send authorization in GET request')
                else {
                    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
                    xhr.send()
                }
            }
        } else {
            if (body) {
                xhr.setRequestHeader('content-type', 'application/json')
                xhr.send(JSON.stringify(body))
            } else xhr.send()
        }
    },

    create(name, surname, username, password, callback, callbackError) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' },
            { name: 'callbackError', value: callbackError, type: 'function' }
        ])

        this.__call__('/user', 'POST', { name, surname, username, password }, undefined, callback, callbackError)
      
    },

    authenticate(username, password, callback, callbackError) {
        validate.arguments([
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' },
            { name: 'callbackError', value: callbackError, type: 'function' }
        ])
    
        this.__call__('/auth', 'POST', { username, password }, undefined, callback, callbackError)
    
    },

    retrieve(id, token, callback, callbackError) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' },
            { name: 'callbackError', value: callbackError, type: 'function' }
        ])
    
        this.__call__(`/user/${id}`, 'GET', undefined, token, callback, callbackError)

    }
}