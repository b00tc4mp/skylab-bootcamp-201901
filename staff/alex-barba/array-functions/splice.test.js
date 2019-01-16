suite('splice');

test('passing all arguments', function(){
    var array = [1,2,2,4,5];

    var found = splice(array, 2, 3, 3, 3, 3);

    var expected = [2,4,5];

    if (found.toString() !== expected.toString()) throw Error('found value ' + found + ' does not match expected ' + expected);
});