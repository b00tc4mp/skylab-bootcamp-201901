'use strict'
const path = require('path');
/**
 * Pokemon API Client
 * 
 * @version 1.0.0
 */
const pokemonApi = {

    apiURL : 'https://pokeapi.co/api/v2/',

    /**
     * Searches a pokemon 
     * 
     * @param {string} name - The text to match on artists search.
     * 
     * the query to the API returns large amount of raw data
     */
    searchPokemonByName(query){
        const searchCriteria = 'pokemon/'
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error('query is empty')

        return fetch(`${this.apiURL}${searchCriteria}${query}`, {
            // method: 'GET',
            // headers: {

            // }
        })
        .then(res => {
            if(res == null) throw Error ('This pokemon does not exist')
            return res.json()})
        .then(res => {

            const name = res.forms[0].name
            const image = res.sprites.front_default
            const types = res.types.map(type => type.type.name)
            const result = {name, image, types}
            
            return result
        } )


    }

}


export default pokemonApi