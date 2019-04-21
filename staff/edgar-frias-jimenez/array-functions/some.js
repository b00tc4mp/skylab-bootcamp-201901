'use strict';

/**
 * Iterates an array an evaluates if a number match with the given function. Otherwise it returns false.
 *
 * @param {Array} array The array to iterate.
 * @param {function} callback The expression to evaluate.
 *
 * @returns {boolean} True if any number match the expression.
 */

function some(array, callback) {
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

  for (var i = 0; i < array.length; i++)
    if (callback(array[i])) return true;

  return false;
}