'use strict'

/**executes a reducer function (that you provide) on each member of the array resulting in a single output value.
 * 
 * @param {array} array The array to iterate
 * @param {function} callback The expression to evaluate
 * @param {anty} initialValue The initial value given
 * 
 * @returns {valorAnterior} The result of the reducing of the nitial array.
 */
function reduce(array, callback, initialValue) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    var valorAnterior = array[0];
    if (initialValue) {
        valorAnterior = initialValue;
        var a = 0;
    }else{
        a = 1;
    }
    for (var i = a; i < array.length; i++) {
        valorAnterior = callback(valorAnterior, array[i]);

    } return valorAnterior;
};