suite('reverse', function () {

    describe('casos de exito', function () {

        it(' should coincide expected and arr', function () {
            var arr = [1, 2, 3, 4, 5];
            var expected = [5,4,3,2,1];
            var res = reverser(arr);

            expect(res === expected, 'parameter and result should be the same')

        });
    
            it('should not have an object as array', function () {
                var arr = {};
                var error;
            
                try {
                    reverser(arr, function (element) {
                        return element;
                    });     
                } catch (err) {
                    error = err;
                }
                if (!error) throw Error('Se esperaba un error');
                if(error.message !== arr + ' is not an array') throw Error ('No es el mensaje esperado)');            });
    
    })

    it('should work with an empty space', function () {
        var arr = '';
        var error;
    
        try {
            reverser(arr, function (element) {
                return element;
            });     
        } catch (err) {
            error = err;
        }
        if (!error) throw Error('Se esperaba un error');
        if(error.message !== arr + ' is not an array') throw Error ('No es el mensaje esperado)');            });


});



