suite('reverse')

test('Use Case 1', function () {


    var array = ['piedras', 'patatas', 'manzanas'];



    var expected = ['manzanas', 'patatas', 'piedras'];

    reverse(array);


    if (!(array.toString() === expected.toString())) throw Error(array + ' is not the same as ' + expected)


});

/*
test('Use Case 2', function () {
    var error;

    var array = ['piedras', 'patatas', 'manzanas'];

    var expected = ['manzanas', 'patatas', 'piedras'];
    reverse(1);


    if(!error) throw Error ('it  should not work')

});
*/