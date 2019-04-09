/**
 * puts element into the array given at de index position deleting the deleteElement number of positions starting by the index position
 * 
 * @param {array} array 
 * @param {number} index 
 * @param {number} deleteElement 
 * @param {any} element 
 */
function splice(array, index, deleteElement, element){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof index !=='number') throw new TypeError(index + 'is not a number');
    if (typeof deleteElement !=='number') throw new TypeError(deleteElement + 'is not a number');

    x = (index == undefined) ? 0 : index;

    var newArr = [];
    for(var i = 0; i < array.length; i++){
        if (i == x){
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