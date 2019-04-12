'use strict';

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

    // .......................................................................................................... PUSH
    describe('push', function () {
        it('should add a value at the end of an array', function () {
            var hooray = new Horray(1, 2, 3);

            var length = hooray.push(4);

            expect(array.length, 4);
            expect(length, array.length);
            expect(hooray, {0:1,1:2,2:3,3:4,length:4}, true);
        });

        it('should add multiple values at the end of an array in order', function () {
            var array = [1, 2, 3];

            var length = push(array, 4, 5);

            expect(array.length, 5);

            expect(length, array.length);

            expect(array, [1, 2, 3, 4, 5], true);
        });

        it('should not add a non-provided value at the end of an array', function () {
            var array = [1, 2, 3];

            var length = push(array);

            expect(array.length, 3);

            expect(length, array.length);

            expect(array, [1, 2, 3], true);
        });

        it('should break on undefined array', function () {
            try {
                push();

                throw Error('should not arrive here');
            } catch (error) {
                expect(error.message, 'undefined is not an array');
            }
        });
    });



    describe('forEach', function () {
        it('should itearate an hooray without altering it', function () {
            var hooray = new Hooray(1, 2, 3);

            var result = new Hooray;

            hooray.forEach(function (v, i) { result.poush(v); });
            // 0 1
            // 1 2
            // 2 3

            expect(result, hooray, true);

            var expected = { 0: 1, 1: 2, 2: 3 };

            expect(hooray, expected, true);
        });

        it('should do nothing if hooray has not content', function () {
            var hooray = new Hooray;

            var result = new Hooray;

            hooray.forEach(function (v, i) { result[i] = v; });

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

    describe('concat', function () {






    });

























});
