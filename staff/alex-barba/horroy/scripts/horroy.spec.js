describe('Horroy', function() {

    describe('.concat', function() {
        it('should create a new Horroy with an Horroy as an argument', function() {
            var test = new Horroy(1,2,3);

            var testb = new Horroy(4,5,6);
            
            var horr = test.concat(testb);

            var expected = new Horroy(1,2,3,4,5,6);

            expect(horr.toString()).toBe(expected.toString()); 
        });

        it('should create a new Horroy with an Array as an argument', function() {
            var test = new Horroy(1,2,3);

            var testb = [4,5,6];
            
            var horr = test.concat(testb);

            var expected = new Horroy(1,2,3,4,5,6);

            expect(horr.toString()).toBe(expected.toString()); 
        });

        it('should create a new Horroy with a Number as an argument', function() {
            var test = new Horroy(1,2,3);

            var testb = 4;
            
            var horr = test.concat(testb);

            var expected = new Horroy(1,2,3,4);

            expect(horr.toString()).toBe(expected.toString()); 
        });

        it('should create a new Horroy with a String as an argument', function() {
            var test = new Horroy(1,2,3);

            var testb = 'àlex';
            
            var horr = test.concat(testb);

            var expected = new Horroy(1,2,3,'àlex');

            expect(horr.toString()).toBe(expected.toString()); 
        });

        it('should create a new Horroy with multiple arguments', function() {
            var test = new Horroy(1,2,3);

            var testb = 4;

            var testc = [5,6];

            var testd = 'àlex';
            
            var horr = test.concat(testb, testc, testd);

            var expected = new Horroy(1,2,3,4,5,6,'àlex');

            expect(horr.toString()).toBe(expected.toString()); 
        });
    });

    describe('.copyWithin', function() {
        it('passing 1 argument', function() {
            var test = new Horroy(1,2,3,4,5);

            var horr = test.copyWithin(3);

            var expected = new Horroy(1,2,3,1,2);

            expect(horr.toString()).toBe(expected.toString()); 
        });

        it('passing target value equal than horroy length', function() {
            var test = new Horroy(1,2,3,4,5);

            var horr = test.copyWithin(5);

            var expected = new Horroy(1,2,3,4,5);

            expect(horr.toString()).toBe(expected.toString()); 
        });

        it('passing target and start arguments', function() {
            var test = new Horroy(1,2,3,4,5);

            var horr = test.copyWithin(1,2);

            var expected = new Horroy(1,3,4,5,5);

            expect(horr.toString()).toBe(expected.toString()); 
        });
    });
});