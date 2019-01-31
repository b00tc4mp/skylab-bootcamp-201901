
var arr = [1, 2, 3, 4, 5];
var res = [] 
var x = 3

function splicer(array, start, howmany) {
    for (var i = 1; i < array.length; i++) {
        if (i < start && i > howmany) {
			var res1 = [] 
			res1 = arr[i]
			res.push(res1)
			res1=''
			
     } if (i <= array.length) { 
			var res2 = []
			console.log(arguments[x] + ' argument '+[x])
			res2 = arguments[i]
			x++
			res.push(res2)
			res2=''
    	}
	}
}

splicer(arr, 2, 3, 'banana', 'tomato', 'soup', 'batman', 'potato')
console.log(res)