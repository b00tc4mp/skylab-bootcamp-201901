'use strict';

function Landing(section, literals, onNavigateToRegister, onNavigateToLogin) {
    Component.call(this, section);

    this.__literals__ = literals;

    this.getChild(".landing__register").addEventListener('click', function(event) {
        event.preventDefault();

        onNavigateToRegister();
    });

    this.getChild(".landing__login").addEventListener('click', function(event) {
        event.preventDefault();

        onNavigateToLogin();
    });
}

Landing.prototype = Object.create(Component.prototype);
Landing.prototype.constructor = Landing;

Object.defineProperty(Landing.prototype, 'language', {
    set: function (language) {
        var literals = this.__literals__[language];

        var children = this.container.children;
        this.getChild(".landing__register").innerText = literals.register;
        this.getChild(".landing__middleText").innerText = literals.or;
        this.getChild(".landing__login").innerText = literals.login;
    }
});