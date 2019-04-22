'use strict'

describe('splice', function(){
    it('Should return the array without an specific element', function(){
        var array=[1,2,3,4,5];
        var index=3;
        var expected=[1,2,3,5];
        var result;
        result=splice(array, index, 1);

        expect(expected, result, true);

    });
    
    it('Should fail on undefined arguments', function(){
       var index=3;
        try{
            
            splice();
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'undefined is not an array');

        }

    });

});