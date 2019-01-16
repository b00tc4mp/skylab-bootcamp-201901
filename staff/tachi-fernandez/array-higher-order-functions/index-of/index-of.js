/**
 * Abstraction of index-of.
 * 
 * Index-of shows the position of serchValue in the array
 * 
 * @param {Array} array 
 * @param {*} searchValue 
 * 
 * 
 * @throws {Error} - If too many arguments (> 4)
 * @throws {TypeError} - If array is not an array
 */


function indexOf(array, searchValue) {

    if (arguments.length > 2) throw Error('too many arguments');
    if (!(array instanceof Array))
    throw new TypeError(array + ' is not an array');



    for (var i = 0; i < array.length; i++) 
        if (searchValue === array[i]) return i
    return -1 
}
