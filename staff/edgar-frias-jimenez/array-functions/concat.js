/**
 * Function that lets you concatenate an array inside another array
 *
 * @param {Array} arrayA The array which is the target where you will put the content from the second array.
 * @param {Array} arrayB The array that you will put inside the first array.
 *
 * @returns {Array} The sum of the two arrays.
 */

function concat(arrayA, arrayB) {
  if (!(arrayA instanceof Array)) throw TypeError(arrayA + ': is not an array');
  if (arrayA === undefined) throw new TypeError(arrayA + ': you have to provide a valid element');
  if (!(arrayB instanceof Array)) throw TypeError(arrayB + ': is not an array');
  if (arrayB === undefined) throw new TypeError(arrayB + ': you have to provide a valid element');

  for(var i = 0; i < arrayB.length; i++) {
    arrayA[arrayA.length] = arrayB[i];
  }

  return arrayA;
}
