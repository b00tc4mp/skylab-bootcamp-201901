// var numbers = [1, 2, 3, 4, 5, 6];
// console.log(splice(numbers,1, 2, 'b', "a")); 


var numbers = [1, 2, 3, 4, 5, 6];


function splice(array, inicio, eliminar, agregar1, agregar2) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (!(typeof inicio === 'number')) throw TypeError(inicio + ' is not a number');

    var newArray = [];
    var n = 0;
    var elim = eliminar;

    for (var i = 0; i < array.length; i++) {
        if (i < inicio) {
            newArray[n] = array[i];
            n++;
        } else if (elim > 1) {
            elim -= 1;
        } else if (elim > 1) {
         
            if (elim > 1) {
                elim -= 1;
            } 
            for (var j = 0; j < 2; j++) {
                if (agregar1 !== 0) {
                    newArray[n] = agregar1;
                    n++;
                    agregar1 = 0;
                } else if (agregar2 !== 0) {
                    newArray[n] = agregar2;
                    n++;
                    agregar2 = 0;
                }
            }
        } else if (array.length > newArray.length && eliminar > 0) {
            console.log("h")
            newArray[n] = array[i];
            n++;
        } else if (eliminar === 0) {
              console.log("e")
            for (var e = 0; e < 2; e++) {
                if (agregar1 !== 0) {
                    newArray[n] = agregar1;
                    n++;
                    agregar1 = 0;
                } else if (agregar2 !== 0) {
                    newArray[n] = agregar2;
                    n++;
                    agregar2 = 0;      
                  console.log([i])
                }
            }
        } else if (array.length > newArray.length) {
            console.log("p")
            newArray[n] = array[i];
            n++;
        }
    }
    return newArray;
}

console.log(splice(numbers, 1, 0, 'b', "a")); 