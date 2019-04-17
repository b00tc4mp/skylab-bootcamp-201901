'use strict';

/**
 * Sign-in.
 * 
 * @param {*} form 
 * @param {Function} onSignIn The callback invoked on sign-in.
 * @param {*} literals 
 * @param {*} defaultLanguage 
 * @param {Function} onLanguageChange The callback invoked on language change.
 */
function SignIn(form, onSignIn, literals, defaultLanguage, onLanguageChange) {
    this.__form__ = form;
    this.__literals__ = literals;
    this.__onLanguageChange__ = onLanguageChange;

    this.language = defaultLanguage;

    this.onSignIn = onSignIn;
}

Object.defineProperty(SignIn.prototype, 'onSignIn', {
    set: function (callback) {
        this.__form__.addEventListener('submit', function (event) {
            event.preventDefault();

            var email = this.email.value;
            var password = this.password.value;

            callback(email, password);
        });
    }
});

Object.defineProperty(SignIn.prototype, 'language', {
    set: function (language) {
        var literals = this.__literals__[language];

        this.__form__.children[0].innerText = literals.title;

        this.__form__.email.placeholder = literals.email;
        this.__form__.password.placeholder = literals.password;

        this.__form__.children[2].innerText = literals.title;

        if (this.__onLanguageChange__) this.__onLanguageChange__(language);
    }
});

Object.defineProperty(SignIn.prototype, 'visible', {
    set: function(visible) {
        this.__form__.style.display = 'none';
    }
});