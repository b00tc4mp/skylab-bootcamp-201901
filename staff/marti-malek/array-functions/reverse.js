function reverse(arr) {
    var res = [];
    var j = 0;
    for (var i = arr.length; i > 1; i--) {
        res[j] = arr[i];
        j++;
    }
    console.log(res);
}

var a = [1,2,3];

reverse(a);
console.log(a);