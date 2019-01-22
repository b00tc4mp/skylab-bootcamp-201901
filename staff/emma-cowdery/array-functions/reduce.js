/**
 * 
 * @param {Array} array 
 * @param {Function} callback 
 * @param {*} counter 
 */

function reduce(array, callback, counter) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (!(callback instanceof Function)) throw TypeError(callback + ' is not an function');
    var i = 0;
    if (counter === undefined) {
        counter = array[0];
        i = 1;
    };
    for (; i < array.length; i++) {
        var item = array[i];
        counter = callback(counter, item);
    };
    return counter;
};