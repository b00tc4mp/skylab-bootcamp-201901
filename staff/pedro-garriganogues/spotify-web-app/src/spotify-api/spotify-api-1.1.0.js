'use strict'

require('isomorphic-fetch')

/**
 * Spotify API client.
 * 
 * @version 1.0.0
 */
const spotifyApi = {
    token: 'BQAilIFe_-kvje2ZuEcoSGppZmhbFoGGghuFcY4TXVVjLG4feIlw9T4aJ0TMp9OPV3Hp2jJARlp6ioNo3mx-bzsDgpAQASFtYQkgoVHICZstDDM7Gy_oRW_lQE_IMf8xAMppc3UNkzY9y67Ia9f_E1qL7Z_UAY_bjA',

    /**
     * Searches ducklings.
     * 
     * @param {string} query - The text to match on artists search.
     * @param {function} callback - The expression to evaluate on response. If error first 
     * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
     * results.
     */
    searchArtists(query, callback) {
        fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then(res => res.json())
            .then(({ artists: { items } }) => callback(undefined, items))
            .catch(callback)
    },

    // /**
    //  * Retrieves albums from artist.
    //  * 
    //  * @param {string} artistId - The artist to retrieve albums from.
    //  * @param {*} callback - callback - The expression to evaluate on response. If error first 
    //  * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
    //  * results.
    //  */
    // retrieveAlbums(artistId, callback) {
    //     fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
    //         method: 'GET',
    //         headers: {
    //             authorization: `Bearer ${this.token}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(({ items }) => callback(undefined, items))
    //         .catch(callback)
    // },

    // retrieveSongs(albumId, callback) {
    //     fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
    //         method: 'GET',
    //         headers: {
    //             authorization: `Bearer ${this.token}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(({ items }) => callback(undefined, items))
    //         .catch(callback)
    // },


    // retrieveTrack(trackId, callback) {
    //     fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    //         method: 'GET',
    //         headers: {
    //             authorization: `Bearer ${this.token}`
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(({ items }) => callback(undefined, items))
    //         .catch(callback)
    // }
}
module.exports = spotifyApi