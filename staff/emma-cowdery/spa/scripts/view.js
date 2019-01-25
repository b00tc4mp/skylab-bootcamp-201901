'use strict';

//#region panel

class Panel {
    constructor($element) {
        this.$element = $element;
    }

    hide() {
        this.$element.hide();
    };

    show() {
    this.$element.show();
    };
}





//#endregion

//#region login panel

class LoginPanel extends Panel{
    constructor() {
        super($(`<section class="login container-fluid">
    <h2>Login</h2>
    <form class="login__form">
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="email">E-mail:</label>
                <input class="form-control" type="email" name="email" placeholder="email" required>
            </div>
            <div class="form-group col-md-6">
                <label for="password">Password:</label>
                <input class="form-control" type="password" name="password" placeholder="password" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-4">
                <button type="submit" class="btn btn-outline-primary">Login</button>
            </div>
        </div>
    </form>
</section>`));

    var $container = this.$element;

    var $form = $container.find('form');
    this.__$form__ = $form;

    var $inputs = $form.find('input');

    this.__$emailInput__ = $($inputs[0]);

    this.__$passwordInput__ = $($inputs[1]);

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $registerLink = $('<a href="#" class="login__register-link btn btn-primary" role="button">Register</a>');
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
    };

    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }

    clear() {
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    };

    set onGoToRegister(callback) {
        this.__$registerLink__.on('click', callback);
    };
}


//#endregion

//#region register panel

class RegisterPanel extends Panel {
    constructor() {
    super($(`<section class="register">
<h2>Register</h2>
<form class="register__form">
    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="name">Name</label>
            <input class="form-control" type="text" name="name" placeholder="name" required>
        </div>
        <div class="form-group col-md-6">
            <label for="surname">Surname</label>
            <input class="form-control" type="text" surname="surname" placeholder="surname" required
        </div>
    </div>
    <label for="email">E-mail</label>
    <input class="form-control" type="email" name="email" placeholder="email" required>
    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="password">Password</label>
            <input class="form-control" type="password" name="password" placeholder="password" required>
        </div>
        <div class="form-group col-md-6">
            <label for="passwordConfirmation">Confirm Password</label>
            <input class="form-control" type="password" name="passwordConfirmation" placeholder="confirm password" required>
        </div>
        <div class="form-row">
            <div class="form-group">
                <button type="submit" class="btn btn-outline-primary margin">Register</button>
            </div>
        </div>
    </div>
</form>
</section>`));

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

        var $loginLink = $('<a href="#" class="register__login-link btn btn-primary" role="button">Login</a>');
        $container.append($loginLink);
        this.__$loginLink__ = $loginLink;
    }

    set onRegister(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault();

            var name = this.__$nameInput__.val();
            var surname = this.__$surnameInput__.val();
            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();
            var passwordConfirmation = this.__$passwordConfirmationInput__.val();

            callback(name, surname, email, password, passwordConfirmation);
        });
    }

    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }


    clear() {
        this.__$nameInput__.val('');
        this.__$surnameInput__.val('');
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
        this.__$passwordConfirmationInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    };

    set onGoToLogin(callback) {
        this.__$loginLink__.on('click', callback);
    }
}

//#endregion

//#region home panel

class HomePanel extends Panel {
    constructor() {
    super($(`<section class="home">
    <h2>Welcome, <span></span>!</h2>
    <button class="btn btn-outline-primary">Logout</button>
</section>`));

        var $container = this.$element;

        var $title = $container.find('h2');

        var $userSpan = $title.find('span');
        this.__$userSpan__ = $userSpan;

        this.__$logoutButton__ = $container.find('button');
        
    }

    set user(user) {
        this.__$userSpan__.append(user.name);
    }

    set onLogout(callback) {
        this.__$logoutButton__.on('click', callback);
        this.__$userSpan__.val('');
    }
}

//#endregion

//#region search panel

class SearchPanel extends Panel {
    constructor() {
        super($(`<section>
    <form>
        <div class="form-row">
            <div class="form-group col-md-4">
                <input class="form-control" type="text" name="query" placegolder="...">
            </div>
            <div class="form-group col-md-2">
                <button type="submit" class="btn btn-outline-primary">Search</button>
            </div>
        </div>
    </form>
</section>`));

        var $container = this.$element;

        var $form = $container.find('form');
        this.__$form__ = $form;

        var $queryInput = $form.find('input');
        this.__$queryInput__ = $queryInput;

        var errorPanel = new ErrorPanel;
        $container.append(errorPanel.$element);
        this.__errorPanel__ = errorPanel;
    }

    set onSearch(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault();

            var query = this.__$queryInput__.val();

            callback(query);
        });
    }

    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }

    clear() {
        this.__$queryInput__.val('');
        this.clearError();
    }

    clearError() {
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    };
}

//#endregion

class ResultsPanel extends Panel {
    constructor() {
        super($(`<section class="container">
    <ul class="row"></ul>
</section>`))

    var $resultList = this.$element.find('ul'); 
    this.__$resultList__ = $resultList;  
    }

    set results(results) {
        this.__$resultList__.html('');

        results.forEach(result => {
            var $item = $(`<li class="col-sm list">${result.text}<img src="${result.image}" width="250"><button data-id=${result.id}>Learn More</button></li>`);

            //var $button = $(`<button data-id=${result.id}>Learn More</button>`);
            //this.$item.append($button);

            $item.click(function(event) {
                console.log($item.data('id'));
            });

            this.__$resultList__.append($item);

        });
    }
    
    clear() {
        this.__$resultList__.html('');
    }
}

//#region error panel

class ErrorPanel extends Panel {
    constructor() {
    super($('<section class="alert alert-warning"></section>'));
    }

    set message(message) {
        this.$element.text(message);
    }
}


//#endregion