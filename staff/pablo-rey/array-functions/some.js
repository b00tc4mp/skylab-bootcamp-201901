/**
 * Iterates an array and evaluates an expression on each of its values, returning true if any of them match it. Otherwise returns false.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callbackfn The expression to evalute.
 * 
 * @returns {boolean} True if at least one value match the expression, otherwise false.
 */
function some(array, callbackfn) {
	if (!(array instanceof Array)) throw new TypeError("array param is not an array");
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");

    for (var i = 0; i < array.length; i++) {
        if (callbackfn(array[i], i, array))  {
            return true;
        }
    }
    return false;
}