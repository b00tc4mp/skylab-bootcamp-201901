/**
 * 
 * @param {Array} array 
 * @param {Function} callback 
 * 
 * Abstraction of find
 * Returns the first value of the first element in the array that satisfies the provided testing function.
 */

function find(array, callback) {
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            return array[i];
        };
    };
};

find([1, 2, 3, 4, 5], function(element) {
    return element > 3;
});

