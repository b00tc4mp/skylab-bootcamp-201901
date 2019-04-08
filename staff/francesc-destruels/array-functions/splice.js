

var splice = function(array, origin, erase, add){
    var i, j = erase, newArray = [];

    if (erase === 0){
           for (i = 0; i <= array.length; i++){
               if (i < origin){
                   newArray[i] = array[i];
               } else if (i = origin){
                   newArray[i] = add;
               } else {
                   newArray[i] = array[i-1];
               }
           }
       }else if (erase > 0 && erase < array.length){
            for (i = 0; i < (array.length + (erase -1)); i++){
                if (i < origin){
                    newArray[i] = array[i];
                } else if (i = origin){
                    newArray[i] = add;
                    i += (erase -1);
                } else {
                newArray[i-(erase -1)] = array[i];
                }
            }
    }
    array = newArray;
    return array;
}
