/** DONE
 * Abstraction of index of.
 *
 * This method return the first index at which a given element can be found in the array,
 * or -1 if it is not present
 *
 * @param {Array} array - The array to map.
 * @param {any} value - static value to find
 * 
 * @throws {TypeError} - arr is not an Array
 * @throws {Error} - too much arguments
 * 
 *@return {number} - The index of the finded value or -1 if the value is not found
 */
function indexOf(array, value, start) {
    if(arguments.length>3) throw Error('to many arguments');
    if (!(array instanceof Array)) throw TypeError(array + ' should be an Array')
    
    start = start ===undefined? 0 : start

    for (var i=start; i<array.length; i++){
        if (array[i]===value){
            return i
        }
    }
    return -1
    
}