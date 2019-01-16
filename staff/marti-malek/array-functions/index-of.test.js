suite('indexOf');

test('Correct full arguments', function () {
    var a = [1,2,3,4];
    
    var res = indexOf(a, 3, 1);
    
    var expected = 2;

    assert(res.toString() === expected.toString(), 'result should be the one expected')
});

test('Fail too many arguments', function () {
    var a = [1,2,3,4];

    try{
        indexOf(a,3,1)
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown error')
});

test('Fail on string instead of array', function () {
    var error;
    var a = "string";

    try{
        indexOf(a,3,1)
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown error');
    assert(error instanceof TypeError, 'should have thrown TypeError')
});

test('Fail on number instead of array', function () {
    var error;
    var a = 4;

    try{
        indexOf(a,3,1)
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown error');
    assert(error instanceof TypeError, 'should have thrown TypeError')
});

test('Fail on object instead of array', function () {
    var error;
    var a = {};

    try{
        indexOf(a,3,1)
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown error');
    assert(error instanceof TypeError, 'should have thrown TypeError')
});



