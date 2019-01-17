suite("shift");

test('Shift elements array', function() {
    
    var arr = ['ángel', 'payaso', 'mandarín', 'cirujano'];

    var expected = ["ángel"];

    var result = shift(arr);

    console.log(result);

    if (result.toString() !== expected.toString())
        throw Error("result should be the one expected");

});
