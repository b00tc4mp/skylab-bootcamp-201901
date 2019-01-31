/**
 * 
 * @param {Array} array 
 * @param {Function} callback 
 * 
 * Abstraction of find
 * Returns the first value of the first element in the array that satisfies the provided testing function.
 */

function find(array, callback) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (!(callback instanceof Function)) throw TypeError(callback + ' is not a function');
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            return array[i];
        };
    };
};

find([1, 2, 3, 4, 5], function(element) {
    return element > 3;
});

