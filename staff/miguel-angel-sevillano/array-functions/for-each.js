'use strict';

/**
 * Iterates an array and evaluates an expression on each of its values.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callback The expression to evaluate.
 */
//function forEach(array, callback) {
//	if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
//	if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
//
//	for (var i = 0; i < array.length; i++)
//		callback(array[i], i);
//}

function forEach(array,callback){
	if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
	if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

	var newArray=[]
	var b =array.length -1
	var loop = function(){
			if(!(b<0)){
				newArray = callback(array[b], b);
				b--
				loop()
			}
		}
	loop()
	return newArray		
}
