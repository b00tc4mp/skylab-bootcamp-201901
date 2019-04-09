/**
 * Gives you an element product of your array and a given callback
 * 
 * @param {Array} array The array to operate
 * @param {Expresion} callback The expression to evalute with each element of the array
 * 
 * @return {element} a new element made with array and callback
 */
function reduce(array,callback,inicial){
    inicial = inicial || 0;
    var redu
    if(inicial===0){
        for (var i = 1; i < array.length; i++){
            if(i===1) {
                redu=callback(array[i-1],array[i])
            }
            else{
                redu=callback(redu,array[i])
            }
        }
    }else{
    }
    return redu;
}

