/**
 * This method cconcetenats two arrays
 * @param {Array} array First array, used as a base
 * @param {Array} array2 Second array which will be added in the end of the first one
 */


function concat(array, array2) {
    var ind=array.length-1;
    for(var i=0; i<array2.length; i++){
        array[i+ind]=array2[i];
    }
    return array
}
