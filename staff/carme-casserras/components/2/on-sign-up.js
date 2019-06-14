'use strict';

/**
 * 
 * 
 * @param {*} form 
 * @param {*} callback 
 */
function onSignUp(form, callback) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var name = this.name.value;
        var surname = this.surname.value;
        var email = this.email.value;
        var password = this.password.value;

        callback(name, surname, email, password);
    });
}