describe('indexOf', function () {
    it('should return the index of a given element when no index is passed by', function () {
        var array = [1, 2, 5, 9, 10 ,3];
        var result = indexOf(array, 5);
        var indexExpected = 2;

        expect(result, indexExpected);
        
    });

    it('should break when no arguments are passed', function () {
        try{ 
            indexOf();
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,' no arguments are passed.');
        }
    });

    it('should break when fisrt argument is not an array', function () {
        try{ 
            var array = [1, 2, 5, 9, 10 ,3];
            var num = 6;
            indexOf(num, array, 1);
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,num +' first arguments is not an array');
        }
    });

    it('should break when thirth argument is not an number', function () {
        try{ 
            var array = [1, 2, 5, 9, 10 ,3];
            var element = 5;
            var badIndex = 'a';
            indexOf(array, element, badIndex);
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message, badIndex +' is not a number');
        }
    });

    

});
