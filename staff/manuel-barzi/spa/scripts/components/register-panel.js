'use strict'

class RegisterPanel extends Panel {
    constructor() {
        super($(`<section class="register">
    <h2>Register</h2>
    <form class="register__form">
        <label for="name">Name:</label>
        <input type="text" name="name" placeholder="name" required>
        <label for="surname">Surname:</label>
        <input type="text" name="surname" placeholder="surname" required>
        <label for="email">E-mail:</label>
        <input type="email" name="email" placeholder="email" required>
        <label for="password">Password:</label>
        <input type="password" name="password" placeholder="password" required>
        <label for="password">Confirm Password:</label>
        <input type="password" name="password-confirmation" placeholder="password" required>
        <button type="submit">Register</button>
    </form>
</section>`));

        var $container = this.$element;

        this.__$form__ = $container.find('form');
        var $form = this.__$form__;

        this.__$nameInput__ = $form.find('input[name=name]');

        this.__$surnameInput__ = $form.find('input[name=surname]');

        this.__$emailInput__ = $form.find('input[type=email]');

        this.__$passwordInput__ = $form.find('input[name=password]');

        this.__$passwordConfirmationInput__ = $form.find('input[name=password-confirmation]');

        var errorPanel = new ErrorPanel;
        $container.append(errorPanel.$element);
        this.__errorPanel__ = errorPanel;

        var $loginLink = $('<a href="#" class="register__login-link">Login</a>');
        $container.append($loginLink)
        this.__$loginLink__ = $loginLink;
    }

    set onRegister(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault();

            var name = this.__$nameInput__.val();
            var surname = this.__$surnameInput__.val();
            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();
            var passwordConfirmation = this.__$passwordConfirmationInput__.val();

            callback(name, surname, email, password, passwordConfirmation);
        });
    }

    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }

    clear() {
        this.__$nameInput__.val('');
        this.__$surnameInput__.val('');
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
        this.__$passwordConfirmationInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    }

    set onGoToLogin(callback) {
        this.__$loginLink__.on('click', callback);
    }
}