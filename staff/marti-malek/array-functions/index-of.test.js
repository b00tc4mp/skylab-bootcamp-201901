suite('indexOf');

test('Correct full arguments', function () {
    var a = [1,2,3,4];
    
    var res = indexOf(a, 3, 1);
    
    var expected = 2;

    if (res.toString() !== expected.toString()) throw Error ('result should be the one expected')
});

test('Fail too many arguments', function () {
    var a = [1,2,3,4];

    try{
        indexOf(a,3,1,true)
    } catch (err) {
        error = err;
    }

    if (!Error) throw Error ('should have thrown error')
});

test('Fail on string instead of array', function () {
    var a = "string";

    try{
        indexOf(a,3,1,true)
    } catch (err) {
        error = err;
    }

    if (!Error) throw Error ('should have thrown error');
    if (!Error) throw TypeError ('should have thrown TypeError')
});

test('Fail on number instead of array', function () {
    var a = 4;

    try{
        indexOf(a,3,1,true)
    } catch (err) {
        error = err;
    }

    if (!Error) throw Error ('should have thrown error');
    if (!Error) throw TypeError ('should have thrown TypeError')
});

test('Fail on object instead of array', function () {
    var a = {};

    try{
        indexOf(a,3,1,true)
    } catch (err) {
        error = err;
    }

    if (!Error) throw Error ('should have thrown error');
    if (!Error) throw TypeError ('should have thrown TypeError')
});



