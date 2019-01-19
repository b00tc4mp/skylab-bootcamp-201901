/**
 * Abstracting of slice
 * 
 * copy an array into a new array from begin to end 
 * selected from begin to end (end not included). 
 * The original array will not be modified.
 * 
 * @param {Array} array - the array to create the segment copy
 * @param {number} begin - Zero-based index to start or undefined to start in 0
 * @param {number} end - Zero-based index to end the copy segment. Not included
 * 
 * @returns {Array} - new Array with the elements from array
 */

 function slice(array, begin, end){
   var res = [], cont = 0;

   if (arguments.length > 3) throw Error('too many arguments');

   if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
   begin = (begin === undefined) ? 0 : begin < 0 ? array.length + begin : begin;
   end = (end === undefined) ? array.length : end < 0 ? array.length + end : end;

   for (var i = begin; i < end; i++) {
      res[cont] = array[i];
      cont++;
   }
   return res;
 }