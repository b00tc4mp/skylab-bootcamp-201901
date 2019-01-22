/**
 * 
 * @param {Array} array 
 * @param {Function} callback 
 */

function findIndex(array, callback) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            return i;
        };
    };
    return -1;
};

findIndex([1, 2, 3, 4, 5], function(element) {
    return element > 3;
});
