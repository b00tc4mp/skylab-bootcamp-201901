/** 
 * 
 * Abstraction of push.
 *
 * This method adds one or more elements tot he end of an array
 * and return the new length of the array
 *
 * @param {Array} arr - The array to join.
 * @param {} value - static value to push. It can have infinite arguments
 *
 * @throws {TypeError} - when array is not an Array
 * 
 * @return {Number} - The length od the new arr
 */
function push(array) {
    if(!(array instanceof Array)) throw TypeError(array+ ' is not an Array')

    var l=array.length
    for (var i=0; i<arguments.length-1; i++)
        array[l+i]=arguments[1+i]
    return array.length
}