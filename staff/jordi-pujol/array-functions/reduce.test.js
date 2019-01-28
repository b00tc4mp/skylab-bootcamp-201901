suite('reduce');

test(' should reduce the array into one value', function () {
    var cart = [
                    {name: "first",price: 1},
                    {name: "second",price: 2},
                    {name: "third",price: 3}
                   ];

    var res = reduce(cart, function(accumulator,item) {
        return accumulator + item.price;
    },0);

    var expected = 6;

    if(res !== expected) throw Error ("Expected result '" + expected + "' not matched");
});

test('should reduce the array into one value, not initial value for accumulator', function () {
    var cart = [
                    {name: "first",price: 1},
                    {name: "second",price: 2},
                    {name: "third",price: 3}
                   ];

    var res = reduce(cart, function(accumulator,item) {
        return accumulator + item.price;
    });

    var expected = 6;

    if(res !== expected) throw Error ("Expected result '" + expected + "' not matched");
}); 