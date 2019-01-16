function unshift(arr, elem) {

    var array = [];

    var res = Object.assign([], arr);

    if (arguments.length > 2) {
        array[0] = elem;
        for (var i = 1; i < arguments.length-1; i++) {
            if (i == arr.length-1) {
                array[i] = elem;
            }
        }
    }

    /*With 1 elem argument*/
    for (i = 0; i < arguments.length-1; i++) {
        for (j = 0; j < res.length; j++) {
            arr[j+1] = res[j];
        }
        arr[i] = elem;
    }
    return arr;
}

var a = [1,2,3,4,5];

unshift(a,0,1,3,6,8,3);