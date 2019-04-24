'use strict'

const duckApi = {
    __url__: 'https://duckling-api.herokuapp.com/api',

    __call__(path, callback) {
        // TODO validate inputs

        const xhr = new XMLHttpRequest

        xhr.open('GET', `${this.__url__}/${path}`)

        xhr.addEventListener('load', function () {
            callback(undefined, JSON.parse(this.responseText))
        })

        xhr.onerror = function() {
            callback(new ConnectionError('cannot connect'))
        }

        xhr.ontimeout = () => {
            callback(new TimeoutError(`time out, exceeded limit of ${this.__timeout__}ms`))
        }

        xhr.send()
    },

    searchDucks(query, callback) {
        // TODO validate inputs

        this.__call__(`search?q=${query}`, callback)
    },

    retrieveDuck(id, callback) {
        // TODO validate inputs

        this.__call__(`ducks/${id}`, callback)
    }
}