suite('TEST find');


// use case 1

test('CASE word coincidence', function () {

    var arr = [1, 2, 3, 4, 5];
    var expected = 4;
    var res = finder(arr, function (element) {
        return element > 3;
    });

    if (res !== expected) {
        throw Error('parameter and result should be the same')
    };

});

// use case 2   

test('CASE object inside', function () {
    var arr = {};
    var error;

    try {
        finder(arr, function (element) {
            return element;
        });     
    } catch (err) {
        error = err;
    }
    if (!error) throw Error('Se esperaba un error');
    if(error.message !== arr + ' is not an array') throw Error ('No es el mensaje esperado)');
});

// use case 3   














