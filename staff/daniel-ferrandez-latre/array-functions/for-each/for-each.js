/**
 * Iterates an array and evaluates an expression on each of its values.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callback The expression to evaluate.
 */

function forEach(array, callback) {
	var index = 0;
	fore(array,callback,index)
	function fore(array, callback, index){
		var i=index;
		if(array.length > i){
			callback(array[i], i)
			fore(array, callback, index+1);
		}
	}
}
