suite('TEST filter');

test('filter values bigger than 10, all correct', function () {
    var prices = [5,12,20,4,8,3,30];

    var res = filter(prices, function(value) {
        return value > 10;
    });

    var expected = [12,20,30];

    if(res.toString() !== expected.toString()) throw Error ("Expected result '" + expected + "' not matched");
});