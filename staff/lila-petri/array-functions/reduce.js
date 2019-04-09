/**
 * The reduce method applies a function to accumulate every value of the array
 * @param {Array} array The array with values to accumulate
 * @param {Function} callback The function which makes the accumulation
 * @returns {Element} Retunrs the accumulated value
 */
function reduce(array, callback){
  var accumulated=array[0]
 
  for (var i = 1; i < array.length; i++){
    accumulated=(callback(accumulated, array[i]))
  }
return accumulated;
}
