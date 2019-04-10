
'use strict'


function reverse(array){
    var inverseArray = []
    var j=0;
    for(var i=array.length-1;i>=0;i--){
        inverseArray[j] = array[i];
        j++
    }
    for(var i=array.length-1;i>=0;i--){
        array[i]= inverseArray[i];
    }
    
    
    return array 
}
