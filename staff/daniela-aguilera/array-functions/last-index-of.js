'use stric'

/**
 * Method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
 * 
 * @param {*} array 
 * @param {*} searchElement 
 * @returns the index of the element that you are looking for
 * 
 */

 
function lastindexOf(array, searchElement) {
  
  if (!(array instanceof Array)) throw TypeError(array + ' is not an Array.');
  if (!(typeof searchElement === 'number')) throw TypeError(searchElement + ' is not a number.'); 
     
    for (var i = array.length+1; i > 0; i--){     
      
      
      if ( array[i] === searchElement ){    
        
        return i;
        
      }  
    }
  
  return -1;
}