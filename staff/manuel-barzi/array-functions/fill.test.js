suite('fill', function() {
    describe('combinations of arguments', function() {
        it('should succeed with all arguments', function () {
            var arr = [1, 2, 3, 4, 5];
        
            var res = fill(arr, 0, 0, 2);
        
            var expected = [0, 0, 3, 4, 5];
        
            expect(res === arr, 'array and result should be the same');
            expect(res.toString() === expected.toString(), 'result should be the one expected');
            expect(arr.toString() === expected.toString(), 'array should have been changed to the one expected');
        });
        
        it('should succeed with 3 arguments', function () {
            var arr = [1, 2, 3, 4, 5];
        
            var res = fill(arr, 0, 2);
        
            var expected = [1, 2, 0, 0, 0];
        
            expect(res === arr, 'array and result should be the same');
            expect(res.toString() === expected.toString(), 'result should be the one expected');
            expect(arr.toString() === expected.toString(), 'array should have been changed to the one expected');
        });
        
        it('should succeed with 2 arguments', function () {
            var arr = [1, 2, 3, 4, 5];
        
            var res = fill(arr, 0);
        
            var expected = [0, 0, 0, 0, 0];
        
            expect(res === arr, 'array and result should be the same');
            expect(res.toString() === expected.toString(), 'result should be the one expected');
            expect(arr.toString() === expected.toString(), 'array should have been changed to the one expected');
        });
    });
    
    describe('with negative arguments', function() {
        it('should succeed with negative start and end', function () {
            var arr = [1, 2, 3, 4, 5];
        
            var res = fill(arr, 0, -3, -2);
        
            var expected = [1, 2, 0, 4, 5];
        
            expect(res === arr, 'array and result should be the same');
            expect(res.toString() === expected.toString(), 'result should be the one expected');
            expect(arr.toString() === expected.toString(), 'array should have been changed to the one expected');
        });
        
        
        it('should succeed with negative start only', function () {
            var arr = [1, 2, 3, 4, 5];
        
            var res = fill(arr, 0, -3, 4);
        
            var expected = [1, 2, 0, 0, 5];
        
            expect(res === arr, 'array and result should be the same');
            expect(res.toString() === expected.toString(), 'result should be the one expected');
            expect(arr.toString() === expected.toString(), 'array should have been changed to the one expected');
        });
    });
    
    describe('when array is not an array', function() {
        it('should fail on object instead of array', function () {
            var error;
        
            try {
                fill({}, 0);
            } catch (err) {
                error = err;
            }
        
            expect(error, 'should have thrown an error');
            expect(error instanceof TypeError, 'should have thrown TypeError');
        });
        
        
        it('should fail on number instead of array', function () {
            var error;
        
            try {
                fill(1, 0);
            } catch (err) {
                error = err;
            }
        
            expect(error, 'should have thrown an error');
            expect(error instanceof TypeError, 'should have thrown TypeError');
        });
        
        it('should fail on boolean instead of array', function () {
            var error;
        
            try {
                fill(true, 0);
            } catch (err) {
                error = err;
            }
        
            expect(error, 'should have thrown an error');
            expect(error instanceof TypeError, 'should have thrown TypeError');
        });
    });
    
    describe('when exceeding the number of arguments', function() {
        it('should fail on more than 4 arguments', function () {
            var error;
        
            var arr = [1, 2, 3, 4, 5];
        
            try {
                fill(arr, 0, 1, 3, true);
            } catch (err) {
                error = err;
            }
        
            expect(error, 'should have thrown an error');
            expect(error instanceof Error, 'should have thrown TypeError');
        });

        it('should fail on more than 4 arguments independently from their types', function () {
            var error;
        
            try {
                fill({}, [], true, 3, 'a');
            } catch (err) {
                error = err;
            }
        
            expect(error, 'should have thrown an error');
            expect(error instanceof Error, 'should have thrown TypeError');
        });
    });
});