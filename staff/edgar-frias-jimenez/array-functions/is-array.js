/**
 * Function that evaluates if the parameter passed is an Array or not.
 *
 * @param {Array} element The parameter to evaluate.
 *
 * @returns {boolean} True if any parameter match the array type.
 */

function isArray(element) {
  if (element === undefined) throw new TypeError(element + ': you have to provide a valid element');

  return element instanceof Array ? true : false;
}
