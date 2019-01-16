suite('cart');

test('evaluates that .add provides the right result ', function() {
    var cart = new Cart;

    var sweater = new Sweater('Diesel', 'M', 'black', 149); // brand, size, color, price

    cart.add(sweater)
    var found = cart.cartList.length
    var expected = 1;

    assert((found === expected), 'result does not match')

});

test('evaluates that .add does not accept num as a product', function() {
    var error;
    var cart = new Cart;

    var num = 1;

    try {
        cart.add(num)
    } catch (err) {
        error = err;
    }
    assert(error, 'should have thrown an error');
    assert(error instanceof Error, 'error should be of type Error');
});

test('evaluates that .add does not accept boolean as a product', function() {
    var error;
    var cart = new Cart;

    var a = true;

    try {
        cart.add(a)
    } catch (err) {
        error = err;
    }
    assert(error, 'should have thrown an error');
    assert(error instanceof Error, 'error should be of type Error');
});

test('evaluates that .totalPrice provides the right result ', function() {
    var cart = new Cart;

    var socks = new Slips('Calvin Klein', 42, 'black', 9.99); // brand, size, color, price
    var tanga = new Slips('Wicked Weasel', 32, 'red', 29.95); // brand, size, color, price
    var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39); // brand, type, size, color, price
    var slips = new Slips('Abanderado', 42, 'purple', 13.99);// brand, size, color, price
    var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999); // brand, type, color, price
    var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119); // brand, type, color, price
    var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599); // brand, type, size, price
    var desktop = new Desktop('HP', '1800', 20, 420); // brand, type, size, price
    var hat = new Hat('Jack & Jones', 'Cup', 'red', 44.99); // brand, type, color, price
    var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199); // brand, type, size, color, price
    var tshirt = new TShirt('Supreme', 'M', 'white', 399); // brand, size, color, price
    var cap = new Cap('Obey', 'M', 'black', 29); // brand, size, color, price
    var shorts = new Shorts('Adidas', 'Sport', 42, 'blue', 35); // brand, type, size, color, price
    var sweater = new Sweater('Diesel', 'M', 'black', 149); // brand, size, color, price

    cart.add(socks);
    cart.add(tanga);
    cart.add(bra);
    cart.add(slips);
    cart.add(mobile);
    cart.add(mobile2);
    cart.add(laptop);
    cart.add(desktop);
    cart.add(hat);
    cart.add(jeans);
    cart.add(tshirt);
    cart.add(cap);
    cart.add(shorts);
    cart.add(sweater);

    var found = cart.totalPrice();
    var expected = 'Total: 4085.92.';

    assert((found.toString() === expected), 'result does not match')

});

test('evaluates that .numberOfItems provides the right result ', function() {
    var cart = new Cart;

    var socks = new Slips('Calvin Klein', 42, 'black', 9.99); // brand, size, color, price
    var tanga = new Slips('Wicked Weasel', 32, 'red', 29.95); // brand, size, color, price
    var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39); // brand, type, size, color, price
    var slips = new Slips('Abanderado', 42, 'purple', 13.99);// brand, size, color, price
    var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999); // brand, type, color, price
    var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119); // brand, type, color, price
    var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599); // brand, type, size, price
    var desktop = new Desktop('HP', '1800', 20, 420); // brand, type, size, price
    var hat = new Hat('Jack & Jones', 'Cup', 'red', 44.99); // brand, type, color, price
    var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199); // brand, type, size, color, price
    var tshirt = new TShirt('Supreme', 'M', 'white', 399); // brand, size, color, price
    var cap = new Cap('Obey', 'M', 'black', 29); // brand, size, color, price
    var shorts = new Shorts('Adidas', 'Sport', 42, 'blue', 35); // brand, type, size, color, price
    var sweater = new Sweater('Diesel', 'M', 'black', 149); // brand, size, color, price

    cart.add(socks);
    cart.add(tanga);
    cart.add(bra);
    cart.add(slips);
    cart.add(mobile);
    cart.add(mobile2);
    cart.add(laptop);
    cart.add(desktop);
    cart.add(hat);
    cart.add(jeans);
    cart.add(tshirt);
    cart.add(cap);
    cart.add(shorts);
    cart.add(sweater);

    var found = cart.numberOfItems();
    var expected = 'The total number of items is: 14.';

    assert((found.toString() === expected), 'result does not match')

});

test('evaluates that .mostExpensive provides the right result ', function() {
    var cart = new Cart;

    var socks = new Slips('Calvin Klein', 42, 'black', 9.99); // brand, size, color, price
    var tanga = new Slips('Wicked Weasel', 32, 'red', 29.95); // brand, size, color, price
    var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39); // brand, type, size, color, price
    var slips = new Slips('Abanderado', 42, 'purple', 13.99);// brand, size, color, price
    var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999); // brand, type, color, price
    var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119); // brand, type, color, price
    var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599); // brand, type, size, price
    var desktop = new Desktop('HP', '1800', 20, 420); // brand, type, size, price
    var hat = new Hat('Jack & Jones', 'Cup', 'red', 44.99); // brand, type, color, price
    var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199); // brand, type, size, color, price
    var tshirt = new TShirt('Supreme', 'M', 'white', 399); // brand, size, color, price
    var cap = new Cap('Obey', 'M', 'black', 29); // brand, size, color, price
    var shorts = new Shorts('Adidas', 'Sport', 42, 'blue', 35); // brand, type, size, color, price
    var sweater = new Sweater('Diesel', 'M', 'black', 149); // brand, size, color, price

    cart.add(socks);
    cart.add(tanga);
    cart.add(bra);
    cart.add(slips);
    cart.add(mobile);
    cart.add(mobile2);
    cart.add(laptop);
    cart.add(desktop);
    cart.add(hat);
    cart.add(jeans);
    cart.add(tshirt);
    cart.add(cap);
    cart.add(shorts);
    cart.add(sweater);

    var found = cart.mostExpensive();
    var expected = 'The most expensive item is : Apple MacBook Pro. Price: 1599.';

    assert((found.toString() === expected), 'result does not match')

});

