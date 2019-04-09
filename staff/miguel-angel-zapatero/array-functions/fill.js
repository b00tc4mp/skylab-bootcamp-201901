

function fill(arr, value, s, e) {
    var start;
    var end;

    if(s) {
        start = s;
    } else {
        start = 0;
    }

    if(e) {
        end = e;
        if (end > arr.length) {
            end = arr.length;
        }
    } else {
        end = arr.length;
    }

    for(var i = start; i < end; i++) {
        arr[i] = value;
    }

    return arr;
}