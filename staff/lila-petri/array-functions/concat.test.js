'use strict'

suite('concat', function(){

    test('Should create a new array from two arrays ', function(){
        var array=[1,2,3];
        var array2=[4,5,6];
        var result=concat(array, array2);
        var check=[1,2,3,4,5,6];
        
        for(var i in result){

            expect(result[i], check[i]);
       
        }
    });

    test('Should break with undefined arguments', function(){
       
        try{
            concat();
            throw Error('should not reach this point');

        }catch(error){

            expect(error.message, 'undefined is not an array');
        }

    });
    test('should break with one undefined argument', function(){
        var array=[1,2,3];
       
        try{

            concat(array);
            throw Error('should not reach this point')

        }catch(error){

            expect(error.message, 'undefined is not an array');
        }
    });

    test('Should break with the first argument as a String ', function(){
        var array=[1,2,3];

        try{
            concat('string', array);
            throw Error('should not reach this point')

        }catch(error){

            expect(error.message, 'string is not an array');
        }

    });

    test('Should break with the second argument as a String', function(){
        var array=[1,2,3];

        try{
            concat(array, 'string');
            throw Error('should not reach this point');

        }catch(error){

            expect(error.message,'string is not an array');
        }
    });

    test('Should break with both arguments as a string', function(){

        try{
            concat('string', 'string');
            throw Error('should not reach this point');
        }catch(error){

            expect(error.message, 'string is not an array');
        }

    });

    test('Should break with firt argument as a number', function(){
        var array=[1,2,3];

        try{
            concat(7,array);
            throw Error ('should not reach this point');
        }catch(error){
            expect(error.message,'7 is not an array');
        }
    });


});