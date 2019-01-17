suite('cart');

var cart = new Cart;


// Testing cart.add()

test('add 1 product to cart', function() {
    var socks = new Socks('Calvin Klein', 42, 'black', 9.99);

    var res = cart.add(socks);

    var expected = 1;

    assert(res === expected, 'expected and result should be the same');
});

test('fail on everything except Product', function() {
    var error;

    try{
        cart.add({});
    } catch(err) {
        error = err;
    }

    assert(error, 'should have thrown an error');
    assert(error instanceof TypeError, 'should have thrown TypeError');
});
