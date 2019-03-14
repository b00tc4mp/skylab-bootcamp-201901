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
    Panel.call(this, $('<section class="login p-5 m-5">'
    + '<h2 class="mb-4">Login</h2>'
    + '<form>'
    + '<div class="form-group">'
    + '<label for="email">E-mail:</label>'
    + '<input class="form-control" type="email" name="email" placeholder="email" required>'
    + '</div>'
    + '<div class="form-group">'
    + '<label for="password">Password:</label>'
    + '<input class="form-control" type="password" name="password" placeholder="password" required>'
    + '</div>'
    + '<button class="btn btn-primary" type="submit">Login</button>'
    + '</form>'
    + '</section>'));

    var $container = this.$element;

    var $form = $container.children('form');
    this.__$form__ = $form;

    var $inputs = $form.find("input")
    this.__$emailInput__ = $($inputs[0]);
    this.__$passwordInput__ = $($inputs[1]);

    var $registerLink = $('<div class="mt-3"><a href="#">Register</a></div>');
    $container.append($registerLink);
    this.__$registerLink__ = $registerLink;

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;
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
    Panel.call(this, $('<section class="container register p-5 m-5">'
       + '<h2 class="mb-4">Register</h2>'
       + '<form>'
       + '<div class="form-group">'
       +    '<label for="name">Name:</label>'
       +    '<input class="form-control" type="text" name="name" placeholder="name" required>'
       + '</div>'
       + '<div class="form-group">'
       +    '<label for="surname">Surname:</label>'
       +    '<input class="form-control" type="text" placeholder="surname" required>'
       + '</div>'
       + '<div class="form-group">'
       +    '<label for="email">E-mail:</label>'
       +    '<input class="form-control" type="email" name="email" placeholder="email" required>'
       + '</div>'
       + '<div class="form-group">'
       +    '<label for="password">Password:</label>'
       +    '<input class="form-control" type="password" name="password" placeholder="password" required>'
       + '</div>'
       + '<div class="form-group">'
       +    '<label for="passwordConfirmation">Confirm password:</label>'
       +    '<input class="form-control" type="password" name="passwordConfirmation" placeholder="confirm password" required>'
       + '</div>'
       +    '<button class="btn btn-primary" type="submit">Register</button>'
       + '</form>'
       + '<section class="register__error"></section>'
    +'</section>'));

    var $container = this.$element;

    var $form = $container.children('form');
    this.__$form__ = $form;

    var $inputs = $form.find('input');

    this.__$nameInput__ = $($inputs[0]);
    this.__$surnameInput__ = $($inputs[1]);
    this.__$emailInput__ = $($inputs[2]);
    this.__$passwordInput__ = $($inputs[3]);
    this.__$passwordConfirmationInput__ =  $($inputs[4]);

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $loginLink = $('<div class="mt-3"><a href="#">Login</a></div>');
    $container.append($loginLink);
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
    Panel.call(this, $(''
        + '<section class="home container m-4 p-4">'
        +   '<div class="d-flex justify-content-between">'
        +       '<h2>Welcome, <span></span>!</h2>'
        +       '<button class="btn btn-secondary">Logout</button>'
        +   '</div>'
        + '</section>'
    ));
    var $container = this.$element;
    this.__$userSpan__ = $container.find('span');
    this.__$logoutButton__ = $container.find('button');
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
    Panel.call(this, 
    $('<section class="container p-4 d-flex flex-column mt-5">' 
    +   '<form>'
    +       '<input type="text" name="query" placeholder="...">'
    +       '<button class="btn btn-primary ml-4" type="submit">Search</button>' 
    +   '</form>'
    +   '<div id="card-list" class="mt-5 d-flex flex-wrap"></div>'
    + '</section>'));    

    var $container = this.$element;
    
    var $form = $container.children('form');
    this.__$form__ = $form;

    var $queryInput = $form.children('input');
    this.__$queryInput__ = $queryInput;

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $resultList = $container.find('#card-list');
    this.__$resultList__ = $resultList;
}

SearchPanel.prototype = Object.create(Panel.prototype);
SearchPanel.prototype.constructor = SearchPanel;

Object.defineProperty(SearchPanel.prototype, 'onSearch', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {
            event.preventDefault();
            this.__$resultList__.empty();
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
        this.__$resultList__.empty();
        this.__errorPanel__.hide();

        results.forEach(function (result) {
            var $item = $(`
            <div class="card col-md-6 col-sm-12">
                <img class="card-img-top img-fluid" src="${result.image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${result.title}</h5>
                    <p class="card-text">${result.description}</p>
                    <a href="#" class="btn btn-primary">${result.price}</a>
                </div>
            </div>`);

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
    this.__$resultList__.empty();
};

//#endregion

//#region error panel

function ErrorPanel() {
    Panel.call(this, $('<div class="alert alert-danger mt-3" role="alert"><section class="error"></section></div>'));
}

ErrorPanel.prototype = Object.create(Panel.prototype);
ErrorPanel.prototype.constructor = ErrorPanel;

Object.defineProperty(ErrorPanel.prototype, 'message', {
    set: function (message) {
        this.$element.children('section').text(message);
    }
});

//#endregion