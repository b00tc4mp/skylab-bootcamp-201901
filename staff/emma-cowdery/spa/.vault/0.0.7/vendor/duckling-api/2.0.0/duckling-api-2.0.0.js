'use strict';

/**
 * Duckling API client.
 * 
 * @version 2.0.0
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
        var xhr = new XMLHttpRequest;

        xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + query);

        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);

            if (res.error)
                callback(res.error);
            else
                callback(undefined, res.data);
        };

        xhr.onerror = function (error) {
            callback('network error');
        };

        xhr.send();
    }
};