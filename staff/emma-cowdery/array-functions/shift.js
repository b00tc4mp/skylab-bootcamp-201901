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
    for (var i = 0; i < array.length; i++) {
        array[i] = array[i - 1];
    };
    //return firstElement;
    //console.log(firstElement);
    return array;
};
//shift();
shift([1, 2, 3, 4]);