function reduce(arr, callback, value) {
    var acc = value || arr[0];
    var index = 0;
    
    if(!value) index = 1;

    for(var i = index; i < arr.length; i++) {
        acc = callback(acc, arr[i])  
    }
    return acc;
}