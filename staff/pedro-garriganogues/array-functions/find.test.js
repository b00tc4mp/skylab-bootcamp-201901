suite('find', function(){
    
    describe('casos de exito', function(){
    
        it('CASE word coincidence', function () {

            var arr = [1, 2, 3, 4, 5];
            var expected = 4;
            var res = finder(arr, function (element) {
                return element > 3;
            });
        
            expect(res !== expected, 'parameter and result should be the same')
        
        });


    })


    describe('casos de error', function(){
    
        it('CASE object inside', function () {
            var arr = {};
            var error;
        
            try {
                finder(arr, function (element) {
                    return element;
                });     
            } catch (err) {
                error = err;
            }
            if (!error) throw Error('Se esperaba un error');
            if(error.message !== arr + ' is not an array') throw Error ('No es el mensaje esperado)');
        });


    })



});














