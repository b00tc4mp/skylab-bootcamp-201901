suite('indexOf')

test('finds element that exists', function(){

    var a =['hola', 'que', 'tal', 'com', 'va'];

    var res = indexOf(a, 'tal', 2);

    var expected = 2;

    if (res !== expected) throw Error ('the result should be the expected');
});

test('does not find element that exists', function(){

    var a =['hola', 'que', 'tal', 'com', 'va'];

    var res = indexOf(a, 'zoro', 2);

    var expected = -1;

    if (res !== expected) throw Error ('the result should be the expected');
});

test('Initial position not specified', function(){

    var a =['hola', 'que', 'tal', 'com', 'va'];

    var res = indexOf(a, 'tal');

    var expected = 2;

    if (res !== expected) throw Error ('the result should be the expected');
});

test("Initial position equal or higher than array's length", function(){

    var a =['hola', 'que', 'tal', 'com', 'va'];

    var res = indexOf(a, 'tal', 8);

    var expected = -1;

    if (res !== expected) throw Error ('the result should be the expected');
});

test('Initial position is negative', function(){

    var a =['hola', 'que', 'tal', 'com', 'va'];

    var res = indexOf(a, 'tal', -3);

    var expected = 2;

    if (res !== expected) throw Error ('the result should be the expected');
});



test("more than 3 elements", function(){

    var a =['hola', 'que', 'tal', 'com', 'va'];

    var res = indexOf(a, 'tal', -3, 4, 5, 6);

    var expected = 2;

    if (res !== expected) throw Error ('the result should be the expected');
});

test('should fail if the first param is not an array', function(){

    var error;

    try {
        indexOf(6, "house", 2)
    } catch (err) {
        error = err
    }

    if (!error) throw Error ('should have thrown an error if it is not an array')
    if (!(error instanceof TypeError)) throw Error ('should be a TypeError error')
})