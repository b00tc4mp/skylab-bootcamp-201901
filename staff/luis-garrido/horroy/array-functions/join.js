/**
 * Abstraction of join.
 * 
 * The join() method creates and returns a new string by concatenating all of the elements in an array
 * (or an array-like object), separated by commas or a specified separator string. If the array has only
 * one item, then that item will be returned without using the separator.
 * 
 * @param {Array} arr - array to be joined
 * @param {String} separator - default value = ","
 * 
 * @throws {Error} - TODO
 * @throws {TypeError} - TODO
 * 
 * @return {String} value - every item in array joined with the separator
 * 
 */

function join(arr, separator) {
    if (!(arr instanceof Array))
        throw new TypeError(arr + ' is not an array');
    separator = separator === null ? "null" : separator;
    separator = separator === undefined ? "," : separator;
    separator = separator.toString();
    var stringed = '';
    for (var i = 0; i<arr.length; i++) {
        stringed+=arr[i]+separator;
        if (i===arr.length-2) {
            i++;
            stringed+=arr[i];
        }
    }
    return stringed;
}
