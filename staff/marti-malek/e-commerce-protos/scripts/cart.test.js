suite('totalPrice');

test('Correct', function () {
    var cart = new Cart;

    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    cart.add(tanga);

    var res = cart.totalPrice();

    var expected = 29.95;

    assert(res.toString() === expected.toString(), 'should have returned the correct value');
});

test('Fail too many arguments', function () {
    var cart = new Cart;

    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    cart.add(tanga);

    try{
        cart.totalPrice();
    }catch (err) {
        error = err;
    }

    assert(Error, 'should have returned the correct value');
});