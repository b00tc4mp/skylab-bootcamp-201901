/**
 * The map() method creates a new array with the results of calling a provided function on every element in the calling array.
 * @param {Array} array 
 * @param {function} callback
 * @returns {Array} newNumbers 
 */
function map (array, callback) {
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
  
  let newNumbers = []
  for (let i = 0; i < array.length; i++){
    newNumbers[i] = callback(array[i], i)   
  }
  return newNumbers
}

