/**
 * Abstraction of push.
 * 
 *  adds one or more elements to the end of an array and returns the new length of the array.
 * 
 * @param {Element} element 
 * @param {Array} arr 
 * 
 * @throws {TypeError} - If array is not an array.
 * 
 * @returns {Length}
 */

function push(array, element) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    
    array[array.length]=element;

    if (arguments.length>2) {
        for (var i = 2; i<arguments.length; i++) {
            array[array.length] = arguments[i];
        }
    };

    return array.length
};