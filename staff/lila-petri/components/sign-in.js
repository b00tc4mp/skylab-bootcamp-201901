'use strict';


function SignIn(form, callback, literals, defaultLanguage, onLanguageChange){
    this.__form__ = form;
    this.__literals__ = literals;
    this.__onLanguageChange__ = onLanguageChange;

    this.language = defaultLanguage;

    this.onSubmit(callback);
}
SignIn.prototype.onSubmit = function(callback) {
    this.__form__.addEventListener('submit', function (event) {
        event.preventDefault();

        var email = this.email.value;
        var password = this.password.value;

        callback(email, password);
    });
};

Object.defineProperty(SignIn.prototype, 'language', {
    set: function(language) {
        var literals = this.__literals__[language];

        this.__form__.children[0].innerText = literals.title;
        this.__form__.email.placeholder = literals.email;
        this.__form__.password.placeholder = literals.password;

        this.__form__.children[2].innerText = literals.title;

        if (this.__onLanguageChange__) this.__onLanguageChange__(language);
    }
});