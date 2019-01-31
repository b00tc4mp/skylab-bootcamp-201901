/**
 * 
 * @param {Array} array 
 * @param {Function} callback 
 * 
 * The filter function creates a new array with all the elements of the old one that pass the test implemented by the callback  function.
 */

function filter(array, callback) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    newArray = [];

    for (var i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            newArray[newArray.length] = array[i];
        }
    }
    return newArray;
};

filter([1, 2, 3, 4, 5, 6], function(element) {
    return element > 4;
});