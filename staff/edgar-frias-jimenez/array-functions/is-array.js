'use strict';

/**
 * Function that evaluates if the parameter passed is an Array or not.
 *
 * @param {Array} element The parameter to evaluate.
 *
 * @returns {boolean} True if any parameter match the array type.
 */

function isArray(element) {
  if (element === undefined) throw TypeError(element + ' is not an array');

  return (element instanceof Array) ? true : false;
}
