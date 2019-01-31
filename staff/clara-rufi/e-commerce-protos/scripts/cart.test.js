suite("Cart methods", function () {

    describe("add method", function () {

        it("succesful add values into a list", function () {

            var cart1 = new Cart();
            var sock = new Socks('Calvin Klein', 42, 'black', 9.99);

            cart1.add(sock);

            expect(cart1.products[0] === sock, "result must match the expected one")
        })

        it("fail adding not product values", function () {

            try {
   
            var cart1 = new Cart()
            var error;
                cart1.add("paper")
            } catch (err) {
                error = err;
            }

            expect(error, 'should have thrown an error');
            expect(error instanceof TypeError, 'should have thrown TypeError');
        });
    });

    describe("totalPrice", function () {

        it("succesful calculatin total prices", function(){

        var cart1 = new Cart()

        var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);
        var slips = new Slips('Abanderado', 42, 'purple', 13.99);
        var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
        cart1.add(bra);
        cart1.add(slips);
        cart1.add(mobile);

        resulttotalprice = cart1.totalPrice()
       
        resultexpected = 1051.99

       expect(resulttotalprice === resultexpected, "result must match the expected one")
        });
    });
 
    describe("numberOfItems", function () {

        it("succesful calculating number of items", function(){

        var cart1 = new Cart()

        var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);
        var slips = new Slips('Abanderado', 42, 'purple', 13.99);
        var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
        cart1.add(bra)
        cart1.add(slips)
        cart1.add(mobile)

        var totallength = cart1.numberOfItems()

        resultexpected = 3
        expect(totallength === resultexpected, "result must match the expected one")
        });
    });

    describe("mostexpensive", function () {
        
        it("succesful showing most expensive item", function(){

            var cart1 = new Cart();
            var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);
            var slips = new Slips('Abanderado', 42, 'purple', 13.99);
            var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
            cart1.add(bra);
            cart1.add(slips);
            cart1.add(mobile);
        
            expensivest = toString(cart1.mostExpensive());  
            resultexpected = toString([mobile]);
        
        expect(expensivest === resultexpected, "result must match the expected one")
        });
    });

    describe("cheapest", function () {
        
        it("succesful showing most cheaper item", function(){

            var cart1 = new Cart();
       
            var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);
            var slips = new Slips('Abanderado', 42, 'purple', 13.99);
            var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
    
            cart1.add(bra);
            cart1.add(slips);
            cart1.add(mobile);
        
            mostcheaper = toString(cart1.cheapest());       
            resultexpected = toString([slips]);
           
        expect(mostcheaper === resultexpected, "result must match the expected one")
        });
    });
        describe("number of items", function () {
        
            it("succesful showing number of items according to their type", function(){
    
                var cart1 = new Cart();
             
                var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);
                var slips = new Slips('Abanderado', 42, 'purple', 13.99);
                var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
        
                cart1.add(bra);
                cart1.add(slips);
                cart1.add(mobile);
        
                numberitems = cart1.numberOf(Clothing);       
                resultexpected = 2;
               
            expect(numberitems === resultexpected, "result must match the expected one")
            });
   
            it("failing showing number of items according to their type", function () {
  
                var error;
               
                try {
                    cart1.numberOf(Jewelry)
                   
                } catch (err) {
                    error = err;
                }
    
                expect(error, 'should have thrown an error');
            });
        });
        describe("products by range of price", function () {
        
            it("succesful showing products by range of pric", function(){
    
                var cart1 = new Cart();
             
                var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);
                var slips = new Slips('Abanderado', 42, 'purple', 13.99);
                var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
        
                cart1.add(bra);
                cart1.add(slips);
                cart1.add(mobile);
        
                pricerange = toString(cart1.productsByPriceRange(30,120));       
                resultexpected = toString([slips]);
               
            expect(pricerange === resultexpected, "result must match the expected one")
            });

            it("failing showing products by range of pric", function(){
                
                var error;
               
                try {
                    cart1.productsByPriceRange("mouse", "duck");
                   
                } catch (err) {
                    error = err;
                }     
               
                expect(error, 'should have thrown an error');
            });
        });
});


