/**
 * The slice() method extracts a section of a string and returns it as a new string, without modifying the original string.
 * @param {Array} array the array you want to iterate for
 * @param {Number}first the start point
 * @param {Number} last the end point
 */
function slice(array, first, last){
   
    if (!(array instanceof Array)) throw TypeError('is not an array');
    if (typeof first !== 'number') throw new TypeError('is not a number');
    if (typeof last !== 'number') throw new TypeError('is not a number');
    
    var newarr = [];
    var index = 0;
     
    
    for ( var i = first; i <= last; i++){ 
       newarr[index] = array[i];  
       index++;
     }
     return newarr;
    }
    