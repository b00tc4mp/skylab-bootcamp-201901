function unshift (array, elem){
    if(!(array instanceof Array)) throw new TypeError('Not an array modafoca!')
    if(arguments.length < 2) throw new Error('Few arguments')
    if(arguments.length >= 2){
        var arrayreturn = []
        var j = 0;
        for(var i = 1; i < arguments.length; i++){
            arrayreturn[j] = arguments[i]
            j++            
        }
        for (var i = 0; i < array.length; i ++){
            arrayreturn[j] = array[i]
            j++
        }
        for(var i = 0; i < arrayreturn.length; i++){
            array[i] = arrayreturn[i]
        }
        return array.length
    }



}