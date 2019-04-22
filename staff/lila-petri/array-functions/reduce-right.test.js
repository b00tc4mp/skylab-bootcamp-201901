'use strict'

describe('reduceRight', function(){
    it('Should return an accumulated value ', function(){
        var array=['a','b','c'];
        var expected='cba';
        var result;
        result=reduceRight(array,function(a,v) {return a+v;});

        expect(expected, result);

    });

    it('Should fail if the first argument is not an array', function(){
       
        try{
            
            reduceRight('string',function(a,v) {return a+v;});
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'string is not an array');

        }

    });

    it('Should fail if the second argument is not a function', function(){
       var array=[1,2,3]
        try{
            
            reduceRight(array,'string');
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'string is not a function');

        }

    });

    it('Should fail on undefined array', function(){
       
        try{
            
            reduceRight();
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'undefined is not an array');

        }

    });

});