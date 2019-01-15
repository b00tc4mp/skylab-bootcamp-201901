
/**
 * Abstraction of push.
 * 
 * Pushes values to the end of an array
 * 
 * @param {Array} array
 * @param {Array} values
 */


function push(array, values) {

    if (!(array instanceof Array))
        throw new TypeError(array + ' is not an array');
    if (!(values instanceof Array))
        throw new TypeError(values + ' should be in an array');
        

    for (var i = 0; i < values.length; i++) {

        array[array.length] = values[i];

    }
    return array;
}

