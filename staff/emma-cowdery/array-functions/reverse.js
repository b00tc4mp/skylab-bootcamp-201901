/**
 * 
 * @param {array} array 
 * 
 * 
 * Reverse inverts the order of the elements in the array in place
 */

function reverse(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    var reversed = [];
    counter = array.length - 1
    for (var i = 0; i < array.length; i++) {
        reversed[counter] = array[i];
        counter--;
    };
    return reversed;
};

reverse([1, 2, 3]);