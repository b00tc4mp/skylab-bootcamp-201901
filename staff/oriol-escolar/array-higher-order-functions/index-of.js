
/**
 * Abstraction of Index-of
 * 
 * 
 * Finds the index of the value in the array.
 * 
 * 
 * @param {*} array 
 * @param {*} value 
 * @param {*} index 
 */


function indexof(array, value, index) {

    if (!(array instanceof Array)) { throw new TypeError(array + ' is not an array'); }
    index = typeof index === 'number' ? index : 0;
    index = index < 0 ? index + array.length : index;

    for (var i = index; i < array.length; i++) {

        if (array[i] == value) {
            return i;
        }


    }

    return -1;
}

