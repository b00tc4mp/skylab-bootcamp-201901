'use strict'
const path = require('path');
/**
 * Pokemon API Client
 *
 * @version 1.0.0
 */
const pokemonApi = {

  apiURL: 'https://pokeapi.co/api/v2/',
  limit: 151, //limitation for the number of results to be retrieved when searching all pokemon


  /**
   * Searches a pokemon
   *
   * @param {string} name - The text to match on artists search.
   *
   * the query to the API returns large amount of raw data
   */

  searchAllPokemons() {
    const searchCriteria = `pokemon/?limit=${this.limit}`;
    return fetch(`${this.apiURL}${searchCriteria}`, {})
      .then(res => res.json())
      .then(res => res.results);
  },

  searchPokemonByName(query) {
    const searchCriteria = 'pokemon/'
    if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
    if (!query.trim().length) throw Error('query is empty')

    return fetch(`${this.apiURL}${searchCriteria}${query}`, {

    })
      .then(res => {
        if (res == null) throw Error('This pokemon does not exist')
        return res.json()
      })
  },

}


export default pokemonApi