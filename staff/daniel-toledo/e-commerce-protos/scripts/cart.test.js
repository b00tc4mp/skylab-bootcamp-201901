suite('Cart', function () {

    describe('card creation and adding products', function () {
        it('should creats a Cart', function () {
            var cart = new Cart;

            expect(cart instanceof Cart, 'Unexpected value');
            expect(cart.cartList.toString() === [].toString(), 'cardList undefined')

        });

        it('should creat a Cart and add strings', function () {
            var cart = new Cart;

            cart.add('mobile');
            cart.add('mobile2');
            cart.add('laptop');
            cart.add('desktop');


            expect(cart.cartList.toString() === ['mobile', 'mobile2', 'laptop', 'desktop'].toString(), 'Unexpected value')

        });

    });

    describe('function total price', function () {
        it('should sum all the prices', function () {
            var cart = new Cart;

            var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
            var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
            var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);

            cart.add(socks);
            cart.add(tanga);
            cart.add(bra);

            res = cart.totalPrice()

            expected = 78.94

            expect(res === expected, 'Unexpected value')

        });

    });

    describe('function number of products', function () {
        it('should show how many products are in the cart', function () {
            var cart = new Cart;

            cart.add('mobile');
            cart.add('mobile2');
            cart.add('laptop');
            cart.add('desktop');

            res = cart.numberOfItems()

            expect(res === 4, 'Unexpected value')
        });
    });

    describe('function more expensive & cheaper', function(){

        it('should show the more expensive', function () {
            var cart = new Cart;
    
            var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
            var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
            var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);
    
            cart.add(socks);
            cart.add(tanga);
            cart.add(bra);
    
            res = cart.mostExpensive().price
    
            expected = 39
    
            expect(res === expected, 'Unexpected value')
        });
        
        it('should show the cheapest', function () {
            var cart = new Cart;
    
            var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
            var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
            var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);
    
            cart.add(socks);
            cart.add(tanga);
            cart.add(bra);
    
            res = cart.cheapest().price
    
            expected = 9.99
    
            expect(res === expected, 'Unexpected value')
        });

        // it('should fail when the product has no price in mostExpensive', function () {
        //     var cart = new Cart;

        //     var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
        //     var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
        //     var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream');

        //     cart.add(socks);
        //     cart.add(tanga);
        //     cart.add(bra);

        //     var error;

        //     try {
        //         cart.mostExpensive()
        //     } catch (err) {
        //         error = err
        //     }


        //     expect(error, 'it should throw an error')
        // });

        // it('should fail when the product has no price in cheapest', function () {
        //     var cart = new Cart;

        //     var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
        //     var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
        //     var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream');

        //     cart.add(socks);
        //     cart.add(tanga);
        //     cart.add(bra);

        //     var error;

        //     try {
        //         cart.cheapest()
        //     } catch (err) {
        //         error = err
        //     }


        //     expect(error, 'it should throw an error')
        // });
    });


    test('product by price range', function () {
        var cart = new Cart;

        var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
        var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
        var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);

        cart.add(socks);
        cart.add(tanga);
        cart.add(bra);

        res = cart.productsByPriceRange(9, 30)

        expected = [{ size: 42, color: "black", brand: "Calvin Klein", price: 9.99 },
        { size: 32, color: "red", brand: "Wicked Weasel", price: 29.95 }]

        assert(res.toString() === expected.toString(), 'Unexpected value')

    });

    test('number of same type', function () {
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

        res1 = cart.numberOf(Electronics)
        res2 = cart.numberOf(Clothing)

        var expected1 = 2
        var expected2 = 3

        assert(res1 === expected1, 'Unexpected value')
        assert(res2 === expected2, 'Unexpected value')

    });

});


