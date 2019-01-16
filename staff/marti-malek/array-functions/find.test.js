suite('find');

test('finds element that exists', function () {
    var array = [5, 12, 8, 130, 44];

    var found = find(array, function (element) {
        return element > 10;
    });

    var expected = 12;

    assert(found === expected, 'found value ' + found + ' does not match expected ' + expected);
});

test('finds element that exists (products demo)', function () {
    var products = [
        { product: 'T-Shirt', price: 12 },
        { product: 'Slips', price: 7 },
        { product: 'Shorts', price: 22 },
        { product: 'Sockets', price: 3 }
    ];

    var found = find(products, function (product) {
        return product.price > 5 && product.price < 10;
    });

    var expected = products[1];

    assert(found === expected, 'found value ' + found + ' does not match expected ' + expected);
});

test('fail on too many arguments', function () {
    var error;

    try {
        find([], 1, true);
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown an error');
    assert(error instanceof Error, 'error should be of type Error');
});

test('fail on number instead of array', function () {
    var error;

    var array = 10;

    try {
        find(array, 1);
    } catch (err) {
        error = err;
    }

    assert(error, 'should have thrown an error');
    assert(error instanceof TypeError, 'error should be of type TypeError');

    var expectedErrorMessage = array + ' is not an array';

    assert(error.message === expectedErrorMessage, 'error message (' + error.message + ')  does not match expected (' + expectedErrorMessage + ')');
});


test('fail on number instead of callback', function () {
    var error;

    var callback = 10;

    try {
        find([], callback);
    } catch (err) {
        error = err;
    }

    assert(Error, 'should have thrown an error');
    assert(error instanceof TypeError, 'error should be of type TypeError');

    var expectedErrorMessage = callback + ' is not a function';

    assert(error.message === expectedErrorMessage, 'error message (' + error.message + ')  does not match expected (' + expectedErrorMessage + ')');
})