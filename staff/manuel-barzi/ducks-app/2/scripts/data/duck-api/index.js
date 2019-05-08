'use strict'

const duckApi = {
    __url__: 'https://duckling-api.herokuapp.com/api',

    searchDucks(query, callback) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' },
            { name: 'callback', value: callback, type: 'function' }
        ])

        call(`${this.__url__}/search?q=${query}`, (error, response) => {
            if (error) return callback(error)

            const ducks = JSON.parse(response)

            callback(undefined, ducks)
        })
    },

    retrieveDuck(id, callback) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' },
            { name: 'callback', value: callback, type: 'function' }
        ])

        call(`${this.__url__}/ducks/${id}`, (error, response) => {
            if (error) return callback(error)

            const duck = JSON.parse(response)

            callback(undefined, duck)
        })
    }
}