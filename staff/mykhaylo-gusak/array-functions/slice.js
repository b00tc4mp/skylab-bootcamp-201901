
var numbers = [1,2,3,4,5,6];



function slice(array,inicio,final){

var newArray = [];
 var n = 0;

 
 
 for ( var i = inicio; i <= final ; i++){
      
   newArray[n] = array[i];
   
   n++;
   
   
 }
 
 return newArray;
 
}

console.log(slice(numbers,2,4));
// console.log(numbers);