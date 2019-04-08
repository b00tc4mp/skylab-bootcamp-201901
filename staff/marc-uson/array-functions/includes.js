/**
 * determines if and array contains the value determined. Return true if the value is contained or false if not
 * 
 * @param {Array} array 
 * @param {any} value 
 */

function Includes(array, value){
    for(var i = 0; i < array.length; i++)  if(array[i] === value) return true;

    return false;
}