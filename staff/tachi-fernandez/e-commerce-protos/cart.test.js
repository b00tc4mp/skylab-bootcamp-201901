suite("cart", function () {

    describe("add function", function () {

        it("if there is not an argument" , function(){

            var Error;

            try {
                Cart.prototype.add();
            } catch (err) {
                error = err;
            }
        
            if (!error) throw Error('should have throw an error');
        });

        it("if argument is a string" , function(){

            var Error;

            try {
                Cart.prototype.add("hola");
            } catch (err) {
                error = err;
            }
        
            if (!error) throw Error('should have throw an error');

        });

    });

    describe("choose a type",function() {

        it("choose other type" , function(){

            Cart.prototype.numberOf(Underwear)

            expect("Underwear not is a function" , "should be a function"){
                if (typeof type !== 'function') throw TypeError(type + ' is not a function');
            expect()

            }
            expect(type !== Product && !(type.prototype instanceof Product) , type + ' is not a product type')
        

        });



    });


});