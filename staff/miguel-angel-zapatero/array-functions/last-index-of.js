function indexOf(arr, elem, i) {
    var index = i;
    if(!index) index = 0;
    for(var j = arr.length; j > index; j--) {
        if(elem === arr[j]) return j;
    }
    return -1;
}