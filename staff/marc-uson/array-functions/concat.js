/**
 * merge any number of arrays passed into a new array
 * 
 * @param {Array} array1 
 * @param  {...Array} arrays 
 */

function concat(...arrays){
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