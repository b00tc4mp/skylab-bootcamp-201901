suite('slice');

test('correct functionality', function(){
    var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

    var res = slice(animals, 2);
    var expected = ["camel", "duck", "elephant"];

    assert(res.toString() === expected.toString(), 'the result should equal the expected');
});

test('all arguments', function(){
    var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

    var res = slice(animals, 2, 4);

    var expected = ["camel", "duck"];
    assert(res.toString() === expected.toString(), 'the result should equal the expected');
});

test('passing string instead of a number', function(){
    var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

    var res = slice(animals, 'lion');

    var expected = ['ant', 'bison', 'camel', 'duck', 'elephant'];
    assert(res.toString() === expected.toString(), 'the result should equal the expected');
});

test('passing two string instead of a number', function(){
    var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

    var res = slice(animals, 'lion', 'bison');

    var expected = [];
    assert(res.toString() === expected.toString(), 'the result should equal the expected');
});

test('Not passing an array' , function(){
    var error;
    try {
        slice({},1,2);
    } catch (err) {
        error = err;
    }

    assert(error, 'Should be an error');
    assert(error instanceof TypeError, 'Error should be an Error type');
});