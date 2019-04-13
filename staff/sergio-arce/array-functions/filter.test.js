'use strict';

describe('filter', function(){

    it('should return new array with all the elements that fulfill the condition implemented by the given function', function(){
        var array = [1, 2, 3, 4];
        var result = filter(array, function(v){return v > 2})
        var exp = [3, 4];
        expect(result, exp);
    });
    
});



// console.log('DEMO', 'filter');

// var num = [1, 2, 3, 4];

// console.log('case 1');
// console.log(filter(num, function(element){ return element <= 2;}));
// // [1, 2]


// console.log('case 2');
// console.log(filter(num, function(element){ return element > 2;}));
// // [3, 4]

