/**
 * Abstraction of shift.
 * 
 * Deletes and returns the first element of an array.
 * 
 * @param {Array} array + ilimited parameters, separated with ","  
 * 
 * @throws {Error} - If more than one parameter is entered
 * @throws {TypeError} - If first parameter is !array
 */

function shift(array) {
    console.log(arguments.length > 1);
    if(arguments.length > 1) throw Error('only 1 parameter allowed');
    if(!(array instanceof Array)) throw TypeError('parameter should be an array');

    var result = array[0];

    for(var i = 0; i<array.length -1; i++) {
        array[i] = array[i+1];
    }
    array.length--;

    return result;
}