suite('indexOf', function(){
    
    describe('casos de exito', function(){
    
        it('CASE word coincidence', function () {


            var arr = ['a', 'b', 'a', 'c', 'a', 'd'];
            var data = 'a';
            
            var expected = [0,2,4];

            var res = indexio(arr, data, function (element) {
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
                indexio(arr, data, function (element) {
                    return element;
                });     
            } catch (err) {
                error = err;
            }
            if (!error) throw Error('Se esperaba un error');
        });


    })



});














