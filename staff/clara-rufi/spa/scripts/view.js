'use strict';

//#region panel
// creem el panel de 0. element seria com un item, serveix x posar-li alguna 
// cosa x dp poder crear propietats de panel
function Panel(element) {
    this.element = element;
}

Panel.prototype.hide = function() {
    this.element.hide();
};

Panel.prototype.show = function() {
    this.element.show();
};

//#endregion

//#region login panel
// loguin panel hereda les funcions de show i hide q hem creat
function LoginPanel() {

/*executem funcio panel amb el call, x crear section a dins de panel
*/
    Panel.call(this, document.createElement('section'));

    var container = this.element; /*el this fa referencia a panel*/
    container.className = 'login';

    var title = document.createElement('h2');
    title.innerText = 'Login';
    container.appendChild(title); //container es el pare, title el fill

    var form = document.createElement('form');
    form.className = 'login__form'; // els __ fa q sigui dif de copiar x un altre usuari, q no creei el mateix valor
    container.appendChild(form);
    this.__form__ = form;  // = a loguinpanel.__form__=form. els __ es pq no ho toquin

    var emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email'); //setatribute, x dir q for i email seran elements dif
    emailLabel.innerText = 'E-mail:';
    form.appendChild(emailLabel);

    var emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'email';
    emailInput.required = true;
    form.appendChild(emailInput);
    this.__emailInput__ = emailInput;

    var passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.innerText = 'Password:';
    form.appendChild(passwordLabel);

    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'password';
    passwordInput.required = true;
    form.appendChild(passwordInput);
    this.__passwordInput__ = passwordInput; //el this__passwordimput ho igualem a passwordimput, x dp passar tota la info al camp   var password del defineProperty

    var submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Login';
    form.appendChild(submitButton);

    var errorPanel = new ErrorPanel;
    container.appendChild(errorPanel.element);
    this.__errorPanel__ = errorPanel;

    // var error = document.createElement('section');
    // error.className = 'login__error';
    // container.appendChild(error);
    // this.__error__ = error;

    var registerLink = document.createElement('a');
    registerLink.href = '#';
    registerLink.innerText = 'Register'
    registerLink.className = 'login__register-link';
    container.appendChild(registerLink);
    this.__registerLink__ = registerLink;
}

LoginPanel.prototype = Object.create(Panel.prototype); //creem el loguinpanel a partir de panel i li afegim les prop de panel
LoginPanel.prototype.constructor = LoginPanel;

Object.defineProperty(LoginPanel.prototype, 'onLogin', { 
    set: function(callback) { 
        this.__form__.addEventListener('submit', function (event) {//this fa ref a loguinpannel
            event.preventDefault(); //x aturar el fluxe, en aquest cas, del submit
    
            var email = this.__emailInput__.value; //this assenyala a loguinpanel, pq hi ha el bind definit
            var password = this.__passwordInput__.value;
    
            callback(email, password);
        }.bind(this));
    } 
});
// s'executa amb el submit
//set propietat q hem posat a loguin Panel, xo q no queda guardada i amb el callback, executes onloguin (amagarà loguin panel, q mostrarà el welcomepanel amb el user)
//al loguin panel, li definim la propietat de onloguin
//bind window, sempre els this apuntaran a window.

Object.defineProperty(LoginPanel.prototype, 'error', { 
    set: function(message) { 
        this.__error__.innerText = message;
        this.__error__.show();
    } 
});

Object.defineProperty(LoginPanel.prototype, 'onRegisterPanel', { 
    set: function(callback) { 
        this.__registerLink__.addEventListener('click', callback);
    } 
});

LoginPanel.prototype.clear = function() {
    this.__emailInput__.value = '';
    this.__passwordInput__.value = '';
    this.__error__.innerText = '';
    this.__error__.hide(); 
};

//#endregion

//#region welcome panel

// function WelcomePanel() {
//     Panel.call(this, document.createElement('section'));

