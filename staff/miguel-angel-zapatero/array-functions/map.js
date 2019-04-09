function forEach(arr, callback) { 
    var newArr = []
    for(var i = 0; i < arr.length; i++) {
        newArr[i] = callback(arr[i]);
    }
    return newArr;
}