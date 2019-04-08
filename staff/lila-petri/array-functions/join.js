/**
 * Join all the elements of the array
 * @param {Array} array 
 * @param {Element} bookmark 
 */
function join(array, bookmark){
    var value=""
    for (var i = 0; i < array.length; i++){
       value+=array[i]+bookmark
    }
  return value
}

