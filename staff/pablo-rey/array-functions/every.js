/**
 * Iterates an array and evaluates an expression on each of its values, returning true if all of them match it. Otherwise returns false.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callbackfn The expression to evalute.
 * 
 * @returns {boolean} True if all values match the expression, otherwise false.
 */
function every(array, callbackfn, _this) {
	if (!(array instanceof Array)) throw new TypeError("array param is not an array");
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");
        
    for (var k = 0; k < array.length; k++) {
        if (!callbackfn.call(_this, array[k])) {
            return false;
        }
    }
    return true;
}