suite("slice", function(){
    describe('slice Function', function(){
        it('Base Case I - Result Ok', function(){
            var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];

            var resultexpected = ["Orange", "Lemon"]
            var result;
            try{
                result = slice(fruits,1,3)
            }catch(error){
                err = error
            }

            // if(err) throw new Error ('Shouldnt be any error')
            // if(cart.arraybuy.length !== expectedresult) throw new Error ('Array legth should have increased')
            expect(result.toString == resultexpected.toString , 'Should match the result')
        });
    })
    describe('slice Function', function(){
        it('Base Case I (negative values) - Result Ok', function(){
            var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];

            var resultexpected = ["Orange", "Lemon"]
            var result;
            try{
                result = slice(fruits,1,-2)
            }catch(error){
                err = error
            }

            // if(err) throw new Error ('Shouldnt be any error')
            // if(cart.arraybuy.length !== expectedresult) throw new Error ('Array legth should have increased')
            expect(result.toString == resultexpected.toString , 'Should match the result')
        });
    })

    describe('slice Function', function(){
        it('Bad argument type 2nd', function(){
            var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
            var err;
            try{
                slice(fruits, false, 1)
            }catch(error){
                err = error
            }
            debugger
            // if(err) throw new Error ('Shouldnt be any error')
            // if(cart.arraybuy.length !== expectedresult) throw new Error ('Array legth should have increased')
            expect(err , 'Type Error')
            
        });

        describe('slice Function', function(){
            it('Bad argument type', function(){
                var err;
                try{
                    slice(false, 1, 1)
                }catch(error){
                    err = error
                }
                debugger
                // if(err) throw new Error ('Shouldnt be any error')
                // if(cart.arraybuy.length !== expectedresult) throw new Error ('Array legth should have increased')
                expect(err , 'Type Error')
                
            });
    })

})