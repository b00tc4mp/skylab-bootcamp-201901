/**
 * 
 * @param {array} array 
 * @param {number} a
 * @param {number} b
 * 
 * Returns a copy of a portion of an array into a new array object. The original array is not modified:
 */

function slice(array, a, b) {
    var newArray = [];
    if (b === undefined) {
        b = (array.length - 1);
    };
    for (var i = a; i < (b + 1); i++) {
        newArray[i - a] = array[i];
    };
    return newArray;
};

slice([2, 3, 4, 5, 6, 7], 2, 4);