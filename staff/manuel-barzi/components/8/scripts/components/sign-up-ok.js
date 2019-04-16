'use strict';

function SignUpOk(section, onNavigateToLogin) {
    Component.call(this, section);

    var link = this.container.children[0];

    link.addEventListener('click', function(event) {
        event.preventDefault();

        onNavigateToLogin();
    });
}

SignUpOk.prototype = Object.create(Component.prototype);
SignUpOk.prototype.constructor = SignUpOk;