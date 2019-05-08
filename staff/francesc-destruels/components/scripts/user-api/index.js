'use strict'

const userApi = {
    __url__: "https://skylabcoders.herokuapp.com/api",
    __timeout__ : 0,

    __call__(path, method,  body, callback, token) {

        validate.arguments([
            { name: 'path', value: path, type: 'string', notEmpty: true },
            { name: 'method', value: method, type: 'string', notEmpty: true },
            { name: 'token', value: token, type: 'string', notEmpty: true, optional: true  },
            { name: 'body', value: body, type: 'object', notEmpty: true, optional: true },
            { value: callback, type: 'function' }
        ])

        const xhr = new XMLHttpRequest

        xhr.timeout = this.__timeout__

        xhr.open(method, `${this.__url__}/${path}`)

        xhr.onload = function () {
            callback(undefined, JSON.parse(this.responseText))
        }

        xhr.onerror = function() {
            callback(new ConnectionError('cannot connect'))
        }

        xhr.ontimeout = () => {
            callback(new TimeoutError(`time out, exceeded limit of ${this.__timeout__}ms`))
        }

        if (token){
            if(!token) throw Error('token not provided')
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        }

        if (method === 'GET') {
            if (body) throw Error('cannot send body in GET request')
            else xhr.send()

        } else {
            if (body) {
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.send(JSON.stringify(body))
            } else xhr.send()
        }
    },

    create(name, surname, username, password, callback){

        validate.arguments([
            {name: 'name', value: name, type: 'string', notEmpty: true},
            {name: 'surname', value: surname, type: 'string', notEmpty: true},
            {name: 'username', value: username, type: 'string', notEmpty: true},
            {name: 'password', value: password, type: 'string', notEmpty: true},
            {name: 'callback', value: callback, type: 'function', notEmpty: true}
        ])

        this.__call__('/user', 'POST',  { name, surname, username, password }, callback)
    },

    authUser(username, password, callback){

        validate.arguments([
            {name: 'username', value: username, type: 'string', notEmpty: true,},
            {name: 'password', value: password, type: 'string', notEmpty: true,},
            {name: 'callback', value: callback, type: 'function', notEmpty: true}
        ])

        this.__call__('/auth', 'POST', { username, password }, callback)
    },

    retrieveUser(token, userID, callback){

        validate.arguments([
            {name: 'token', value: token, type: 'string', notEmpty: true,},
            {name: 'userID', value: userID, type: 'string', notEmpty: true,},
            {name: 'callback', value: callback, type: 'function', notEmpty: true, }
        ])

        this.__call__('/user/' + userID, 'GET', undefined, callback, token )
    },

    updateUser(token, userID, dataToModify, callback){

        validate.arguments([
            {name: 'token', value: token, type: 'string', notEmpty: true,},
            {name: 'userID', value: userID, type: 'string', notEmpty: true,},
            {name: 'dataToModify', value: dataToModify, type: 'object', notEmpty: true,},
            {name: 'callback', value: callback, type: 'function', notEmpty: true, }
        ])

        this.__call__('/user/' + userID, 'PUT',  dataToModify, callback, token)

    },

    // deleteUser(token, userID, email, password, callback){

    // }
}