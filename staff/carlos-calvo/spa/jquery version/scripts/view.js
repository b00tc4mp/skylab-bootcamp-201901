'use strict';

//#region panel

class Panel {
    constructor($element){
        this.$element = $element;
    }
    hide(){
        this.$element.hide();
    }
    show(){
        this.$element.show();
    }
}

// Panel.prototype.hide = function() {
//     this.$element.hide();
// };

// Panel.prototype.show = function() {
//     this.$element.show();
// };

//#endregion

//#region login panel

class  LoginPanel extends Panel {
    constructor() {
        super($('<section class="login container">'
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

        this.$container = this.$element;

        this.$form = this.$container.find('form'); 
        this.__$form__ = this.$form;

        this.$inputs = this.$form.find('input');
    
        this.__$emailInput__ = $(this.$inputs[0]);
    
        this.__$passwordInput__ = $(this.$inputs[1]);
    
        this.errorPanel = new ErrorPanel;
        this.$container.append(this.errorPanel.$element);
        this.__errorPanel__ = this.errorPanel;
    
        this.$registerLink = $('<a href="#" class="login__register-link">Register</a>');
        this.$container.append(this.$registerLink);
        this.__$registerLink__ = this.$registerLink;
    }

     
    set onLogin (callback) { 
        this.__$form__.on('submit', function (event) {
            event.preventDefault();
    
            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();
    
            callback(email, password);
        }.bind(this));
    } 
     
    set error(message) { 
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

// #region register panel

class RegisterPanel extends Panel{
    constructor(){
        super($('<section class="register container">'
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

        this.$container = this.$element;
    
        this.$form = this.$container.find('form');
        this.__$form__ = this.$form;
    
        this.$inputs = this.$form.find('input');
        
        this.__$nameInput__ = $(this.$inputs[0]);
    
        this.__$surnameInput__ = $(this.$inputs[1]);
    
        this.__$emailInput__ = $(this.$inputs[2]);
    
        this.__$passwordInput__= $(this.$inputs[3]);
        
        this.__$passwordConfirmationInput__ = $(this.$inputs[4]);
    
        this.errorPanel = new ErrorPanel;
        this.$container.append(this.errorPanel.$element);
        this.__errorPanel__ = this.errorPanel;
    
        this.$loginLink = $('<a href="#" class="register__login-link">Login</a>');
        this.$container.append(this.$loginLink);
        this.__$loginLink__ = this.$loginLink;
    }

 
    set onRegister(callback) {
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
        this.__errorPanel__.message;
        this.__errorPanel__.hide();
    };
     
    set onGoToLogin(callback) { 
        this.__$loginLink__.on('click', callback);
    }
}

//#endregion

//#region home panel

class HomePanel extends Panel {

    constructor(){

        super($('<section class="home" class="container">'
        +'<div class="row">'
        + '<h2>Welcome,<span></span>!</h2>'
        + '<button>Logout</button>'));

        this.$container = this.$element;
    
        this.$title = this.$container.find('h2');
    
        this.$userSpan = this.$title.find('span');
        this.__$userSpan__ = this.$userSpan;
    
        this.$logoutButton = this.$container.find('button');
        this.__$logoutButton__ = this.$logoutButton;

    }
     
    set user (user) { 
        this.__$userSpan__.text(user.name);
    } 
    
    set onLogout (callback) { 
        this.__$logoutButton__.on('click', callback);
    } 
}

//#endregion

//#region search panel

class SearchPanel extends Panel {

    constructor(){
        super($('<section>'
        +'<form>'
        +'<input type="text" name="query" placeholder="...">'
        +'<button type="submit">Search</button>'
        +'</form>'
        +'<ul></ul>'
        +'</section>'
        ));

        this.$container = this.$element;
    
        this.$form = this.$container.children('form');
        this.__$form__ = this.$form;
    
        this.$queryInput = this.$form.children('input');
        this.__$queryInput__ = this.$queryInput;
    
        this.errorPanel = new ErrorPanel;
        this.$container.append(this.errorPanel.$element);
        this.__errorPanel__ = this.errorPanel;
    
        this.__$resultList__ = this.$container.children('ul');
    }
    
    set onSearch(callback) {
        
        this.__$form__.on('submit', function(event) {
            event.preventDefault();
            
            var query = this.__$queryInput__.val();
            this.clear()
            callback(query);
        }.bind(this));
    }
 
    set error(message) { 
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    } 
    
    set results(results) {
        this.__$resultList__.text('');
        this.__errorPanel__.hide();

        results.forEach(function(result) {
            var $item = $('<li>'+result.text +'<img src="'+result.image+'" width ="100px"></li>');
            this.__$resultList__.append($item);
        }.bind(this));
    }
    
    clear() {
        this.__$resultList__.text('');
        this.__$queryInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    };
}

//#endregion

//#region error panel

class ErrorPanel extends Panel {
    constructor(){
        super($('<section class="error"></section>'));
    }
     
    set message(message) { 
        this.$element.text(message);
    }
}

//#endregion