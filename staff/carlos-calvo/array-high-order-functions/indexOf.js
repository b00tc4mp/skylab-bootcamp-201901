/*
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var a = fruits.indexOf("Apple");

Example
Search an array for the item "Apple", starting the search at position 4:

var fruits = ["Banana", "Orange", "Apple", "Mango", "Banana", "Orange", "Apple"];
var a = fruits.indexOf("Apple", 4);

*/
/**
 * 
 * @param {*} array 
 * @param {*} key 
 * @param {*} start 
 * 
 * 
 * return the index where the key is found in the array, otherwise returns -1
 */
function indexOf(array, key, start){
    if(!(array instanceof Array)) throw new Error ('Bad argument: Array')
    if(arguments.length < 2) throw new Error('Too many arguments')
    if(arguments.length > 3) throw new Error('Too many arguments')
    if(arguments.length ==3){
        if((isNaN(start))) throw new Error('Not a number in the second argument')
        if(start > array.length) throw new Error('OutOfBounds Error')
    }

    if(arguments.length == 2){
        start = 0;
    }

    while (start < array.length){
        if(array[start] == key) return start;
        start ++;
    }

    return -1;
}
