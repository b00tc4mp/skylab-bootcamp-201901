function splice(array, start, end) {

    var items = [];
    var begining = [];
    var ending = [];
    var deleted = [];
    var newArray = [];

    for (i = 0; i < arguments.length - 3; i++) {

        items[items.length] = arguments[i + 3];



    }


    for (i = 0; i < array.length; i++) {
        if (i < start) {

            begining[begining.length] = array[i];

        } else if (i > start+end) {

            ending[
                ending.length] = array[i];

        } else if (i > start && i < end+start) {



            deleted[deleted.length] = array[i];


        }



    }

    

    newArray.length = begining.length + ending.length + items.length;

    for (i = 0; i < newArray.length; i++) {

        if (i < begining.length) {
            newArray[i] = begining[i];
        } else if (i < begining.length + items.length) {


            newArray[i] = items[i- (begining.length-1 + items.length-1)];

        } else if(i < begining.length + items.length){


            newArray[i] = ending[i - begining.length-1 + items.length-1 + ending.length-1];


        }


    }

  
    array=newArray;


    return deleted;
}


