'use strict'

describe('sort', function(){
    it('Should order elemnts ian the array ', function(){
        var array=[5,2,1,3,5,1];
        var expected=[1,1,2,3,5,5];
        var result;
        result=sort(array);

        expect(expected, result, true);

    });

    it('Should return the same array if it an empty array', function(){
       
        var array=[];
        var expected=[];
        var result;
        result=sort(array);

        expect(expected, result, true);

    });

    it('Should fail on undefined array', function(){
       
        try{
            
            sort();
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'undefined is not an array');

        }

    });

});