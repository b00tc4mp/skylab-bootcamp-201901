/**
 * 
 * @param {array} array
 * @param {string} separator
 */


function join(array, separator){
    var result = '';
    if (!(array instanceof Array)) throw TypeError(array + 'is not an array');
    separator = (separator === undefined) ? ',': separator;
    for (var i = 0; i < array.length; i++) {
        var element = array[i];
        result += (i !== array.length - 1) ? element + separator : element; 
    }
    return result;
} 

join([1, 2, 3, 4], '-');