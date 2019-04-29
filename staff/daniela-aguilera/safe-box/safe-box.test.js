'use strict';

describe('safe-box', function () {
    it('should save a secret and check the password and return true', function () {
        var saved = safeBox("123", "my secret");
        expect(save, true);
        var secret = safeBox("123");
        expect(secret, "my secret");
        });
        

    });