/**
 * Abstraction of join
 * 
 * iterates an array and creates and returns a new string by concatenating all of the elements.
 * By default separates by commas.
 * 
 * @param {Array} array - array to iterate
 * @param {*} separator - specify element seperator
 * 
 * @returns {String}
 */

function join(array, separator){
    if(arguments.length > 2)
        throw Error('too many arguments');
    
    if (!(array instanceof Array))
        throw new TypeError(array + ' is not an array');

    var string = '';

    separator = separator === undefined ? ',' : (separator === null ? 'null':separator);
    for (var i = 0; i < array.length; i++) {
        var value = array[i];

      string += i === array.length-1 ? value : value + separator;
    }

    return string;
}