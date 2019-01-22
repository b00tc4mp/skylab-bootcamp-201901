/**
 * Abstraction of unshift.
 * 
 * Adds one or more elements to the beginning of an array and returns the new length of the array.
 * 
 * @param {Element} element 
 * @param {Array} arr 
 * 
 * @throws {TypeError} - If array is not an array.
 * 
 * @returns {Length}
 */

function unshift(array, element) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var elements = [];
    var copy = [];

    if (arguments.length>1) {
        for (var i = 1; i<arguments.length; i++) {
            elements[elements.length] = arguments[i];
        }
    };

    for (var i = 0; i < elements.length; i++) {
        copy[copy.length] = elements[i]
    };

    for (var i = 0; i < array.length; i++) {
        copy[copy.length] = array[i]
    };

    array.length = copy.length;

    for (var i = 0; i < copy.length; i++) {
        array[i] = copy[i]
    };

    return array.length
};