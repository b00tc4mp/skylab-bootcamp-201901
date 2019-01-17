function join(array, separator) {
    if (!(array instanceof Array)) throw new typeError("array in not an array")

    separator =  separator === null ? 'null' : separator
    separator = separator === undefined ? "," : separator

    var res = ""
    for (var i = 0; i < array.length; i++) {
     
        res += (i !== array.length-1) ?  array[i] + separator : + array[i] + ''
       
    }
    return res 
}

var numbers = [1, 2, 3, 4, 5, 7]

join(numbers,null) 