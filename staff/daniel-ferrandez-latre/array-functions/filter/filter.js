/**
 * Return a new array with the filtered results
 * 
 * @param {Array} array The array to iterate.
 * 
 * @param {Function} callback The expression to evalute.
 */
function filter(array, callback) {
//     if(arguments.length === 1) {
//         throw TypeError('missing one argument');
//     } else if (length === 0) {
//         throw TypeError(' missing all arguments have to be passed');    
//     } else (arguments.length === 2){
//         if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
//         if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
//     }
// }

if (!(array instanceof Array)) throw TypeError(array + ' is not an array.');
         if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var arrayFilter = [];
    for(var i = 0; i < array.length; i++) {
        if(callback(array[i])) {
            arrayFilter[arrayFilter.length] = array[i];
        }
    }
    return arrayFilter;
}