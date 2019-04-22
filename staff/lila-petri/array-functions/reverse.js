/**
 * Revert the order of the elements of an array
 * @param {Array} array Array to revert
 * 
 * @returns the array with all elements reverted
 */

function reverse(array){
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    count=0;
    array2=[];
    for (var i = array.length-1 ; i >= 0; i--){
        array2[count]=array[i];
        count++
    }
   return array=array2;
}

