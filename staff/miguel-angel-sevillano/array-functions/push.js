'use strict'

/**
 * adds a value at the end of the array incrementing the array.length
 * @param {array} array the array to push value in
 * @param {*} value the value to push in the array
 * 
 * @returns {number} Return the array.length number
 */




function push(array,value){
    if(!(array instanceof Array)) throw TypeError(' is not an array');

    array[array.length-1] = value;

    return array.length;
}