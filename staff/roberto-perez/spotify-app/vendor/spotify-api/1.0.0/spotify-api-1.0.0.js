'use strict'

/**
 * Spotify API client.
 * 
 * @version 1.0.0
 */
const spotifyApi = {
    token: 'NO-TOKEN',

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

    /**
     * Retrieves albums from artist.
     * 
     * @param {string} artistId - The artist to retrieve from albums.
     * @param {*} callback - callback - The expression to evaluate on response. If error first 
     * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
     * results.
     */
    retrieveAlbums(artistId, callback) {
        fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then (res => res.json())
            .then(({ items })=> callback(undefined, items))
            .catch(callback)
    },

    /**
     * Retrieves tracks from album.
     * 
     * @param {string} albumId - The album to retrieve from albums.
     * @param {*} callback - callback - The expression to evaluate on response. If error first 
     * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
     * results.
     */
    retrieveTracks(albumId, callback) {
        fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then (res => res.json())
            .then(({ items })=> callback(undefined, items))
            .catch(callback)
    },

    /**
     * Retrieves track from tracks.
     * 
     * @param {string} albutrackIdmId - The track to retrieve from tracks.
     * @param {*} callback - callback - The expression to evaluate on response. If error first 
     * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
     * results.
     */
    retrieveTrack(trackId, callback) {
        fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${this.token}`
            }
        })
            .then (res => res.json())
            .then((items)=> callback(undefined, items))
            .catch(callback)
    },


    
}