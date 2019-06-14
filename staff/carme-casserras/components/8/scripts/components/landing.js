'use strict';

function Landing(section, literals, onNavigateToRegister, onNavigateToLogin) {
    Component.call(this, section);

    this.__literals__ = literals;

    var links = this.container.children;

    links[0].addEventListener('click', function(event) {
        event.preventDefault();

        onNavigateToRegister();
    });

    links[2].addEventListener('click', function(event) {
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
        children[0].innerText = literals.register;
        children[1].innerText = literals.or;
        children[2].innerText = literals.login;
    }
});