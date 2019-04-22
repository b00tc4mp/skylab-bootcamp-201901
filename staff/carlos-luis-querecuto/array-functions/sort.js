/**
 * Iterate an array to change its order values from min to max changing the original array.
 * 
 * @param {Array} arr The array to iterate 
 */

function sort(arr) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');

    for(var i = 0; i < arr.length; i++) {
        var a = arr[i];
        var b = arr[i+1];
        if(''+arr[i] > ''+arr[i+1]) {
            arr[i] = b;
            arr[i+1] = a;
            i = -1;
        }
    }
    return arr
} 