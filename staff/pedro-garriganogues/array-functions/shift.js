/**
 * Abstraction of fill.
 * 
 * 
 * 
 * @param {Array} arr
 * 
 * @throws {TypeError} - If array is not an array
 */


function shifter(ele) {

    if (!(ele instanceof Array))
    throw new TypeError(ele + ' is not an array');

    var res = ele.splice(1,5)

	return res
}
