suite('TEST shift');

test('array as parameter, all correct', function() {
    var arr = [1,2,3,4]

    var res = shift(arr);

    var expected = 1;
    var expected2 = 3;

    if(res !== expected) throw Error ("Expected result '" + expected + "' not matched");
    if(arr.length !== expected2) throw Error ('Expected length of array nor matched');
});

test('more than one parameter', function() {
    var error;

    try{
        shift([1,2,3,4],3);
    }catch(err) {
        error = err;
    }

    if(!error) throw Error ('should have thrown an error');
    if(error.message !== 'only 1 parameter allowed') throw Error ('Is not the expected message');
});
