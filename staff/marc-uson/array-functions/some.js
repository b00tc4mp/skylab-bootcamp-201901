

function some(array, value, callback){
    for(var i = 0; i< array.length; i++) if (callback(array[i],value)) return true;

    return false;
    
}