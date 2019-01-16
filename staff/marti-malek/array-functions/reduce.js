function reduce(arr, func) {
    var res;
    for (var i = 0; i < arr.length; i++) {
        res += func(arr);
    }
    return res;
}

var reducer = function (accumulator, currentValue) {
    return accumulator + currentValue;
} 

var a = [1,2,3,4];

console.log(reduce(a,reducer));