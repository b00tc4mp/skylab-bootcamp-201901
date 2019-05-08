'use strict' 
/**Creates a new array with all elements that pass the test implemented by the provided function.
 * 
 * @param {array} array The array to be iterated on.
 * @param {function} callback The expression to evaluate.
 * 
 * @returns {array} Returns an array with the elements that passed the condition.
 * 
 */

function filter(array, callback) {
    if(!(array instanceof Array)) throw TypeError(array+' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function')
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        if(callback(array[i])){
            newArray[newArray.length] = array[i];
        }

    } 
    return newArray;

}
