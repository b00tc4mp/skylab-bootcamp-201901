'use strict';

describe('add all', function() {
    it('should add all numbers and show the result in console', function() {
        var log = console.log;

        var args;

        console.log = function() {
            args = arguments;

            // log(args); // nope! but...
            // log.apply(null, args);
        };

        addAll(1, 2, 3);

        expect(typeof args !== 'undefined', true);
        expect(args.length, 1);
        expect(args[0], 6);

        console.log = log;
    });
});