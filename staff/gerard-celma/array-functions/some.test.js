suite('TEST some');

test('check if any value pass the callback test, all correct', function () {
    var cart = [2,3,12,4,25];

    var res = some(cart, function(value) {
        return value > 10;
    },0);

    var expected = true;

    if(res !== expected) throw Error ("Expected result '" + expected + "' not matched");
});