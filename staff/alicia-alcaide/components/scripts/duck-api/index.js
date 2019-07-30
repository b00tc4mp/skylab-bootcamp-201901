'use strict'

const duckApi = {
    __url__: 'https://duckling-api.herokuapp.com/api',

    __call__(path, callback, callbackError) {
        validate.arguments([
            { name: 'path', value: path, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' },
            { name: 'callbackError', value: callbackError, type: 'function' }
        ])

        const xhr = new XMLHttpRequest

        xhr.open('GET', `${this.__url__}/${path}`)

        xhr.addEventListener('load', function () {
            if(this.status === 200 || this.status === 201) {
              callback(JSON.parse(this.responseText));
            }
            else {
              callbackError(JSON.parse(this.responseText));
            }
        })

        xhr.addEventListener('error', function () {
            callbackError(this.status);
        })

        xhr.send()
    },

    searchDucks(query, callback, callbackError) {
        validate.arguments([
            { name: 'query', value: query, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' },
            { name: 'callbackError', value: callbackError, type: 'function' }
        ])

        this.__call__(`search?q=${query}`, callback, callbackError)
    },

    retrieveDuck(id, callback, callbackError) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' },
            { name: 'callbackError', value: callbackError, type: 'function' }
        ])

        this.__call__(`ducks/${id}`, callback, callbackError)
    }

}
