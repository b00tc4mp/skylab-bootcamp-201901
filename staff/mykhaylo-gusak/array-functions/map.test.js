'use strick';

describe ('map', function () {
    it('Should works good!', function (){

        var numbers = [1, 2, 3];
        var result = []; // [2,4,6]
        var check = [2,4,6];

        result = map(numbers, function (x) {
    
            return x * 2;
          
        });
        // 2
        // 4
        // 6
        // result = [2,4,6];

        for ( var i in numbers) {
            expect(result[i],check[i]);
        }



    });
    it('Should break on undefined', function (){
        try {

            map();

            throw Error('should not reach this point');

        } catch (error) {

            expect(error.message, 'undefined is not an array');
       
        }



    });
    it('should break on undefined callback', function () {
        var array = [1, 2, 3];

        try {
            map(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});