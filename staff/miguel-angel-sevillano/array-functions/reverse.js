'use strict'

/**This function changes the first and last postion of an array .
 * 
 * @param {array} array the array you want to apply the reverse
 */



function reverse(array){
    if (!(array instanceof Array)) throw TypeError('its not an array');

    var temp = array;
    var last = array[array.length-1];
    var first = array[0];

    
    temp[array.length-1] = first
    temp[0] = last

    array = temp

    return array


}

