function reverse(arr) {
    var res = [];
    for (var i = arr.length; i > 0; i--) {
        res[arr.length-i] = arr[i-1];    
    }
    arr = Object.assign(res);
    return arr;
}

var a = [1,2,3];

var rev = reverse(a);
console.log(rev);
console.log(a);

/*v2 */
function reverse(arr) {
    var res = Object.assign([], arr);;
    for (var i = arr.length; i > 0; i--) {
        arr[i] = res[arr.length-1-i];    
    }
    return arr;
}

var a = [1,2,3];

var rev = reverse(a);
console.log(rev);
console.log(a);