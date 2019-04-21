'use strict'

describe('reverse', function(){
    it('Should return an array with all its elements reversed.', function(){
        var array=[1,2,3];
        var expected=[3,2,1];
        var result;
        result=reverse(array);

        expect(expected, result, true);

    });

    it('Should fail if the first argument is not an array', function(){
       
        try{
            
            reverse('string');
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'string is not an array');

        }

    });

    it('Should fail on undefined array', function(){
       
        try{
            
            reverse();
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'undefined is not an array');

        }

    });

});