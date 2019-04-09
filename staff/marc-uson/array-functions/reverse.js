/**
 * Returns the array pased eith the order inverted
 * 
 * @param {Array} array 
 */

function reverse(array){
    var newArr = [];
    var j = 0;
    for(var i = array.length-1; i >= 0; i--) {
        newArr[j] = array[i] ; 
        j++;
    }
<<<<<<< Updated upstream
<<<<<<< HEAD
=======
    for(var x = 0; x < newArr.length; x++){
        array[x] = newArr[x];
    }
>>>>>>> develop
=======
    for(var x = 0; x < newArr.length; x++){
        array[x] = newArr[x];
    }
>>>>>>> Stashed changes
    return newArr;
}