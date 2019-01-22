/**
 * Abstraction of find
 * 
 * Iterate and array and returns the value of the first element in the array that satisfies the provided testing function.
 * 
 * 
 * @param {Array} array - The array to iterate. 
 * @param {Function} callback - The expression to evaluate
 * 
 * @returns {*} - An item it found, otherwise undefined
 */

function find(array, callback) {
    if(arguments.length > 2)
        throw Error('too many arguments');
        
    if (!(array instanceof Array))
        throw new TypeError(array + ' is not an array');
        
    // if (!(callback instanceof Function))
    if (typeof callback !== 'function')
        throw new TypeError(callback + ' is not a function');

    for (var i = 0; i < array.length; i++){
        var value = array[i];

        if(callback(value))
            return value;
    }
}