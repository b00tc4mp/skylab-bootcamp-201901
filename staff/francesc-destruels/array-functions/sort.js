
/**
 * The sort() method sorts the elements of an array in place and returns the array
 * 
 * @param {array} Array to iterate.
 * 
 */

var sort = (function(array) {
    "use strict";
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var i,j,k, emptyarray = [undefined];
    
    for (i = 0; i < array.length; i++){
        if (emptyarray[0] = undefined){
            emptyarray[0] = array[i];
            continue;
        }

        for (j = 0; 0 < emptyarray.length; j++;){
            if (array[j + 1] >= emptyarray[j]){
                emptyarray[j +1] = array[j +1];
                
            } else if (array[j +1] < emptyarray[j]){
                for (k = j; k > j; k++){
                    if (j === 1){
                        emptyarray[1] = emptyarray[0];
                        
                    }
                }
            }
        }


    }
    for (i = 0; i < array.length; i++){
        array[i] = emptyarray[i];
    }

    return array;
});
