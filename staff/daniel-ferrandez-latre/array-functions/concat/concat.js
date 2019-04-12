/**
 * Concats two arrays in one
 * 
 * @param {Array} array The array to iterate.
 * 
 * @returns {Array} This one will follow the first one.
 */
function concat(array1, array2) {    
    if (!(array1 instanceof Array)) throw TypeError(array1 + ' is not an array');
    if (!(array2 instanceof Array)) throw TypeError(array2 + ' is not an array');
    
    var arrayConcat = new Array((array1.length + array2.length));
    for(var i = 0; i < array1.length; i++){
        arrayConcat[i] = array1[i];    
    }
    for(var j = array1.length; j < arrayConcat.length; j++){
        arrayConcat[j] = array2[j - array1.length];
    }
    return arrayConcat;
}