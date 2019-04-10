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

    it('Should break on undefined arguments', function(){
        try{
            filter();
            throw Error('should not reach this point');
        }catch(error){
            expect(error.message,'undefined is not an array');
        }
    });
  

});
