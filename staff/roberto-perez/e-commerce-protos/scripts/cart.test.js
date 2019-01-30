suite('Cart e-comerce-protos', function() {

    describe('Object creation', function () {

        it('should create a cart', function () {
            var cart = new Cart;
            expect(cart instanceof Cart, 'Unexpected value');
            expect(cart.products, 'Products list undefined')
        });

        it('should create a product', function () {
            var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
            expect(socks instanceof Product, 'Unexpected value');
        });

    });

    describe('Add product', function () {

        it('should not be insert a element different a product into a cart', function () {
            var cart = new Cart;
            var socks = 'Socks';

            try {
                cart.add(socks);
            } catch (err) {
                error = err;
            }

            expect(error, error.message);
            expect(error instanceof TypeError, 'the error shoyld be TypeError');
        });

        it('should add onlye a product if we pass more than one argument', function () {
            var cart = new Cart;
            var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
            var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);

            expect(cart.add(socks, tanga) && cart.products.length > 0, "Product not has been added");
        });

    });

    describe('Function totalPrice()', function () {

        it('should sum all the prices', function () {
            var cart = new Cart;

            var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
            var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
            var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);

            cart.add(socks);
            cart.add(tanga);
            cart.add(bra);

            res = cart.totalPrice();

            expected = 78.94;

            expect(res === expected, 'Unexpected value');
        });

        it('should sum all the prices even the ones that has no price', function () {
            var cart = new Cart;

            var socks = new Socks('Calvin Klein', 42, 'black', 10);
            var tanga = new Tanga('Wicked Weasel', 32, 'red', 20);
            var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream');

            cart.add(socks);
            cart.add(tanga);
            cart.add(bra);

            res = cart.totalPrice();

            expected = 30;

            expect(res === expected, 'Unexpected value');
        });

    });

    describe('Function numberOfItems()', function () {

        it('should show number of products are in the cart', function () {
            var cart = new Cart;

            var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
            var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119);
            var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599);

            cart.add(mobile);
            cart.add(mobile2);
            cart.add(laptop);

            res = cart.numberOfItems();

            expect(res === 3, 'Unexpected value');
        });

    });

    describe('Function mostExpensive()', function () {

        it('should show the more expensive', function () {
            var cart = new Cart;

            var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
            var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119);
            var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599);
            var desktop = new Desktop('HP', '1800', 20, 420);

            cart.add(mobile);
            cart.add(mobile2);
            cart.add(laptop);

            res = cart.mostExpensive();

            expected = 1599;

            expect(res.price === expected, 'Unexpected value');
        });


        it('should show the more expensive if there is products without price', function () {
            var cart = new Cart;
            var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199);
            var tshirt = new TShirt('Supreme', 'M', 'white');
            var cap = new Cap('Obey', 'M', 'black', 29);

            cart.add(jeans);
            cart.add(tshirt);
            cart.add(cap);

            res = cart.mostExpensive();

            expected = 199;

            expect(res.price === expected, 'Unexpected value');
        });

    });

    describe('Function cheapest()', function () {

        it('should show the cheapest', function () {
            var cart = new Cart;

            var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
            var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119);
            var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599);
            var desktop = new Desktop('HP', '1800', 20, 420);

            cart.add(mobile);
            cart.add(mobile2);
            cart.add(laptop);

            res = cart.cheapest();

            expected = 119;

            expect(res.price === expected, 'Unexpected value');
        });


        it('should show the cheapest if there is products without price', function () {
            var cart = new Cart;
            var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199);
            var tshirt = new TShirt('Supreme', 'M', 'white');
            var cap = new Cap('Obey', 'M', 'black', 29);

            cart.add(jeans);
            cart.add(tshirt);
            cart.add(cap);

            res = cart.cheapest();

            expected = 29;

            expect(res.price === expected, 'Unexpected value');
        });

    });

    describe('Function productsByPriceRange()', function () {
        
        it('should show products between min and max price', function () {
            var cart = new Cart;

            var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119);
            var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599);
            var desktop = new Desktop('HP', '1800', 20, 420);

            cart.add(mobile2);
            cart.add(laptop);
            cart.add(desktop);

            res = cart.productsByPriceRange(80, 500);

            expected = [
                { color: "space-rose", brand: "Xiaomi", model: "5X", size: null, price: 119 },
                { brand: "HP", model: "1800", size: 20, color: null, price: 420 }
            ]

            expect(res.toString() === expected.toString(), 'Unexpected value');
        });

        it('should fail when min or max are not a number', function () {
            var cart = new Cart;

            var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119);
            var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599);
            var desktop = new Desktop('HP', '1800', 20, 420);

            cart.add(mobile2);
            cart.add(laptop);
            cart.add(desktop);

            var error;

            try {
                cart.productsByPriceRange('hola', 30);
            } catch (err) {
                error = err;
            }
                            
            expect(error, error.message);
            expect(error instanceof TypeError, 'the error should be TypeError');
        });

    });

    describe('Function numberOf()', function(){

        it('should show products have the same type wich we pass like an argument', function () {
            var cart = new Cart;

            var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119);
            var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599);
            var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199);

            cart.add(mobile2);
            cart.add(laptop);
            cart.add(jeans);

            resLaptop = cart.numberOf(Laptop);
            resClothing = cart.numberOf(Clothing);

            var expectedLaptop = 1;
            var expectedClothing = 1;

            expect(resLaptop === expectedLaptop, 'Unexpected value');
            expect(resClothing === expectedClothing, 'Unexpected value');
        });

        it('should fail if type is not a Function', function () {
            var cart = new Cart;

            var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119);
            var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599);
            var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199);

            cart.add(mobile2);
            cart.add(laptop);
            cart.add(jeans);

            var error;

            try {
                cart.numberOf('Clothing');
            } catch (err) {
                error = err;
            }

            expect(error, error.message);
            expect(error instanceof TypeError, 'the error should be TypeError');
        });

        it('should fail if type is not a Products', function () {
            var cart = new Cart;

            var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119);
            var laptop = new Laptop('Apple', 'MacBook Pro', 15, 1599);
            var jeans = new Jeans('Diesel', 'regular', 42, 'denim', 199);

            cart.add(mobile2);
            cart.add(laptop);
            cart.add(jeans);

            var error;
            
            try {
                cart.numberOf(String);
            } catch (err) {
                error = err;
            }

            expect(error, error.message);
            expect(error instanceof TypeError, 'the error should be TypeError');
        });

    });

});
