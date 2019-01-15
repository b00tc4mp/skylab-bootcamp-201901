suite('join');

test('Correct full arguments', function () {
    var arr = ["Hello", "World"];

    var res = join(arr, '');

    var expected = "HelloWorld";

    if (res.toString() !== expected.toString()) throw Error ('Unable to join');

});

test('Validated with 1 argument', function () {
    var arr = ["Hello", "World"];

    var res = join(arr);

    var expected = "Hello,World";

    if (res.toString() !== expected.toString()) throw Error ('Unable to join');

});

test('Validated with number instead of string', function () {
    var arr = ["Hello", "World", 4];

    var res = join(arr);

    var expected = "Hello,World,4";

    if (res.toString() !== expected.toString()) throw Error ('Unable to join');

});

test('Validated with boolean instead of string', function () {
    var arr = ["Hello", "World", true];

    var res = join(arr);

    var expected = "Hello,World,true";

    if (res.toString() !== expected.toString()) throw Error ('Unable to join');

});

test('fail on too many arguments', function () {
    var error;

    var arr = ["Hello", "World", 4];

     try{
        join(arr, '', 4);
     } catch (err) {
         error = err;
     }

    if (!error) throw Error ('Should have thrown an error');

});

