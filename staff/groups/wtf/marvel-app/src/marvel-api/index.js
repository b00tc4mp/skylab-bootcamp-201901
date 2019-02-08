'use strict'

import md5 from 'blueimp-md5'

/**
 * Marvel API
 * 
 * @version 0.0.1
 */

const marvelApi = {
    apiKey: 'NO API KEY',

    privateApiKey: 'NO PRIVATE API KEY',

    __hash__: null,

    get hash() {
        if (!this.__hash__) {
            const { apiKey, privateApiKey } = this
            const timeStamp = Date.now().toString()
            this.__hash__ = `apikey=${apiKey}&ts=${timeStamp}&hash=${md5(timeStamp + privateApiKey + apiKey)}`
        }
        return this.__hash__
    },

    url: 'https://gateway.marvel.com/v1/public/',

    /**
     * 
     * Method to get character info
     * 
     * @param {string} query  - Characters to be found.
     * 
     * @throws {TypeError} - If query is not a string.
     * @throws {Error} - If query is empty.
     * @throws {Error} - If no character match.
     * 
     * @returns {Object} - With characters info
     */

    searchCharacter(query) {
        if (typeof query !== 'string') throw TypeError(`${query} is not a string`)
        if (!query.trim().length) throw Error(`query is empty`)

        return fetch(`${this.url}characters?${this.hash}&name=${query}`)
            .then(response => response.json())

            .then(response => {
                if (response.code !== 200) throw Error(response.status)
                if (response.data.count === 0) throw Error('No characters found')

                const { data } = response

                return data
            })
    },

    /**
     * 
     * Method to get character info
     * 
     * @param {string} characterId
     * 
     * @throws {TypeError} - If characterId is not a string.
     * @throws {Error} - If characterId is empty.
     * @throws {Error} - If no character matches.
     * 
     * @returns {Object} - With character info
     */

    retrieveCharacter(characterId) {
        if (typeof characterId !== 'string') throw TypeError(`${characterId} is not a string`)
        if (!characterId.trim().length) throw Error(`characterId is empty`)

        return fetch(`${this.url}characters/${characterId}?${this.hash}`)
            .then(response => response.json())
            .then(response => {
                if (!response.data) throw Error(response.status)

                const { data } = response

                if (data) return data
                throw Error(response.message)
            })
    },

    /**
    * 
    * Method to get comic info
    * 
    * @param {string} comicId  - Comic to be found.
    * 
    * @throws {TypeError} - If comicId is not a string.
    * @throws {Error} - If comicId is empty.
    * @throws {Error} - If no character matches.
    * 
    * @returns {Object} - With comic info
    */

    retrieveComic(comicId) {
        if (typeof comicId !== 'string') throw TypeError(`${comicId} is not a string`)
        if (!comicId.trim().length) throw Error(`comicId is empty`)

        return fetch(`${this.url}comics/${comicId}?${this.hash}`)
            .then(response => response.json())

            .then(response => {
                if (!response.data) throw Error(response.status)

                const { data } = response

                if (data) return data
                throw Error(response.message)
            })
    }
}

export default marvelApi