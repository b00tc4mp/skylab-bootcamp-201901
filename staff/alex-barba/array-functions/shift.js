/**
 * Abstraction of shift.
 * 
 * Removes the first element from an array and returns that removed element. This method    changes the length of the array.
 * 
 * @param {Array} arr - The array to remove the last element.
 * 
 * @throws {TypeError} - If array is not an array.
 * @throws {TypeError} - If array is not defined.
 * 
 * @returns {*}
 */

function shift(array) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (array.length === 0) return undefined

    var res = array[0]
    var copy = [];

    for (var i = 1; i < array.length; i++) {
        copy[copy.length] = array[i];
    }

    array.length = copy.length;

    for (var i = 0; i < copy.length; i++) {
        array[i] = copy[i];
    }
    return res
};

var a = [1,2,3];

shift(a);