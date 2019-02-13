/**
 * Abstraction of fill.
 *
 * Fills an array from one position to other.
 *
 * @param {Array} array
 * @param {*} value
 * @param {number} start
 * @param {number} end
 * 
 * @throws {Error} - If too many arguments.
 * @throws {TypeError} - If array is not an array.
 * 
 */
var array = [1, 2, 3, 4, 5];

//use case 1

function fill(arr, num, start, end) {
  if (!(arr instanceof Array)) {
    throw new TypeError("is not an array"); 
  }

  end = end === undefined ? arr.length : end < 0 ? arr.length + end : end; //ternario (primera parte pregunta (wue devuelve un bolean)?, segunda true :, tercera false).
  start = start === undefined ? 0 : start < 0 ? arr.length + start : start;
  for (var i = start; i < end; i++) {
    arr[i] = num;
    return arr;
  }
}

console.log(fill(array, 0, 0, 2));
//[0,0,3,4,5]

//use case 2

console.log(fill(array, 0, 2));

//use case 3

console.log(fill(array, 0));

//use case 4

console.log(fill(array, -3, -2)); //[1,2,0,4,5]

//use case 5

console.log(fill(array,0,-3,4));

//use case 6

try {
  fill({}, 0);
} catch (err) {
  error = err;
}

//use case 7

try {
  fill(1, 0);
} catch (err) {
  error = err;
}
