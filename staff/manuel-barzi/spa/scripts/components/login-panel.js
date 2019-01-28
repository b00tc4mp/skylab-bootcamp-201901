'use strict'

class LoginPanel extends Panel {
    constructor() {
        super($(`<section class="login container">
    <h2>Login</h2>
    <form class="login__form" >
        <div class="row">
            <div class="col text-center">
                <label for="email">E-mail:</label>
                <input type="email" name="email" placeholder="email" required>
            </div>
            <div class="col">
                <label for="password">Password:</label>
                <input type="password" name="password" placeholder="password" required>
            </div>
            <div class="col">
                <button type="submit">Login</button>
            </div>
            </div>
    </form>
</section>`));

        var $container = this.$element;

        var $form = $container.find('form');
        this.__$form__ = $form;

        this.__$emailInput__ = $form.find('input[type=email]');

        this.__$passwordInput__ = $form.find('input[type=password]');

        var errorPanel = new ErrorPanel;
        $container.append(errorPanel.$element);
        this.__errorPanel__ = errorPanel;

        var $registerLink = $('<a href="#" class="login__register-link">Register</a>');
        $container.append($registerLink);
        this.__$registerLink__ = $registerLink;
    }

    set onLogin(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault();

            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();

            callback(email, password);
        });
    }

    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }

    clear() {
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    }

    set onGoToRegister(callback) {
        this.__$registerLink__.on('click', callback);
    }
}