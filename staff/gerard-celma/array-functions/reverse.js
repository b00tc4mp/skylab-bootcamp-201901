/**
 * Abstraction of reverse.
 * 
 * The reverse() method reverses the order of the elements in an array.
 * 
 * @param {Array} array 
 * 
 * @throws {TypeError} - If array is not an array
 */

function reverse(array) {
    if(!(array instanceof Array)) throw TypeError('parameter should be an array');
    
    for(var i = 0; i < array.length / 2; i++) {
        var a = array[i];
        array[i] = array[array.length - (i + 1)];
        array[array.length - (i + 1)] = a;
    }
    return array;
}


