/**
 * Abstraction of join.
 * 
 * The join() method join the elements of an array into a string.
 * 
 * @param {Array, *} array + parameters you want to add
 * 
 * @throws {TypeError} - If array is not an array
 */

function join(array,separator) {
    if(!(array instanceof Array)) throw TypeError('the first parameter should be an array');

    var result = "";

    if(!separator) {
        result = array.toString();
        return result;
    }

    result += array[0].toString();
    for(var i = 1; i<array.length; i++) {
        result += separator + array[i].toString();
    }

    return result;
}
