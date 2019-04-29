'use strict'

describe('some', function(){
    it('Should return false if no element in the array meets the condition', function(){
        var array=[1,2,3,4];
        var expected=false;
        var result;
        result=some(array,function(e){return e > 10});

        expect(expected, result);

    });

    it('Should return true if some element in the array meets the condition', function(){
       
        var array=[1,2,3,4];
        var expected=true;
        var result;
        result=some(array,function(e){return e > 2});

        expect(expected, result);

    });

    it('Should fail if the second argument is not a function', function(){
       var array=[1,2,3]
        try{
            
            some(array,'string');
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'string is not a function');

        }

    });
    it('Should fail on undefined array', function(){
       
        try{
            
            some();
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'undefined is not an array');

        }

    });

});