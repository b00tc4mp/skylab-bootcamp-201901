'use strict';

//#region panel

function Panel($element) {
    this.$element = $element;
};


Panel.prototype.hide = function () {
    this.$element.hide();
};

Panel.prototype.show = function () {
    this.$element.show();
};

//#endregion

//#region login panel

function LoginPanel() {                                                    //1er li diem com serà l'html
    Panel.call(this, $('<section class="login">'
    + '<h2>Login</h2>'
    + '<form class="login__form">'
    + '<label for="email" class="input-group mb-3">E-mail:</label>'   
    + '<input type="email" class="form-control" id="basic-addon2" name="email" placeholder="@mail" aria-label="Recipients username" aria-describedby="basic-addon2" required>'
    + '<label for="password" class="input-group mb-3">Password:</label>'
    + '<input type="password" class="form-control" id="basic-addon2" name="password" placeholder="password"  aria-label="Recipients username" aria-describedby="basic-addon2" required required>'
    + '<button type="submit" class="btn btn-info">Login</button>' 
    + '</form>'
    + '</section>'));

/*
function LoginPanel() {                                                    //1er li diem com serà l'html
    Panel.call(this, $('<section class="login">'
    + '<h2>Login</h2>'
    + '<form class="login__form" >'

    + '<label for="email" class="input-group mb-3">E-mail:</label>'   
    + '<input type="email" class="form-control-lg input-group-text" id="basic-addon2"name="email" placeholder="@example.com" required>'
    + '<label for="password">Password:</label>'
    + '<input type="password" class="form-control-lg" name="password" placeholder="password" required>'
    + '<button type="submit" class="btn btn-info">Login</button>' 
    + '</form>'
    + '</section>'));*/

    var $container = this.$element;

    var $form = $container.children('form');
    this.__$form__ = $form;

    var $inputs = $form.children('input');  //input de children retorna tots els fills amb el selector(tag) input

    this.__$emailInput__ = $($inputs[0]);  // li posem el $ pq sapiguem q es jquery

    this.__$passwordInput__ = $($inputs[1]);

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $registerLink = $('<a href="#" class="badge badge-danger login__register-link">Register</a>');
    $container.append($registerLink);
    this.__$registerLink__ = $registerLink;
   
}

LoginPanel.prototype = Object.create(Panel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

Object.defineProperty(LoginPanel.prototype, 'onLogin', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {  //on es com el addventlistener
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
    Panel.call(this, $('<section class="container register">'
    + '<h2>Register</h2>'
    + '<form class="container register__form">'
    +    '<label for="name">Name:</label>'
    +    '<input type="text" name="name" placeholder="name" required>'
    +    '<label for="surname">Surname:</label>'
    +    '<input type="text" name="surname" placeholder="surname" required>'
    +    '<label for="email">E-mail:</label>'
    +    '<input type="email" name="email" placeholder="email" required>'
    +    '<label for="password">Password:</label>'
    +    '<input type="password" name="password" placeholder="password" required>'
    +    '<label for="password">Confirm Password:</label>'
    +    '<input type="password" name="password-confirmation" placeholder="password" required>'
    +    '<button type="submit" class="btn btn-info">Register</button>' 
    + '</form>'
    + '</section>'));

    var $container = this.$element;

    var $form = $container.children('form');
    this.__$form__ = $form;

    var $inputs = $form.children('input'); //creem una array d'inputs

    this.__$nameInput__ = $($inputs[0]);
    this.__$surnameInput__ = $($inputs[1]);
    this.__$emailInput__ = $($inputs[2]);  // li posem el $ pq sapiguem q es jquery
    this.__$passwordInput__ = $($inputs[3]);
    this.__$passwordConfirmationInput__ = $($inputs[4]);

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $loginLink = $('<a href="#" class="badge badge-danger register__login-link">Login</a>')
    $container.append($loginLink)
    this.__$loginLink__ = $loginLink;
   
}

RegisterPanel.prototype = Object.create(Panel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

Object.defineProperty(RegisterPanel.prototype, 'onRegister', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {
            event.preventDefault();

            var name = this.__$nameInput__.val(); //retorna un string, i x tant name no te$ (pq no es un obj de j)
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
    Panel.call(this, $('<section class="home">'
    + '<h2>Welcome, <span class="home__name"></span>!</h2>'
    + '<button type="submit" class="btn btn-info">Logout</button>' 
    + '</section>'));


    var $container = this.$element;   
    var $title = $container.children('h2');
     
    var $userSpan = $title.children('span');
    this.__$userSpan__ = $userSpan;
    // this.__$userSpan__ = $container.children('h2')
    this.__$logoutButton__= $container.children('button')

};

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


// function SearchPanel() {
//     Panel.call(this, $('<section class="search">'
//     + '<form class="search__form">'
//     + '<input type="text" name="query" placeholder="....">'
//     + '<button type="submit">Search</button>'
//     + '</form>'));
    function SearchPanel() {
        Panel.call(this, $('<section>'
        + '<form>'
        +   '<input type="text" placeholder="..." name ="query">'
        +   '<button type="submit">Search</button>'
        + '</form>'
        + '</section>'));

    var $container = this.$element; // el codi html el convertim en html
    //el panel .call crida al constructor panel i el html el crea a dins de l'element

    var $form = $container.children('form')
    this.__$form__ = $form;

    var $queryInput = $form.children('input')
    this.__$queryInput__ = $queryInput;
    // this.__$queryInput__ = $($queryInput[0]);

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    // var $resultList = $container.children('ul');  // document.createElement('ul');  ////falta
    // this.__$resultList__ = $resultList;

    
    var $resultList = $('<ul></ul>');
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
        // this.__$resultList__.innerHTML = ''; //innerhtml in jquery??????????????????
        this.__$resultList__.html('');
        this.__errorPanel__.hide();

        // results.forEach(function (result) {
        //     var $item = $("li").append("<li></li>");
        //     this.__$resultList__.appendChild(item);

        //     var $text =  $("p").append("");
        //     item.appendChild(text);

        //     var image = document.createElement('img');
        //     image.src = result.image;
        //     image.style.width = '100px';
        //     item.appendChild(image);

        results.forEach(function (result) {
            var $item = $('<li>'+ result.text + ' <img src="'+result.image+'" width="100px"></li>');
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
    this.__resultList__.html('');
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