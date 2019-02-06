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
     * @param {string} calories
     * @param {string} diet 
     * @param {string} health 
     * 
     * @throws {Error} - On non-existing required params
     * @throws {TypeError} - On query data type different than string
     */
    search(query, calories, diet, health) {
        
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)

        if (!query.trim().length) throw Error('query is empty')

        if (typeof calories !== 'string')throw TypeError(`${calories} is not a string`)

        if (!calories.trim().length) throw Error('calories is empty')

        diet = typeof diet === 'string'? `${diet}` : ''
        health = typeof health === 'string'? `${health}` : ''

        let completeUrl = `${this.url}?q=${query}&app_id=${this.app_id}&app_key=${this.app_key}&from=0&to=20${calories}${diet}${health}`

        return fetch(completeUrl, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(response => {
                if (response.error) throw Error(response.error.message)
                if (response.count === 0) throw Error('No results found')

                const { hits } = response

                return hits

            })
    }
}

export default edamamApi