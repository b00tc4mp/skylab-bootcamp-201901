/**
 * Iterates an array and check if at least one element of the array meets the condition implemented by the function
 * @param {Array} array Array to check
 * @param {Function} callback The expression to evaluate.
 */

function some(array, callback) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array')
    if(typeof callback !== 'function') throw TypeError (callback+' is not a function')
    var flag= false;
    for (var i = 0; i < array.length; i++){
        if(callback(array[i])){
            flag=true;
        }
    }
    return flag;
}

