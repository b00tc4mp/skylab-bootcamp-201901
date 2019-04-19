'use strict'

const duckApi = {
    searchDucks: function (query, callback) {
        // TODO validate inputs

        const xhr = new XMLHttpRequest

        xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + query)

        xhr.addEventListener('load', function () {
            callback(JSON.parse(this.responseText))
        })

        xhr.send()
    },

    retrieveDuck: function (id, callback) {
        // TODO validate inputs

        const xhr = new XMLHttpRequest

        xhr.open('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id)

        xhr.addEventListener('load', function () {
            callback(JSON.parse(this.responseText))
        })

        xhr.send()
    }
}