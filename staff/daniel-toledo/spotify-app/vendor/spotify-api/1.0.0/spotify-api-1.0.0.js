'use strict';

/**
 * Duckling API client.
 * 
 * @version 0.0.1
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
        fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
            method: 'GET',
            headers: {
                authorization: 'Bearer BQBFEHgFdqnRQ8MEpPxHRIVFj4CytvXZxhcG5ey3L5usiruQqGxtP2libL21JRy_8gAJ9LP2KZKL58Jb6-_qsUjtiEqFzUJkp5I1pPWDDtC3Axrs2eu7nMRCXq4veZMNA0QxkDdGrtvpSGJMBv4'
            }
        })
            .then(res => res.json())
            .then(({ artists: { items } }) => callback(undefined,items))
    },

    // retrieveAlbum(artistId, callback){
    //     fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
    //         method: 'GET',
    //         headers: {
    //             authorization: 'Bearer BQBFEHgFdqnRQ8MEpPxHRIVFj4CytvXZxhcG5ey3L5usiruQqGxtP2libL21JRy_8gAJ9LP2KZKL58Jb6-_qsUjtiEqFzUJkp5I1pPWDDtC3Axrs2eu7nMRCXq4veZMNA0QxkDdGrtvpSGJMBv4'
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(({ items }) => callback(undefined,items))
    // }
}