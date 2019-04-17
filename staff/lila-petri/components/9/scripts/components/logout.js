'use strict';

function LoginOut(main, onLogout) {
    Component.call(this, main);

    this.onLogout = onLogout;
    
}

LoginOut.prototype = Object.create(Component.prototype);
LoginOut.prototype.constructor = LoginOut;

Object.defineProperty(LoginOut.prototype, 'onLogout', {
    set: function (callback) {
        this.container.children[1].addEventListener('click', function () {
            callback();
        });
    }
});

