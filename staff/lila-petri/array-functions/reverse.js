/**
 * Revert the order of the elements of an array
 * @param {Array} array 
 */

function reverse(array){
    count=0;
    array2=[];
    for (var i = array.length-1 ; i >= 0; i--){
        array2[count]=array[i]
        count++
    }
   return array=array2;
}

console.log(reverse([1,2,3,4,5]))