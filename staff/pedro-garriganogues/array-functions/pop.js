/**
 * Abstraction of fill.
 * 
 * 
 * 
 * @param {Array} arr
 * 
 * @throws {TypeError} - If array is not an array
 */
var arr = [1, 2, 3, 4, 5];

function poppy(ele) {

    if (!(ele instanceof Array))
    throw new TypeError(ele + ' is not an array');

    var res = ele.slice(0,ele.length-1)

	return res
}

poppy(arr)

