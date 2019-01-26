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
    Panel.call(this, $('<section  class="login container">'
    + '<h2 class = "text-center mb-5">Login</h2>'
    + '<form class="login__form" >'
    + '<div class = "row mb-5">'
    + '<div class = "col text-center">'
    + '<label class = "mr-2" for="email">E-mail:</label>'
    + '<input type="email" name="email" placeholder="email" required>'
    + '</div>'
    + '<div class = "col text-center">'
    + '<label class = "mr-2" for="password">Password:</label>'
    + '<input type="password" name="password" placeholder="password" required>'
    + '</div>'
    + '</div>'
    + '<div class= "col text-center"> '
    + '<button type="submit">Login</button>'
    + '</div>'
    + '</form>'
    + '</section>'));

    var $container = this.$element;

    var $form = $container.children('form');
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
    + '<h2 class = "text-center mb-5 ">Register</h2>'
    + '<form class="register__form">'
    + '<div class = "row text-center p-3">'
    + '<div class = col-4 text-center>'
    +    '<label class = "mr-2" for="name">Name:</label>'
    +    '<input type="text" name="name" placeholder="name" required>'
    + '</div>'
    + '<div class = col-4 text-center>'
    +    '<label class = "mr-2" for="surname">Surname:</label>'
    +    '<input type="text" name="surname" placeholder="surname" required>'
    + '</div>'
    + '<div class = col-4 text-center>'
    +    '<label class = "mr-2" for="email">E-mail:</label>'
    +    '<input type="email" name="email" placeholder="email" required>'
    + '</div>'
    + '</div>'
    + '<div class = "row text-center">'
    + '<div class = col-6 text-center>'
    +    '<label class = "mr-2" for="password">Password:</label>'
    +    '<input type="password" name="password" placeholder="password" required>'
    + '</div>'
    + '<div class = col-6 text-center>'
    +    '<label class = "mr-2" for="password">Confirm Password:</label>'
    +    '<input type="password" name="password-confirmation" placeholder="password" required>'
    + '</div>'
    + '</div>'
    + '<div class= "col text-center"> '
    +    '<button type="submit">Register</button>'
    + '</div>'
    + '</form>'
    + '</section>'));

    var $container = this.$element;

    this.__$form__ = $container.children('form');
    var $form = this.__$form__;

    var $inputs = $form.find('input');

    this.__$nameInput__ = $($inputs[0]);

    this.__$surnameInput__ = $($inputs[1]);

    this.__$emailInput__ = $($inputs[2]);

    this.__$passwordInput__ = $($inputs[3]);

    this.__$passwordConfirmationInput__ = $($inputs[4]);

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $loginLink = $('<a href="#" class="register__login-link">Login</a>');
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
    + '<h2 class = "text-center">Welcome, <span class="home__name"></span>!</h2>'
    + '<div class =  "btn pull-right logout" >'
    + '<button class="home__logout">Logout</button>'
    + '</div>'
    + '</section>'));

    var $container = this.$element;

    var $title = $container.find('h2');

    var $userSpan = $title.find('span');
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
    + '<form>'
    +   '<button type="submit">Search</button>'
    +   '<input class ="ml-0 search" type="text" placeholder="..." name ="query">'
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



SearchPanel.prototype.clear = function () {
    this.clear();
    this.__$queryInput__.val('');
    this.clearError();
};

SearchPanel.prototype.clearError = function(){
    this.__errorPanel__.message = ''
    this.__errorPanel__.hide()
}


//#endregion


function ErrorPanel() {
    Panel.call(this, $('<section class="error container"></section>'));
}

//#region results panel

class ResultsPanel extends Panel {
    constructor() {
        super($(`<section class="results">
            <ul></ul>
        </section>`));

        var $resultList = this.$element.find('ul');
        this.__$resultList__ = $resultList;
    }

    set results(results) {
        this.__$resultList__.html('');

        results.forEach(result => {
            var $item = $(`<li data-id=${result.id}>${result.text} <img src="${result.image}" width="100px"></li>`);
            
            $item.click(function(event) {
                // console.log(this.getAttribute('data-id'));

                // console.log(event.target.getAttribute('data-id')); // WARN event propagation!

                console.log($item.data('id'));

                // console.log($(this).data('id')); // WARN add new $ object into mem, but $item is already there
            });

            this.__$resultList__.append($item);
        });
    }

    clear() {
        this.__$resultList__.html('');
    }
}

//#endregion

//#region detail Panel

function DetailPanel(){
    Panel.call(this, $('<section class = "detail-panel container"' 
    
    + '<div>'
    + '<h2>Hola</h2>'
    + '<img src = "" >'
    + '<p>como estan todos</p>' ))
    + '</div>'

    var $container = this.$element

    var $div = $container.children('div')
    this.__$div__ = $div

    var $tilte = $div.find('h2')
    this.__$title__ = $title

    var $image = $div.find('img')
    this.__$image__ = $image

    var $describe = $div.find('p')
    this.__$describe__ = $describe

}





//#endregion
 
//#endregion

ErrorPanel.prototype = Object.create(Panel.prototype);
ErrorPanel.prototype.constructor = ErrorPanel;

Object.defineProperty(ErrorPanel.prototype, 'message', {
    set: function (message) {
        this.$element.text(message);
    }
});

//#endregion 