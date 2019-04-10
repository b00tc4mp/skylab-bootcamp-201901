'use strict';

/**
 * Reverses an array in place. The first array element becomes the last, and the last array element becomes the first.
 * @param {Array} array 
 * @return {Array} 
 */

function reverse(array){
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    var arrayReverse = [];
    var j = 0;
    for (var i =array.length-1; i >=0; i--){
        arrayReverse[j] = array[i];
        j++;
    }
    for(var i =array.length-1; i>=0; i--){
        array[i] = arrayReverse[i]
    }
     
     return array;
}
