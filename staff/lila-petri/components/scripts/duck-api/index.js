'use strict'

const duckApi = {
    __url__: 'https://duckling-api.herokuapp.com/api',

    __call__(path, callback) {
        // TODO validate inputs

        const xhr = new XMLHttpRequest

        xhr.open('GET', `${this.__url__}/${path}`)

        xhr.addEventListener('load', function () {
            callback(JSON.parse(this.responseText))
        })

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
