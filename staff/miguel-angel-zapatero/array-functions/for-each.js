function forEach(arr, callback) { 
    for(var i = 0; i < arr.length; i++) {
        console.log(callback(arr[i]), i);
    }
}