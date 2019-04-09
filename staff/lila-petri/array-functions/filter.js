/**
 * Iterates an array and get a new array form the original array
 * @param {Array} array 
 * @param {Function} callback The expression to evaluate.
 */

function filter(array, callback) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    var newarray=[];
    for (var i = 0; i < array.length; i++){
        if(callback(array[i], i, array)){
            newarray[i]=array[i]
        }
    }
    return newarray;
}
