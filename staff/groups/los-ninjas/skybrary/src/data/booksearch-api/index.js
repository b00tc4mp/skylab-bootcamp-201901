import validate from '../../common/validate'
import call from '../../common/call'

const searchBooksApi = {
    __url__: 'http://openlibrary.org/search.json?title=',

    searchBooks(query) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' }
        ])
        
        return call(`${this.__url__}${query}`)
            .then(response => response.json())
    },

    // retrieveDuck(id) {
    //     validate.arguments([
    //         { name: 'id', value: id, type: 'string' }
    //     ])

    //     return call(`${this.__url__}/ducks/${id}`)
    //         .then(response => response.json())
    // }
}

export default searchBooksApi