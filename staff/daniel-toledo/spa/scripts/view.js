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
        + '<form class="login__form form-group container" >'

        + '<div class="row">'
        + '<label for="email" class="col col-md-3 col-sm-3 flex">E-mail</label>'
        + '<input type="email" class="col col-md-9 col-sm-9 form-control" name="email" placeholder="Email" required>'
  
        + '<label for="password" class="col col-md-3 col-sm-3 flex">Password</label>'
        + '<input type="password" class="col col-md-9 col-sm-9 form-control" name="password" placeholder="Password" required>'
        + '</div>'

        + '<div class="row flex">'
        + '<div class="link col-3">'
        + '<a href="#" class="btn btn-outline-secondary login__register-link ">Register</a>'
        + '</div>'
        + '<button type="submit" class="btn btn-dark col-9">Login</button>'
        + '</div>'

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

    var $registerLink = $form.find('a')
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
        + '<h2>Register</h2>'
        + '<form class="register__form container">'

        
        + '<div class="row">'
        + '<div class="input-group">'
        + '<label for="name" class="input-group-text col-3">Name</label>'
        + '<input type="text" class="form-control" name="name" placeholder="Name" required>'
        + '</div>'
        + '</div>'
 
        + '<div class="row">'
        + '<div class="input-group">'
        + '<label for="surname" class="input-group-text col-3">Surname</label>'
        + '<input type="text"  class="form-control" name="surname" placeholder="Surname" required>'
        + '</div>'
        + '</div>'

        + '<div class="row">'
        + '<div class="input-group">'
        + '<label for="email" class="input-group-text col-3">E-mail</label>'
        + '<input type="email"  class="form-control" name="email" placeholder="Email" required>'
        + '</div>'
        + '</div>'

        + '<div class="row">'
        + '<div class="input-group">'
        + '<label for="password" class="input-group-text col-3">Password</label>'
        + '<input type="password"  class="form-control" name="password" placeholder="Password" required>'
        + '</div>'
        + '</div>'

        + '<div class="row">'
        + '<div class="input-group">'
        + '<label for="password" class="input-group-text col-3">Confirm Password</label>'
        + '<input type="password"  class="form-control" name="password-confirmation" placeholder="Password" required>'
        + '</div>'
        + '</div>'

        + '<div class="row">'
        + '<div class="link col-3">'
        + '<a href="#" class="register__login-link btn btn-outline-secondary flex">Login</a>'
        + '</div>'
        + '<button type="submit" class="btn btn-dark col-9">Register</button>'
        + '</div>'
        + '</form>'));

    var $container = this.$element;

    var $form = $container.find('form');
    this.__$form__ = $form;

    var $inputs = $form.find('input');

    this.__$nameInput__ = $($inputs[0]);
    this.__$surnameInput__ = $($inputs[1]);
    this.__$emailInput__ = $($inputs[2]);
    this.__$passwordInput__ = $($inputs[3]);
    this.__$passwordConfirmationInput__ = $($inputs[4]);

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $loginLink = $form.find('a')
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
        + '<div class="row container">'
        + '<h2 class="col col-10">Welcome, <span></span>!</h2>'
        + '<button class="btn btn-dark col col-2">Logout</button>'
        +'</div>'
        + '</section>'));

    var $container = this.$element;

    var $title = $container.find('h2')

    var $userSpan = $title.find('span')
    this.__$userSpan__ = $userSpan;

    var $logoutButton = $container.find('button')
    this.__$logoutButton__ = $logoutButton;
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
    + '<form class="input-group search__input">'

        + '<input type="text" class="form-control input-group-text col-10 " name="query" placeholder="...">'
        + '<button type="submit" class="input-group-text col-2" innerText="search">Search</button>'

        + '</form>'
        + '</section>'

    ));

    var $container = this.$element;

    var $form = $container.find('form');
    this.__$form__ = $form;

    var $queryInput = $form.find('input');
    this.__$queryInput__ = $queryInput;


    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $resultList = $('<div class="row"></div>');
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
            var $item = $('<div class="card col-md-4 col-sm-6 "></div>');
            this.__$resultList__.append($item);

            var $text = $(document.createTextNode(result.text));
            $text.addClass('class="card-title"')
            $item.append($text);

            var $image = $('<img class="card-img-top" src ="'+result.image+'" width="100px">');
            // $image.attr("src", result.image);
            $item.append($image);
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