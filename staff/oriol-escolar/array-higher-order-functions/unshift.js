function unshift(array,values){

    if(!(array instanceof Array)) throw TypeError (array + ' is not an array')
    
    var offset = values.length;
    var newArray=[0];

    
    
    for(i=0; i<values.length; i++){
    
        
        newArray[i] = values[i];
        
    
    }
    
    
    
    
    for(i=0;i<newArray.length;i++){
    
    array[i]=newArray[i];
    
    }
    
    
    return firstValue;
    
    }
    
  
    
    
    