/** DONE
 * 
 * Abstraction of pop.
 *
 * This method removes the last element of an array and returns that element.
 * This method changes the length of the array
 *
 * @param {Array} arr - The array to join.
 *  
 *@return {*} - Delated item from the array
 */
function pop(arr) {
    
    if (!(arr instanceof Array)) throw Error('arr is not Array')

    var last=arr[arr.length-1]
    arr.length=arr.length-1
    return last
}