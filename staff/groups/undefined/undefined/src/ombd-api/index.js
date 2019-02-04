'use strict'

/**
 * OMDB API client.
 * 
 * @version 1.0.0
 */
const omdbApi = {
    key: 'NO-KEY',
    url: `http://www.omdbapi.com/?apikey=ef8a2f56`,

     /**
     * Search movie items 
     * 
     * @param {string} query - The text to match on movies & series search.
     * @retuns {Promise} - Resolves with array of movies, otherwise rejects with an error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Array} - Array of objects related with every item
     *                   Empty Array if there is no results
     * 
     * http://www.omdbapi.com/?apikey=ef8a2f56&s=titanic
     * 
     */

    searchItems(query) { 
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error('query is empty')

        return fetch(`${this.url}&s=${query}`)
            .then(response => response.json())
            .then(response => {
                if (response.Response === 'False') return [] 
                return response.Search
            })
    },

    /**
     * Retrieve detail from movie or serie.
     * 
     * @param {string} itemId - The movie query
     * @returns {Promise} - Resolves with movies & series, otherwise rejects with error.
     * 
     * @throws {TypeError} - On wrong parameters type.
     * @throws {Error} - On empty parameters value.
     * 
     * // http://www.omdbapi.com/?apikey=ef8a2f56&i=tt1632708
     * 
     **/

    retrieveItem(itemId) {
        if (typeof itemId !== 'string') throw TypeError(`${itemId} is not a string`)
        if (!itemId.trim().length) throw Error('itemId is empty')

        return fetch(`${this.url}&i=${itemId}`)
            .then(item => item.json())
            .then(response => {                
                if (response.Response === 'False') throw Error(response.Error)                
                return response
            })
    }
}

export default omdbApi