/**
 * This method cconcetenats two arrays
 * @param {Array} array First array, used as a base
 * @param {Array} array2 Second array which will be added in the end of the first one
 */


function concat(array, array2) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (!(array2 instanceof Array)) throw TypeError(array2 + ' is not an array');
   
    var ind=array.length-1;
    for(var i=0; i<array2.length; i++){
        array[i+ind]=array2[i];
    }
    return array
}
