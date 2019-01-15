suite('TEST pop');

test('one array as argument, all correct', function() {
    var arr = ["meat", "fish", "fruit", "vegetable"]

    var res = pop(arr);

    var expected = "vegetable";

    if(expected !== res) throw Error ("Expected result '" + arr[3] + "' not matched");
});


test('one string as argument', function() {
    var error;

    try{
        pop("kaboom");
    } catch(err) {
        error = err;
    }

    if(!error) throw Error ('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});

test('one number as argument', function() {
    var error;

    try{
        pop(1234);
    } catch(err) {
        error = err;
    }

    if(!error) throw Error ('should have thrown an error');
    if(!(error instanceof TypeError)) throw Error ('should have thrown TypeError');
});