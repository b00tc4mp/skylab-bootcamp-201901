'use strict'

describe('map', function(){
    it('Should return an array where every elemnt has been modified by the function', function(){
        var array=[1,2,3];
        var expected=[2,4,6];
        var result;
        result=map(array,function(v) { return v * 2; });

        expect(expected, result, true);

    });

    it('Should fail if the first argument is not an array', function(){
       
        try{
            
            map('string',function(v) { return v * 2; });
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'string is not an array');

        }

    });

    it('Should fail if the second argument is not a function', function(){
       var array=[1,2,3]
        try{
            
            map(array,'string');
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'string is not a function');

        }

    });
    it('Should fail on undefined array', function(){
       
        try{
            
            map();
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'undefined is not an array');

        }

    });

});