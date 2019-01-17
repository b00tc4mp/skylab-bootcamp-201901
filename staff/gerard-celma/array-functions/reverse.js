/**
 * Abstraction of reverse.
 * 
 * The reverse() method reverses the order of the elements in an array.
 * 
 * @param {Array} array 
 * 
 * @throws {Error} - If too many arguments (> 4)
 * @throws {TypeError} - If array is not an array
 */

function reverse(array) {
    if(!(array instanceof Array)) throw TypeError('parameter should be an array');
    var acc = [];
    var counter = array.length -1;
    for(var i = 0; i < array.length; i++) {
        acc[i] = array[counter];
        counter--;
    }
    array = acc;
    return array;
}