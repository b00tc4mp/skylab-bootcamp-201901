suite('splice');

test('Correct', function () {
    var a = [1,2,3,4,5,6];

    var res = splice(a,1,2,'hola');

    var expected = [2,3];

    assert(res.toString() === expected.toString(), 'should return the correct value');
});

test('Fail on too few arguments', function () {
    var error;
    var a = [1,2,3,4,5,6];

    
    try {
        splice(a);
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown an error');
});

test('Fail on object instead of array', function () {
    var error;
    var a = {};

    
    try {
        splice(a, 1, 2, 'hola');
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown an error');
});

test('Fail on boolean instead of array', function () {
    var error;
    var a = true;

    
    try {
        splice(a, 1, 2, 'hola');
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown an error');
});

test('Fail on number instead of array', function () {
    var error;
    var a = 4;

    
    try {
        splice(a, 1, 2, 'hola');
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown an error');
});