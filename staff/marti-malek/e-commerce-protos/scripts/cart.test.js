suite('add');

test('Correct', function () {
    var cart = new Cart;

    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);

    cart.add(tanga);

    var res = cart.cartList.length;

    var expected = 1;

    assert(res.toString() === expected.toString(), 'should return the correct value')
});

test('Fail on too many arguments', function () {
    var error;
    var cart = new Cart;

    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);

    try {
        cart.add(tanga,true);
    } catch (err) {
        error = err;
    }

    assert(Error, 'should throw an error');
});

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
        cart.totalPrice(1,2,3);
    }catch (err) {
        error = err;
    }

    assert(Error, 'should have returned the correct value');
});

//

suite('numberOfItems');

test('Correct', function () {
    var cart = new Cart;

    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    cart.add(tanga);

    var res = cart.numberOfItems();

    var expected = 1;

    assert(res.toString() === expected.toString(), 'should have returned the correct value');
});

test('Fail too many arguments', function () {
    var cart = new Cart;

    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    cart.add(tanga);

    try{
        cart.numberOfItems(1,2,3);
    }catch (err) {
        error = err;
    }

    assert(Error, 'should have returned the correct value');
});

//

suite('mostExpensive');

test('Correct', function () {
    var cart = new Cart;

    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    cart.add(tanga);

    var res = cart.mostExpensive();

    var expected = tanga;

    assert(res.toString() === expected.toString(), 'should have returned the correct value');
});

test('Fail too many arguments', function () {
    var cart = new Cart;

    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    cart.add(tanga);

    try{
        cart.mostExpensive(1,2,3);
    }catch (err) {
        error = err;
    }

    assert(Error, 'should have returned the correct value');
});

//

suite('cheapest');

test('Correct', function () {
    var cart = new Cart;

    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    cart.add(tanga);

    var res = cart.cheapest();

    var expected = tanga;

    assert(res.toString() === expected.toString(), 'should have returned the correct value');
});

test('Fail too many arguments', function () {
    var cart = new Cart;

    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    cart.add(tanga);

    try{
        cart.cheapest(1,2,3);
    }catch (err) {
        error = err;
    }

    assert(Error, 'should have returned the correct value');
});

//

suite('numberOf');

test('Correct', function () {
    var cart = new Cart;

    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    cart.add(tanga);

    var res = cart.numberOf(Clothing);

    var expected = 1;

    assert(res.toString() === expected.toString(), 'should have returned the correct value');
});

test('Fail too many arguments', function () {
    var cart = new Cart;

    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    cart.add(tanga);

    try{
        cart.numberOf(1,2,3);
    }catch (err) {
        error = err;
    }

    assert(Error, 'should have returned the correct value');
});

//

suite('productsByPriceRange');

test('Correct', function () {
    var cart = new Cart;

    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    cart.add(tanga);

    var res = cart.productsByPriceRange();

    var expected = [];

    assert(res.toString() === expected.toString(), 'should have returned the correct value');
});

test('Fail too many arguments', function () {
    var cart = new Cart;

    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    cart.add(tanga);

    try{
        cart.productsByPriceRange(1,2,3);
    }catch (err) {
        error = err;
    }

    assert(Error, 'should have returned the correct value');
});

