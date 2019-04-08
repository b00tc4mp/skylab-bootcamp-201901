/**
 * returns the last index in wich you can find the given element or -1 if it's not present
 * 
 * @param {Array} array 
 * @param {any} element 
 */

function lastIndexOf(array, element){
    for(var i = 0; i < array.length; i++)
        if (element === array[i]) var x = i;
    if(x!== undefined){
        return x;
    }else return -1;
}