'use strict';

//HORRAY MAIN TEST
describe('hooray', function () {
    describe('constructor', function () {
        it('should construct an empty hooray when no arguments', function () {
            var hooray = new Hooray;

            expect(hooray.length, 0);
            expect(Object.keys(hooray).length, 1);
        });

        it('should construct a non-empty hooray when existing arguments', function () {
            var hooray = new Hooray(1, 2, 3);

            expect(hooray.length, 3);
            expect(hooray, { 0: 1, 1: 2, 2: 3, length: 3 }, true);
            expect(Object.keys(hooray).length, 4);
        });

        it('should construct an empty hooray with length equal to when only one numeric argument', function () {
            var hooray = new Hooray(1);

            expect(hooray.length, 1);
            expect(Object.keys(hooray).length, 1);
        });

        it('should construct a non-empty hooray with only one non-numeric argument', function () {
            var hooray = new Hooray('1');

            expect(hooray.length, 1);
            expect(hooray, { 0: '1', length: 1 }, true);
            expect(Object.keys(hooray).length, 2);
        });
    });

    //PUSH MAIN TEST
    describe('push', function () {
        it('should add a value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4);

            expect(hooray.length, 4);
            expect(length, hooray.length);
            expect(hooray, { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }, true);
        });

        it('should add multiple values at the end of an hooray in order', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4, 5);

            expect(hooray.length, 5);
            expect(length, hooray.length);
            expect(hooray, { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }, true);
        });

        it('should not add a non-provided value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push();

            expect(hooray.length, 3);
            expect(length, hooray.length);
            expect(hooray, { 0: 1, 1: 2, 2: 3, length: 3 }, true);
        });
    });

    //FOR EACH MAIN TEST    
    describe('forEach', function () {
        it('should itearate an hooray without altering it', function () {
            var hooray = new Hooray(1, 2, 3);

            var result = new Hooray;

            hooray.forEach(function (v, i) { result.push(v); });
            // 0 1
            // 1 2
            // 2 3

            expect(result, hooray, true);

            var expected = { 0: 1, 1: 2, 2: 3, length: 3 };

            expect(hooray, expected, true);
        });

        it('should do nothing if hooray has not content', function () {
            var hooray = new Hooray;

            var result = new Hooray;

            hooray.forEach(function (v, i) { result.push(v); });

            expect(result.length, 0);
        });

        it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);

            try {
                hooray.forEach();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message, 'undefined is not a function');
            }
        });
    });

    // EVERY
    describe('every', function () {
        it('should return true on all items matching condition', function () {
            var hooray = new Hooray(5, 2, 6);

            var result = hooray.every(function (v) { return v > 0; });

            expect(result, true);
        });

        it('should return false on any of the items not matching the condition', function () {
            var hooray = new Hooray(5, 2, 6);

            var result = hooray.every(function (v) { return v < 2; });

            expect(result, false);
        });

        it('should break on undefined callback', function () {
            var hooray = new Hooray(5, 2, 6);

            try {
                hooray.every();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message, 'undefined is not a function');
            }
        });
    }); 

    //SOME
    describe('some', function () {
        it('Should return true', function () {
            var a = new Hooray(1, 2, 3, 4, 5, 6);

            var result = a.some(function (v) { return v === 1 });

            expect(result, true);
        });

        it('should return false', function () {
            var a = new Hooray(1, 2, 3, 4, 5, 6);

            var result = a.some(function (v) { return v > 7 });

            expect(result, false);
        });

        it('should break on undefined callback', function () {
            var hooray = new Hooray(5, 2, 6);

            try {
                hooray.some();

                throw Error('should not reach this point');
            } catch (error) {
                expect(error.message, 'undefined is not a function');
            }
        });
    });

    // //SORT
    // describe('sort', function () {
    //     it('Should return the same array', function () {
    //         var answer = [1, 2, 3, 4, 5];
    //         var a = [1, 2, 3, 4, 5];

    //         try {
    //             sort(a);

    //             throw Error('should not reach this point');
    //         } catch (error) {
    //             expect(a, answer, true);
    //         }
    //     });


    //     it('should an error', function () {
    //         try {
    //             sort();

    //             throw Error('should not reach this point');
    //         } catch (error) {
    //             expect(error.message, 'undefined is not an array');
    //         }
    //     });

    //     it('Should return it ordenated', function () {
    //         var answer = [1, 3, 4, 5, 6];
    //         var a = [1, 3, 5, 4, 6];

    //         try {
    //             sort(a);

    //             throw Error('should not reach this point');
    //         } catch (error) {
    //             expect(a, answer, true);
    //         }
    //     });

    // });
});
