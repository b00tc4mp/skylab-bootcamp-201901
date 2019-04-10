
var numbers = [1,2,3,4,5,6];



function shift(array){

var acc = [];
var temp = array[0];
 
 
 for ( var i = 1; i <= array.length - 1 ; i++){
   

   
   
   acc[i-1] = array[i];

   
   
 }
 
 numbers = acc;
 return temp;
 
}

console.log(shift(numbers));
console.log(numbers);