'use strict'

const duckApi = {
    __url__: 'https://duckling-api.herokuapp.com/api',

    __call__(path, callback) {
        let error

        if (path === undefined){
            error = TypeError('path can not be undefined')

            error.code = 2
            
            throw error 
        }

        if (callback instanceof Function === false){
            error = TypeError('Callback is not a function')

            error.code = 9
            
            throw error
        }

        const xhr = new XMLHttpRequest

        xhr.open('GET', `${this.__url__}/${path}`)

        xhr.addEventListener('load', function () {
            callback(JSON.parse(this.responseText))
        })

        xhr.send()
    },

    searchDucks(query, callback) {

        validate.arguments([
            {name: 'query', value: query, type: 'string', optional: true},
            {name: 'callback', value: callback, type: 'function', notEmpty: true, }
        ])

        this.__call__(`search?q=${query}`, callback)
    },

    retrieveDuck(id, callback) {
        validate.arguments([
            {name: 'id', value: id, type: 'string', notEmpty: true,},
            {name: 'callback', value: callback, type: 'function', notEmpty: true, }
        ])

        this.__call__(`ducks/${id}`, callback)
    }
}