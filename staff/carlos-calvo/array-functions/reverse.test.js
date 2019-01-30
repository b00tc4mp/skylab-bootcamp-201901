

suite("Reverse", function(){
    describe('.Reverse Function', function(){
        it('Base Case', function () {
            
            var array = [1,2,3,4,5,6]
            var error;
            try {
                reverse(array)
            } catch (err) {
                error = err;
            }
            expect(!error, 'There shouldnt be any error')
        });
    });
    describe('.Reverse Function', function(){
        it('Base Case n = 1', function () {
            
            var array = [1]
            var error;
            try {
                reverse(array)
            } catch (err) {
                error = err;
            }
            expect(!error, 'There shouldnt be any error')
        });
    });
    describe('.Reverse Function', function(){
        it('Too many parameters', function () {
            
            var array = [1,2,3,4,5,6]
            var error;
            try {
                reverse(array, false)
            } catch (err) {
                error = err;
            }
            expect(error, 'There should be an error')
        });
    });
    describe('.Reverse Function', function(){
        it('Incorrect type', function () {
            
            var array = [1,2,3,4,5,6]
            var error;
            try {
                reverse(3)
            } catch (err) {
                error = err;
            }
            expect(error, 'There should be an error')
        });
    });
});