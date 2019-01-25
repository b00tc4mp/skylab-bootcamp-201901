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
    searchArtists(query, callback) {
        fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
            method: 'GET',
            headers: {
                authorization: 'Bearer BQC-T4hfmnSpwrSqxs5ZZZ80paTE_FzEDXMNPyS9qgtovv1SQJ_8UM8wH4YFt9nc-RvQ74a96_RNJ_PCgWiH3MYPdSRQolINuK2J7BExG1qetezXE47h7zrqiqBhtKsGPU2-KEc4oG46BQ'
            }
        })
            .then(res => res.json())
            .then(({ artists : {items}}) => callback(undefined, items));
    },

    retieveAlbums(artistId, callback) {
        fetch(`https://api.spotify.com/v1/artist/${artistId}/search?q=${query}&type=albums`, {
            method: 'GET',
            headers: {
                authorization: 'Bearer BQC-T4hfmnSpwrSqxs5ZZZ80paTE_FzEDXMNPyS9qgtovv1SQJ_8UM8wH4YFt9nc-RvQ74a96_RNJ_PCgWiH3MYPdSRQolINuK2J7BExG1qetezXE47h7zrqiqBhtKsGPU2-KEc4oG46BQ'
            }
        })
            .then(res => res.json())
            .then(({ artists : {items}}) => callback(undefined, items));
    }
};