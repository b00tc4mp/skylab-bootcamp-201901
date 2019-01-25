'use strict';

//#region panel

class Panel {
   constructor($element) {
        this.$element = $element
   } 
   hide() {
       this.$element.hide();
   }
   show() {
    this.$element.show();
    }
}

//#endregion

//#region login panel

class LoginPanel extends Panel {
    constructor() {
        super ($('<section class="login container col-4">'
    + '<form class="login__form margin-top" >'
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
    + '</section>'
    ));

    var $container = this.$element;

    var $form = $container.find('form');
    this.__$form__ = $form;

    this.__$emailInput__ = $form.find('input[type=email]');

    this.__$passwordInput__ = $form.find('input[type=password]');

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $registerLink = $('<a href="#" class="btn btn-secondary btn-sm active margin-top">Register</a>');
    $container.append($registerLink);
    this.__$registerLink__ = $registerLink;
    }

    set onLogin (callback) {
            this.__$form__.on('submit', event=> {
                event.preventDefault();
    
                var email = this.__$emailInput__.val();
                var password = this.__$passwordInput__.val();
    
                callback(email, password);
            });
    }

    set error (message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }

    clear() {
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    }
    set onGoToRegister(callback) {
        this.__$registerLink__.on('click', callback);
    }
}

//#endregion

//#region register panel

class RegisterPanel extends Panel {
    constructor() {
        super($('<section class="register container col-6">'
        + '<form class="register__form margin-top">'
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
        + '</section>'
        ));
    
        var $container = this.$element;
    
        this.__$form__ = $container.find('form');
        var $form = this.__$form__;
        
    
        var $div = $form.children('div');
    
        this.__$nameInput__ = $form.find('input[name=name]');
    
        this.__$surnameInput__ = $form.find('input[name=surname]');
    
        this.__$emailInput__ = $form.find('input[type=email]');
    
        this.__$passwordInput__ = $form.find('input[name=password]');
    
        this.__$passwordConfirmationInput__ = $form.find('input[name=password-confirmation]');
    
        var errorPanel = new ErrorPanel;
        $container.append(errorPanel.$element);
        this.__errorPanel__ = errorPanel;
    
        var $loginLink = $('<a href="#" class="btn btn-secondary btn-sm active margin-top register__login-link">Login</a>');
        $container.append($loginLink)
        this.__$loginLink__ = $loginLink;
    }

    set onRegister (callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault();

            var name = this.__$nameInput__.val();
            var surname = this.__$surnameInput__.val();
            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();
            var passwordConfirmation = this.__$passwordConfirmationInput__.val();

            callback(name, surname, email, password, passwordConfirmation);
            })
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
    }

    set onGoToLogin(callback) {
        this.__$loginLink__.on('click', callback);
    }


}

//#endregion

//#region home panel

class HomePanel extends Panel {
    constructor() {
        super( $('<section class="home container margin-top">'
        + '<div class="row">'
        + '<div class="col-6">'
        + '<h3 class="text-secondary">Welcome, <span class="home__name"></span>!</h3>'
        + '</div>'
        + '<div class="col-6 text-right">'
        + '<button class="home__logout btn btn-dark btn-small">Logout</button>'
        + '</div>'
        + '</div>'
        + '</section>'
        ));

        var $container = this.$element;

        var $title = $container.find('h3');

        var $userSpan = $title.find('span');
        this.__$userSpan__ = $userSpan;

        this.__$logoutButton__ = $container.find('button');
    }

    set user(user) {
        this.__$userSpan__.text(user.name);
    }

    set onLogout(callback) {
        this.__$logoutButton__.on('click', callback);
    }    
}

//#endregion

//#region search panel

class SearchPanel extends Panel {
    constructor() {
        super($('<section>'
        + '<form class="input-group mb-3 margin-top">'
        +   '<input type="text" class="form-control" placeholder="..." name ="query">'
        +   '<div class="input-group-append">'
        +   '<button type="submit" class="btn btn-outline-dark">Search</button>'
        +   '</div>'
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
    }
}

//#endregion

//#region results panel

class ResultsPanel extends Panel {
    constructor() {
        super($(`<section class="results">
            <ul class="list-group"></ul>
        </section>`));

        var $resultList = this.$element.find('ul');
        this.__$resultList__ = $resultList;
    }

    set results(results) {
        this.__$resultList__.html('');

        results.forEach(result => {
            var $item = $('<li data-id="'+result.id+'" class="list-group-item d-flex justify-content-center align-items-center">'+ result.text + ' <img src="'+result.image+'" width="100px"></li>');
            
            $item.click(() => {
                const id =$item.data('id');
                this.__onDuckSelectedCallback__(id)
            });

            this.__$resultList__.append($item);
        });
    }

    set onDuck (callback) {
        this.__onDuckSelectedCallback__ = callback
    }

    clear() {
        this.__$resultList__.html('');
    }

}

//#endregion

//#region detail panel

class DetailPanel extends Panel {
    constructor() {
        super($('<section class="detail">'
        + '<div class="card text-center">'
        + '<h2 class="card-header">Duckling List</h2>'
        + '<div class="card-body">'
        + '<h3 class="card-title"></h3>'
        + '<img class="card-image" width="200px">'
        + '<p class="card-text"><span class="duck_description"></span></p>'
        + '<h5 class="card-text"></h5>'
        +  '<a class="alert alert-success margin-top" role="alert" target="_blank">Buy</a>'
        + '</div>'
        + '<button class="goBack card-footer text-muted">Go back</div>'
        + '</div>'
        + '</section>'
        ));

        const $container = this.$element;
    
        const $duckTitle = $container.find('h3');
        this.__$duckTitle__ = $duckTitle;
    
        const $duckImage = $container.find('img');
        this.__$duckImage__ = $duckImage;
    
        const $duckDescription = $container.find('p');
        this.__$duckDescription__ = $duckDescription;
    
        const $duckLink = $container.find('a');
        this.__$duckLink__ = $duckLink;
    
        const $duckPrice = $container.find('h5');
        this.__$duckPrice__ = $duckPrice;

        const $goBackButton = $container.find('button');
        this.__$goBackButton__ = $goBackButton;
        

        const errorPanel = new ErrorPanel;
        $container.append(errorPanel.$element);
        this.__errorPanel__ = errorPanel;
    }
    
    set duckling({id, title, description, imageUrl, link, price}) {
        this.__$duckTitle__.text(title)
        this.__$duckImage__.attr('src',imageUrl)
        this.__$duckDescription__.text(description)
        this.__$duckLink__.attr('href', link)
        this.__$duckPrice__.text(price)
    }

    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }

    set onToResults(callback) {
        this.__$goBackButton__.click(callback);
    }
   
}
//#endregion

//#region error panel

class ErrorPanel extends Panel {
    constructor() {
        super($('<section class="error alert alert-danger margin-top"></section>'));
    }

    set message(message) {
        this.$element.text(message);
    }
}

//#endregion