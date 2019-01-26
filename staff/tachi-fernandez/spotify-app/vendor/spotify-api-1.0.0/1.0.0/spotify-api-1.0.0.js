'use strict';

/**
 * Spotify API client.
 * 
 * @version 1.0.0
 */
var spotifyApi = {
    /**
     * Searches ducklings.
     * 
     * @param {string} query - The text to match on search.
     * @param {function} callback - The expression to evaluate on response. If error first 
     * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
     * results.
     */
    searchArtists(query, callback) {
        fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
        method: "GET",
        headers: {
            authorization: 'Beare BQDuTZbIdHK2HGxhenLazR2liqGcA5pqihDcj7C8wxAbQojmB7aIisJueKEsUv5Oc8Ypr5TBQUFNPZGAzCMJTQncg6ZBPYWY7IPJaAQ9kLWehXodV1aUQ8_-qV5LbWfotgjwjRtBO0-hoYxkhyA'

            
        }

        }) 
        .then(res => res.json())
        .then(({artist: {items} }) => callback(items))
    }
};