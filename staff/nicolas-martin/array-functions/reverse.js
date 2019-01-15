/**
 * Abstracting of reverse
 * 
 * @param {Array} arr - the array to reverse it
 * 
 * @returns {Array} - the array reversed
 */

 function reverse(arr){
     if (!(arr instanceof Array)) throw TypeError(arr + ' is not an Array');

     var res = [];
     for (var i = arr.length; i > 0; i--) res[arr.length - i] = arr[i-1];

     arr = res;
     return arr;
 }

//  var arr = [1, 2, 3, 4];
//  reverse(arr);
