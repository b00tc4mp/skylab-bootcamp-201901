
function slice(array, valorinicial, valorfinal){
var acc = [];
var index = 0;

 for ( var i = valorinicial; i <= valorfinal; i++){ 
   acc[index] = array[i];  
   index++;
 }
 
 return acc;
 
}


