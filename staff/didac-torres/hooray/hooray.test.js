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

    describe('pop', function () {
        it('should retrieve the last value from an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var value = hooray.pop();

            expect(hooray.length, 2);

            expect(value, 3);

            expect(hooray, {0: 1, 1: 2, length: 2}, true);
        });

        it('should return undefined on empty hooray', function () {
            var hooray = new Hooray();

            var value = hooray.pop();

            expect(hooray.length, 0);

            expect(value, undefined);
        });

    });
});
