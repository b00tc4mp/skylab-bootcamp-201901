/**
 * Duckling API Search client.
 * 
 * @param {string} query - The text to match on search.
 * @param {function} callback - The expression to evaluate on response. If error first 
 * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
 * results.
 */
function search(query, callback) {
    var xhr = new XMLHttpRequest;

    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + query);

    xhr.onload = function () {
        var res = JSON.parse(xhr.responseText);

        if (res.error)
            callback(res.error);
        else
            callback(undefined, res.data);
    };

    xhr.send();
}