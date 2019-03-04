suite('for Each')

test('sum all the elements', function(){
    var sum = 0;
    var a=[1,2,3]

    forEach(a, function (v) { sum += v; });

    assert(sum===6, 'Unexpected value')
    assert(a.toString()===[1,2,3].toString(), 'Uarr should not be modified')

});

test('sum all the elements', function(){
    var sum = 0;
    var a=['hola','mundo']

    r=forEach(a, function (v) { return v});

    assert(r===undefined, 'Unexpected value')
    assert(a.toString()===['hola','mundo'].toString(), 'Uarr should not be modified')

});

test('arr is not an Array', function(){
    var error;

    try {
        forEach({}, function(){});
    } catch (err) {
        error = err;
    }

    assert (error,'should have thrown an error');
    assert (error instanceof TypeError,'should have thrown TypeError');
});

test('callback is not a Function', function(){
    var error;

    try {
        forEach([], []);
    } catch (err) {
        error = err;
    }

    assert (error,'should have thrown an error');
    assert (error instanceof TypeError,'should have thrown TypeError');
});