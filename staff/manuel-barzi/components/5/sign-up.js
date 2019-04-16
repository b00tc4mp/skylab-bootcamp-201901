'use strict';

/**
 * 
 * @param {*} form 
 */
function SignUp(form, callback, literals, defaultLanguage, onLanguageChange) {
    this.__form__ = form;
    this.__literals__ = literals;
    this.__onLanguageChange__ = onLanguageChange;

    this.language = defaultLanguage;

    this.onSubmit = callback;
}

Object.defineProperty(SignUp.prototype, 'onSubmit', {
    set: function (callback) {
        this.__form__.addEventListener('submit', function (event) {
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

        this.__form__.children[0].innerText = literals.title;
        this.__form__.name.placeholder = literals.name;
        this.__form__.surname.placeholder = literals.surname;
        this.__form__.email.placeholder = literals.email;
        this.__form__.password.placeholder = literals.password;

        this.__form__.children[2].innerText = literals.title;

        if (this.__onLanguageChange__) this.__onLanguageChange__(language);
    }
});