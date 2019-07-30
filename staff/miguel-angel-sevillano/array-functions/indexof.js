'use strict'

/**This function returns the index position in the array of an argument passed by
 * 
 * @param {*} array the array you want to check item for
 * @param {*} item the item you want to know their index position
 */


function index_Of(array,item){

    if(!(array instanceof Array)) throw TypeError(array +' is not an array');
    if(typeof item !== 'number') throw new TypeError (item +' its not a number');

    for(let i=0;i<array.length;i++){
        
        if(array[i] == item){
            return i;
        }
    }
}

