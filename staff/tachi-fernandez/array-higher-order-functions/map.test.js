suite('Map');

test('function of adding 10 to each parameter of an array', function(){

    var a = [1, 2, 3]
    var res = map(a, function (v) { return v + 10; });

    assert(a.toString()===[1,2,3].toString(), 'Unexpected origin array result')
    assert(res.toString()===[11,12,13].toString(), 'Unexpected result')

});

test('arr is not an Array', function(){
    var error;

    try {
        map({}, function(){});
    } catch (err) {
        error = err;
    }

    assert (error,'should have thrown an error');
    assert (error instanceof TypeError,'should have thrown TypeError');
});

test('callback is not a Function', function(){
    var error;

    try {
        map([], []);
    } catch (err) {
        error = err;
    }

    assert (error,'should have thrown an error');
    assert (error instanceof TypeError,'should have thrown TypeError');
});