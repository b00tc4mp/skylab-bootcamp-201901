function splice(arr, start) {
    var res = Object.assign([], arr);
    var arr2 = [];
    j = 0;
    for (var i = start; i < arr.length; i++) {
        if (j === arr2.length) {
            arr2[j] =  arr[i];
            j++;
        }
    }
    res.length = start;
    return arr2;

};

var a = [1,2,3,4];

splice(a, 2);

console.log(a);

