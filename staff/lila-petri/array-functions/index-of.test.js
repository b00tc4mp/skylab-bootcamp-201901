'use strict';

describe('indexOf', function(){
    it('Should return the index of the element given', function(){
        var array=[1,2,3];
        var searchElement=1;
        var expected=0;
        var result;
        result=indexOf(array,searchElement);

        expect(expected, result);

    });
    it('Should return -1 if the element does not exist on the array', function(){
        var array=[1,2,3];
        var searchElement=6;
        var expected=-1;
        var result;
        result=indexOf(array,searchElement);

        expect(expected, result);

    });

    it('Should return -1 if the searchElement is not send', function(){
        var array=[1,2,3];
        var searchElement=6;
        var expected=-1;
        var result;
        result=indexOf(array);
        expect(expected, result);

    });

    it('Should return -1 if the searchElement is a null', function(){
        var array=[1,2,3];
        var searchElement=null;
        var expected=-1;
        var result;
        result=indexOf(array);
        expect(expected, result);

    });

    it('Should return -1 if the searchElement is an object', function(){
        var array=[1,2,3];
        var searchElement={};
        var expected=-1;
        var result;
        result=indexOf(array);
        expect(expected, result);

    });

    it('Should fail if the first argument is not an array', function(){
       
        try{
            
            indexOf('string');
            throw Error ('should not reach this point');

        }catch(error){
            
            expect(error.message, 'string is not an array');

        }

    });


});