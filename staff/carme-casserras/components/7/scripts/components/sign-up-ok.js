'use strict';

function SignUpOk(section, onNavigateToLogin) {
    this.__section__ = section;

    var link = this.__section__.children[0];

    link.addEventListener('click', function(event) {
        event.preventDefault();

        onNavigateToLogin();
    });
}

Object.defineProperty(SignUpOk.prototype, 'visible', {
    set: function(visible) {
        this.__section__.style.display = visible ? 'block' : 'none';
    }
});