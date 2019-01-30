suite('some', function(){
    
    describe('casos de exito', function(){
    
        it('CASE word coincidence', function () {


            var arr = [1, 2, 3, 4, 5];
            var data = 4;
            
            var expected = [0,2,4];

            var res = somier(arr, data, function (element) {
                return element;
            });
        
            expect(res === expected, 'parameter and result should be the same')
        
        });


    })


    describe('casos de error', function(){
    
        it('CASE object inside', function () {
            var arr = {};
            var error;
        
            try {
                somier(arr, data, function (element) {
                    return element;
                });     
            } catch (err) {
                error = err;
            }
            if (!error) throw Error('Se esperaba un error');
        });


    })



});














