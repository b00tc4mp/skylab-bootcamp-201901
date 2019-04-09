/**This function returns the index position in the array of an argument passed by
 * 
 * @param {*} array the array you want to check item for
 * @param {*} item the item you want to know their index position
 */


function indexOf(array,item){
    for(let i=0;i<array.length;i++){
        
        if(array[i] == item){
            return i;
        }
    }
}

