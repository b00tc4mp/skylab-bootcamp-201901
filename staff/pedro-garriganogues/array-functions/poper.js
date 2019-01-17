/**
 * Abstraction of fill.
 * 
 * 
 * @param {Res} - result
 * @param {Array} - array
 * 
 * @throws {TypeError} - If array is not an array
 */

function poppy(ele) {
    
    if (!(ele instanceof Array))
    throw new TypeError(ele + ' is not an array');

    var res = ele.slice(0,ele.length-1)

	return res
}
