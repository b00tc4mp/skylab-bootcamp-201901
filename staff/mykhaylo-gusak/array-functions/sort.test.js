'use strict';

describe ('sort', function(){

it('should sort the array', function(){

    var numbers = [5,3,11,1,4,2,4];
    var expected = [1,11,2,3,4,5];

    sort();

    expect(numbers,expected)


});
it('should break on undefined call', function (){

    try{
        sort();
        
    }catch(error){
        expect(error.message,'undefined is not a function.')
    }




});



});