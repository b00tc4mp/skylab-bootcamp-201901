/** DONE
 * Abstraction of push.
 *
 * This method adds one or more elements tot he end of an array
 * and return the new length of the array
 *
 * @param {Array} arr - The array to join.
 * @param {} value - static value to push
 *
 * @return {Number} - The length od the new arr
 */
function push(arr, value) {
    arr[arr.length]=value
    return arr.length
}