'use strict'

describe('reduce', function(){
    it('Should return an accumulated value ', function(){
        var array=[1,2,3];
        var expected=6;
        var result;
        result=reduce(array,function(a,v) {return a+v;});

        expect(expected, result);

    });

    it('Should fail if the first argument is not an array', function(){
       
        try{
            
            reduce('string',function(v) { return v * 2; });
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'string is not an array');

        }

    });

    it('Should fail if the second argument is not a function', function(){
       var array=[1,2,3]
        try{
            
            reduce(array,'string');
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'string is not a function');

        }

    });

    it('Should fail on undefined array', function(){
       
        try{
            
            reduce();
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'undefined is not an array');

        }

    });

});