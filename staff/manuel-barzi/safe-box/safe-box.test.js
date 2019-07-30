'use strict';

describe('safe box', function () {
    it('should save secret and retrieve it correctly if password is right', function () {
        var saved = safeBox('123', 'my secret');

        expect(saved, true);

        var secret = safeBox('123');

        expect(secret, 'my secret');

        for (var key in window) {
            var value = window[key];

            expect(value === '123', false);
            expect(value === 'my secret', false);
        }
    });

    it('should break if password is wrong when trying to save a secret', function () {
        try {
            safeBox('456', 'my secret');

            throw Error('should not arrive here');
        } catch (error) {
            expect(error.message, 'wrong password');
        }
    });

    it('should break if password is wrong when trying to retrieve the secret', function () {
        safeBox('123', 'my secret');

        try {
            safeBox('456');

            throw Error('should not arrive here');
        } catch (error) {
            expect(error.message, 'wrong password');
        }
    });

    it('should break if password is wrong when trying to change password', function () {
        try {
            safeBox('456', '456', true);

            throw Error('should not arrive here');
        } catch (error) {
            expect(error.message, 'wrong password');
        }
    });

    it('should update to new password if current password is right', function () {
        safeBox('123', 'my secret');

        var updated = safeBox('123', '456', true);

        expect(updated, true);

        var secret = safeBox('456');

        expect(secret, 'my secret');

        for (var key in window) {
            expect(window[key] === '456', false);
        }
    });
});