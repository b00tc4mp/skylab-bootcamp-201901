//fill.js
/**
 * Fills an array from one position to another, returns the modified array
 * 
 * 
 * @param {Array} array 
 * @param {*} value 
 * @param {number} beg 
 * @param {number} end 
 * 
 * Use case:
 * var array= [1,2,3,4,5]
 * var res = fill(arr,0,0,2) --> res = [0,0,3,4,5]
 */



function fill (array, value, beg, end){
    
    //Comprobación de tipos
    if(!Array.isArray(array))
        return console.log("MTF no has puesto un array!")
    if(!("number"==(typeof beg)==(typeof end)))
    return console.log("MTF no has puesto números!")
    if(beg > end)
    return console.log("MTF no has puesto")
    //Algoritmo de cambio
}
fill([1,2,3,4],2,2,"s")





/*

var array1 = [1, 2, 3, 4];
// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// expected output: [1, 2, 0, 0]
// fill with 5 from position 1
console.log(array1.fill(5, 1));
// expected output: [1, 5, 5, 5]
console.log(array1.fill(6));
// expected output: [6, 6, 6, 6]

*/
