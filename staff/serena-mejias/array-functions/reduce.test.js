suite('reduce');

test('reduces into value', function () {
    var products = [
        { product: 'T-Shirt', price: 12 },
        { product: 'Slips', price: 7 },
        { product: 'Shorts', price: 22 },
        { product: 'Sockets', price: 3 }
    ];

    var res = reduce(products, function (accumulator, product) {
        return accumulator + product.price;
    }, 0);

    var expected = 44;

    assert(res === expected, 'result must match the expected one');
});

test('reduces into value without initial accumulator', function () {
    var numbers = [1, 2, 3, 4, 5];

    var res = reduce(numbers, function (accumulator, number) {
        return accumulator + number;
    });

    var expected = 15;

    assert(res === expected, 'result must match the expected one');
});