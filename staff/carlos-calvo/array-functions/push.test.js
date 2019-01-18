suite("Push", function(){
    describe('Push Function', function(){
        it('Base Case I - Result Ok', function(){
            var array = [0,1,2,3]
            var expected = 5
            var result
            var err;
            try{
                push(array, 1)
                result = array.length
            }catch(error){
                err = error
            }

            // if(err) throw new Error ('Shouldnt be any error')
            // if(cart.arraybuy.length !== expectedresult) throw new Error ('Array legth should have increased')
            expect(!err, 'Shouldnt be any error')
            expect(expected == result , 'Should match the result')
        });
    });
    describe('Push Function', function(){
        it('Base Case II - Inocrrect Result', function(){
            var array = [0,1,2,3]
            var expected = 5
            var result
            var err;
            try{
                push(false, 1)
                result = array.length
            }catch(error){
                err = error
            }

            // if(err) throw new Error ('Shouldnt be any error')
            // if(cart.arraybuy.length !== expectedresult) throw new Error ('Array legth should have increased')
            expect(err, 'Shouldnt be any error')
        });
    });
});