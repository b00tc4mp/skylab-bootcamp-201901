function callback(element, index){
    if(element.length > 6){
      return true 
    } else {
      return false
    }
  }
  
  
  function filter(array, callback){
   var n = 0
   var newArray = [];  
      for (var i = 0; i < array.length; i++){
        if (callback(array[i], i) === true){
           newArray[n] = array[i]
           n++
        }  
     }  
    return newArray
  }