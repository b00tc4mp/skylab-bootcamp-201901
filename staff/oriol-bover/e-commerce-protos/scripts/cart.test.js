suite('cart');

//add
test('ADD: passing a product', function () {
    var cart = new Cart;
    var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);

    cart.add(mobile);
    var expected_length = 1;
    assert(cart.cartList.length === expected_length, 'the length of the list ' + cart.cartList.length + 'it is different of the expected length ' + expected_length);

});

test('ADD: passing someting random', function () {
    var cart = new Cart;
    var error;
    try {
        cart.add({});
    } catch (err) {
        error = err;
    }

    assert(error, 'Error does not exist');
    assert(error instanceof TypeError, 'Error should be a TypeError');
});

//totalPrice

test('TOTAL PRICE: correct functionality', function () {
    var cart = new Cart;
    var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);

    cart.add(mobile);

    expected = 999;
    assert(cart.totalPrice() === expected, 'the total price ' + cart.totalPrice() + ' should be equal to ' + expected);

});

test('TOTAL PRICE: with empty list', function () {
    var cart = new Cart;

    expected = 0;

    assert(cart.totalPrice() === expected, 'The total price ' + cart.totalPrice() + ' should be equal to the expected ' + expected);
});

//numberOfItems

test('NUMBER OF ITEMS: correct functionality', function () {
    var cart = new Cart;
    var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
    var mobile2 = new Mobile('Apple', 'iPhone X', 'space-gray', 999);

    cart.add(mobile);
    cart.add(mobile2);

    expected = 2;

    assert(cart.numberOfItems() === expected, 'The number of items ' + cart.numberOfItems() + ' should be equal to the expected ' + expected)

});

//mostExpensive

test('MOST EXPENSIVE: correct functionality', function(){
    var cart = new Cart;
    var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
    var cap = new Cap('Obey', 'M', 'black', 29);

    cart.add(mobile);
    cart.add(cap);

    var expensive = cart.mostExpensive();

    assert(expensive === mobile, 'the most expensive '+mobile+' should be equal to the expected '+expensive);
});

test('MOST EXPENSIVE: empty list', function(){
    cart = new Cart;
    expected = undefined;

    assert(cart.mostExpensive() === expected, 'the most expensive item '+cart.mostExpensive()+' should be undefined');
});

//cheapest
test('CHEAPEST: correct functionality', function(){
    var cart = new Cart;
    var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
    var cap = new Cap('Obey', 'M', 'black', 29);

    cart.add(mobile);
    cart.add(cap);

    var cheapest = cart.cheapest();

    assert(cheapest === cap, 'the cheapest '+cap+' should be equal to the expected '+cheapest);
});

test('CHEAPEST: empty list', function(){
    var cart = new Cart;
    expected = undefined;

    assert(cart.cheapest() === expected, 'the cheapest item '+cart.cheapest()+' should be undefined');
});

//numberOf
test('NUMBER OF: correct functionality', function(){
    var cart = new Cart;
    var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
    var cap = new Cap('Obey', 'M', 'black', 29);

    cart.add(mobile);
    cart.add(cap);

    var res = cart.numberOf(Electronics)
    var expected = 1;

    assert(res === expected, 'the res '+res+' should be equal to the expected'+expected);

});

//productsByPriceRange
test('PRODUCTS BY RANGE: correct functionality', function(){
    var cart = new Cart;
    var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199); 
    var sweater = new Sweater('Diesel', 'M', 'black', 149);
    var desktop = new Desktop('HP', '1800', 20, 420);
    var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119);

    cart.add(jeans);
    cart.add(sweater);
    cart.add(desktop);
    cart.add(mobile2);

    var res = cart.productsByPriceRange(100,200);
    var expected = [sweater, jeans, mobile2];

    assert(res.length === expected.length, 'The lumber of the items '+res.length+' should be equal to the expected '+expected.length);
    res.forEach(function(product){
        assert(expected.includes(product), 'The product should be in the expected array');
    });
});

test('PRODUCTS BY RANGE: passing no number(first)', function () {
    var cart = new Cart;
    var error;

    try {
        cart.productsByPriceRange({},2);
    } catch (err) {
        error = err;
    }

    assert(error, 'Error does not exist');
    assert(error instanceof TypeError, 'Error should be a TypeError');
});

test('PRODUCTS BY RANGE: passing no number(second)', function () {
    var cart = new Cart;
    var error;

    try {
        cart.productsByPriceRange(2,{});
    } catch (err) {
        error = err;
    }

    assert(error, 'Error does not exist');
    assert(error instanceof TypeError, 'Error should be a TypeError');
});