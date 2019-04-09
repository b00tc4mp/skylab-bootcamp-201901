
/**
 * The function changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
 * 
 * @param {array} array 
 * @param {number} origin 
 * @param {number} erase 
 * @param {*} add 
 */

var splice = (function(array, origin, erase, add){
    "use strict";
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (isNaN(origin)) throw TypeError(firstposition + ' is not a valid array index value');
    if (isNaN(erase || erase !== undefined) ) throw TypeError(firstposition + ' is not a valid array index value');
    
    var i, j = erase, newArray = [];

    if (erase === 0){
           for (i = 0; i <= array.length; i++){
               if (i < origin){
                   newArray[i] = array[i];
               } else if (i = origin){
                   newArray[i] = add;
               } else {
                   newArray[i] = array[i-1];
               }
           }
       }else if (erase > 0 && erase < array.length){
            for (i = 0; i < (array.length + (erase -1)); i++){
                if (i < origin){
                    newArray[i] = array[i];
                } else if (i = origin){
                    newArray[i] = add;
                    i += (erase -1);
                } else {
                newArray[i-(erase -1)] = array[i];
                }
            }
    }
    array = newArray;
    return array;
});
