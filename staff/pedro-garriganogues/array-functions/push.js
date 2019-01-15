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

function empujar(ele) {
    if (!(ele instanceof Array))
        throw new TypeError(ele + ' is not an array');

    for (var i = 0; i < ele.length+1; i++) {
        var res1 = []
        res1 = i
        res.push(res1)


    }
    res1 = ''

}

empujar(arr)
console.log(res)