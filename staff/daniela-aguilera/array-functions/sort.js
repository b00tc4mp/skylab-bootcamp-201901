'use strict';

/**
 * The sort() method sorts the elements of an array in place and returns the array
 * 
 */


var numbers = [7, 2, 8, 3, 4, 1, 3, 2, 3, 12]



function sort (array, callback) {
    var sorted = [array[0]]
    callback = callback || function (a, b) { return String(a) >= String(b); }
    
    for (var i = 1; i < array.length; i++) {
      var indexToInsert = 0
      
      // console.log('number', numbers[i])
      for (var j = 0; j < sorted.length; j++) {
        if (callback(array[i], sorted[j])) {
          indexToInsert = j + 1
        } else {
          break
        }
        // console.log('sortedNum', sorted[j])
      }
      
      sorted.splice(indexToInsert, 0, array[i])
    }
  
  return sorted
}

console.log(sort(numbers))

console.log(sort(numbers, function (a, b) {
  return a >= b
}))