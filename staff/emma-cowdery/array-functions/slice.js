/**
 * 
 * @param {array} array 
 * @param {number} a
 * @param {number} b
 * 
 * Returns a copy of a portion of an array into a new array object. The original array is not modified:
 */

function slice(array, a, b) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    var newArray = [];
    if (a === undefined) {
        a = 0;
    }
    if (b === undefined) {
        b = (array.length - 1);
    };
    if (a < 0) {
        a = (array.length + a);
    }
    if (b < 0) {
        b = ((array.length - 1) + b);
    }
    if (b > array.length) {
        b = (array.length - 1)
    }
    if (a > array.length) {
        newArray = [];
        return newArray;
    } else {
        for (var i = a; i < (b + 1); i++) {
        newArray[i - a] = array[i];
        };
        return newArray;
    };
    
};

slice([2, 3, 4, 5, 6, 7], -2);

slice([2, 3, 4, 5, 6, 7], 2, 4);