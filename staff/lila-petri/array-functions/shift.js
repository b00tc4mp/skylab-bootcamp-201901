/**
 * Retunr the first element of the array and move the rest of the elements on the array to the correct position
 * @param {*} arr 
 */



function shift(array){
  var el=array[0];
  for(i=1;i<array.length;i++){
      array[i-1]=array[i];
  }
  array.length=array.length-1;
  return el;
    
}

console.log('DEMO', 'shift');

array=[1,2,3,4,5,6]
console.log(shift(array));
console.log(array);


