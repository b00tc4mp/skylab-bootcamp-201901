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
   * Searches all pokemon
   *
   * the query returns all the pokemons. A limit is set in the number of results, parameter limit.
   */

  searchAllPokemons() {
    const searchCriteria = `pokemon/?limit=${this.limit}`;
    return fetch(`${this.apiURL}${searchCriteria}`, {})
      .then(res => res.json())
      .then(res => res.results);
  },

    /**
   * Searches a pokemon
   *
   * @param {string} name - The text to match on pokemon search
   *
   * the query returns details of the pokemon
   */
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