var cart = new Cart;


var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
var tanga = new Tanga('Wicked Weasel', 32, 'red', 29.95);
var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39); // model
var slips = new Slips('Abanderado', 42, 'purple', 13.99);

cart.add(socks)
cart.add(tanga)
cart.add(bra)
cart.add(slips)

suite('cart', function(){

    // .Add()

    describe ('adding elements', function(){
    
        it ('should add one element', function(){
            var socks = new Socks('Calvin Klein', 42, 'black', 9.99);
            
            var res = cart.add(socks)

            var expected = 5;

            expect (res === expected,'expected and result should be the same')
        });
    })

        it ('should fail when adding an item that is not an instance of product & when no param is passed', function (){
            
            var error;

            try {
                cart.add(5)
            } catch (err){
                error = err
            }
            expect (error,'expected and result should be the same')
            expect (error instanceof TypeError, 'should be a TypeError error ')
        })

        // .totalPrice()

    describe('testing cart.totalPrice()', function(){

        it ('should calculate total price ', function(){

            var res = cart.totalPrice()

            var expected = 102.92

            expect (res === expected.toString()), 'expected and result should be the same'
        });

    })

    describe('testing numberOfItems()', function(){

        it ('should calculate the total number of items', function(){

            var res = cart.numberOfItems()

            var expected = 5

            expect (res === expected), 'expected and result should be the same'
        })
    })

    describe('testing mostExpensive()', function(){

        it ('should return the most expensive product', function(){

            var res = cart.mostExpensive()

            var expected = "Bra"

            expect (res === expected), 'expected and result should be the same'
        })
    })

    describe('testing cheapest()', function(){

        it('should return the cheapest product', function(){

            var res = cart.cheapest();

            var expected = cart.cartItems[0];

            expect (res.toString() === expected.toString()), 'expected and result should be the same'
        })
    })

    describe ('testing numberOf(string)', function(){

        it('should return the number of objects of the argument', function(productType){
            var res = cart.numberOf(Clothing);

            var expected = 5

            expect (res === expected), 'expected and result should be the same'
        })
    
        it('should fail when the param is not a function', function(){

            var error;

            try{
                var res = cart.numberOf('patata')
            } catch (err){
                error = err
            }

            expect (error, 'there should be an error!')
        })
    })

    describe('testing productsByPriceRange()', function(){

        it ('should return the product', function(){
        
            var res = cart.productsByPriceRange(10, 20);

            var expected = [slips]

            expect (res[0] === expected[0] , 'result and expected should be the same')
        })
    })
})








