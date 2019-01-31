suite("map", function(){
    describe('map Function', function(){
        it('Base Case I - Result Ok', function(){
            var a = [1, 2, 3]
            var expectedresult = [11,12,13]
            var err;
            var res;
            debugger
            try{
                res = map(a, function (v) { return v + 10; });
            }catch(error){
                err = error
            }

            // if(err) throw new Error ('Shouldnt be any error')
            // if(cart.arraybuy.length !== expectedresult) throw new Error ('Array legth should have increased')
            expect(res.toString == expectedresult.toString , 'Should match the result')
            expect(!err , 'Shouldnt be any exception')
        });
    })

    describe('map Function', function(){
        it('Bad argument type', function(){
            var a = [1, 2, 3]
            var expectedresult = [11,12,13]
            var err;
            try{
                var res = map(false, function (v) { return v + 10; });
            }catch(error){
                err = error
            }

            // if(err) throw new Error ('Shouldnt be any error')
            // if(cart.arraybuy.length !== expectedresult) throw new Error ('Array legth should have increased')
            expect(!err , 'Type Error')
            
        });
    })

})