/**
 * Function that lets you concatenate an array inside another array
 *
 * @param {Array} arrayA The array which is the target where you will put the content from the second array.
 * @param {Array} arrayB The array that you will put inside the first array.
 *
 * @returns {Array} The sum of the two arrays.
 */

function concat(arrayA, arrayB) {
  for(var i = 0; i < arrayB.length; i++) {
    arrayA[arrayA.length] = arrayB[i];
  }

  return arrayA;
}
