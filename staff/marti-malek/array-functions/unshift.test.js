suite('unshift');

test('Correct few arguments', function () {
    var a = [1,2,3,4];
    
    var res = unshift(a,0);

    var expected = 5;

    assert(res.toString() === expected.toString(), 'should return correct value');
});

test('Correct several arguments', function () {
    var a = [1,2,3,4];
    
    var res = unshift(a,0,1,2,3,4);

    var expected = 9;

    assert(res.toString() === expected.toString(), 'should return correct value');
});

test('Fail on object instead of array', function () {
    var error;
    var a = {};
    
    try {
        unshift(a,0,1,2,3,4);
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown an error');
});

test('Fail on boolean instead of array', function () {
    var error;
    var a = true;
    
    try {
        unshift(a,0,1,2,3,4);
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown an error');
});

test('Fail on number instead of array', function () {
    var error;
    var a = 4;
    
    try {
        unshift(a,0,1,2,3,4);
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown an error');
});

