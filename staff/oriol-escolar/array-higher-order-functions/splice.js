function splice(parameters) {

    var array = arguments[0];
    var start = arguments[1];
    var deleteCount = arguments[2];
    var deleteDestiny = start + deleteCount;
    var eliminated = [];
    var elementsToAdd = arguments.length -3;

    start = start !== undefined ? (start >= 0 ? (start > array.length ? array.length : start) : array.length + start) : 0;
    deleteDestiny = deleteCount !== undefined ? (deleteCount >= array.length ? array.length : deleteDestiny) : array.length



    for (i = start; i < deleteDestiny; i++) {

        eliminated[eliminated.length] = array[i]

    }



    if (arguments.length > 3) {

        for(i=0;i<elementsToAdd;i++){

            array[array.length] = null;

        }

        
        
        for(i=array.length-1; i>0;i--){


            array[i] = array[i-elementsToAdd]

        }
       


        for(i=0;i<elementsToAdd;i++)
        
        {
            array[i] = arguments[i+3];

        }

        
    }
    return eliminated;

}


var arr = [1, 2, 3, 4, 5];

splice(arr, 1, 4, 'pepino', 'patata');