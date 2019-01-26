'use strict';

//#region panel

class Panel{
    constructor($element){
        this.$element = $element;
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
       super($(`<section class="login container col-md-6">
        <h2>Login</h2>
        <form class="login__form">
            <div class="row">
                <div class="col-sm-12 form-group">
                    <label for="email">E-mail:</label>
                    <input type="email" class="form-control" name="email" placeholder="email" required>
                </div>
                <div class="col-sm-12 form-group">
                    <label for="password">Password:</label>
                    <input type="password" class="form-control" name="password" placeholder="password" required>
                </div>
                <div class="col-sm-12">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </div>
        </form>
    </section>`))

    var $container = this.$element;
    var $form = $container.children('form');
    this.__$form__ = $form;
    this.__$emailInput__ = $form.children('div').children('div').children('input[type=email]');
    this.__$passwordInput__ = $form.children('div').children('div').children('input[type=password]');

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $registerLink = $('<a href="#" class="login__register-link">Register</a>');
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
        }
    
    set error(message) {
            this.__errorPanel__.message = message;
            this.__errorPanel__.show();
        }
    
    set onRegisterPanel(callback) {
            this.__$registerLink__.on('click', callback);
        }
    
    clear() {
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
        this.__errorPanel__.innerText = '';
        this.__errorPanel__.hide();
    }
}


//#endregion

//#region Home panel

class HomePanel extends Panel {
   
    constructor(){
        super($(`<section class="home container">
        <div class="row">
            <div class="col-sm-6">
                <h2>Welcome, <span class="home__name"></span></h2>
            </div>
            <div class="col-sm-6 text-right">
                <button class="home__logout btn btn-primary">Logout</button>
            </div>
        </div>
        <form action="https://duckling-api.herokuapp.com/api/search" method="get">
            <div class="row">
                <div class="col-md-12 input-group mb-3">
                    <input type="text" class="form-control" name="q" aria-describedby="basic-addon1"></input>
                    <div class="input-group-prepend">
                        <button type="submit" class="btn btn-outline-secondary">Search</button>
                </div>
            </div>
        </form>
    </section>`))

    var $container = this.$element;
    this.__$userSpan__ = $container.children('div').children('div').children('h2').children('span');
    this.__$logoutButton__ = $container.children('div').children('div').children('button');
    var $form = $container.children('form');
    this.__$duckForm__ = $form;
    this.__$queryInput__ = $form.children('div').children('div').children('input[type=text]');
    var $button = $form.children('button');
    this.__$submitButton__ = $button;

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    }

    set user(user) {
            this.__$userSpan__.text(user.name + '!');
        }
    
    set onLogout(callback) {
            this.__$logoutButton__.on('click', callback);
        }
    
    set onSearch(callback) {
            this.__$duckForm__.on('submit', event => {
                event.preventDefault();
    
                var searchVal = this.__$queryInput__.val();
    
                callback(searchVal);
            });
        }
    
    set error(message) {
            this.__errorPanel__.message = message;
            this.__errorPanel__.show();
        }

        clear(all) {
            this.__errorPanel__.message = '';
            this.__errorPanel__.hide();
            if (all) this.__$queryInput__.val('');
        }
}




//#endregion

//#region register panel

