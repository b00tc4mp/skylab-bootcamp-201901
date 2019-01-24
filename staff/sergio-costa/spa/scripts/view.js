'use strict';

//#region panel

function Panel($element) {
    this.$element = $element;
}

Panel.prototype.hide = function() {
    this.$element.hide();
};

Panel.prototype.show = function() {
    this.$element.show();
};

//#endregion

//#region login panel

function LoginPanel() {
    Panel.call(this, $('<section class="login container">'
    + '<h2 class="text-center mb-5">Login</h2>'
    + '<form class="login__form" >'
    +'<div class="row">'
    +'<div class="col text-center">'
    + '<label for="email">E-mail:</label>'
    + '<input class="form-control" type="email" name="email" placeholder="email" required>'
    +'</div>'
    +'<div class="col text-center">'
    + '<label for="password">Password:</label>'
    + '<input class="form-control" type="password" name="password" placeholder="password" required>'
    +'</div>'
    +'</div>'
    +'<div class="col text-center">'
    + '<button type="submit" class="btn btn-primary mt-5">Login</button>'
    +'</div>'
    + '</form>'
    + '</section>'));

    var $container = this.$element;

    var $form = $container.find('form'); 
    this.__$form__ = $form;

    var $inputs = $form.find('input');

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
    set: function(callback) { 
        this.__$form__.on('submit', function (event) {
            event.preventDefault();
    
            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();
    
            callback(email, password);
        }.bind(this));
    } 
});

Object.defineProperty(LoginPanel.prototype, 'error', { 
    set: function(message) { 
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    } 
});

LoginPanel.prototype.clear = function() {
    this.__$emailInput__.val('');
    this.__$passwordInput__.val('');
    this.__errorPanel__.message = '';
    this.__errorPanel__.hide();
};

Object.defineProperty(LoginPanel.prototype, 'onGoToRegister', { 
    set: function(callback) { 
        this.__$registerLink__.on('click', callback);
    } 
});

//#endregion

//#region register panel

function RegisterPanel() {
    Panel.call(this, $('<section class="register container">'
    +'<h2 class="text-center mb-5">Register</h2>'
    + '<form class="register__form">'
    +'<div class=row>'
    +'<div class="col mb-3">'   
    + '<label font-weight-bold for="name">Name:</label>'
    + '<input class="form-control" type="text" name="name" placeholder="name" required>'
    +'</div>'
    +'</div>'
    +'</div>'
    +'<div class=row>'
    +'<div class="col mb-3">'
    + '<label font-weight-bold for="surname">Surname:</label>'
    + '<input class="form-control" type="text" name="surname" placeholder="surname" required>'
    +'</div>'
    +'</div>'
    +'<div class=row>'
    +'<div class="col mb-3">'
    + '<label font-weight-bold for="email">E-mail:</label>'
    + '<input class="form-control" type="email" name="email" placeholder="email" required>'
    +'</div>'
    +'</div>'
    +'<div class=row>'
    +'<div class="col mb-3">'
    + '<label font-weight-bold for="password">Password:</label>'
    + '<input class="form-control" type="password" name="password" placeholder="password" required>'
    +'</div>'
    +'</div>'
    +'<div class=row>'
    +'<div class="col mb-3">'
    + '<label font-weight-bold for="password">Confirm Password:</label>'
    + '<input class="form-control" type="password" name="password-confirmation" placeholder="password" required>'
    +'</div>'
    +'</div>'
    +'<div class="col text-center">'
    + '<button type="submit" class="btn btn-primary">Register</button>'
    +'</div>'
    + '</form>'
    + '</section>'));

    var $container = this.$element;

    var $form = $container.find('form');
    this.__$form__ = $form;

    var $inputs = $form.find('input');
    
    this.__$nameInput__ = $($inputs[0]);

    this.__$surnameInput__ = $($inputs[1]);

    this.__$emailInput__ = $($inputs[2]);

    this.__$passwordInput__= $($inputs[3]);
    
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

Object.defineProperty(RegisterPanel.prototype, 'onRegister', { 
    set: function(callback) {
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
    set: function(message) { 
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    } 
});

RegisterPanel.prototype.clear = function() {
    this.__$nameInput__.val('');
    this.__$surnameInput__.val('');
    this.__$emailInput__.val('');
    this.__$passwordInput__.val('');
    this.__$passwordConfirmationInput__.val('');
    this.__errorPanel__.message;
    this.__errorPanel__.hide();
};

Object.defineProperty(RegisterPanel.prototype, 'onGoToLogin', { 
    set: function(callback) { 
        this.__$loginLink__.on('click', callback);
    } 
});

//#endregion

//#region home panel

function HomePanel() {
    Panel.call(this, $('<section class="home" class="container">'
    +'<div class="row">'
    + '<h2>Welcome,<span></span>!</h2>'
    + '<button>Logout</button>'));

    var $container = this.$element;

    var $title = $container.children('h2');

    var $userSpan = $title.children('span');
    this.__$userSpan__ = $userSpan;

    var $logoutButton = $container.children('button');
    this.__$logoutButton__ = $logoutButton;
}

HomePanel.prototype = Object.create(Panel.prototype);
HomePanel.prototype.constructor = HomePanel;

Object.defineProperty(HomePanel.prototype, 'user', { 
    set: function(user) { 
        this.__$userSpan__.text(user.name);
    } 
});

Object.defineProperty(HomePanel.prototype, 'onLogout', { 
    set: function(callback) { 
        this.__$logoutButton__.on('click', callback);
    } 
});

//#endregion

//#region search panel

function SearchPanel() {
    Panel.call(this, $('<section>'
    +'<form>'
    +'<input type="text" name="query" placeholder="...">'
    +'<button type="submit">Search</button>'
    +'</form>'
    +'<ul></ul>'
    +'</section>'
    ));

    var $container = this.$element;

    var $form = $container.children('form');
    this.__$form__ = $form;

    var $queryInput = $form.children('input');
    this.__$queryInput__ = $queryInput;

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    this.__$resultList__ = $container.children('ul');
}

SearchPanel.prototype = Object.create(Panel.prototype);
SearchPanel.prototype.constructor = SearchPanel;

Object.defineProperty(SearchPanel.prototype, 'onSearch', {
    set: function(callback) {
        this.__$form__.on('submit', function(event) {
            event.preventDefault();

            var query = this.__$queryInput__.val();

            callback(query);
        }.bind(this));
    }
});

Object.defineProperty(SearchPanel.prototype, 'error', { 
    set: function(message) { 
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    } 
});

Object.defineProperty(SearchPanel.prototype, 'results', {
    set: function(results) {
        this.__$resultList__.text('');
        this.__errorPanel__.hide();

        results.forEach(function(result) {
            var $item = $('<li>'+result.text +'<img src="'+result.image+'" width ="100px"></li>');
            this.__$resultList__.append($item);
        }.bind(this));
    }
});

SearchPanel.prototype.clear = function() {
    this.__$resultList__.text('');
    this.__$queryInput__.val('');
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
    set: function(message) { 
        this.$element.text(message);
    }
});

//#endregion