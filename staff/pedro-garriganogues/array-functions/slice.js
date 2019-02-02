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
var res = [] 

function slicer(array, start, end) {
    for (var i = 0; i < array.length; i++) {
        if (i < start || i > end) {
			var res1 = [] 
			res1 = arr[i]
			console.log(res1)
			res.push(res1)
			res1=''
			
     } else { 
			console.log('nada')
    }
}
}

slicer(arr, 2, 3)
console.log(res)