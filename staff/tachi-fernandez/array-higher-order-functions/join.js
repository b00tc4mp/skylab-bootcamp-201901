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
 * @throws {TypeError} - array is not an Array
 * 
 *@returns {string} - string joining the array compoennts
 */
function join(array, separator) {
    var res = ''

    if (!(array instanceof Array))
        throw new TypeError(array + ' is not an array');

    separator = separator === undefined? ',' : separator + ''

    for (var i = 0; i < array.length - 1; i++) {
        res += array[i] + separator
    }
    
    res += array[array.length - 1]
    return res
}