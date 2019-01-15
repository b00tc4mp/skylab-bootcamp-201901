/** DONE
 * 
 * Abstraction of pop.
 *
 * This method removes the last element of an array and returns that element.
 * This method changes the length of the array
 *
 * @param {Array} arr - The array to join.
 *  
 *
 */
function pop(arr) {
    var last=arr[arr.length-1]
    arr.length=arr.length-1
    return last
}