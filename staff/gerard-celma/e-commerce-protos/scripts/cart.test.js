var cart = new Cart;

var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39); // model
var slips = new Slips('Abanderado', 42, 'purple', 13.99);

cart.add(socks);
cart.add(tanga);
cart.add(bra);
cart.add(slips);


suite('cart', function() {

    describe('Testing cart.add()', function() {
        it('should add 1 product to cart', function() {
            var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
    
            var res = cart.add(socks);
    
            var expected = 5;
    
            expect(res === expected, 'expected and result should be the same');
        });
    
        it('should fail on everything except Product', function() {
            var error;
    
            try{
                cart.add({});
            } catch(err) {
                error = err;
            }
    
            expect(error, 'should have thrown an error');
            expect(error instanceof TypeError, 'should have thrown TypeError');
        });
    });

    describe('Testing card.totalPrice()', function() {
        it('should sum price of all products in cart', function() {
            var res = cart.totalPrice();

            var expected = 102.91999999999999;

            expect(res === expected, 'expected and result should be the same');
        });
    });

    describe('Testing card.numberOfItems()', function() {
        it('should tell amount of products in cart', function () {
            var res = cart.numberOfItems();

            var expected = 5;

            expect(res === expected, 'expected and result should be the same');
        });
    });

    describe('Testing card.mostExpensive()', function() {
        it('should tell most expensive product in cart', function() {
            var res = cart.mostExpensive();

            var expected = "Bra";

            expect(res === expected, 'expected and result should be the same');
        });
    });

    describe('Testing card.cheapest()', function() {
        it('should tell the cheapest product in card', function() {
            var res = cart.cheapest();

            var expected = "Socks";

            expect(res === expected, 'expected and result should be the same');
        });
    });

    describe('Testing card.numberOf()', function() {
        it('should tell number of products from Type Underwear in cart', function() {
            var res = cart.numberOf(Clothing);

            var expected = 5;

            expect(res === expected, 'expected and result should be the same');
        });

        it('should fail when parameter is not a function', function() {
            var error;

            try{
                card.numberOf("pulsera");
            } catch(err) {
                error = err;
            }

            expect(error, 'Should have thrown an error!');
        });
    });

    describe('Testing productsByPriceRange()', function () {
        it('should show product between price range', function() {
            var res = cart.productsByPriceRange(10,30);
            
            var expected = [tanga,slips];
            
            expect(res[0] === expected[0], 'expected and result should be the same');
            expect(res[1] === expected[1], 'expected and result should be the same');
        });
    });
});



