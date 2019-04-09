/**
 * merge any number of arrays passed into a new array
 * 
 * @param {Array} array1 
 * @param  {...Array} arrays 
 */

function concat(...arrays){
<<<<<<< Updated upstream
<<<<<<< HEAD
=======
=======
>>>>>>> Stashed changes
    for(var x = 0; x < arrays.length; x++){
        if (!(arrays[x] instanceof Array)) throw TypeError(array[i] + ' is not an array');
    }

<<<<<<< Updated upstream
>>>>>>> develop
=======
>>>>>>> Stashed changes
    var newArray = [];
    var k = 0;
    for(var i = 0; i < arrays.length; i++){
        for(var j = 0; j < arrays[i].length; j++) {
            newArray[k] = arrays[i][j];
            k++
        }
    }
    return newArray;
}