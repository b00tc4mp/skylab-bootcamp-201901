'use strict';

/**
 * Register form.
 * 
 * @param {*} form 
 * @param {Funcion} onRegister The callback invoked on register.
 * @param {*} literals 
 * @param {*} defaultLanguage 
 * @param {*} onLanguageChange The callback invoked on language change.
 */
function Register(form, onRegister, literals, defaultLanguage, onLanguageChange) {
    Component.call(this, form);

    this.__literals__ = literals;
    this.__onLanguageChange__ = onLanguageChange;

    var feedback = new Feedback(this.container.children[3]);
    feedback.visible = false;
    this.__feedback__ = feedback;

    this.language = defaultLanguage;

    this.onRegister = onRegister;
}

Register.prototype = Object.create(Component.prototype);
Register.prototype.constructor = Register;

Object.defineProperty(Register.prototype, 'onRegister', {
    set: function (callback) {
        this.container.addEventListener('submit', function (event) {
            event.preventDefault();

            var name = this.name.value;
            var surname = this.surname.value;
            var email = this.email.value;
            var password = this.password.value;
            var confirmpassword = this.confirmpassword.value;

            callback(name, surname, email, password, confirmpassword);
        });
    }
});

Object.defineProperty(Register.prototype, 'language', {
    set: function (language) {
        var literals = this.__literals__[language];

        this.container.children[0].innerText = literals.title;
        this.container.name.placeholder = literals.name;
        this.container.surname.placeholder = literals.surname;
        this.container.email.placeholder = literals.email;
        this.container.password.placeholder = literals.password;
        this.container.confirmpassword.placeholder = literals.password;

        this.container.children[2].innerText = literals.title;

        if (this.__onLanguageChange__) this.__onLanguageChange__(language);
    }
});


//PONER ESTO MEJOR EN COMPONENTS?¿
Object.defineProperty(Register.prototype, 'error', {
    set: function(error) {
        this.__feedback__.message = error;
        this.__feedback__.visible = true;
    }
});