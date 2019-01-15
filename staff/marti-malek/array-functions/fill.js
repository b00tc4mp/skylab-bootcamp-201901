/*Function fill: Fills the "arr" with the desired "value" from position "start" to position "end"*/
/**
 * 
 * @param {Array} arr 
 * @param {*} value 
 * @param {Number} start 
 * @param {Number} end 
 * 
 * @throws {TypeError} - If array is not an array
 */
function fill(array, value, start, end) {
    if (!(array instanceof Array))
        throw new TypeError(array + " is not an array");

    start = start === undefined? 0 : (start < 0 ? array.length + start : start);
    end = end === undefined? array.length : (end < 0 ? array.length + end : end); 

    for (var i = start; i < end; i++) 
        array[i] = value;

    return array;
    
}
// use case 18

var arr = [1,2,3,4,5];

fill(arr, 0, 0, 2);

console.log(arr); //[0, 0, 3, 4, 5] 

//use case 2

var arr2 = [1, 2, 3, 4, 5];

fill(arr2, 0, 2);

console.log(arr2); //[1, 2, 0, 0, 0]

//use case 3

var arr3 = [1, 2, 3, 4, 5];

fill(arr3, 0);

console.log(arr3); //[0, 0, 0, 0, 0]

//use case 4

var arr4 = [1, 2, 3, 4, 5];

fill(arr4, 0, -3, -2);

console.log(arr4); //[1, 2, 0, 4, 5]

//use case 5

var arr5 = "hello";

fill(arr5, 0, 2, 3); //hello is not an array

//use case 6

var error;

try {
    fill({}, 0);
} catch(err) {
    error = err;
}

console.log(error); // Error....
