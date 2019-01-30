suite("Shift", function(){
    describe('.Shift Function', function(){
        it('base case I', function () {
            var error;
            var array =[1,2,3]
            try {
                array = shift(array)
            } catch (err) {
                error = err;
            }
            console.log(array)
            expect(!error, 'shouldnt be any error')
        });
    });
    
    describe('.Shift Function', function(){
        it('base case array.length=1', function () {
            var error;
            var array =[1]

            try {
                shift(array)
            } catch (err) {
                error = err;
            }
        
            expect(error, 'shouldnt be any error')
        });
    });

    describe('.Shift Function', function(){
        it('parameter is not an array I', function () {
            var error;
            var array = false;

            try {
                shift(array)
            } catch (err) {
                error = err;
            }
        
            expect(error, 'should be error, parameter not an array')
        });
    });
    
    describe('.Shift Function', function(){
        it('parameter is not an array II', function () {
            var error;
            var array = false;

            try {
                shift(array)
            } catch (err) {
                error = err;
            }
        
            expect(error, 'Error should appear parameter = false')
        });
    });
});
