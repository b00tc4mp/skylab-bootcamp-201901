describe('map', function () {
    it('should return new Array with the mapped values into it', function () {
        var array = [1, 2, 5, 9, 10 ,3];
        var check = [2, 4, 10, 18, 20, 6];
        var clbkFunction = function(element){
            return element * 2;
        }
        var mapResult = map(array, clbkFunction);
        expect(mapResult, check, true);
    });

    it('should iterate an array without altering it', function () {

        var array = [1, 2, 5, 9, 10 ,3];
        var check = [1, 2, 5, 9, 10 ,3];
        var clbkFunction = function(element){
            return element * 2;
        }
        map(array, clbkFunction);
        expect(array, check, true);
    });

    it('should break when no arguments are passed', function () {
        try{ 
            map();
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,' no arguments are passed.');
        }
    });

    it('should break on undefined array', function () {
        try{
            var f = function (v) { return v > 5}; 
            map(function (v) { return v > 5});
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message, f + ' is not an array.');
        }
    });

    it('should break on undefined callback', function () {
        try{
            var array = [1, 2, 3];
            var num = 5;
            map(array, num);
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message, num + ' is not a function');
        }
    });

    it('should break when to many arguments are passed', function () {
        try{
            var array = [1, 2, 3];
            var f = function (v) { return v > 5}; 
            var num2 = 4;
            map(array, f, num2);
            throw Error('should not reach this point');
        } catch(error) {
            expect(error.message,' to many arguments passed.');
        }
    });

});
