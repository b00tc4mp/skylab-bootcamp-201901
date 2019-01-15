/** DONE
 * Abstraction of join.
 *
 * This method creates an return a new string by concatenating all of the elements, separated by commas
 * or a specified separator string.
 * If the element is one item, that result would return without separator
 *
 * @param {Array} arr - The array to join.
 * @param {String} separator - static value to separate the string
 * 
 *
 */
function join(arr, separator) {
    var res=''
    if (separator==undefined){
        for (var i=0; i<arr.length-1; i++) res += arr[i]+','
    }
    else{
        for (var i=0; i<arr.length-1; i++) res += arr[i]+separator+''
    }
    res += arr[arr.length-1]
    return res
}