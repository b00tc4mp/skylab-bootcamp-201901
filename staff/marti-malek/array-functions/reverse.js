var a = [1,2,3];

function reverse(arr) {
    var res = [];
    for (var i = arr.length; i > 0; i--) {
        res[arr.length-i] = arr[i-1];    
    }
    arr = Object.assign(res);
    return arr;
}


var rev = reverse(a);
console.log(rev);
console.log(a);