function join(array1, array2) {
    var newArray = [];
    //var array1 = [];
    //var array2 = [];
    for (var i = 0; i < array1.length; i++) {
        newArray += array1[i];
    }
    for (var j = 0; j < array2.length; j++) {
        newArray += array2[j];
    }
    console.log(newArray);
}
join((1, 2, 3), (4, 5, 6));