'use strict';

/**
 * Duckling API client.
 * 
 * @version 2.1.0
 */
var ducklingApi = {
    /**
     * Searches ducklings.
     * 
     * @param {string} query - The text to match on search.
     * @param {function} callback - The expression to evaluate on response. If error first 
     * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
     * results.
     */
    search: function (query, callback) {
        // $.ajax({
        //     method: 'GET',
        //     url: 'https://duckling-api.herokuapp.com/api/search',
        //     data: {
        //         q: query
        //     },
        //     success: function (res) {
        //         callback(undefined, res.data);
        //     },
        //     error: function (res) {
        //         if (res.responseJSON && res.responseJSON.error)
        //             callback(res.responseJSON.error);
        //         else callback('network error');
        //     }
        // });

        // ALT 2
        $.getJSON('https://duckling-api.herokuapp.com/api/search?q=' + query, function (res) {
            callback(undefined, res);
        })
            .fail(function (res) {
                if (res.responseJSON && res.responseJSON.error)
                    callback(res.responseJSON.error);
                else callback('network error');
            })
    },

    details: function (query, callback) {
        $.getJSON('https://duckling-api.herokuapp.com/api/search?q=' + query, function (res) {
            callback(undefined, res);
        })
            .fail(function (res) {
                if (res.responseJSON && res.responseJSON.error)
                    callback(res.responseJSON.error);
                else callback('network error');
            })
    }
};