'use strict';

describe('isArray', function(){

    it('Should return true if the argument is an array', function(){
        var array=[1,2,3];
        var result;
        try{
            result=isArray(array);
            throw Error ('should not reach this point');
        }catch(error){
            expect(result, true);
        }
        
    });

    it('Should return false if the argument is an string', function(){
        var result;
        try{
            result=isArray('string');
            throw Error ('should not reach this point');
        }catch(error){
            expect(result,false);
        }
    });

    it('Should return false if the argument is a number', function(){
        var result;
        try{
            result=isArray(7);
            throw Error ('should not reach this point');
        }catch(error){
            expect(result,false);
        }
    });

    it('Should return false if the argument is an object', function(){
        var result;
        try{
            result=isArray({});
            throw Error ('should not reach this point');
        }catch(error){
            expect(result,false);
        }
    });
    
    it('Should return false on undefined array', function(){
        var result;
         try{
            result=isArray();
            throw Error ('should not reach this point');
         }catch(error){
            expect(result, false);
     }
    });


});
