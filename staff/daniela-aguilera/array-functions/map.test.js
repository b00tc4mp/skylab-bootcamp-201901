'use strict';

suite('map', function () {
    test('GOOD implementation', function () {
        var numbers = [1, 5, 10, 15];
        var result = []
        var expectedResult = [2, 10, 20, 30]
        result = map(numbers, function(num){
            return num * 2;
        })
        //  2
        // 10
        // 20
        // 30
        for (var i in expectedResult) {
            expect(result[i], expectedResult[i]);
        }

        var check = [1, 5, 10, 15];
        for (var i in check) {
             expect(check[i], numbers[i]);
         }
    });

    test('should break on undefined array', function () {
        try {
            map();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    test('should break when dont receive a callback', function () {
        try {
            map([2,4,5], "9");

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, '9 is not a function');
        }

    });
})









// test('should break on undefined callback', function () {
//     var array = [1, 2, 3];

//     try {
//         forEach(array);

//         throw Error('should not reach this point');
//     } catch (error) {
//         expect(error.message, 'undefined is not a function');
//     }
// });