test('evaluates that .cheapest provides the right result ', function() {
    var cart = new Cart;

    var socks = new Slips('Calvin Klein', 42, 'black', 9.99); // brand, size, color, price
    var tanga = new Slips('Wicked Weasel', 32, 'red', 29.95); // brand, size, color, price
    var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39); // brand, type, size, color, price
    var slips = new Slips('Abanderado', 42, 'purple', 13.99);// brand, size, color, price
    var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999); // brand, type, color, price
    var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119); // brand, type, color, price
    var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599); // brand, type, size, price
    var desktop = new Desktop('HP', '1800', 20, 420); // brand, type, size, price
    var hat = new Hat('Jack & Jones', 'Cup', 'red', 44.99); // brand, type, color, price
    var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199); // brand, type, size, color, price
    var tshirt = new TShirt('Supreme', 'M', 'white', 399); // brand, size, color, price
    var cap = new Cap('Obey', 'M', 'black', 29); // brand, size, color, price
    var shorts = new Shorts('Adidas', 'Sport', 42, 'blue', 35); // brand, type, size, color, price
    var sweater = new Sweater('Diesel', 'M', 'black', 149); // brand, size, color, price

    cart.add(socks);
    cart.add(tanga);
    cart.add(bra);
    cart.add(slips);
    cart.add(mobile);
    cart.add(mobile2);
    cart.add(laptop);
    cart.add(desktop);
    cart.add(hat);
    cart.add(jeans);
    cart.add(tshirt);
    cart.add(cap);
    cart.add(shorts);
    cart.add(sweater);

    var found = cart.cheapest();
    var expected = 'The cheapest products is : Calvin Klein. Price: 9.99.';

    assert((found.toString() === expected), 'result does not match')

});

test('evaluates that .numberOf provides the right result ', function() {
    var cart = new Cart;

    var socks = new Slips('Calvin Klein', 42, 'black', 9.99); // brand, size, color, price
    var tanga = new Slips('Wicked Weasel', 32, 'red', 29.95); // brand, size, color, price
    var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39); // brand, type, size, color, price
    var slips = new Slips('Abanderado', 42, 'purple', 13.99);// brand, size, color, price
    var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999); // brand, type, color, price
    var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119); // brand, type, color, price
    var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599); // brand, type, size, price
    var desktop = new Desktop('HP', '1800', 20, 420); // brand, type, size, price
    var hat = new Hat('Jack & Jones', 'Cup', 'red', 44.99); // brand, type, color, price
    var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199); // brand, type, size, color, price
    var tshirt = new TShirt('Supreme', 'M', 'white', 399); // brand, size, color, price
    var cap = new Cap('Obey', 'M', 'black', 29); // brand, size, color, price
    var shorts = new Shorts('Adidas', 'Sport', 42, 'blue', 35); // brand, type, size, color, price
    var sweater = new Sweater('Diesel', 'M', 'black', 149); // brand, size, color, price

    cart.add(socks);
    cart.add(tanga);
    cart.add(bra);
    cart.add(slips);
    cart.add(mobile);
    cart.add(mobile2);
    cart.add(laptop);
    cart.add(desktop);
    cart.add(hat);
    cart.add(jeans);
    cart.add(tshirt);
    cart.add(cap);
    cart.add(shorts);
    cart.add(sweater);

    var found = cart.numberOf(Clothing);
    var expected = 'The total number of products is : 10.';

    assert((found.toString() === expected), 'result does not match')

});

test('evaluates that .productsByPriceRange provides the right result ', function() {
    var cart = new Cart;

    var socks = new Slips('Calvin Klein', 42, 'black', 9.99); // brand, size, color, price
    var tanga = new Slips('Wicked Weasel', 32, 'red', 29.95); // brand, size, color, price
    var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39); // brand, type, size, color, price
    var slips = new Slips('Abanderado', 42, 'purple', 13.99);// brand, size, color, price
    var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999); // brand, type, color, price
    var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119); // brand, type, color, price
    var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599); // brand, type, size, price
    var desktop = new Desktop('HP', '1800', 20, 420); // brand, type, size, price
    var hat = new Hat('Jack & Jones', 'Cup', 'red', 44.99); // brand, type, color, price
    var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199); // brand, type, size, color, price
    var tshirt = new TShirt('Supreme', 'M', 'white', 399); // brand, size, color, price
    var cap = new Cap('Obey', 'M', 'black', 29); // brand, size, color, price
    var shorts = new Shorts('Adidas', 'Sport', 42, 'blue', 35); // brand, type, size, color, price
    var sweater = new Sweater('Diesel', 'M', 'black', 149); // brand, size, color, price

    cart.add(socks);
    cart.add(tanga);
    cart.add(bra);
    cart.add(slips);
    cart.add(mobile);
    cart.add(mobile2);
    cart.add(laptop);
    cart.add(desktop);
    cart.add(hat);
    cart.add(jeans);
    cart.add(tshirt);
    cart.add(cap);
    cart.add(shorts);
    cart.add(sweater);

    var found = cart.productsByPriceRange(30, 120);
    var expected = 'The total number of products is : 4.';

    assert((found.toString() === expected), 'result does not match')

});

