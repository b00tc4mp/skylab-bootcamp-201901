/**
 * Abstracting of some
 * 
 * method tests whether at least one element in the array 
 * passes the test implemented by the provided function.
 * 
 * @param {array} array - the array to create the segment copy
 * @param {function} callback - Function to test for each element, 
 * taking three arguments: element, index y array
 * 
 * @returns {boolean} - true if the callback function returns 
 * a truthy value for any array element; otherwise, false.
 */

 function some(array, callback){
   //debugger;
   for (var i = 0; i < array.length; i++) {
     var result = callback(array[i]);
     if (result) return result;
   }
 }