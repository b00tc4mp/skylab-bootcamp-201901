/**
 * Abstraction of find.
 *
 * This metod return the value of the first element in the array that satisfies the provided testing function.
 * The result is back in a new array
 *
 * @param {Array} arr - The array to find.
 * @param {Function} callback - testing funtion
 * 
 * @throws {TypeError} - when array is not an Array
 * @throws {TypeError} - when callback is not a Function
 * @throws {Error} - when there is too much arguments
 * 
 * 
 *@return {*} - The found value. Undefined if value is not found
 */
function find(array, callback) {

    if(arguments.length >2) throw Error('too many arguments')

    if(!(array instanceof Array)) throw TypeError(array+' should be an Array')
    if (!(callback instanceof Function)) throw TypeError(callback + ' should be a function')

    for (var i=0; i<array.length; i++){
        var value = array[i]
        if (callback(value)) return value
    }
    
}