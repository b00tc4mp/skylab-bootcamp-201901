/**
 * Gives you an element product of your array and a given callback (right to left)
 * 
 * @param {Array} array The array to operate
 * @param {Expresion} callback The expression to evalute with each element of the array
 * 
 * @return {element} a new element made with array and callback
 */
function reduceright(array,callback,inicial){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
	if (typeof inicial === 'undefined') throw new TypeError(inicial + ' is not an initial parameter');
    var redu;
    (typeof inicial === 'undefined')? redu = array[0] : redu = inicial;
    for (var i = array.length; i > 1; i--){
        (typeof inicial === 'undefined')? redu=callback(redu,array[i]) : redu=callback(redu,array[i])
    }
    return redu;
}

