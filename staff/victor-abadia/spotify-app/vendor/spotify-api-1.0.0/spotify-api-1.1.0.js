'use strict';

/**
 * Spotify API client.
 * 
 * @version 1.0.0
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

    searchArtist(query, callback) {

        fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist` function (res) {

            method: 'GET',
                headers: {
                authorization: 'Bearer BQA_rLsJGcnJUdC_b9hrFZ1AZVn53kNsyYMxSWc73E8Zc9MFBJIj_S7bJWGN9fzldoUHlLvO6g_BVdYO4cOzIiqYCZRhjv45Dfc3mBg54Dk1Gtj9fwTCluQezjEoiNu0b_MzqrGHnwAA97N0e8E'
            }

        })
            .then(res => res.json())
            .then(({ artist: { items } }) => callback(undefined, items))
    }
};
