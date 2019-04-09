function join(arr, separator) {
    var result = '';
    for(var i = 0; i < arr.length; i++) {
        result += arr[i];
        if(separator && arr.length > 1 && i < arr.length-1) {
            result += separator;
        } else if(!separator && i < arr.length-1) {
            result += ',';
        }
    }
    return result;
}