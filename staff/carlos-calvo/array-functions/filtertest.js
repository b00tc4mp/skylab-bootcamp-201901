/*

function suite(suiteTitle) {
    console.log('%c TEST ' + suiteTitle, 'font-weight: bold; font-size: 50px; color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
}

function test(useCaseDescription, useCaseExpression) {
    try {
        useCaseExpression();

        console.log('%c CASE ' + useCaseDescription, 'color: green;');
    } catch (err) {
        console.error('CASE ' + useCaseDescription);

        console.error(err);
    }
}*/


suite("Filter", function(){
    describe('.Filter Function', function(){
        it('Base Case I - Result Ok', function(){
            var array = [0,1,2,3,4,5,6,7,8,9,10]
            var expected = 8
            var arrayresult =[]
            var err;
            try{
                arrayresult = filter(array,function(element){
                    return element > 2
                } )  
            }catch(error){
                err = error
            }

            // if(err) throw new Error ('Shouldnt be any error')
            // if(cart.arraybuy.length !== expectedresult) throw new Error ('Array legth should have increased')
            expect(!err, 'Shouldnt be any error')
            expect(expected == arrayresult.length , 'Should match the result')
        });
    })

    describe('.Filter Function', function(){
        it('Incorrect Result - Too many arguments', function(){
            var array = [0,1,2,3,4,5,6,7,8,9,10]
            var expected = 8
            var arrayresult =[]
            var err;
            try{
                arrayresult = filter(array,false,function(element){
                    return element > 2
                } )  
            }catch(error){
                err = error
            }

            // if(err) throw new Error ('Shouldnt be any error')
            // if(cart.arraybuy.length !== expectedresult) throw new Error ('Array legth should have increased')
            expect(err, 'Should be error')
        });
    })
})
