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

test('fails on passing boolean as an array', function() {
    var error;
    var numbers = true;

    try {
        reduce(numbers, function (accumulator, number) {
            return accumulator + number;
        });
    } catch(err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('error should be of type Error');
});

test('fails on passing object as an array', function() {
    var error;
    var numbers = {};

    try {
        reduce(numbers, function (accumulator, number) {
            return accumulator + number;
        });
    } catch(err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('error should be of type Error');
});

test('fails on passing string as an array', function() {
    var error;
    var numbers = 'àlex';

    try {
        reduce(numbers, function (accumulator, number) {
            return accumulator + number;
        });
    } catch(err) {
        error = err;
    }

    if (!error) throw Error('should have thrown an error');
    if (!(error instanceof Error)) throw Error('error should be of type Error');
});
