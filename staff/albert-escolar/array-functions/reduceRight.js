'use strict'

/**Applies a function against an accumulator and each value of the array (from right-to-left) 
 * to reduce it to a single value.
 * 
 * @param {array} array The array ro iterate
 * @param {function} callback The expression to evaluate
 * @param {any} initialValue Object to use as the first argument to the first call of the callback. 
 * If no initial value is supplied, the last element in the array will be used.
 * 
 * @returns {valorAnterior} The value that results from the reduction.
 */
function reduce(array, callback, initialValue) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    var valorAnterior = array[array.length-1];
    if (initialValue) {
        valorAnterior = initialValue;
        var a = array.length-1;
    }else{
        a = array.length-2;
    }
    for (var i = a; i >= 0; i--) {
        valorAnterior = callback(valorAnterior, array[i]);

    } return valorAnterior;
};