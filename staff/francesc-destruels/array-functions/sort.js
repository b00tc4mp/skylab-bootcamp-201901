
/**
 * The sort() method sorts the elements of an array in place and returns the array
 * 
 * @param {array} Array to iterate.
 * 
 */

var sort = (function(array) {
    "use strict";
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var i,j,k,z;
    
    for (i = 0; i < array.length; i++){
        for (j = 0; j < array.length -i; j++){
            k = array[j];
            z = array[j+1];
            if (k > z){
                array[j] = z;
                array[j+1] = k;
            }
        }
    }
    return array;
});
