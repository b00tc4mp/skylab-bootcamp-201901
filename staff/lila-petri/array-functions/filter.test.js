'use strict';

describe('filter',function(){

    it('Should create a new array form an specific condition', function(){
        var array=[1,2,3,4,5];
        var expected=[1];
        var result;
        
        result=filter(array, function(v) { return v < 2; }); 
        expect(result, expected, true);
        var check=[1,2,3,4,5]
        expect(array, check, true); 
    });

    it('Should fail on undefined arguments', function(){
        try{
            filter();
            throw Error('should not reach this point');
        }catch(error){
            expect(error.message,'undefined is not an array');
        }
    });

    it('Should fail if the first argument is not an array', function(){
        
        try{
            filter('string', function(v) { return v < 2; });
            throw Error('should not reach this point');
        }catch(error){
            expect(error.message,'string is not an array');
        }
    });

    it('Should fail if the second argument is not a function', function(){
        
        try{
            filter([1,2,3], [1,2,3]);
            throw Error('should not reach this point');
        }catch(error){
            expect(error.message,'1,2,3 is not a function');
        }
    });

    it('Should fail if the first argument null', function(){
        
        try{
            filter(null, function(v) { return v < 2; });
            throw Error('should not reach this point');
        }catch(error){
            expect(error.message,'null is not an array');
        }
    });

    it('Should fail if the second argument is null', function(){
        
        try{
            filter([1,2,3], null);
            throw Error('should not reach this point');
        }catch(error){
            expect(error.message,'null is not a function');
        }
    });

    it('Should fail if arguments are in incorrect order', function(){
        
        try{
            filter(function(v) { return v < 2; }, [1,2,3]);
            throw Error('should not reach this point');
        }catch(error){
            expect(error.message,'function(v) { return v < 2; } is not an array');
        }
    });

});
