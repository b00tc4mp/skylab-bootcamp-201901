

/* function find(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == value) {
            console.log(arr[i]);
            return;
        }
    }
    console.log(undefined);

}

var a = [1,5,94,32];

find(a, 5); */

function find(arr, func) {
    for (var i = 0; i < arr.length; i++) {
        if (func(arr[i])) {
            return arr[i];
        }
    }
}

var a = [1,5,94,32];

var results = find(a, function (elem) {elem > 3});

console.log(results);

function find(elem, func) { 
    if (func(elem)) {
        return elem;
    }
};

var a = 2;

var res = find(a, function (v) {v < 3});
console.log(res);