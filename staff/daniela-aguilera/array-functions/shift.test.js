'use strict';

describe('shift', function (){

it('should return first value of the array.', function(){
    var numbers = [1,2,3,4];
    var expected = 1;
    var result = shift(numbers);

    expect(result,expected); 

});

it('should break on undefined array',function (){
    try{
        shift();
    } catch (error){
        expect(error.message,'undefined is not an array');
    }

});

});