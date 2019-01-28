suite('TEST join');

test('array as parameter, all correct', function() {
    var arr = [1,2,3,4]

    var res = join(arr);

    var expected = "1,2,3,4";

    if(res !== expected) throw Error ("Expected result '" + expected + "' not matched");
});

test('array and separator as parameters, all correct', function() {
    var arr = [1,2,3,4]

    var res = join(arr,"-");

    var expected = "1-2-3-4";

    if(res !== expected) throw Error ("Expected result '" + expected + "' not matched");
});

test('first parameter not an array', function() {
    var error;

    try{
        join(2,3);
    }catch(err) {
        error = err;
    }
    if(!error) throw Error ('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});