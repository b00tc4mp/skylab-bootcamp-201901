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
    + '<form class="login__form" >'
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
    //Panel.call(this, document.createElement('section'));
    Panel.call(this, $('<section class="register">'
       + '<h2>Register</h2>'
       + '<form class="register__form">'
       +    '<label for="name">Name:</label>'
       +    '<input type="text" name="name" placeholder="name" required="">'
       +    '<label for="surname">Surname:</label>'
       +    '<input type="text" placeholder="surname" required="">'
       +    '<label for="email">E-mail:</label>'
       +    '<input type="email" name="email" placeholder="email" required="">'
       +   '<label for="password">Password:</label>'
       +  '<input type="password" name="password" placeholder="password" required="">'
       +  '<label for="passwordConfirmation">Confirm password:</label>'
       + '<input type="password" name="passwordConfirmation" placeholder="confirm password" required="">'
       + '<button type="submit">Register</button>'
       + '</form>'
       + '<section class="register__error"></section>'
       + '<a href="#" class="register__login-link">Login</a>'
    +'</section>'));

    var $container = this.$element;

    var $form = $container.children('form');
    this.__$form__ = $form;

    var $inputs = $form.children('input');

    this.__$nameInput__ = $($inputs[0]);
    this.__$surnameInput__ = $($inputs[1]);
    this.__$emailInput__ = $($inputs[2]);
    this.__$passwordInput__ = $($inputs[3]);
    this.__$passwordConfirmationInput__ =  $($inputs[4]);

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    this.__$loginLink__ = $container.children('a'); 
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
    Panel.call(this, document.createElement('section'));

    var container = this.element;
    container.className = 'home';

    var title = document.createElement('h2');
    container.appendChild(title);

    var welcomeText = document.createTextNode('Welcome, ');
    title.appendChild(welcomeText);

    var userSpan = document.createElement('span');
    title.appendChild(userSpan);
    this.__userSpan__ = userSpan;

    var exclamationText = document.createTextNode('!');
    title.appendChild(exclamationText);

    var logoutButton = document.createElement('button');
    logoutButton.innerText = 'Logout';
    container.appendChild(logoutButton);
    this.__logoutButton__ = logoutButton;
}

HomePanel.prototype = Object.create(Panel.prototype);
HomePanel.prototype.constructor = HomePanel;

Object.defineProperty(HomePanel.prototype, 'user', {
    set: function (user) {
        this.__userSpan__.innerText = user.name;
    }
});

Object.defineProperty(HomePanel.prototype, 'onLogout', {
    set: function (callback) {
        this.__logoutButton__.addEventListener('click', callback);
    }
});

//#endregion

//#region search panel

function SearchPanel() {
    Panel.call(this, document.createElement('section'));

    var container = this.element;

    var form = document.createElement('form');
    container.appendChild(form);
    this.__form__ = form;

    var queryInput = document.createElement('input');
    queryInput.type = 'text';
    queryInput.name = 'query';
    queryInput.placeholder = '...';
    form.appendChild(queryInput);
    this.__queryInput__ = queryInput;

    var searchButton = document.createElement('button');
    searchButton.type = 'submit';
    searchButton.innerText = 'Search';
    form.appendChild(searchButton);

    var errorPanel = new ErrorPanel;
    container.appendChild(errorPanel.element);
    this.__errorPanel__ = errorPanel;

    var resultList = document.createElement('ul');
    container.appendChild(resultList);
    this.__resultList__ = resultList;
}

SearchPanel.prototype = Object.create(Panel.prototype);
SearchPanel.prototype.constructor = SearchPanel;

Object.defineProperty(SearchPanel.prototype, 'onSearch', {
    set: function (callback) {
        this.__form__.addEventListener('submit', function (event) {
            event.preventDefault();

            var query = this.__queryInput__.value;

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
        this.__resultList__.innerHTML = '';
        this.__errorPanel__.hide();

        results.forEach(function (result) {
            var item = document.createElement('li');
            this.__resultList__.appendChild(item);

            var text = document.createTextNode(result.text);
            item.appendChild(text);

            var image = document.createElement('img');
            image.src = result.image;
            image.style.width = '100px';
            item.appendChild(image);
        }.bind(this));
    }
});

SearchPanel.prototype.clear = function () {
    this.clearResults();
    this.__queryInput__.value = '';
    this.__errorPanel__.message = '';
    this.__errorPanel__.hide();
};

SearchPanel.prototype.clearResults = function () {
    this.__resultList__.innerHTML = '';
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