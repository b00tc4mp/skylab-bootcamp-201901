function shift(array){

    if(!(array instanceof Array)) throw TypeError (array + ' is not an array')
    
    var firstValue = array[0];
    var newArray=[0];
    
    
    for(i=0; i<array.length-1; i++){
    
        
        newArray[i] = array[i+1];
        
    
    }
    
    array.length -=1;
    
    
    for(i=0;i<newArray.length;i++){
    
    array[i]=newArray[i];
    
    }
    
    
    return firstValue;
    
    }
    
  
    
    
    