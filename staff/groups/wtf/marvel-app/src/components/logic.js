'use strict'

import marvelApi from '../marvel-api'

const logic = {

    /**
     * 
     * Search characters
     * 
     * @param {string} query 
     * 
     * @returns {Promise}
     */

    searchCharacter(query) {
        if(typeof query !== 'string') throw TypeError (`${query} is not a string`)
        if (!query.trim().length) throw Error ('query is empty')
    
        return marvelApi.searchCharacter(query)
    },

     /**
     * 
     * Retrieve character
     * 
     * @param {string} characterId 
     * 
     * @returns {Promise}
     */

    retrieveCharacter (characterId) {
        if(typeof characterId !== 'string') throw TypeError(`${characterId} is not a string`)
        if (!characterId.trim().length) throw Error (`characterId is empty`)

        return marvelApi.retrieveCharacter(characterId)
    },

     /**
     * 
     * Retrieve comic
     * 
     * @param {string} comicId 
     * 
     * @returns {Promise}
     */

    retrieveComic (comicId) {
        if(typeof comicId !== 'string') throw TypeError(`${comicId} is not a string`)
        if (!comicId.trim().length) throw Error (`comicId is empty`)

        return marvelApi.retrieveComic(comicId)
    }
}

export default logic
