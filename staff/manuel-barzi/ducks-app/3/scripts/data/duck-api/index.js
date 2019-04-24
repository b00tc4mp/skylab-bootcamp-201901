'use strict'

const duckApi = {
    __url__: 'https://duckling-api.herokuapp.com/api',

    searchDucks(query, callback) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' },
            { name: 'callback', value: callback, type: 'function' }
        ])

        call(`${this.__url__}/search?q=${query}`)
            .then(response => {
                const ducks = JSON.parse(response)

                callback(undefined, ducks)
            })
            // .catch(error => {
            //     callback(error)
            // })
            .catch(callback)
    },

    retrieveDuck(id, callback) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' },
            { name: 'callback', value: callback, type: 'function' }
        ])

        call(`${this.__url__}/ducks/${id}`)
            .then(response => {
                const duck = JSON.parse(response)

                callback(undefined, duck)
            })
            .catch(callback)
    }
}