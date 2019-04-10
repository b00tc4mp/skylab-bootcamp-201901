'use strict';

/**
 * Keeps any secret safe, unnaccessible from any scope where its run.
 * 
 * @param {*} password The accessing password.
 * @param {*} secretOrNewPassword The secret to keep safe or the new password to update.
 * @param {[boolean]} changePassword If true indicates second argument is a new password and must be updated.
 */
var safeBox = (function() {
    var __password = '123';
    var __secret;

    function safeBox(password, secretOrNewPassword, changePassword) {
        if (password === __password) {
            if (arguments.length === 1) {
                return __secret;
            } else if (arguments.length === 2) {
                __secret = secretOrNewPassword;
    
                return true;
            } else if (arguments.length === 3 && changePassword) {
                __password = secretOrNewPassword;
    
                return true;
            }
        } else throw Error('wrong password');
    }

    return safeBox;
})();

