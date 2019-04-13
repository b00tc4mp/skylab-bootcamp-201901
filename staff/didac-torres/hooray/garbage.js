'use strict';

describe('slice', function () {
    !true && it('should return an sliced hooray', function () {
        var hooray = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant');

        var result = hooray.slice(1, 3);

        var expected = new Hooray('bison', 'camel');

        expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
    });

    !true && it('should return an sliced hooray with start index negative', function () {
        var hooray = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant');

        var result = hooray.slice(-2);

        var expected = new Hooray('duck', 'elephant');

        expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
    });

    !true && it('should return an sliced hooray with end index negative', function () {
        var hooray = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant');

        var result = hooray.slice(2, -1);

        var expected = new Hooray('camel', 'duck');

        expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
    });

    !true && it('should return an empty hooray', function () {
        var hooray = new Hooray('ant', 'bison', 'camel', 'duck', 'elephant');

        var result = hooray.slice(9);

        expect(result.length).toBe(0);
    });

    !true && it('should break on undefined hooray', function () {
        try {
            hooray.slice();
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message).toBe('undefined is not an hooray')
        }
    });

    !true && it('should break when start index is not a number and undefined', function () {
        try {
            var hooray = new Hooray('cat', 'dog', 'dino');
            hooray.slice('a');
            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message).toBe('a is not a number');
        }
    });

    !true && it('should break when end index is not a number and undefined', function () {
        try {
            var hooray = new Hooray('cat', 'dog');
            hooray.slice(2, 'a');
            throw Error('should not reach hits point');
        } catch (error) {
            expect(error.message).toBe('a is not a number');
        }
    });
});