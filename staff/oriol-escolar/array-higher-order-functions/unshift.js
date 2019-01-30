function unshift(parameters) {
   
   
    if(!(arguments[0] instanceof Array)) throw TypeError('parameter should be an array');
    
    var valuesAdd = arguments.length -1;
    var newLength = arguments[0].length + valuesAdd;
    arguments[0].length = newLength;

    for(var i = newLength - 1; i >  valuesAdd -1; i--) {
        arguments[0][i] = arguments[0][i-valuesAdd];
    }

    for(var i = 0; i < valuesAdd; i++) {
        arguments[0][i] = arguments[i+1];
    }
    return arguments[0].length;
}



var array = [1,2]

unshift(array,1)
