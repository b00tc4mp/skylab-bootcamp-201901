suite('pop');

test('passing argument', function() {
    
    var a = [1, 2, 3, 4];

    var found = pop(a);
    var expected = 4;

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});

test('passing empty array', function() {
    
    var a = [];

    var found = pop(a);
    var expected = undefined;

    if (found !== expected) throw Error('found value ' + found + ' does not match expected ' + expected);
});


