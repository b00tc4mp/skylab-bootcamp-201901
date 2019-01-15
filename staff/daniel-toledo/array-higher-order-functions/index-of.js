/** DONE
 * Abstraction of index of.
 *
 * This method return the first index at which a given element can be found in the array,
 * or -1 if it is not present
 *
 * @param {Array} arr - The array to map.
 * @param {any} value - static value to find
 * 
 *@return {number} - The index of the finded value or -1 if the value is not found
 */
function indexOf(arr, value) {
    if(arguments.length>2) throw Error('to many arguments');

    if (!(arr instanceof Array)) throw TypeError(arr + ' should be an Array')
    var find=false
    for (var i=0; i<arr.length; i++){
        if (arr[i]===value){
            find=true
            return i
        }
    }
    if(!find){
        return -1
    }
    
}