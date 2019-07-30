'use strict'

/**This function iterates trough an array and checks if there is any coincidence with the argument and condition passed by
 * 
 * @param {array} array The array you want to iterate for
 * @param {Function} callback The callback funtion to apply the statments
 * @param {} item The item you want to use to
 */



function some(array,callback,item){

     var acc=item

    for(var i=0;i<array.length;i++){
         var value=callback(acc,array[i])
    }
    return value;
}

