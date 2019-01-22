/** DONE
 * 
 * Abstraction of pop.
 *
 * This method removes the last element of an array and returns that element.
 * This method changes the length of the array
 *
 * @param {Array} array - The array to join.
 * 
 * @throws {TypeError} - when array is not an Array
 *  
 *@return {*} - Delated item from the array
 */
function pop(array) {
    
    if (!(array instanceof Array)) throw TypeError(array+' is not Array')

    var last=array[array.length-1]
    array.length=array.length-1
    return last
}