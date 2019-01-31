/**
 * Abstraction of join
 * 
 * concatenating the elements in an array, separated by separator
 * 
 * @param {Array} arr - The array to join
 * @param {string} sep - The sep to use between items
 * 
 * @returns {String} - all elements from arr separated by sep
 */

function join(arr, sep){
    var res = '';
    
    if (!(arr instanceof Array)) throw Error(arr + 'is not an array');

    sep = (sep === undefined) ? ',': sep;
    
    for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        res += (i !== arr.length - 1) ? element + sep : element; 
    }
    return res;
}