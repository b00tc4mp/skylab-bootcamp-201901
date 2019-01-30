suite("splice", function(){
    describe('splice Function', function(){
        it('Base Case I - Result Ok', function(){
            var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
            var resultexpected = ['Banana','Orange','Lemon','Kiwi','Apple','Mango']
            var result;
            debugger
            try{
                result = splice(fruits, 2, 0, 'Lemon', 'Kiwi');
            }catch(error){
                err = error
            }

            // if(err) throw new Error ('Shouldnt be any error')
            // if(cart.arraybuy.length !== expectedresult) throw new Error ('Array legth should have increased')
            expect(result.toString == resultexpected.toString , 'Should match the result')
        });
    });
});