class  RegisterPanel extends Panel {
    constructor(){
        super($(`<section class="register col-lg-6 container">
        <h2>Register</h2>
        <form class="register__form">
            <div class="row">
                <div class="col-sm-12 form-group">
                    <label for="name">Name:</label>
                    <input type="text" name="name" placeholder="name" required class="form-control">
                </div>
                <div class="col-sm-12 form-group">
                    <label for="surname">Surname:</label>
                    <input type="text" name="surname" placeholder="surname" required class="form-control">
                </div>
                <div class="col-sm-12 form-group">
                    <label for="email">E-mail:</label>
                    <input type="email" name="email" placeholder="email" required class="form-control">
                </div>
                <div class="col-sm-12 form-group">
                    <label for="password">Password:</label>
                    <input type="password" name="password" placeholder="password" required class="form-control">
                </div>
                <div class="col-sm-12 form-group">
                    <label for="password">Confirm Password:</label>
                    <input type="password" name="password-confirmation" placeholder="password" required class="form-control">
                </div>
                <div class="col-md-12">
                    <button type="submit" class="btn btn-primary">Register</button>
                </div>
            </div>
        </form>
    </section>`))
    var $container = this.$element;
    var $form = $container.children('form');
    this.__$form__ = $form;
    this.__$nameInput__ = $form.children('div').children('div').children('input[name=name]');
    this.__$surnameInput__ = $form.children('div').children('div').children('input[name=surname]');
    this.__$emailInput__ = $form.children('div').children('div').children('input[type=email]');
    this.__$passwordInput__ = $form.children('div').children('div').children('input[name=password]');
    this.__$passwordConfirmationInput__ = $form.children('div').children('div').children('input[name=password-confirmation]');

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $loginLink = $('<a href="#" class="register__login-link btn">Login</a>');
    $container.append($loginLink);
    this.__$loginLink__ = $loginLink;
    }
    
    set onLoginPanel(callback) {
            this.__$loginLink__.on('click', callback);
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
}


//#endregion

//#region results panel

class ResultsPanel extends  Panel{

    constructor(){
        super($(`<section class="results row"></section>`))

        this.__$duckList__ = this.$element;
    }

    set listResults(ducklings) {
        this.__$duckList__.text('');
        ducklings.forEach(duckling => {
            //var $item = $('<li>' + duckling.text + '<img src="' + duckling.image + '" width="100px"></li>');
            var $item = $('<div class="card col-md-6 col-lg-4">'
                + '<img class="card-img-top" src="' + duckling.image + '" alt="Card image cap">'
                + '<div class="card-body">'
                + '<h5 class="card-title">' + duckling.text + '</h5>'
                + '<a href="#" class="btn btn-primary" data-id = "'+duckling.id+'">Show Info</a>'
                + '</div>'
                + '</div>');
            this.__$duckList__.append($item);

            $item.find('a').click(event => {
                event.preventDefault();
                this.__onDetailCallback__($(event.target).data('id'));
            });
        });
    }

    set onDetail(callback){
        this.__onDetailCallback__ = callback;
    }

    clear() {
        this.__$duckList__.text('');
    }
}
//#endregion


//#region detail panel

class DetailPanel extends Panel {
    
    constructor(){
       super($(`<section class="detail">
       <div class="row">
           <div class="col-lg-6 text-center">
               <img src="#" alt="duckling img" width="300px">
           </div>
           <div class="col-md-6">
               <h3></h3>
               <span></span>
               <h5>Description</h5>
               <p></p>
               <a href="#" target="_blank" class="btn btn-lg btn-primary text-uppercase"> Buy now </a>
               <button class="btn btn-lg btn-outline-primary text-uppercase">Go back</button>
           </div>
       </div>
   </section>`))

        const $container = this.$element
        const $image = $container.find('img')
        this.__$image__ = $image
        const $title = $container.find('h3')
        this.__$title__ = $title
        const $price = $container.find('span')
        this.__$price__ = $price
        const $description = $container.find('p')
        this.__$description__ = $description
        const $externalLink = $container.find('a')
        this.__$externalLink__ = $externalLink
        const $backButton = $container.find('button')
        this.__$backButton__ = $backButton
        
    }


    set item({ image, title, description, price, externalLink }) {
       this.__$image__.attr('src', image)
       this.__$title__.text(title)
       this.__$description__.text(description)
       this.__$price__.text(price)
       this.__$externalLink__.attr('href', externalLink)
    }

    set goBack(callback) {
        this.__$backButton__.on('click', callback);
    }
}

//#endregion

//#region error panel

class ErrorPanel extends Panel {
    
    constructor(){
        super($('<section class="alert alert-danger" role="alert"></section>'))
    }

    set message(message) {
            this.$element.text(message);
        }
}


//#endregion


