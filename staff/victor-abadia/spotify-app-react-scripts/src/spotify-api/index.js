'use strict'

/**
 * Spotify API client.
 * 
 * @version 1.1.0
 */
const spotifyApi = {
    token: 'BQBjnUfgbAq7jV1jtaGPA28QZKu4mwz7imMhItdVEjR79STSFFp6Ktr09Gk0UfVmWQzNd2lqX9_GxASRwLZV5dLL46BrAKif7xdZ-1Z9ppM2t2bmvHl21nvH7Mx7fGwPikQO53070I_ENl6S8Mc',

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
     * @param {string} artistId - The artist to retrieve albums from.
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
            .then(res => res.json())
            .then(({ items }) => callback(undefined, items))
            .catch(callback)
    },

    /**
     * Retrieves tracks from album.
     * 
     * @param {string} albumId - The album to retrieve tracks from.
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
            .then(res => res.json())
            .then(({ items }) => callback(undefined, items))
            .catch(callback)
    },

    /**
     * Retrieves track.
     * 
     * @param {string} trackId - The id of the track to be retrieved.
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
            .then(res => res.json())
            .then((track) => callback(undefined, track))
            .catch(callback)
    }
}

export default spotifyApi