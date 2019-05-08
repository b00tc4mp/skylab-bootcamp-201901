import validate from '../../common/validate'
import call from '../../common/call'

const searchBooksApi = {
    __url__: 'https://openlibrary.org',

   

    searchBooks(query) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' }
        ])
        
        return call(`${this.__url__}/search.json?title=${query}`)
            .then(response => response.json())
    },

    retrieveBook(isbn) {
        validate.arguments([
            { name: 'isbn', value: isbn, type: 'string' }
        ])

        return call(`${this.__url__}/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`)
            .then(response => response.json())
    }
}

export default searchBooksApi