//     var container = this.element;
//     container.className = 'welcome';

//     var title = document.createElement('h2');
//     container.appendChild(title);

//     var welcomeText = document.createTextNode('Welcome, ');
//     title.appendChild(welcomeText);

//     var userSpan = document.createElement('span');
//     userSpan.className = 'welcome__name';
//     title.appendChild(userSpan);
//     this.__userSpan__ = userSpan;

//     var exclamationText = document.createTextNode('!');
//     title.appendChild(exclamationText);

//     var logoutButton = document.createElement('button');
//     logoutButton.className = 'welcome__logout';
//     logoutButton.innerText = 'Logout';
//     container.appendChild(logoutButton);
//     this.__logoutButton__ = logoutButton;
// }

// WelcomePanel.prototype = Object.create(Panel.prototype);
// WelcomePanel.prototype.constructor = WelcomePanel;

// Object.defineProperty(WelcomePanel.prototype, 'user', { 
//     set: function(user) { 
//         this.__userSpan__.innerText = user.name;
//     } 
// });

// Object.defineProperty(WelcomePanel.prototype, 'onLogout', { 
//     set: function(callback) { 
//         this.__logoutButton__.addEventListener('click', callback);
//     } 
// });

//#endregion

//////////////////////////////////////#region register panel ///////////////////////////////////////////////////

function RegisterPanel() {
   
    Panel.call(this, document.createElement('section'));

    var container = this.element; 
    container.className = 'register';

    var title = document.createElement('h2');
    title.innerText = 'Register';
    container.appendChild(title); 

    var form = document.createElement('form');
    form.className = 'register__form';
    container.appendChild(form);
    this.__form__ = form; 

    var nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.innerText = 'Name:';
    form.appendChild(nameLabel);

    var nameInput = document.createElement('input');
    nameInput.type = 'name';
    nameInput.name = 'name';
    nameInput.placeholder = 'name';
    nameInput.required = true;
    form.appendChild(nameInput);
    this.__nameInput__ = nameInput;

    var surmaneLabel = document.createElement('label');
    surmaneLabel.setAttribute('for', 'surname');
    surmaneLabel.innerText = 'Surname:';
    form.appendChild(surmaneLabel);

    var surnameInput = document.createElement('input');
    surnameInput.type = 'surname';
    surnameInput.name = 'surname';
    surnameInput.placeholder = 'surname';
    surnameInput.required = true;
    form.appendChild(surnameInput);
    this.__surnameInput__ = surnameInput;

    var emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email'); 
    emailLabel.innerText = 'E-mail:';
    form.appendChild(emailLabel);

    var emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'email';
    emailInput.required = true;
    form.appendChild(emailInput);
    this.__emailInput__ = emailInput;

    var passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.innerText = 'Password:';
    form.appendChild(passwordLabel);

    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'password';
    passwordInput.required = true;
    form.appendChild(passwordInput);
    this.__passwordInput__ = passwordInput; 

    var passwordConfirmationlabel = document.createElement('label');
    passwordConfirmationlabel.setAttribute('for', 'confirmpassword');
    passwordConfirmationlabel.innerText = 'Confirm Password:';
    form.appendChild(passwordConfirmationlabel);

    var passwordConfirmationInput = document.createElement('input');
    passwordConfirmationInput.type = 'password';
    passwordConfirmationInput.name = 'confirmpassword';
    passwordConfirmationInput.placeholder = 'confirmpassword';
    passwordConfirmationInput.required = true;
    form.appendChild(passwordConfirmationInput);
    this.__passwordConfirmationInput__ = passwordConfirmationInput; 

    var submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Register';
    form.appendChild(submitButton);

    var errorPanel = new ErrorPanel;
    container.appendChild(errorPanel.element);
    this.__errorPanel__ = errorPanel;

    var loginLink = document.createElement('a');
    loginLink.href = '#';
    loginLink.innerText = 'Login'
    loginLink.className = 'register__login-link';
    container.appendChild(loginLink);
    this.__loginLink__ = loginLink;
}

