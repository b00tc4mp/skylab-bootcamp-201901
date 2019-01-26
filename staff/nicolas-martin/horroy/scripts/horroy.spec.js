describe('Horroy', function() {
    describe('from', function() {
        it('should create a Horroy from string', function() {
            var string = 'hola mundo';
            var horr = Horroy.from(string);
            expect(horr.toString()).toBe(string.split('').toString());
        });

        it('should create a Horroy from arguments empty', function() {
            var horr = new Horroy;
            expect(horr.length).toBe(0);
            expect(horr).toBeDefined();
        });
    });

    describe('ishorroy', function() {
        it('should returns true if is a Horroy', function() {   
            var horr = new Horroy;
            var isHorroy2 = Horroy.isHorroy(horr);
            expect(isHorroy2).toBe(true);
        });

        it('should returns false if is not a Horroy', function() {   
            var arr = new Array;
            var isHorroy2 = Horroy.isHorroy(arr);
            expect(isHorroy2).toBeFalsy();
        });
    });

    describe('of', function() {
        it('should returns a Horroy from a number with one digit', function() {   
            var horr = Horroy.of(7);  

            expect(horr);
            expect(horr.length).toBe(1);
            expect(horr[0]).toBe(7);
        });

        it('should returns a Horroy from a number with nine digits', function() {   
            var horr = Horroy.of(123456789);  

            expect(horr);
            expect(horr.length).toBe(1);
            expect(horr[0]).toBe(123456789);
        });

        it('should returns a Horroy from an empty object', function() {   
            var horr = Horroy.of({});  

            expect(horr);
            expect(horr.length).toBe(1);
            expect(horr[0]).toEqual({});
        });

        it('should returns a Horroy from an empty array', function() {   
            var horr = Horroy.of([]);  

            expect(horr);
            expect(horr.length).toBe(1);
            expect(horr[0]).toEqual([]);
        });
    });

    describe('concat', function(){
        it('should returns a new Horroy joining 2 arrays', function() {   
            var arr1 = [1, 2, 3];
            var arr2 = [4, 5, 6];
            var horr = new Horroy;
            var resultHorr = horr.concat(arr1, arr2);

            expect(resultHorr);
            expect(resultHorr.length).toBe(6);
            expect(resultHorr[3]).toEqual(4);
        });

        it('should returns the same array when there is no arguments', function() {   
            var horr = new Horroy;
            var resultHorr = horr.concat();

            expect(resultHorr);
            expect(resultHorr.length).toBe(0);
            expect(resultHorr[1]).toBeUndefined();
        });
    });

    describe('every', function () {
        it('should returns true is all element are even', function () {
            var horr = new Horroy(2, 4, 6, 8, 10);
            var result = horr.every(function(value) {
                return value % 2 === 0
            });

            expect(result).toBeTruthy();
        });

        it('should returns false is all element are odd', function () {
            var horr = new Horroy(2, 4, 6, 8, 9);
            var result = horr.every(function(value) {
                return value % 2 === 0
            });

            expect(result).toBeFalsy();
        })
    });

    describe('indexOf', function () {
        it('should throw an error when arguments are bigger than 2', function () {
            var horr = new Horroy;
            expect(horr.indexOf('f', 3, 45, 5)).toThrowError('too many arguments', Error);
            expect(horr.indexOf('f', 3, 45, 5)).toThrow('too many arguments');
        });

        it('should succeed and returns the position 2 for the letter "c"', function () {
            var horr = new Horroy('a', 'b', 'c', 'd');
            var indexOf = horr.indexOf('c');

            expect(indexOf).toEqual(2);
        });

        it('should returns -1 when the search element is not found', function () {
            var horr = new Horroy('a', 'b', 'c', 'd');
            var indexOf = horr.indexOf('g');

            expect(indexOf).toEqual(-1);
        });
    });

    describe('map', function () {
        it('succeed returnig a new array where every member is multiplicated by 2', function () {
            var horr = new Horroy(1, 2, 3, 4, 5);
            var resultHorr = horr.map(function (item) {
                return item * 2;
            });

            expectedResult = [2, 4, 6, 8, 10];

            expect(resultHorr.length).toEqual(5);
            expect(resultHorr.toString()).toBe(expectedResult.toString());
        });

        it('succeed returnig an empty array from an empty array', function () {
            var horr = new Horroy;
            var resultHorr = horr.map(function (item) {
                return item * 2;
            });

            expect(resultHorr.length).toEqual(0);
        });
    });

    describe('toString', function () {
        it('succeed returnig a new string from an array', function () {
            var horr = new Horroy(1, 2, 3, 4, 5);
            var resultHorr = horr.toString();
            expectedResult = '1,2,3,4,5';

            expect(horr.length).toEqual(5);
            expect(resultHorr).toEqual(expectedResult);
        });
    });
});