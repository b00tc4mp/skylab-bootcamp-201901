
var numbers = [1, 2, 3, 4, 5, 6];



function splice(array, inicio, eliminar, agregar1, agregar2) {

    var newArray = [];
    var n = 0;
    var elim = eliminar;

    for (var i = 0; i < array.length; i++) {


        if (i < inicio) {

            newArray[n] = array[i];
            n++;

        } else if (elim > 1) {

            elim -= 1;

        } else if (elim > 1 || agregar1 != 0 || agregar2 != 0) {


            if (elim > 1) {

                elim -= 1;
            }

            for (var j = 0; j < 2; j++) {

                if (agregar1 != 0) {

                    newArray[n] = agregar1;
                    n++;
                    agregar1 = 0;

                } else if (agregar2 != 0) {

                    newArray[n] = agregar2;
                    n++;

                    agregar2 = 0;
                }
            }


        } else if (array.length > inicio + eliminar) {

            newArray[n] = array[i];
            n++;

        }





    }

    console.log(newArray);
}

splice(numbers, 2, 1, 'a', 'b');
// console.log(numbers);