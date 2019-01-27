/**
 * Abstraction of push
 * 
 * Iterates an array and adds one or more elements to the end of an array and returns the new length of the array.
 * 
 * @param {*} arguments 
 * 
 * @returns {number} - the length of the array modified
 */


function push() {
    if (!(arguments[0] instanceof Array))
        throw new TypeError(array + ' is not an array');

    var array = arguments[0];

    for (var i = 1; i < arguments.length; i++) {
        var value = arguments[i];
        array[array.length] = value;
    }

    return array.length;
}