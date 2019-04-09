/**
 * 
 * sorts the given array. Notice than numbers are considered smaller than letters
 * 
 * @param {array} array 
 */

function sort(array){
    
    for(var i= 0; i < array.length; i++){
        var a = array[i];
        var b = array[i+1];
        if(array[i] > array[i+1] || (typeof(array[i+1])=='number')&&(typeof(array[i])=='string')){
            array[i+1] = a;
            array[i] = b;
            i = -1;
        }
        
    }
    return array;
}