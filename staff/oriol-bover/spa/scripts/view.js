'use strict';

//#region panel

function Panel($element) {
    this.$element = $element;
}

Panel.prototype.hide = function () {
    this.$element.hide();
};

Panel.prototype.show = function () {
    this.$element.show();
};

//#endregion

//#region login panel

function LoginPanel() {
    Panel.call(this, $('<section class="login">'
        + '<h2>Login</h2>'
        + '<form class="login__form">'
        + '<label for="email">E-mail:</label>'
        + '<input type="email" name="email" placeholder="email" required>'
        + '<label for="password">Password:</label>'
        + '<input type="password" name="password" placeholder="password" required>'
        + '<button type="submit">Login</button>'
        + '</form>'
        + '</section>'));



    var $container = this.$element;
    var $form = $container.children('form');
    this.__$form__ = $form;

    var $inputs = $form.children('input');
    this.__$emailInput__ = $($inputs[0]);
    this.__$passwordInput__ = $($inputs[1]);

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $registerLink = $('<a href="#" class="login__register-link">Register</a>');
    $container.append($registerLink);
    this.__$registerLink__ = $registerLink;
}

LoginPanel.prototype = Object.create(Panel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

Object.defineProperty(LoginPanel.prototype, 'onLogin', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {
            event.preventDefault();

            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();

            callback(email, password);
        }.bind(this));
    }
});

Object.defineProperty(LoginPanel.prototype, 'error', {
    set: function (message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
});

Object.defineProperty(LoginPanel.prototype, 'onRegisterPanel', {
    set: function (callback) {
        this.__$registerLink__.on('click', callback);
    }
});

LoginPanel.prototype.clear = function () {
    this.__$emailInput__.val('');
    this.__$passwordInput__.val('');
    this.__errorPanel__.innerText = '';
    this.__errorPanel__.hide();
};

//#endregion

//#region Home panel

function HomePanel() {
    Panel.call(this, $('<section class="welcome">'
    + '<h2>Welcome, <span class="welcome__name"></span></h2>'
    +  '<button class="welcome__logout">Logout</button>'
    +   '<form action="https://duckling-api.herokuapp.com/api/search" method="get">'
    +   '<input type="text" name="q"></input>'
    +   '<button type="submit">Search</button>'
    +   '</form>'
    + '</section>'));

    var $container = this.$element;
    this.__$userSpan__ = $container.children('h2').children('span');
    this.__$logoutButton__ =  $container.children('button')
    var $form = $container.children('form');
    this.__$duckForm__ = $form;
    var $inputs = $form.children('input');
    this.__$queryInput__ = $($inputs[0]);
    var $button = $form.children('button');
    this.__$submitButton__ = $button;

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $duckList = $('<ul></ul>');
    $container.append($duckList);
    this.__$duckList__ = $duckList;
}

HomePanel.prototype = Object.create(Panel.prototype);
HomePanel.prototype.constructor = HomePanel;

Object.defineProperty(HomePanel.prototype, 'user', {
    set: function (user) {
        
        this.__$userSpan__.text(user.name + '!');
    }
});

Object.defineProperty(HomePanel.prototype, 'onLogout', {
    set: function (callback) {
        this.__$logoutButton__.on('click', callback);
    }
});

Object.defineProperty(HomePanel.prototype, 'onSearch', {
    set: function (callback) {
        this.__$duckForm__.on('submit', function (event) {
            event.preventDefault();

            var searchVal = this.__$queryInput__.val();

            callback(searchVal);
        }.bind(this));
    }
});

Object.defineProperty(HomePanel.prototype, 'error', {
    set: function (message) {
       this.__errorPanel__.message = message;
       this.__errorPanel__.show();
    }
});

Object.defineProperty(HomePanel.prototype, 'listResults', {
    set: function (ducklings) {
        this.__$duckList__.text('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();

        ducklings.forEach(function (duckling) {
            var $item = $('<li>'+duckling.text+'<img src="'+duckling.image+'" width="100px"></li>');
            this.__$duckList__.append($item);
        }.bind(this));
    }
});

HomePanel.prototype.clear = function (all) {
    this.__$duckList__.text('');
    this.__errorPanel__.message = '';
    this.__errorPanel__.hide();
    if(all) this.__$queryInput__.val('');
}

//#endregion

//#region register panel

function RegisterPanel() {
    Panel.call(this,$('<section class="register">'
        + '<h2>Register</h2>'
        + '<form class="register__form">'
        + '<label for="name">Name:</label>'
        + '<input type="text" name="name" placeholder="name" required>'
        + '<label for="surname">Surname:</label>'
        + '<input type="text" name="surname" placeholder="surname" required>'
        + '<label for="email">E-mail:</label>'
        + '<input type="email" name="email" placeholder="email" required>'
        + '<label for="password">Password:</label>'
        + '<input type="password" name="password" placeholder="password" required>'
        + '<label for="password">Confirm Password:</label>'
        + '<input type="password" name="password-confirmation" placeholder="password" required>'
        + '<button type="submit">Register</button>'
        + '</form>'
        + '</section>'));

    var $container = this.$element;
    var $form = $container.children('form');
    this.__$form__ = $form;

    var $inputs = $form.children('input');
    this.__$nameInput__ = $($inputs[0]);
    this.__$surnameInput__ = $($inputs[1]);
    this.__$emailInput__ = $($inputs[2]);
    this.__$passwordInput__ = $($inputs[3]);
    this.__$passwordConfirmationInput__ = $($inputs[4]);

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $loginLink = $('<a href="#" class="register__login-link">Login</a>');
    $container.append($loginLink);
    this.__$loginLink__ = $loginLink;
}

RegisterPanel.prototype = Object.create(Panel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

Object.defineProperty(RegisterPanel.prototype, 'onLoginPanel', {
    set: function (callback) {
        this.__$loginLink__.on('click', callback);
    }
});

Object.defineProperty(RegisterPanel.prototype, 'onRegister', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {
            event.preventDefault();

            var name = this.__$nameInput__.val();
            var surname = this.__$surnameInput__.val();
            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();
            var passwordConfirmation = this.__$passwordConfirmationInput__.val();

            callback(name, surname, email, password, passwordConfirmation);

        }.bind(this));
    }
});

Object.defineProperty(RegisterPanel.prototype, 'error', {
    set: function (message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
});

RegisterPanel.prototype.clear = function () {
    this.__$nameInput__.val('');
    this.__$surnameInput__.val('');
    this.__$emailInput__.val('');
    this.__$passwordInput__.val('');
    this.__$passwordConfirmationInput__.val('');
    this.__errorPanel__.message = '';
    this.__errorPanel__.hide();
};

//#endregion

//#region error panel

function ErrorPanel() {
    Panel.call(this, $('<section class="error"></section>'));
}

ErrorPanel.prototype = Object.create(Panel.prototype);
ErrorPanel.prototype.constructor = ErrorPanel;

Object.defineProperty(ErrorPanel.prototype, 'message', {
    set: function (message) {
        this.$element.text(message);
    }
});

//#endregion