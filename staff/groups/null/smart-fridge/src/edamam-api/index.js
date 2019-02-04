'use strict'
/**
 * 
 * Edamam API Client.
 * 
 * @version 1.0.0
 * 
 */
const edamamApi = {
    url: 'https://api.edamam.com/search',
    app_id: '8198d034',
    app_key: 'a306faaee8127f42826feb7eb3083562',
    /**
     * 
     * @param {string} query 
     */
    search(query, calA, calB) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

        /* const calories = '&calories=591-722' */

        calA = typeof calA === 'numer'? calA : false
        calB = typeof calB === 'numer'? calB : false
        const calories = calA && calB? `&calories=${calA}-${calB}` : ''

        return fetch(`${this.url}?q=${query}&app_id=${this.app_id}&app_key=${this.app_key}&from=0&to=3${calories}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error.message)

                const { hits } = response

                return hits

            })
    }
}

export default edamamApi