



function reverse(array){
    var inverseArray = []
    var j=0;
    for(i=array.length-1;i>=0;i--){
        inverseArray[j] = array[i];
        j++
    }
    for(i=array.length-1;i>=0;i--){
        array[i]= inverseArray[i];
    }
    
    
    return array 
}
