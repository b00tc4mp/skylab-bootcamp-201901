'use strict';

/**
 * Login form.
 * 
 * @param {*} form 
 * @param {Function} onLogin The callback invoked on login.
 * @param {*} literals 
 * @param {*} defaultLanguage 
 * @param {Function} onLanguageChange The callback invoked on language change.
 */
function Login(form, onLogin, literals, defaultLanguage, onLanguageChange) {
    Component.call(this, form);

    this.__literals__ = literals;
    this.__onLanguageChange__ = onLanguageChange;

    var feedback = new Feedback(this.container.children[3]);
    feedback.visible = false;
    this.__feedback__ = feedback;

    this.language = defaultLanguage;

    this.onLogin = onLogin;
}

Login.prototype = Object.create(Component.prototype);
Login.prototype.constructor = Login;

Object.defineProperty(Login.prototype, 'onLogin', {
    set: function (callback) {
        this.container.addEventListener('submit', function (event) {
            event.preventDefault();

            var email = this.email.value;
            var password = this.password.value;

            callback(email, password);
        });
    }
});

Object.defineProperty(Login.prototype, 'language', {
    set: function (language) {
        var literals = this.__literals__[language];

        this.container.children[0].innerText = literals.title;

        this.container.email.placeholder = literals.email;
        this.container.password.placeholder = literals.password;

        this.container.children[2].innerText = literals.title;

        if (this.__onLanguageChange__) this.__onLanguageChange__();
    }
});

Object.defineProperty(Login.prototype, 'error', {
    set: function(error) {
        this.__feedback__.message = error;
        this.__feedback__.visible = true;
    }
});