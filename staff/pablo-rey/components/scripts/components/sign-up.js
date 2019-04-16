'use strict';

/**
 * Sign-up form.
 * 
 * @param {*} form 
 * @param {Funcion} onSignUp The callback invoked on sign-up.
 * @param {*} literals 
 * @param {*} defaultLanguage 
 * @param {*} onLanguageChange The callback invoked on language change.
 */
function SignUp(form, onSignUp, literals, defaultLanguage, onLanguageChange) {
    Component.call(this, form);

    this.__literals__ = literals;
    this.__onLanguageChange__ = onLanguageChange;

    this.language = defaultLanguage;

    this.onSignUp = onSignUp;
}

SignUp.prototype = Object.create(Component.prototype);
SignUp.prototype.constructor = SignUp;

Object.defineProperty(SignUp.prototype, 'onSignUp', {
    set: function (callback) {
        this.container.addEventListener('submit', function (event) {
            event.preventDefault();

            var name = this.name.value;
            var surname = this.surname.value;
            var email = this.email.value;
            var password = this.password.value;

            callback(name, surname, email, password);
        });
    }
});

Object.defineProperty(SignUp.prototype, 'language', {
    set: function (language) {
        var literals = this.__literals__[language];

        this.container.children[0].innerText = literals.title;
        this.container.name.placeholder = literals.name;
        this.container.surname.placeholder = literals.surname;
        this.container.email.placeholder = literals.email;
        this.container.password.placeholder = literals.password;

        this.container.children[2].innerText = literals.title;

        if (this.__onLanguageChange__) this.__onLanguageChange__(language);
    }
});