//     var registerLink = document.createElement('a');
//     registerLink.href = '#';
//     registerLink.innerText = 'Register'
//     registerLink.className = 'login__register-link';
//     container.appendChild(registerLink);
// }




RegisterPanel.prototype = Object.create(Panel.prototype); //creem el loguinpanel a partir de panel i li afegim les prop de panel
RegisterPanel.prototype.constructor = RegisterPanel;

Object.defineProperty(RegisterPanel.prototype, 'register', { 
    set: function(callback) { 
        this.__form__.addEventListener('submit', function (event) {//this fa ref a loguinpannel
            event.preventDefault(); //x aturar el fluxe, en aquest cas, del submit
            
            var name = this.__nameInput__.value;
            var surname = this.__surnameInput__.value;
            var email = this.__emailInput__.value; //this assenyala a loguinpanel, pq hi ha el bind definit
            var password = this.__passwordInput__.value;
            var passwordConfirmation = this.__passwordConfirmationInput__.value;
            callback(name, surname, email, password, passwordConfirmation);
        }.bind(this));
    } 
});

Object.defineProperty(RegisterPanel.prototype, 'error', { 
    set: function(message) { 
        this.__error__.innerText = message;
        this.__error__.show();
    } 
});


RegisterPanel.prototype.clear = function() {
    this.__nameInput__.value = '';
    this.__surnameInput__.value = '';
    this.__emailInput__.value = '';
    this.__passwordInput__.value = '';
    this.__passwordConfirmationInput__.value = '';
    this.__errorPanel__.message = '';
    this.__error__.hide();
};


Object.defineProperty(RegisterPanel.prototype, 'onGoToLogin', { 
    set: function(callback) { 
        this.__loginLink__.addEventListener('click', callback);
    } 
});


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
    set: function(user) { 
        this.__userSpan__.innerText = user.name;
    } 
});

