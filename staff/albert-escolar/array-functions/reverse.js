
'use strict'

/**Reverses an array.The first array element becomes the last, and the last array element becomes the first.
 * 
 * @param {array} array The array to iterate
 * 
 * @returns {array} Returns the reversed array.
 */

function reverse(array){
    var inverseArray = []
    var j=0;
    for(var i=array.length-1;i>=0;i--){
        inverseArray[j] = array[i];
        j++
    }
    for(var i=array.length-1;i>=0;i--){
        array[i]= inverseArray[i];
    }
    
    
    return array 
}
