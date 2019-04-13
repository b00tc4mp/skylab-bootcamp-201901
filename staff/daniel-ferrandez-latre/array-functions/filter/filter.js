/**
 * Return a new array with the filtered results
 * 
 * @param {Array} array The array to iterate.
 * 
 * @param {Function} callback The expression to evalute.
 */
function filter(array, callback) {

    if(arguments.length === 0) {
        throw TypeError(' no arguments are passed.');
    } else if(!(arguments[0] instanceof Array)) {
        throw TypeError(array + ' is not an array.');
    } else if( arguments.length > 1 && !(arguments[1] instanceof Function)){
        throw new TypeError(callback + ' is not a function');
    }

    var arrayFilter = [];
    for(var i = 0; i < array.length; i++) {
        if(callback(array[i])) {
            arrayFilter[arrayFilter.length] = array[i];
        }
    }
    return arrayFilter;
}