Object.defineProperty(HomePanel.prototype, 'onLogout', { 
    set: function(callback) { 
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
    set: function(callback) {
        this.__form__.addEventListener('submit', function(event) {
            event.preventDefault();

            var query = this.__queryInput__.value;

            callback(query);
        }.bind(this));
    }
});

Object.defineProperty(SearchPanel.prototype, 'error', { 
    set: function(message) { 
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    } 
});

Object.defineProperty(SearchPanel.prototype, 'results', {
    set: function(results) {
        this.__resultList__.innerHTML = '';
        this.__error__.hide();

        results.forEach(function(result) {
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

SearchPanel.prototype.clear = function() {
    this.__resultList__.innerHTML = '';
    this.__queryInput__.value = '';
    this.__errorPanel__.message = '';
    this.__errorPanel__.hide();
};

//#endregion

//#region error panel

function ErrorPanel() {
    Panel.call(this, document.createElement('section'));

    var container = this.element;
    container.className = 'error';
}

ErrorPanel.prototype = Object.create(Panel.prototype);
ErrorPanel.prototype.constructor = ErrorPanel;

Object.defineProperty(ErrorPanel.prototype, 'message', { 
    set: function(message) { 
        this.element.innerText = message;
    } 
});

//#endregion



// TODO remove following old code when register panel already implemented

//#region view (presentation logic)

// (function () {
//     var registerSection = document.getElementsByClassName('register')[0];

//     var loginLink = document.getElementsByClassName('register__login-link')[0];

//     var registerForm = document.getElementsByClassName('register__form')[0];

//     loginLink.addEventListener('click', function (event) {
//         event.preventDefault();

//         registerSection.hide();
//         loginSection.show();
//     });

//     registerForm.addEventListener('submit', function (event) {
//         event.preventDefault();

//         var inputs = this.getElementsByTagName('input');

//         var nameInput = inputs[0];
//         var surnameInput = inputs[1];
//         var emailInput = inputs[2];
//         var passwordInput = inputs[3];
//         var passwordConfirmationInput = inputs[4];

//         var name = nameInput.value;
//         var surname = surnameInput.value;
//         var email = emailInput.value;
//         var password = passwordInput.value;
//         var passwordConfirmation = passwordConfirmationInput.value;

//         var errorPanel = document.getElementsByClassName('register__error')[0];

//         try {
//             register(name, surname, email, password, passwordConfirmation, function () {
//                 nameInput.value = '';
//                 surnameInput.value = '';
//                 emailInput.value = '';
//                 passwordInput.value = '';
//                 passwordConfirmationInput.value = '';

//                 errorPanel.style.display = 'none';
//                 errorPanel.innerText = '';

//                 registerSection.hide();
//                 loginSection.show();
//             });
//         } catch (err) {
//             errorPanel.show();
//             errorPanel.innerText = err.message;
//         }
//     });
// });//();

//#endregion

// ///////////////////////////////////////////////////////////////////// duck panel /////////////////////

// function SearchPanel() {

//     /*executem funcio panel amb el call, x crear section a dins de panel
//     */
//         Panel.call(this, document.createElement('section')); //cridem al pare i li posem una section
    
//         var container = this.element; /*el this fa referencia a panel*/
//         container.className = 'ducks';
    
//         // var title = document.createElement('h2');
//         // title.innerText = 'Welcome to ducks app!';
//         // container.appendChild(title); //container es el pare, title el fill
    
//         var form = document.createElement('form');
//         containerduck.appendChild(form);
    
//         var queryInput = document.createElement('input');
//         queryInput.type = 'text';
//         queryInput.name = 'name duck:';
//         queryInput.placeholder = 'search duck';
//         ducksearchInput.required = true;
//         form.appendChild(queryInput);
//         this.__ducksearchInput__ = ducksearchInput; //per poder fer el clear dp del buscador
    
//         var searchButton = document.createElement('button');
//         searchButton .type = 'submit';
//         searchButton .innerText = 'Search';
//         form.appendChild(searchButton);
//         this.__searchButton__ = searchButton;

//         var resultList = document.createElement("ul");
//         container.appendChild(resultList);
//         this.__resultList__ = resultList; // x poder accedir a aquestes variables fora del constructor
//     }
    
//     SearchPanel.prototype = Object.create(Panel.prototype); //creem el loguinpanel a partir de panel i li afegim les prop de panel
//     SearchPanel.prototype.constructor = SearchPanel;


    
    // Object.defineProperty(DuckPanel.prototype, 'onDuck', { ??????????????????
    //     set: function(callback) { 
    //         this.__form__.addEventListener('submit', function (event) {//this fa ref a loguinpannel
    //             event.preventDefault(); //x aturar el fluxe, en aquest cas, del submit
        
    //             var email = this.__emailInput__.value; //this assenyala a loguinpanel, pq hi ha el bind definit
    //             var password = this.__passwordInput__.value;
        
    //             callback(email, password);
    //         }.bind(this));
    //     } 
    // });
    // s'executa amb el submit
    //set propietat q hem posat a loguin Panel, xo q no queda guardada i amb el callback, executes onloguin (amagarà loguin panel, q mostrarà el welcomepanel amb el user)
    //al loguin panel, li definim la propietat de onloguin
    //bind window, sempre els this apuntaran a window.
    
    // Object.defineProperty(LoginPanel.prototype, 'error', { 
    //     set: function(message) { 
    //         this.__error__.innerText = message;
    //         this.__error__.show();
    //     } 
    // });
    
    // Object.defineProperty(LoginPanel.prototype, 'onRegisterPanel', { 
    //     set: function(callback) { 
    //         this.__registerLink__.addEventListener('click', callback);
    //     } 
    // });
    
    // LoginPanel.prototype.clear = function() {
    //     this.__emailInput__.value = '';
    //     this.__passwordInput__.value = '';
    //     this.__error__.innerText = '';
    //     this.__error__.hide(); 
    // };
    