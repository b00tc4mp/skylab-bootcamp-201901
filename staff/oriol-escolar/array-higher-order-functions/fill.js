



function fill(arr, value, start, end) {

end = end === Number? end : arr.length;

    for (var i = start; i < end; i++) {

        arr[i] = value;
    }
    return arr;
}


var array = [1,2,3,4,5];
var res = fill(array,2,0,1);

console.log(res);

