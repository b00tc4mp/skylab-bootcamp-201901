'use strict';

/**
 * Duckling API client.
 * 
 * @version 2.2.0
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
    search: function (query, callback) {
        fetch(`https://api.spotify.com/v1/search?q=${query}key=BQBP-MWztQL0cJXu5RzN_LxsJg-xTwgIGTirt7dyFw-XZmEG5ZVi-ILiLU_JbaKAbJGLcUlh5F5MrSIrUyfRSPclJRuhC1pSNLYDY3H8bD74yXy802XOfkFH-bqDzMV4rb29pfXIwZmG&type=artist`, {
            method: 'GET',
            headers: {
                authorization: 'Bearer BQC2bRR9C7Erirdnor_NRLqPBfqnG3iBzwIBtbqAGPDx41orPdXJ-OkWOugJlK89u4WH33JHT6HWUjc6dQFHhCvCxjLNKOZf0_bX_Uk4WExQP12V_uoEmk-my8zlbjjmsRTlDvlaAggI'
            }
        })

            .then(res => res.json())
            .then(({ artists: { items } }) => callback(undefined, items))


           
    },

    retrieveAlbums(artistId, callback) {
        fetch(``, {})
    }

    // retrieve: function (id, callback) {
    //     $.getJSON('https://duckling-api.herokuapp.com/api/ducks/' + id, function (res) {
    //         callback(undefined, res);
    //     })
    //         .fail(function (res) {
    //             if (res.responseJSON && res.responseJSON.error)
    //                 callback(res.responseJSON.error);
    //             else callback('network error');
    //         })
    // }
};