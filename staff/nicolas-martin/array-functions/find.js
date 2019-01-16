/**
 * Abstraction of find.
 * 
 * Finds an element in an array satisfying an expression.
 * 
 * @param {Array} array - The array to search an item in.
 * @param {Function} callback - The expression to evaluate.
 * 
 * @returns {*} - An item if found, otherwise undefined.
 */
function find(array, callback) {
    if (arguments.length > 2) throw Error('too many arguments');

    if(!(array instanceof Array)) throw TypeError();

    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    for (var i = 0; i < array.length; i++) {
        var value = array[i];

        if(callback(value)) return value;
    }
}