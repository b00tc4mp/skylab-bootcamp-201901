function filter (array, func){
    if(arguments.length !== 2) throw new Error('Argumen number incorrect')
    var arrayreturn= []
    for(var i = 0; i < array.length; i++){
        if (func(array[i])) arrayreturn.push(array[i])
    }
    return arrayreturn
}

