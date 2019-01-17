function reverse(array) {

    var newArr =0;

    for (var i = 0; i < array.length/2; i++) {
        newArr = array[array.length-i-1]
        array[array.length-i-1] = array[i]
        array[i]=newArr
    }
}
var array = [1, 2, 3, 4, 5]

reverse(array)