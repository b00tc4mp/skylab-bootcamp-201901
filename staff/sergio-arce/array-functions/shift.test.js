'use strict';

describe('shift', function() {

    it('should return the first element', function() {
        var array = [1, 2, 3];
        var result = shift(array);
        var exp = 1;
        
        expect(result, exp); 

    });

    it('should throw an error when result is undefined', function(){

        try {
            shift();
            
            throw Error('should not reach this point');
        } catch (error) {
            
            expect(error.message, `${undefined} is not an array`);
        }

    }); 

    
});

