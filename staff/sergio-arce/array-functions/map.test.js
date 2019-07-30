'use strict';

describe('map', function(){

    it('should return an array multiplied by 2', function(){
        var arr = [1, 2, 3];
        var result = map(arr, function(x) {return x * 2});
        var exp = [2, 4, 6];

        for (let i = 0; i < arr.length; i++) {
            expect(result[i], exp[i])
        }
    });

    it('should throw an error when callback is string', function(){
        var arr = [1, 2, 3];
        var callback = 'esto no es una function';

        
        try {
            map(arr, callback);
            
            throw Error('should not arrive here');
        } catch (error) {
            
            expect(error.message, `${callback} is not a function`);
        }

    });

    it('should throw an error when array is string', function(){
        var arr = 'esto no es un array';
        
        try {
            map(arr);
            
            throw Error('should not arrive here');
        } catch (error) {
            
            expect(error.message, `${arr} in not an array`);
        }

    });
});









// console.log('DEMO', 'map');

// var a = [1, 2, 3];

// console.log('case 1');

// console.log(map(a, function(x){ return x + 2;}));

// console.log('case 2');

// console.log(map(a, function(x){ return x + 6;})); 