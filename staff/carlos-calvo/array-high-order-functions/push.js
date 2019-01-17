/**
 * 
 * @param {Array} array 
 * @param {Object} element 
 * 
 * 
 * return the array with the added element
 */

function push(array, element){
    if(!(array instanceof Array)) throw new Error('First parameter must be an array')

    array[array.length] = element;

}


//TESTING CUTRE
var array1 = [1,2,3]
console.log(array1)

push(array1, '2')

console.log(array1)