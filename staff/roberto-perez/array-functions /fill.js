/**
 * Abstraction of fill.
 *
 * Fills all the elements of an array from the start index to the end index, with the static value.
 * The result modified the current array.
 *
 * @param {Array} arr - The array to fill.
 * @param {*} value - Value with which you will fill the array.
 * @param {number} [start] - Initial index, by default is 0.
 * @param {number} [end] - Final index, by default is arr.length.
 * 
 * @throws {TypeError} - If arr is not a array
 */
function fill(arr, value, start, end) {
  if (!(arr instanceof Array)) {
    throw new TypeError(arr + " is not an array");
  }
  start = Math.floor(start) || 0;
  end = Math.floor(end) || arr.length;

  for (var i = start; i < end; i++) arr[i] = value;
}

// use case

var a = [1, 2, 3, 4];

try {
  fill(a, 0, 2, 4);
} catch (err) {
  console.error(err.message);
}

console.log(a); // output: [1, 2, 0, 0]
