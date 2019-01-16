

function indexof(array, value) {



    var indexes = [];
    for (var i = 0; i < array.length; i++) {



        if (value === array[i]) indexes[indexes.length] = i;



    }

    if (indexes.length == 1) { indexes = indexes[0] }
    if (indexes.length == 0) {

        if (value!==undefined) {
            indexes = -1;
        }else{
            indexes = undefined;
        }

    }

    return indexes;


}