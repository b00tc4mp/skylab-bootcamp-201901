/**
 * Abstraction of fill with 2 parameters
 * 
 * @param {array} array 
 * @param {number} a 
 */

function fill1(array,a) {
    for(var i = 0; i < array.length; i++) {
        array[i] = a;
    }
    return array;
}

// use case 1

var arr = [1,2,3,4,5];

var res = fill(arr,0);

console.log(arr); //[0,0,0,0,0]
console.log(res);