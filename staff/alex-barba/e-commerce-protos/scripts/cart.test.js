/* Suite Test */

suite('cart', function() {

/* .add funtion */

    describe('.add function', function() {
        it('evaluates that provides the right result ', function() {
            var cart = new Cart;

            var sweater = new Sweater('Diesel', 'M', 'black', 149); // brand, size, color, price

            cart.add(sweater)
            var found = cart.cartList.length
            var expected = 1;

            expect((found === expected), 'result does not match')
        });

        it('evaluates that accepts more than 1 product', function() {
            var cart = new Cart;
            
            var socks = new Socks('Calvin Klein', 42, 'black', 9.99); // brand, size, color, price
            var sweater = new Sweater('Diesel', 'M', 'black', 149); // brand, size, color, price

            cart.add(socks, sweater);
            var found = cart.cartList.length
            var expected = 2;
            
            expect((found === expected), 'result does not match')
        });

        it('evaluates that does not accept a number as a product', function() {
            var error;
            var cart = new Cart;

            var num = 1;

            try {
                cart.add(num)
            } catch (err) {
                error = err;
            }
            expect(error, 'should have thrown an error');
            expect(error instanceof Error, 'error should be of type Error');
        });

        it('evaluates that does not accept boolean as a product', function() {
            var error;
            var cart = new Cart;

            var a = true;

            try {
                cart.add(a)
            } catch (err) {
                error = err;
            }
            expect(error, 'should have thrown an error');
            expect(error instanceof Error, 'error should be of type Error');
        });
    });

   /* .totalPrice funtion */

   describe('.totalPrice function', function() {
        it('evaluates that provides the right result', function() {
            var cart = new Cart;
        
            var socks = new Socks('Calvin Klein', 42, 'black', 9.99); // brand, size, color, price
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
            var expected = 4085.92;
        
            expect((found === expected), 'result does not match')
        });

        it('evaluates that undefined price is taken as 0', function() {
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
            var shorts = new Shorts('Adidas', 'Sport', 42, 'blue', undefined); // brand, type, size, color, price
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
            var expected = 4050.92;
        
            expect((found === expected), 'result does not match')
        
        });

        it('evaluates that if carList is empty the outcome is 0', function() {
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
            var shorts = new Shorts('Adidas', 'Sport', 42, 'blue', undefined); // brand, type, size, color, price
            var sweater = new Sweater('Diesel', 'M', 'black', 149); // brand, size, color, price
        
            var found = cart.totalPrice();
            var expected = 0;
        
            expect((found === expected), 'result does not match')
        
        });
   });

   /* .numberOfItems functions  */

   describe('.numberOfItems function', function() {
        it('evaluates that provides the right result', function() {
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
            var expected = 14;
        
            expect((found === expected), 'result does not match');
        });

        it('evaluates that if the carList is empty the outcome is 0', function() {
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
        
            var found = cart.numberOfItems();
            var expected = 0;
        
            expect((found === expected), 'result does not match');
        });
   });

   /* .mostExpensive function */

   describe('.mostExpensive function', function() {
        it('evaluates that provides the right result', function() {
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
            var expected = laptop;
        
            expect((found.toString() === expected.toString()), 'result does not match');
        });

        it('evaluates that if carList is empty the outcome is undefined', function() {
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
        
            var found = cart.mostExpensive();
            var expected = undefined;
        
            expect((found === expected), 'result does not match');
        });
   });

/* .cheapest function */
   
   describe('.cheapest function', function(){
        it('evaluates that provides the right result', function() {
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
            var expected = socks;
        
            expect((found.toString() === expected.toString()), 'result does not match')
        });

        it('evaluates that if carList is empty the outcome is undefined', function() {
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
        
            var found = cart.cheapest();
            var expected = undefined;
        
            expect((found === expected), 'result does not match');
        });
   });

   /* .numberOf function */

   describe('.numberOf function', function(){
        it('evaluates that provides the right result', function() {
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
            var expected = 10;
        
            expect((found === expected), 'result does not match');
        });

        it('evaluates that is carList is empty the outcome is 0', function() {
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
        
            var found = cart.numberOf(Clothing);
            var expected = 0;
        
            expect((found === expected), 'result does not match');
        });

        it('evaluates that fails when type is not a function', function() {
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
            
            var error;

            try {
                cart.numberOf(alex);
            } catch (err) {
                error = err;
            }
        
            expect(error, 'should have thrown an error');
            expect((error instanceof Error), 'error should be of type Error');
        });
   });

/* .productsByPriceRange function */

   describe('.productsByPriceRange function', function(){
        it('evaluates that provides the right result', function() {
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
        
            var found = cart.productsByPriceRange(30, 120).length;
            var expected = 4;
        
            expect((found === expected), 'result does not match');
        });

        it('evaluates that the order of the min and max value does not affect the result', function() {
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
        
            var found = cart.productsByPriceRange(10, 0).length;
            var expected = 1;
        
            expect((found === expected), 'result does not match');
        });

        it('evaluates that fails when min or max is not a number', function() {
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
            
            var error;

            try {
                cart.productsByPriceRange(30, true);
            } catch (err) {
                error = err;
            }
        
            expect(error, 'should have thrown an error');
            expect((error instanceof Error), 'error should be of type Error');
        });
    });
});