function splice(parameters) {

    var start = arguments[1];
    var deletecount = arguments[2];
    var deleteDestiny = arguments[1] + arguments[2];
    var newArray;
    var deleted = [];
    newArray.length = arguments.length - deletecount;

    for (i = 0; i < deleteDestiny; i++) 
    {

        newArray[i]= arguments[0][i+start]

    }

    return newArray;


}


