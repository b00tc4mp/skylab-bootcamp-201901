/**
 * Abstraction of reverse.
 * 
 * Reverses an array in place. The first array element becomes the last, and the last array element becomes the first.
 * 
 * @param {Array} array 
 * 
 * @throws {TypeError} - If array is not an array.
 * 
 * @returns {Array}
 */

function reverse (array) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    
    var duplicate = Object.assign([],array);

    for (var i = duplicate.length; i > 0; i--){
        array[i-1] = duplicate[array.length-i];
    }
    return array
};
