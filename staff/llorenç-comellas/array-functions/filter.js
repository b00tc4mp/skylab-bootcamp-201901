


function filter(array, callback) {
    var j = 0;
    var results = []
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i]) === true) {
            for (var k = 0; k < array[i].length; k++) {
                results[j] = args[i][k];
                j++;
            }

        }
    }

    console.log(results)

}
