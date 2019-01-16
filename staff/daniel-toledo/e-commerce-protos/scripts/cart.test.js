suite('Cart');

test('creats a Cart and add products', function(){
    var cart = new Cart;

    cart.add('mobile');
    cart.add('mobile2');
    cart.add('laptop');
    cart.add('desktop');


    assert(cart.cartList.toString()===['mobile', 'mobile2','laptop','desktop'].toString(), 'Unexpected value')

});

test('total price', function(){
    var cart = new Cart;

    var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);

    cart.add(socks);
    cart.add(tanga);
    cart.add(bra);

    res=cart.totalPrice()

    expected=78.94

    assert(res===expected, 'Unexpected value')

});

test('Number of items', function(){
    var cart = new Cart;

    cart.add('mobile');
    cart.add('mobile2');
    cart.add('laptop');
    cart.add('desktop');

    res=cart.numberOfItems()


    assert(res===4, 'Unexpected value')

});

test('more expensive', function(){
    var cart = new Cart;

    var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);

    cart.add(socks);
    cart.add(tanga);
    cart.add(bra);

    res=cart.mostExpensive().price

    expected=39

    assert(res===expected, 'Unexpected value')

});

test('cheapest', function(){
    var cart = new Cart;

    var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);

    cart.add(socks);
    cart.add(tanga);
    cart.add(bra);

    res=cart.cheapest().price

    expected=9.99

    assert(res===expected, 'Unexpected value')

});

test('product by price range', function(){
    var cart = new Cart;

    var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);

    cart.add(socks);
    cart.add(tanga);
    cart.add(bra);

    res=cart.productsByPriceRange(9,30)

    expected=[{size: 42, color: "black", brand: "Calvin Klein", price: 9.99},
              {size: 32, color: "red", brand: "Wicked Weasel", price: 29.95}]

    assert(res.toString()===expected.toString(), 'Unexpected value')

});

test('number of same type', function(){
    var cart = new Cart;

    var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
    var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
    var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);
    var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599);
    var desktop = new Desktop('HP', '1800', 20, 420);

    cart.add(socks);
    cart.add(tanga);
    cart.add(bra);
    cart.add(laptop);
    cart.add(desktop);

    res1=cart.numberOf(Electronics)
    res2=cart.numberOf(Clothing)

    var expected1=2
    var expected2=3

    assert(res1===expected1, 'Unexpected value')
    assert(res2===expected2, 'Unexpected value')

});

