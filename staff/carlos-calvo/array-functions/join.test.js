suite("join", function(){
    describe('.join Function', function(){
        it('base case I', function () {
            var error;
            var array =[1,2,3]
            try {
                array = join(array)
            } catch (err) {
                error = err;
            }
            expect(!error, 'shouldnt be any error')
        });
    });

    describe('.join Function', function(){
        it('bad arguments type', function () {
            var error;
            var array =[1,2,3]
            try {
                array = join(false)
            } catch (err) {
                error = err;
            }

            expect(error, 'should be an error')
        });
    });
});
    
    