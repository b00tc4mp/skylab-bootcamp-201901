// TODO do it nice!
suite('Horroy', function() {

    describe('Create array', function() {
            
        it('should createa empty horrory', function() {
            var horroy = new Horroy();
            expect(horroy.length === 0, 'Unexpected value')
        });

        it('should createa horrory', function() {
            var horroy = new Horroy(1, 2, 3);
            expect(horroy.length === 3, 'Unexpected value length');
        });

    });

    describe('FUnction push', function() {
            
        it('should add new elements at the end of our horrory', function() {
            var horroy = new Horroy(1, 2, 3);
            
            horroy.push(4);
            
            var expected = new Horroy(1, 2, 3, 4);

            expect(horroy.toString() === expected.toString(), 'Unexpected value. The element has not been added.')
        });

        it('should add new elements at the end of our horrory and return the new length', function() {
            var horroy = new Horroy(1, 2, 3);
            
            var pushed = horroy.push(4);
            
            var expected = 4;

            expect((pushed === expected), 'Unexpected value.')
        });

    });

    describe('Function forEach()', function() {
            
        it('should fail if the argument is not a function', function() {
            var horroy = new Horroy(1, 2, 3);
            
            var error;

            try {
                horroy.forEach('function'); 
            } catch (err) {
                error = err;
            }
            
            expect(error, 'It should throw an error');
            expect(error instanceof TypeError, 'The error should be TypeError');
        });

        it('should return undefined', function() {
            var horroy = new Horroy();
            
            var result = horroy.forEach(function(element){
                console.log(element);
            });

            var expected = undefined;
            
            expect(result === expected, 'The function should return a undefined value');
        });

    });

    describe('Function map()', function() {
            
        it('should fail if the argument is not a function', function() {
            var horroy = new Horroy(1, 2, 3);
            
            var error;

            try {
                horroy.map('function'); 
            } catch (err) {
                error = err;
            }
            
            expect(error, 'It should throw an error');
            expect(error instanceof TypeError, 'The error should be TypeError');
        });

        it('should return a new generated array with the results of the call to the indicated function applied to each of its elements', function() {
            var horroy = new Horroy(1, 2, 3);
            
            var newArr = horroy.map(function (value) { return value * 2; }); 
            
            var expected = new Horroy(2, 4, 6);

            expect(newArr.toString() === expected.toString(), 'Unexpected value. The array has not been mapped.');
        });

    });

    describe('Function toString()', function() {
            
        it('should return a string of characters representing the specified array and its elements', function() {
            var horroy = new Horroy(1, 2, 3);
            
            var arrString = horroy.toString();
            
            var expected = '1,2,3';
            
            expect(arrString === expected, 'Unexpected value.')
        });

    });

});

// var horroy = new Horroy(1, 2, 3); // ~ [1, 2, 3]

// horroy.push(4);
// horroy.push(5);

// horroy.forEach(function (value) { console.log(value); }); // 1, 2, 3, 4, 5

// var horroy2 = horroy.map(function (value) { return value * 2; });

// console.log(horroy2.toString()); // 2,4,6,8,10

