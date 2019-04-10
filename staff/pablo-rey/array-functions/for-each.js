'use strict';

/**
 * Iterates an array and evaluates an expression on each of its values.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callbackfn The expression to evaluate.
 */
function forEach(array, callbackfn, _this) {
	if (!(array instanceof Array)) throw new TypeError("array param is not an array");
	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");
	
	simFor(array.length, function (index) {
		callbackfn.call(_this, array[index], index);
	})

	return undefined;
}

function simFor (cap, callbackfn, next) {
	var i = next || 0;
	callbackfn(i);
	if (i < cap-1) simFor(cap, callbackfn, i + 1)
}

// function forEach(array, callbackfn, _this) {
// 	if (!(array instanceof Array)) throw new TypeError("array param is not an array");
// 	if (!(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");
	
// 	for (var k = 0; k < array.length; k++){
// 		callbackfn.call(_this, array[k], k);
// 	}

// 	return undefined;
// }