suite('push');

test('Correct full arguments', function () {
    var a = ["Hola", "mundo", "ciao"];

    var res = push(a, "mondo");

    var expected = 4;

    if(res.toString() !== expected.toString()) throw Error ('should return the correct value');

});


test('Fail too many arguments', function () {
    var a = ["Hola", "mundo", "ciao"];

    try{
        push(a, "mondo");
    } catch (err) {
        error = err;
    }

    if(!Error) throw Error ('should return error');

});

test('Fail on object instead of array', function () {
    var a = {};

    try{
        push(a, "mondo");
    } catch (err) {
        error = err;
    }

    if(!Error) throw Error ('should return error');

});

test('Fail on number instead of array', function () {
    var a = 4;

    try{
        push(a, "mondo");
    } catch (err) {
        error = err;
    }

    if(!Error) throw Error ('should return error');

});

test('Fail on boolean instead of array', function () {
    var a = true;

    try{
        push(a, "mondo");
    } catch (err) {
        error = err;
    }

    if(!Error) throw Error ('should return error');

});

