suite('TEST push');

test('2 arguments, all correct', function () {
    var arr = [1,2,3]

    var res = push(arr, 4);

    var expected = 4;

    if(arr.length !== expected) throw Error ("Expected result '" + expected + "' not matched");
});

test('4 arguments, mixed types, all correct', function() {
    var arr = [1,2,3]

    var res = push(arr, 4, "kaboom", {});

    var expected = 6;

    if(arr.length !== expected) throw Error ("Expected result '" + expected + "' not matched");
});


test("first parameter not array", function () {
    var error;

    try {
        push(1, 2);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error ('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
    if(error.message !== "'1' is not an array") throw Error ('Is not the expected message');
});

test("1 parameter !array", function() {
    var error;

    try {
        push(null);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error ('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
    if(error.message !== "the value '" + null + "' is not array") throw Error ('Is not the expected message');
});