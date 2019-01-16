/** 
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
    var res = ''

    if (arguments.length > 2) throw Error('too many arguments');

    if (!(arr instanceof Array))
        throw new TypeError(arr + ' is not an array');

    separator = separator === undefined? ',' : separator + ''

    for (var i = 0; i < arr.length - 1; i++) {
        res += arr[i] + separator
    }
    
    res += arr[arr.length - 1]
    return res
}