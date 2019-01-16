/**
 * Abstraction of fill.
 * 
 * 
 * 
 * @param {Array} arr
 * 
 * @throws {TypeError} - If array is not an array
 */
var arr = ["1", "2", "3", "4", "5"];
var res = []

function juntar(ele) {
    
    if (!(ele instanceof Array))
    throw new TypeError(ele + ' is not an array');

    for (var i = 0; i < ele.length + 1; i++) {
		var res1 = i
        res = res +  res1
    }
	res1 = ''

}

juntar(arr) 
	console.log(res)