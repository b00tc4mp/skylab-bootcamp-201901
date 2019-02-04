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
     * Searches for recipes with the desired query.
     * 
     * @param {string} query 
     * @param {number} calA 
     * @param {number} calB 
     * @param {string} diet 
     * @param {string} health 
     * 
     * @throws {Error} - On non-existing required params
     * @throws {TypeError} - On query data type different than string
     */
    search(query, calA, calB, diet, health) {
        
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')


        calA = typeof calA === 'number'? calA : false
        calB = typeof calB === 'number'? calB : false
        let calories = calA && calB? `&calories=${calA}-${calB}` : ''
        diet = typeof diet === 'string'? `&diet=${diet}` : ''
        health = typeof health === 'string'? `&health=${health}` : ''

        return fetch(`${this.url}?q=${query}&app_id=${this.app_id}&app_key=${this.app_key}&from=0&to=3${calories}${diet}${health}`, {
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