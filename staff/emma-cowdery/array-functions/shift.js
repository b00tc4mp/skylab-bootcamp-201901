/**
 * 
 * @param {array} array 
 * 
 * Removes the first element from an array and returns that removed element. This method changes the length of the array.
 */

function shift(array) {
    var firstElement = "";
    if (array === undefined) {
        return undefined;
    };
    firstElement = array[0];
    counter = 0;
    for (var i = 1; i < array.length; i++) {
        array[counter] = array[i];
        counter++;
    };
    array.length = array.length -1;
    return firstElement;
};
shift([1, 2, 3, 4]);