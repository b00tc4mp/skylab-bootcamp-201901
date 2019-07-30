'use strict';

describe('reverse', function(){


    it('should return an array reverse', function(){
        var array = [1, 2, 3, 4];
        var result = reverse(array);
        var exp = [4, 3, 2, 1];

        for (var i = 0; i < result.length; i++)
            expect(result[i], exp[i]); 

    });

    it('should throw an error when arr not an array ', function() {

        try {
            reverse()
            
            throw Error('should not reach this point');
            
        } catch (error) {
            
            expect(error.message, `${undefined} is not an array`);
            
        }
       
    });
        
});
















// console.log('DEMO', 'reverse');

// var a = [1, 2, 3];

// console.log('case 1');

// console.log(reverse(a));

// console.log('case 2');

// var array1 = ['one', 'two', 'three'];

// console.log(reverse(array1));
