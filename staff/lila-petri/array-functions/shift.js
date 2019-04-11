/**
 * Retunr the first element of the array and move the rest of the elements on the array to the correct position
 * @param {Array} array 
 * 
 * @returns {Element} first element of the array
 */


function shift(array){
  if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
  if(array.length>0){
  var el=array[0];
  for(i=1;i<array.length;i++){
      array[i-1]=array[i];
  }
  array.length=array.length-1;
  return el;
}
    
}



