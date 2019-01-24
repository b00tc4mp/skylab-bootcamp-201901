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
    Panel.call(this, $('<section class="login container">'
    + '<form class="login__form" >'
    + '<h4 class="font-weight-light-normal text-secondary">Login</h4>'
    + '<div class="form-group">'
    + '<label class="small" for="email">E-mail:</label>'
    + '<input class="form-control input-sm" type="email" name="email" placeholder="example@gmail.com" required>'
    + '</div>'
    + '<div class="form-group">'
    + '<label class="small" for="password">Password:</label>'
    + '<input class="form-control" type="password" name="password" placeholder="password" required>'
    + '</div>'
    + '<button type="submit" class="btn btn-primary btn-sm active" tab>Login</button>'
    + '</form>'
    + '</section>'));

    var $container = this.$element;

    var $form = $container.children('form');
    this.__$form__ = $form;

    var $div = $form.children('div');

    this.__$emailInput__ = $($div[0]).children('input');

    this.__$passwordInput__ = $($div[1]).children('input');

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $registerLink = $('<a href="#" class="btn btn-secondary btn-sm active margin-top">Register</a>');
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

LoginPanel.prototype.clear = function () {
    this.__$emailInput__.val('');
    this.__$passwordInput__.val('');
    this.__errorPanel__.message = '';
    this.__errorPanel__.hide();
};

Object.defineProperty(LoginPanel.prototype, 'onGoToRegister', {
    set: function (callback) {
        this.__$registerLink__.on('click', callback);
    }
});

//#endregion

//#region register panel

function RegisterPanel() {
    Panel.call(this, $('<section class="register container">'
    + '<form class="register__form">'
    +    '<h4 class="font-weight-light-normal text-secondary">Register</h4>'
    +    '<div class="input-group input-group-sm mb-3">'
    +    '<div class="input-group-prepend">'
    +    '<label for="name" class="input-group-text" id="inputGroup-sizing-sm">Name</label>'
    +    '</div>'
    +    '<input class="form-control" type="text" name="name" aria-label="Small" aria-describedby="inputGroup-sizing-sm" required>'
    +    '</div>'
    +    '<div class="input-group input-group-sm mb-3">'
    +    '<div class="input-group-prepend">'
    +    '<label for="surname" class="input-group-text" id="inputGroup-sizing-sm">Surame</label>'
    +    '</div>'
    +    '<input class="form-control" type="text" name="surname" required>'
    +    '</div>'
    +    '<div class="input-group input-group-sm mb-3">'
    +    '<div class="input-group-prepend">'
    +    '<label for="email" class="input-group-text" id="inputGroup-sizing-sm">Email</label>'
    +    '</div>'
    +    '<input class="form-control" type="text" name="email" required>'
    +    '</div>'
    +    '<div class="input-group input-group-sm mb-3">'
    +    '<div class="input-group-prepend">'
    +    '<label for="password" class="input-group-text" id="inputGroup-sizing-sm">Password</label>'
    +    '</div>'
    +    '<input class="form-control" type="text" name="password" required>'
    +    '</div>'
    +    '<div class="input-group input-group-sm mb-3">'
    +    '<div class="input-group-prepend">'
    +    '<label for="password" class="input-group-text" id="inputGroup-sizing-sm">Confirm password</label>'
    +    '</div>'
    +    '<input class="form-control" type="text" name="password-confirmation" required>'
    +    '</div>'
    +    '<button type="submit"class="btn btn-primary btn-sm active">Register</button>'
    + '</form>'
    + '</section>'));

    var $container = this.$element;

    this.__$form__ = $container.children('form');
    var $form = this.__$form__;
    

    var $div = $form.children('div');

    this.__$nameInput__ = $($div[0]).children('input');

    this.__$surnameInput__ = $($div[1]).children('input');

    this.__$emailInput__ = $($div[2]).children('input');

    this.__$passwordInput__ = $($div[3]).children('input');

    this.__$passwordConfirmationInput__ = $($div[4]).children('input');

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $loginLink = $('<a href="#" class="btn btn-secondary btn-sm active margin-top register__login-link">Login</a>');
    $container.append($loginLink)
    this.__$loginLink__ = $loginLink;
}

RegisterPanel.prototype = Object.create(Panel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

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

Object.defineProperty(RegisterPanel.prototype, 'onGoToLogin', {
    set: function (callback) {
        this.__$loginLink__.on('click', callback);
    }
});

//#endregion

//#region home panel

function HomePanel() {
    Panel.call(this, $('<section class="home container">'
    + '<h3 class="text-secondary">Welcome, <span class="home__name"></span>!</h3>'
    + '<button class="home__logout btn btn-dark btn-small">Logout</button>'
    + '</section>'));

    var $container = this.$element;

    var $title = $container.find('h3');

    var $userSpan = $title.children('span');
    this.__$userSpan__ = $userSpan;

    this.__$logoutButton__ = $container.children('button');
}

HomePanel.prototype = Object.create(Panel.prototype);
HomePanel.prototype.constructor = HomePanel;

Object.defineProperty(HomePanel.prototype, 'user', {
    set: function (user) {
        this.__$userSpan__.text(user.name);
    }
});

Object.defineProperty(HomePanel.prototype, 'onLogout', {
    set: function (callback) {
        this.__$logoutButton__.on('click', callback);
    }
});

//#endregion

//#region search panel

function SearchPanel() {
    Panel.call(this, $('<section>'
    + '<form class="input-group mb-3 margin-top">'
    +   '<input type="text" class="form-control" placeholder="..." name ="query">'
    +   '<div class="input-group-append">'
    +   '<button type="submit" class="btn btn-outline-dark">Search</button>'
    +   '</div>'
    + '</form>'
    + '</section>'));

    var $container = this.$element;

    var $form = $container.children('form');
    this.__$form__ = $form;

    var $queryInput = $form.children('input');
    this.__$queryInput__ = $queryInput;

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $resultList = $('<ul class="list-group"></ul>');
    $container.append($resultList);
    this.__$resultList__ = $resultList;
}

SearchPanel.prototype = Object.create(Panel.prototype);
SearchPanel.prototype.constructor = SearchPanel;

Object.defineProperty(SearchPanel.prototype, 'onSearch', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {

            event.preventDefault();

            var query = this.__$queryInput__.val();

            callback(query);
        }.bind(this));
    }
});

Object.defineProperty(SearchPanel.prototype, 'error', {
    set: function (message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
});

Object.defineProperty(SearchPanel.prototype, 'results', {
    set: function (results) {
        this.__$resultList__.html('');
        this.__errorPanel__.hide();

        results.forEach(function (result) {
            var $item = $('<li class="list-group-item d-flex justify-content-center align-items-center">'+ result.text + ' <img src="'+result.image+'" width="100px"></li>');
            this.__$resultList__.append($item);

        }.bind(this));
    }
});

SearchPanel.prototype.clear = function () {
    this.clearResults();
    this.__$queryInput__.val('');
    this.__errorPanel__.message = '';
    this.__errorPanel__.hide();
};

SearchPanel.prototype.clearResults = function () {
    this.__$resultList__.html('');
};

//#endregion

//#region error panel

function ErrorPanel() {
    Panel.call(this, $('<section class="error alert alert-danger margin-top");></section>'));
}

ErrorPanel.prototype = Object.create(Panel.prototype);
ErrorPanel.prototype.constructor = ErrorPanel;

Object.defineProperty(ErrorPanel.prototype, 'message', {
    set: function (message) {
        this.$element.text(message);
    }
});

//#endregion