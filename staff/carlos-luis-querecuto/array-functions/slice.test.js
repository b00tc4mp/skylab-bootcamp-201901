'use strict';

description('slice', function () {

    it('should break on undefined array', function () {
        try {
            slice();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
});



