/**
 * puts element into the array given at de index position deleting the deleteElement number of positions starting by the index position
 * 
 * @param {array} array 
 * @param {number} index 
 * @param {number} deleteElement 
 * @param {any} element 
 */
function splice(array, index, deleteElement, element){
    var newArr = [];
    for(var i = 0; i < array.length; i++){
        if (i == index){
            newArr[i] = element;
            while(i <= deleteElement){ 
                i++;
            }
        }else{
            newArr[i]=array[i]
        }
    }
    return newArr;
}