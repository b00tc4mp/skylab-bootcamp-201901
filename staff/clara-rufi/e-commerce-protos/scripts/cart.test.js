suite("Cart methods", function () {

    describe("add method", function () {

        it("succesful add values into a list", function () {

            var cart1 = new Cart()
            var sock = new Socks('Calvin Klein', 42, 'black', 9.99);

            cart1.add(sock)

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

        })


    })


    describe("totalPrice", function () {

        it("succesful calculatin total prices", function(){

        var cart1 = new Cart()

        var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);
        var slips = new Slips('Abanderado', 42, 'purple', 13.99);
        var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
        cart1.add(bra)
        cart1.add(slips)
        cart1.add(mobile)

        resulttotalprice = cart1.totalPrice = function(){
       
       resultexpected = 1051.99

       expect(resulttotalprice === resultexpected, "result must match the expected one")
        }

    })
        it("failing calculatin total prices", function () {

        var cart1 = new Cart()

        var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);
        var slips = new Slips('Abanderado', 42, 'purple', 13.99);
        var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', "a");
        cart1.add(bra)
        cart1.add(slips)
        cart1.add(mobile)

        resulttotalprice = cart1.totalPrice = function(){
        
        resultexpected = 1051.99

            try {
     
            var cart1 = new Cart()
            var error;
                cart1.totalPrice(price)
            } catch (err) {
                error = err;
            }

        expect(error, 'should have thrown an error');
        expect(error instanceof TypeError, 'should have thrown TypeError');

    }
})
})

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
    })

    it("failing calculating number of items", function () {

        var cart1 = new Cart()

        var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);
        var slips = new Slips('Abanderado', 42, 'purple', 13.99);
        var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
        var mobile2 = new Mobile('Xiaomi', '5X', 'space-rose', 119);
        cart1.add(bra)
        cart1.add(slips)
        cart1.add(mobile)
        cart1.add(mobile2)

        var totallength = cart1.numberOfItems([])

            try {
     
            var cart1 = new Cart()
            var error;
                cart1.numberOfItems([])
            } catch (err) {
                error = err;
            }

        expect(error, 'should have thrown an error');
        expect(error instanceof TypeError, 'should have thrown TypeError');

    })

})

    describe("mostexpensive", function () {

    it("succesful showing most expensive item", function(){

        var cart1 = new Cart()

        var bra = new Bra('Calvin Klein', 'push-up', 80, 'cream', 39);
        var slips = new Slips('Abanderado', 42, 'purple', 13.99);
        var mobile = new Mobile('Apple', 'iPhone X', 'space-gray', 999);
        cart1.add(bra)
        cart1.add(slips)
        cart1.add(mobile)
        console.log(cart1)

        expensivest = cart1.mostExpensive()
    console.log(expensivest)
        resultexpected = "Mobile"

   expect(expensivest === resultexpected, "result must match the expected one")
    })

})


})


