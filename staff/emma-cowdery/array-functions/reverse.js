/**
 * 
 * @param {array} array 
 * 
 * 
 * Reverse inverts the order of the elements in the array in place
 */

function reverse(array) {
    //array = [];
    //debugger
    for (var i = 0; i < array.length; i++) {
        i = (array.length - (i + 1));
        array[i] += array;
    };
    return array;
};

reverse([1, 2, 3]);