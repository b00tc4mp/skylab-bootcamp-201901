/**
 * It will create a new array after eliminating the choosed index of the original array-
 * @param {array} array array to iterate
 * @param {number} from from (or whichone if this argument is given) where to cut
 * @param {number} to up to where to cut from from
 */

var slice = (function(array, from, to){
    "use strict";
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (isNaN(from)) throw TypeError(from + ' is not a valid array index value');
    if (isNaN(to) && to !== undefined) throw TypeError(firstposition + ' is not a valid array index value');
    
    var i, newArray=[], k = 0;
      
    if (from !== undefined){
        if(to !== undefined && to >= from && to < array.length){
            for (i = from; i <= to; i++){
                newArray[k] = array[i];
                k++;
            }
            return newArray
        } else {
            for (i = from; i < array.length; i++){
                newArray[k] = array[i];
                k++;
            }
            return newArray
        }
    } else {
        console.log("At least you need to introduce from where")
    }
  
});