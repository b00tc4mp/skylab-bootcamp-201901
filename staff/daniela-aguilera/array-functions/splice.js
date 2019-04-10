

function splice(array, inicio, numToEliminate, agregar1, agregar2) {
    var newArray = [];
    var n = 0;
    for (var i = 0; i <= array.length - 1; i++) {

        if (i < inicio) {
            newArray[n] = array[i];
            n++;
        } else if (numToEliminate > 1) {
            numToEliminate--;     
        } else if (numToEliminate === 1){
           numToEliminate--;
          if (agregar1 !== 0 || agregar2 !== 0) {
            newArray[n] = agregar1;
            n++;
            agregar1 = 0;
            if (agregar2 !== 0) {
                newArray[n] = agregar2;
                n++;
                agregar2 = 0;
            } 
          }
        } else {
            newArray[n] = array[i];
            n++;
        }
    } 
    return newArray
}

