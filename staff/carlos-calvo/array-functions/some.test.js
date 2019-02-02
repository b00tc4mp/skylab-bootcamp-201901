/**
 * suite("Unshift", function(){
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
 */



suite("Some", function(){

    describe('.Some Function', function(){
        it('Base Case I - Result Ok', function(){
            var array = [1,2,3,4,5,6]
            var error;
            var resultado;
            var resultadoesperado = true;
            try {
                resultado = some(array, function(a){
                    return a == 1
                })
            } catch (err) {
                error = err;
            }
            expect(!error,'Shouldnt be any error' )
            expect(resultado == resultadoesperado, 'Result should be fine')
        });
    });

    describe('Base Case - Found', function () {
        it('Base Case II - Result Ok', function(){
            var array = [1,2,3,4,5,6]
            var error;
            var resultado;
            var resultadoesperado = true;
            try {
                resultado = some(array, function(a){
                    return a == 1
                })
            } catch (err) {
                error = err;
            }

            expect(!error, 'Shouldnt be any error')
            expect(resultado == resultadoesperado, 'Should be fine!')
        })
    });


    describe('Base Case III - Not Found', function () {
        it('Base Case III - Result Ok', function(){
            var array = [1,2,3,4,5,6]
            var error;
            var resultado;
            var resultadoesperado = false;
            try {
                resultado = some(array, function(a){
                    return a == -2
                })
            } catch (err) {
                error = err;
            }
            expect(!error,'Shouldnt be any error' )
            expect(resultado == resultadoesperado, 'Should be fine!')
        });
    });
    describe('Incorrect parameter', function () {
        it('Base Case I - Result BAD', function(){
            var array = [1,2,3,4,5,6]
            var error;
            var resultado;
            var resultadoesperado = false;
            try {
                resultado = some(1, function(a){
                    return a == -2
                })
            } catch (err) {
                error = err;
            }
            expect(error, 'Should be an error type parameter!')
        });
    });
});