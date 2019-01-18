suite('TEST reverse');

test('array as parameter, all ok', function() {
    var arr = [1,2,3]

    var res = reverse(arr);

    console.log(res);

    var expected = [3,2,1];

    if(res.toString() !== expected.toString()) throw Error ("Expected result '" + expected + "' not matched");
});

test("parameter not array", function () {
    var error;

    try {
        reverse(1);
    } catch (err) {
        error = err;
    }

    if(!error) throw Error ('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});