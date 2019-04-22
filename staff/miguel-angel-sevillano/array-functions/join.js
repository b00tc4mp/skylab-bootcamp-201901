'use strict'
/**This function join each element of an array passed by applaying arguments 
 * 
 * @param {*} array the array you want to pass by
 * @param {*} item  without item it returns all the array with items separated by "," , with item it add the item between
 */

function join(array, item){

    if(!(array instanceof Array)) throw TypeError('is not an array');
    
    var temp="";

    if(item === undefined){
        for(let i=0;i<array.length;i++){
            temp += array[i]
            if(i<array.length-1){
                temp+=","
            }
            
        }
    }
    else if (item === ' '){
        for(let i=0;i<array.length;i++){
            temp += array[i]
            
        }
    }
    else{
        for(let i=0;i<array.length;i++){
            temp += array[i]
            if(i<array.length-1){
                temp +=item
            }
            
        }
    }
    return temp
}
