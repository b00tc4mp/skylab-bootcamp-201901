'use strict'

const userApi = {
    __url__: 'https://skylabcoders.herokuapp.com/api',

    __call__(path, method, body, callback) {
        // TODO validate inputs

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
        this.__call__('/user', 'POST', { name, surname, username, password }, callback)
    }
}