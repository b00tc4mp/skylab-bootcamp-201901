/**
 * Iterates an array and evaluates an expression on each of its values.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callback The expression to evaluate.
 */

function forEach(array, callback) {
	if(arguments.length === 0) {
        throw TypeError(' no arguments are passed.');
    } else if(!(arguments[0] instanceof Array)) {
        throw TypeError(array + ' is not an array.');
    } else if( arguments.length > 1 && !(arguments[1] instanceof Function)){
        throw new TypeError(callback + ' is not a function');
    }
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
