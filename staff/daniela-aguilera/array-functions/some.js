function callback(element, index){
    if(element.length > 6){
      return true 
    } else {
      return false
    }
  }
  
  
  function some(array, callback){
      for (var i = 0; i < array.length; i++){
        if (callback(array[i], i) === true){
            return true
        }  
     }  
    return false
  }
