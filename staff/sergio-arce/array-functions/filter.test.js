'use strict';

// function filter(arr, callback) {
//     var result = [];
//     for (var i = 0; i < arr.length; i++) {
//         if (callback(arr[i])) {
//             result[result.length] = arr[i];
//         }
//     }
//     return result;
// }

describe('filter', function(){

    it('should return array filtered', function(){
        var array = [1, 2, 3, 4];
        var result = filter(array, function(v){return v > 2})
        var resFil = [3, 4];
        
        for (var i = 0; i < result.length; i++){
            expect(result[i], resFil[i])
        }
    });



    it('should throw an error when array is string',function(){
        var array = "asdgsd";

        try {
           filter(array, function(v){ return });
            
            throw Error('should not passed over here');
        } catch (error) {
            expect(error.message, `${array} is not an array`);
        }

    });

    it('should throw an error when callback is not a function',function(){
        var array = [1, 2, 3, 4];
        var callback = 2;

        try {
           filter(array, callback);
            
            throw Error('should not passed over here');
        } catch (error) {
            expect(error.message, `${callback} is not a function`);
        }

    });
    
});

