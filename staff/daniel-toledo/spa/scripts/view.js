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

class LoginPanel extends Panel {
    constructor(){
        
        super($(`<section class="login container col-lg-8">
        <h2 class="col-2">Login</h2>
        <form class="login__form form-group container " >

            <div class="row">
                <label for="email" class="col col-md-3 col-sm-12 flex">Email</label>
                <input type="email" class="col col-md-9 col-12 form-control" name="email" placeholder="Email" required>

                <label for="password" class="col col-md-3 col-sm-12 flex">Password</label>
                <input type="password" class="col col-md-9 col-12 form-control" name="password" placeholder="Password" required>
            </div>

            <div class="row flex">
                <div class="col-md-3 col-0"></div>
                    <button type="submit" class="btn btn-dark col-md-6 col-12">Login</button>
                    <div class="link col-3">
                    <a href="#" class="btn btn-outline-secondary login__register-link ">Register</a>
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
    
        var $registerLink = $form.find('a')
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
    
    clear() {
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    };
    
    set onGoToRegister(callback) {
        this.__$registerLink__.on('click', callback);
    }
}


//#endregion

//#region register panel

class RegisterPanel extends Panel {
    constructor(){
        super($(`<section class="register container">
    <h2>Register</h2>
    <form class="register__form container">

    
        <div class="row">
            <div class="input-group">
                <label for="name" class="input-group-text col-3">Name</label>
                <input type="text" class="form-control" name="name" placeholder="Name" required>
            </div>
        </div>

        <div class="row">
            <div class="input-group">
                <label for="surname" class="input-group-text col-3">Surname</label>
                <input type="text"  class="form-control" name="surname" placeholder="Surname" required>
            </div>
        </div>

        <div class="row">
            <div class="input-group">
                <label for="email" class="input-group-text col-3">E-mail</label>
                <input type="email"  class="form-control" name="email" placeholder="Email" required>
            </div>
        </div>

        <div class="row">
            <div class="input-group">
                <label for="password" class="input-group-text col-3">Password</label>
                <input type="password"  class="form-control" name="password" placeholder="Password" required>
            </div>
        </div>

        <div class="row">
            <div class="input-group">
                <label for="password" class="input-group-text col-3">Confirm Password</label>
                <input type="password"  class="form-control" name="password-confirmation" placeholder="Password" required>
            </div>
        </div>

        <div class="row flex">
            <button type="submit" class="btn btn-dark col-12 col-md-9">Register</button>
            <div class="link col-3">
                <a href="#" class="register__login-link btn btn-outline-secondary flex">Login</a>
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
    
        var $loginLink = $form.find('a')
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
    }
    
    set onGoToLogin(callback) {
        this.__$loginLink__.on('click', callback);
    }

}


//#endregion

//#region home panel

class HomePanel extends Panel {
    constructor(){
        super( $(`<section class="home container">
    <div class="row">
        <h2 class="col col-12 col-sm-9 col-md-10">Welcome, <span></span>!</h2>
        <button class="btn btn-dark col-6 col-sm-3 col-md-2">Logout</button>
    </div>
</section>`));

        var $container = this.$element;

        var $title = $container.find('h2')

        var $userSpan = $title.find('span')
        this.__$userSpan__ = $userSpan;

        var $logoutButton = $container.find('button')
        this.__$logoutButton__ = $logoutButton;
    }
    
    set user (user) {
        this.__$userSpan__.text(user.name);
    }

    
    set onLogout(callback) {
        this.__$logoutButton__.on('click', callback);
    }

}


//#endregion

//#region search panel

class SearchPanel extends Panel{
    constructor(){
        super($(`<section class="row">
    <form class="input-group search__input">

        <input type="text" class="form-control input-group-text col-8 col-sm-10" name="query" placeholder="...">
        <button type="submit" class="input-group-text col-4 col-sm-2 text-center" innerText="search">Search</button>

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
        this.__$form__.on('submit', event =>{

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

    clearError(){
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    }
    
}
//#endregion

//#region results panel

// class ResultsPanel extends Panel{
//     constructor(){
//         super($(`<section class="row"></section>`))

//         var $container = this.$element;

//         var $resultList = $container.find('section')
//         this.__$resultList__ = $resultList;
//     }

    

//     set results(results) {
//         this.__$resultList__.html('');

//         results.forEach(result => {
            
//             var $item = $('<div class="card col-12 col-sm-6 col-md-4"></div>');
//             this.__$resultList__.append($item);

//             var $text = $('<h2 class="card-title text-center results__title">'+result.text+'</h2>');
//             $item.append($text);

//             var $image = $('<img class="card-img-top" src ="'+result.image+'" width="100px">');
//             // $image.attr("src", result.image);
//             $item.append($image);

//             var $buttonCard =$('<button class="btn btn-dark" id="'+result.id+'">See More...</button>');
//             $item.append($buttonCard);
//             this.__$buttonCard__=$buttonCard;

//         });
//     }

//     clear(){
//         this.__$resultList__.html('');
//     }
// }

class ResultsPanel extends Panel {
    constructor() {
        super($(`<section class="results">
            <div class="row"></div>
        </section>`));

        var $resultList = this.$element.find('div');
        this.__$resultList__ = $resultList;
    }

    set results(results) {
        this.__$resultList__.html('');

        results.forEach(result => {
            var $item = $(`<div class="separator col-12 col-sm-6 col-md-4">
            <div data-id=${result.id} class="card">
                <h2 class="card-title text-center results__title">${result.text}</h2> 
                <img class="card-img-top" src =${result.image} width="100px">
                <button class="btn btn-black">More info...</button>
            </div>
        </div>`);
            
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

//#region error panel

class ErrorPanel extends Panel{
    constructor(){
        super( $('<section class="error col-12"></section>'));
    }

   set message(message) {
            this.$element.text(message);
        }
}



//#endregion


