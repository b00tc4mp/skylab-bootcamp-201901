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
 * @return {Number} - The length od the new arr
 */
function push(arr) {
    if(!(arr instanceof Array)) throw TypeError('arr'+ ' is not an Array')

    var l=arr.length
    for (var i=0; i<arguments.length-1; i++)
        arr[l+i]=arguments[1+i]
    return arr.length
}