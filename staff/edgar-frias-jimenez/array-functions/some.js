/**
 * Iterates an array an evaluates if a number match with the given function. Otherwise it returns false.
 *
 * @param {Array} array The array to iterate.
 * @param {Function} callback The expression to evaluate.
 *
 * @returns {boolean} True if any number match the expression.
 */

function some(array, callback) {
  for (var i = 0; i < array.length; i++)
    if (callback(array[i])) return true;

  return false;
}