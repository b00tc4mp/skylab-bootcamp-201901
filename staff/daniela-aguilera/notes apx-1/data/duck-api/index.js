const validate = require('../../common/validate')
const call = require('../../common/call')

const duckApi = {
    __url__: 'https://duckling-api.herokuapp.com/api',

    searchDucks(query) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' }
        ])

        return call(`${this.__url__}/search?q=${query}`)
    },

    retrieveDuck(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ])

        return call(`${this.__url__}/ducks/${id}`)
    }
}

module.exports = duckApi