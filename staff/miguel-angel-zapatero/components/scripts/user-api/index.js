'use strcit'

const userApi = {
    __url__: 'https://skylabcoders.herokuapp.com/api',

    __call__(path, method, body, token, callback) {
        validate.arguments([
            { name: 'path', value: path, type: 'string', notEmpty: true },
            { name: 'method', value: method, type: 'string', notEmpty: true },
            { name: 'body', value: body, type: 'object', notEmpty: true, optional: true },
            { name: 'token', value: token, type: 'string', notEmpty: true, optional: true },
            { value: callback, type: 'function' }
        ])

        const xhr = new XMLHttpRequest

        xhr.open(method, `${this.__url__}/${path}`)

        // xhr.addEventListener('load', function() {
        //     callback(JSON.parse(this.responseText))
        // })

        //Es lo mismo que lo de arriba pero a traves de un setter
        xhr.onload = function() {
            callback(undefined, JSON.parse(this.responseText))
            //undefined se refiere al error y se tiende a poner el error primero que el caso positivo.
        }

        xhr.onerror = function() {
            callback(new ConnectionError('can not connect')) 
        }

        xhr.ontimeout = function() {
            callback(new TiemoutError('time out, exceeded limit of??????'))
        }

        if (token) xhr.setRequestHeader('Authorization', `Bearer ${token}`)

        if (method === 'GET') {
            if(!token) throw Error('token not provided') //all GET need token!!
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
            {name: 'name', value: name, type: 'string', notEmpty: true},
            {name: 'surname', value: surname, type: 'string', notEmpty: true},
            {name: 'username', value: username, type: 'string', notEmpty: true},
            {name: 'password', value: password, type: 'string', notEmpty: true},
            {value: callback, type: 'function'}
        ])

        this.__call__('/user', 'POST', { name, surname, username, password }, undefined, callback)
    }, 

    authenticate(username, password, callback) {
        validate.arguments([
            {name: 'username', value: username, type: 'string', notEmpty: true},
            {name: 'password', value: password, type: 'string', notEmpty: true},
            {value: callback, type: 'function'},
        ])

        this.__call__('/auth', 'POST', { username, password }, undefined, callback)
    },

    retrieve(id, token, callback) {
        validate.arguments([
            {name: 'id', value: id, type: 'string', notEmpty: true},
            {name: 'token', value: token, type: 'string', notEmpty: true},
            {value: callback, type: 'function'}
        ])

        this.__call__(`/user/${id}`, 'GET', undefined, token, callback)
    },

    update(id, args, token, callback) {
        //TODO 

        this.__call__(`/user/${id}`, 'PUT', {args}, token, callback)
    },

    delete(id, token, callback) {
        //TODO
    }
}