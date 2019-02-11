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
        + '<h2>Login</h2>'
        + '<form class="login__form" >'

        + '<div class="row">'
        + '<div class="col-xs-12 col-sm-12 col-md-7">'
        + '<label for="email">E-mail:</label>'
        + '<div class="input-group flex-nowrap">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text" id="addon-wrapping">@</span>'
        + '</div>'
        + '<input type="email" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" required>'
        + '</div>'
        + '</div>'
        + '<div class="col-xs-12 col-sm-12 col-md-5">'
        + '<label for="password">Password:</label>'
        + '<div class="input-group mb-3">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text" id="inputGroup-sizing-default">PSWD</span>'
        + '</div>'
        + '<input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="row">'
        + '<div class = "col-12">'
        + '<button type="submit" class="btn btn-outline-primary btn-lg">Login</button>'
        + '</div>'
        + '</div>'
        + '</form>'
        + '</section>'));

    var $container = this.$element;

    var $form = $container.find('form');
    this.__$form__ = $form;

    this.__$emailInput__ = $form.find('input[type=email]');

    this.__$passwordInput__ = $form.find('input[type=password]');

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $registerLink = $('<a href="#" class="login__register-link"><span class="badge badge-dark">Register</a>');
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
            document.body.style.backgroundColor = '#737989';
            document.body.style.backgroundImage = 'none';

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
        + '<h2>Register</h2>'
        + '<form class="register__form">'
        + '<div class = "row">'
        + '<div class="input-group mb-3 col-md-7">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text" id="basic-addon1">Name</span>'
        + '</div>'
        + '<input type="text" name="name" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required>'
        + '</div>'
        + '<div class="input-group mb-3 col-md-5">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text" id="basic-addon1">Surname</span>'
        + '</div>'
        + '<input type="text" name="surname" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required>'
        + '</div>'
        + '</div>'
        + '<div class="input-group mb-3">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text" id="basic-addon3">https://example.com/users/</span>'
        + '</div>'
        + ' <input type="email" name="email" class="form-control" id="basic-url" placeholder="E-mail" aria-describedby="basic-addon3" required>'
        + '</div>'
        + '<div class = "row">'
        + '<div class="input-group mb-3 col-md-6">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text" id="basic-addon1">Password</span>'
        + '</div>'
        + '<input type="password" name="password" placeholder="password" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required>'
        + '</div>'
        + '<div class="input-group mb-3 col-md-6">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text" id="basic-addon1">Password confirmation</span>'
        + '</div>'
        + '<input type="password" name="password-confirmation" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" required>'
        + '</div>'
        + '</div>'
        + '<button class="btn btn-outline-primary btn-lg" type="submit">Register</button>'
        + '</form>'
        + '</section>'));

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

    var $loginLink = $('<a href="#" class="register__login-link"><span class="badge badge-info">Return to Login page</a>');
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
        + '<div class = "row">'
        + '<h2 class = "col-md-10">Welcome, <span class="home__name"></span>!</h2>'
        + '<button class="home__logout col-md-2 btn btn-warning btn-lg">Logout</button>'
        + '</div>'
        + '</section>'));

    var $container = this.$element;

    var $title = $container.find('h2');

    var $userSpan = $title.find('span');
    this.__$userSpan__ = $userSpan;

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
    Panel.call(this, $('<section>'
        + '<form>'
        + '<div class="input-group mb-3 col-6">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text" id="inputGroup-sizing-default">Default</span>'
        + '</div>'
        + '<input type="text" name ="query" class="form-control" placeholder="introduce your search" aria-label="Default" aria-describedby="inputGroup-sizing-default">'
        + '<button type="submit" class="btn btn-danger">Search</button>'
        + '</div>'
        + '</form>'
        + '</section>'));

    var $container = this.$element;

    var $form = $container.find('form');
    this.__$form__ = $form;

    var $queryInput = $form.find('input');
    this.__$queryInput__ = $queryInput;

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $resultList = $('<ul class="row"></ul>');
    $container.append($resultList);
    this.__$resultList__ = $resultList;
}

SearchPanel.prototype = Object.create(Panel.prototype);
SearchPanel.prototype.constructor = SearchPanel;

Object.defineProperty(SearchPanel.prototype, 'onSearch', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {

            event.preventDefault();

            this.__errorPanel__.hide();

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


SearchPanel.prototype.clear = function () {
    this.clearResults();
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
    set: function (message) {
        this.$element.text(message);
    }
});

//#endregion 


function ListPanel () {
    Panel.call(this, $('<section><ul class="row"></ul></section>'))
    
    var $container = this.$element;

    var $resultList = $container.find('ul');
    this.__$resultList__ = $resultList;
}

Object.defineProperty(ListPanel.prototype, 'results', {
    set: function (results) {
        this.__$resultList__.html('');

        results.forEach(function (result) {
            var $item = $('<li data-id=' + result.id + '><div class="card" style="width: 18rem;"><img class="card-img-top" alt="Card image cap" img src="' + result.image + '" width="100px"><h5 class="card-title">' + result.text + '</h5><a href="#" class="btn btn-success">Details</a></div></div></li>');
            this.__$resultList__.append($item);

        }.bind(this));
    }
});

ListPanel.prototype.clearResults = function () {
    this.__$resultList__.html('');
};


//#region details panel

function DetailsPanel () {

    Panel.call(this, $('<div class="card" style="width: 18rem;">'
    + '<img class="card-img-top" src="" alt="Card image cap">'
    + '<div class="card-body">'
    + '<h5 class="card-title">Card title</h5>'
    + '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>'
    + '<a href="#" class="btn btn-primary">Details</a>'
    + '</div>'
    + '</div>'));

    var $container = this.$element;

    var $detailsButton = $container.find('a');
    this.__$detailsButton__ = $detailsButton;
    this.hide()
}

DetailsPanel.prototype = Object.create(Panel.prototype);
DetailsPanel.prototype.constructor = DetailsPanel;

Object.defineProperty(DetailsPanel.prototype, 'onClickITem', {
    set: function (callback) {

        this.__$detailsButton__.on('click', function(event){

            event.preventDefault();

            searchPanel.hide();

            callback()

        }.bind(this));
    }
});

Object.defineProperty(SearchPanel.prototype, 'onSearch', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {

            event.preventDefault();

            this.__errorPanel__.hide();

            var query = this.__$queryInput__.val();

            callback(query);
        }.bind(this));
    }
});
//#endregion 
