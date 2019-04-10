'use strict';

describe('filter', function(){

    it('description', function(){
        var num = [1, 2, 3, 4];
        var elem = 3
        var result = filter(elem)
        expect(  )
    }); 
    
});







console.log('DEMO', 'filter');

var num = [1, 2, 3, 4];

console.log('case 1');
console.log(filter(num, function(element){ return element <= 2;}));
// [1, 2]


console.log('case 2');
console.log(filter(num, function(element){ return element > 2;}));
// [3, 4]

