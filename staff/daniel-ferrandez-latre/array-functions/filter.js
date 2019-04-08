/**
 * Return a new array with the filtered results
 * 
 * @param {Array} array The array to iterate.
 * 
 * @param {Function} callback The expression to evalute.
 */
function filter(array, callback) {
    var arrayFilter = [];
    for(var i = 0; i < array.length; i++) {
        if(callback(array[i])) {
            arrayFilter[arrayFilter.length] = array[i];
        }
    }
    return arrayFilter;
}