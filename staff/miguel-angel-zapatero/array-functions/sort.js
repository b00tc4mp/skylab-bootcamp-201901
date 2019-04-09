function sort(arr) {
    debugger
    for(var i = 0; i < arr.length; i++) {
        var a = arr[i];
        var b = arr[i+1];
        if(arr[i] > arr[i+1]) {
            arr[i] = b;
            arr[i+1] = a;
            i = -1;
        }
    }
    return arr
}