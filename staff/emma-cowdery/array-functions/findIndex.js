/**
 * 
 * @param {Array} array 
 * @param {Function} callback 
 */

function findIndex(array, callback) {
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            return i;
        };
    };
};

findIndex([1, 2, 3, 4, 5], function(element) {
    return element > 3;
});
