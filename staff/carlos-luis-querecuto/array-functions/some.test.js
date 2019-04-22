describe('some', function(){
    it('should return true if one o more elements in the array passes the test', function(){
        var array = [1,2,3,4];
        var result = some(array, function(v){return v > 3 });
        var expected = true;
        expect(result,expected);
    });

    it('should return false if one element in the array not pass the test', function(){
        var array = [1,2,3,4];
        var result = some(array, function(v){return v > 5 });
        var expected = false;

        expect(result,expected);
    });

    it('should fail when not pass an array', function () {
        try {
            some();
            throw Error('should not reach this point')
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should fail when not pass a function', function () {
        var array = [1, 2, 3, 4];
        try {
            some(array);
            throw Error('should not reach this point')
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });


}); 