/**
 * merge any number of arrays passed into a new array
 * 
 * @param {Array} array1 
 * @param  {...Array} arrays 
 */

function concat(...arrays){
    for(var x = 0; x < arrays.length; x++){
        if (!(arrays[x] instanceof Array)) throw TypeError(arrays[x] + ' is not an array');
    }
    var newArray = [];
    var k = 0;
    for(var i = 0; i < arrays.length; i++){
        if(arrays[i] instanceof Array){
            for(var j = 0; j < arrays[i].length; j++) {
                newArray[newArray.length] = arrays[i][j];
            }
        } else{
            newArray[newArray.length] = arrays[i];
        }
    }
    return newArray;
}