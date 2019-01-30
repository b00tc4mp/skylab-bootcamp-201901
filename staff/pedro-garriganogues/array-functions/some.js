/**
 * Abstraction of some.
 * 
 * 
 * 
 * @param {Array} arr
 * 
 * @throws {TypeError} - If array is not an array
 */


function somier(array, data) {

    if (!(array instanceof Array))
    throw new TypeError(array + ' is not an array');

    for (var i = 0; i < array.length; i++) {
        return (array[i] = data) ? true : false
    }
};



