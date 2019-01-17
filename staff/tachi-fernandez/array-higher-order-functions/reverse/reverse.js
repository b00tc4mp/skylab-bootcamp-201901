function reverse(array) {
    if (arguments.length > 1) throw Error('too many arguments');

    if (!(array instanceof Array))
        throw new TypeError(array + ' is not an array');

    var newArray = []
    var lastNum = array[array.length-1]
    var lastNum2 = newArray[newArray.length-1]
    
    for (var i = 0; i<array.length; i++) {
       if(newArray === array) {newArray[0] = lastNum  newArray[lastNum2] = array[0] }
    //     newArray[i] = array[i-0]
    // } 
    // for (var i = 0 ; i<newArray.length; i++){
    //     newArray[lastNum2] = array[0]
    // }


    
       

        
        

return newArray
}

var array = [1,2,3,4,5]

console.log(Reverse(array))