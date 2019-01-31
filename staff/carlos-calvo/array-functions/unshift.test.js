suite("Unshift", function(){
    describe('.Unshift Function', function(){
        it('Base Case I - Result Ok', function(){
            var array = [0,1,2]
            var expected = 5
            var result
            var err;
            try{
                result = unshift(array,-1,-2)
            }catch(error){
                err = error
            }

            // if(err) throw new Error ('Shouldnt be any error')
            // if(cart.arraybuy.length !== expectedresult) throw new Error ('Array legth should have increased')
            expect(!err, 'Shouldnt be any error')
            expect(expected == result , 'Should match the result')
        });
    })

    describe('.Unshift Function', function(){
        it('Incorrect Result - few arguments', function(){
            var array = [0,1,2,3,4,5,6,7,8,9,10]
            var err;
            try{
                unshift(array)
            }catch(error){
                err = error
            }
            expect(err, 'Should be error')
        });
    })

    describe('.Unshift Function', function(){
        it('Incorrect Result - Not an array', function(){
            var array = {}
            var err;
            try{
                unshift(array)
            }catch(error){
                err = error
            }
            expect(err, 'Should be error')
        });
    })
})