/**
 * 
 * @param {Array} array 
 * @return {Array} 
 */

function reverse(array){
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
