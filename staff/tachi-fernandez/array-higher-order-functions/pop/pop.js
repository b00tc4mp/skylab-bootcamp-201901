function pop(array) {
    var lastNum = array[array.length - 1]
    //console.log(lastNum)
    var temporal = []
    for (var i = 0; i < array.length - 1; i++) {
        temporal[i] = array[i]
    }
    array = []
    for (var i = 0; i < temporal.length; i++) {
        array[i] = temporal[i]
    }
    return lastNum

}


