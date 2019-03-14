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

            expect(function(){
                horr.indexOf('f', 3, 45, 5);
            }).toThrowError(Error, 'too many arguments');
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

        it('should returns an empty string from an empty array', function () {
            var horr = new Horroy;
            var resultHorr = horr.toString();
            expectedResult = '';

            expect(horr.length).toEqual(0);
            expect(resultHorr).toEqual(expectedResult);
            expect(typeof resultHorr === 'string').toBeTruthy();
        });
    });

    describe(('filter'), function () {
        it('should create a new array only with odd numbers only', function () {
            var horr = new Horroy(1, 2, 3, 4);
            debugger
            var newHorr = horr.filter(function (item) {
                return item % 2 !== 0;
            });
            var expectedHorr = [1, 3];

            expect(newHorr.length).toEqual(2);
            expect(newHorr[0]).toEqual(1);
            expect(newHorr[1]).toEqual(3);
            expect(newHorr.toString()).toEqual(expectedHorr.toString());
            expect(newHorr instanceof Horroy).toBe(true); //equal to:
            expect(newHorr instanceof Horroy).toBeTruthy();
        });

        it('should create an empty array if not found any element that match the condition', function () {
            var horr = new Horroy(1, 3, 5, 7);
            var newHorr = horr.filter(function (item) {
                return item % 2 === 0;
            });
            var expectedHorr = [];

            expect(newHorr.length).toEqual(0);
            expect(newHorr[0]).toBeUndefined();
            expect(newHorr instanceof Horroy).toBe(true); //equal to:
            expect(newHorr instanceof Horroy).toBeTruthy();
        });

        it('should thrown a TypeError using a string instead a function callback', function(){
            var horr = new Horroy('hola', 'adios');
            var callback = '';
            expect(function(){
              var newHorr = horr.filter(callback);  
            }).toThrowError(TypeError, callback + ' is not a function');
        });
    });

    describe(('find'), function () {
        it('should thrown a TypeError using a string instead a function callback', function(){
            var horr = new Horroy('hola', 'adios');
            var callback = '';
            
            expect(function() {
            
              var newHorr = horr.find(callback);  
              console.log(newHorr);
            })
            .toThrowError(Error, callback + ' is not a function');
            //duda: me falta comprobar el tipo de error

        });
    });

    describe(('join'), function () {
        it('should concatenate every item in the horroy without separator ', function(){
            var horr = new Horroy('hola', 'adios');
            var resultString = horr.join();

            expect(resultString).toBe('hola,adios');
            expect(resultString.length).toBe(10);
            expect(typeof resultString === 'string').toBeTruthy();
        });

        it('should concatenate every item in the horroy with comma separator', function(){
            var horr = new Horroy('hola', 'adios');
            var separator = ',';
            var resultString = horr.join(separator);

            expect(resultString).toBe('hola,adios');
            expect(resultString.length).toBe(10);
            expect(typeof resultString === 'string').toBeTruthy();
        });

        it('should concatenate every item in the horroy with empty string separator', function(){
            var horr = new Horroy('hola', 'adios');
            var separator = '';
            var resultString = horr.join(separator);

            expect(resultString).toBe('holaadios');
            expect(resultString.length).toBe(9);
            expect(typeof resultString === 'string').toBeTruthy();
        });

        it('should returns empty string if receiving an empty horroy', function(){
            var horr = new Horroy;
            var resultString = horr.join();
            var separator = '';

            expect(resultString).toBe(separator);
            expect(resultString.length).toBe(0);
            expect(typeof resultString === 'string').toBeTruthy();
        });
    });

});