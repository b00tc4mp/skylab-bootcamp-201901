'use strict';

/**
 * Spotify API client.
 * 
 * @version 2.2.0
 */
const spotifyApi = {
    /**
     * Searches ducklings.
     * 
     * @param {string} query - The text to match on search.
     * @param {function} callback - The expression to evaluate on response. If error first 
     * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
     * results.
     */
    searchArtist (query, callback) {
        fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
            method: 'GET',
            headers: {
                authorization: `Bearer BQBaQzcN2yw2cD2glT6ucnL2G7PFy8bId6CcDgmmXh1_UtAOuIt7v`
            }
        })
            .then(res => res.json())
            .then(({artist: {items}}) => callback(undefined, items))
    }

    }