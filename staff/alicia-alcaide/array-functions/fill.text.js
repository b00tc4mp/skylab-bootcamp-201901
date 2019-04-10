'use strict';

describe('fill', function () {
    
    it('should Fills all the elements of an array from a start index to an end index', function () {
        var array = [1, 2, 3, 4];
        var arrayCkeck = [1, 2, 0, 0];

        fill(array,0, 2, 4);
        
        expect(array, arrayCkeck, true);

    });


    it('should break on undefined array', function () {
        try {
            fill();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });


    it('should break if value is not a string or number', function () {
        try {
            var array = [1, 2, 3, 4];
            var value = [];

            fill(array, value);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, (value + ' is not a number or string'));
        }
    });

    it('shounld break if start is not a number',function () {
        try {
            var array = [1, 2, 3, 4];
            var value = 2;
            var start = 'a';

            fill(array, value,start );

            throw Error('should not reach this point');            

        } catch (error) {
            expect();
        }
        
    });



    it('shounld break if end is informed but is not a number',function () {
        try {
            var array = [1, 2, 3, 4];
            var value = 2;
            var start = 2;
            var end = 'a';

            fill(array, value,start,end);

            throw Error('should not reach this point');            

        } catch (error) {
            expect();
        }
        
    });




});



