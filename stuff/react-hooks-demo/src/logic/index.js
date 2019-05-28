/**
 * 
 * Business logic for Marvel App
 * 
 */

import marvelApi from "../marvel-api"

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
        if (typeof query !== "string") throw TypeError(`${query} is not a string`);
        if (!query.trim().length) throw Error("query is empty");

        return marvelApi.searchCharacter(query);
    },

    /**
     *
     * Retrieve character
     *
     * @param {number} characterId
     *
     * @returns {Promise}
     */

    retrieveCharacter(characterId) {
        if (typeof characterId !== "number") throw TypeError(`${characterId} is not a number`);
        if (!characterId) throw Error(`characterId is empty`);

        return marvelApi.retrieveCharacter(characterId);
    },
}

export default logic
