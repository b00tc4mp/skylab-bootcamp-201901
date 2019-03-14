var loginPanel = new LoginPanel
var welcomePanel = new WelcomePanel
var registerPanel = new RegisterPanel


document.body.appendChild(loginPanel.element);
document.body.appendChild(welcomePanel.element);
document.body.appendChild(registerPanel.element)

loginPanel.onLogin = function(email, password) {
    //function(email, password) es el paràmetre del set
    try {
        login(email, password, function(user) {
            loginPanel.hide();

            welcomePanel.user = user;
            welcomePanel.show();
        });
    } catch(err) {
        loginPanel.error = err.message;
    }
};

loginPanel.onRegister = function() {
    loginPanel.hide();
    registerPanel.show();
    registerPanel.clear();
};

registerPanel.backToLogin = function(){
    loginPanel.clear();
    registerPanel.hide();
    loginPanel.show();
}


registerPanel.tryRegister = function(name, surname, email, password, confpassword){
    try{
        register(name, surname, email, password, confpassword, function(){
            //Debería volver a la pantalla
            loginPanel.clear()
            loginPanel.show()
            registerPanel.hide()
        })
    } catch(err){
        registerPanel.error = err.message
    }
}



// loginPanel.onLogin = function(email, password) {
//     //function(email, password) es el paràmetre del set
//     try {
//         login(email, password, function(user) {
//             loginPanel.hide();

//             welcomePanel.user = user;
//             welcomePanel.show();
//         });
//     } catch(err) {
//         loginPanel.error = err.message;
//     }
// };
welcomePanel.onLogout = function() {
    welcomePanel.hide();
    loginPanel.clear();
    loginPanel.show();
};


// var loginPanel2 = new LoginPanel

// document.body.appendChild(loginPanel2.element);

// loginPanel2.onLogin = function(email, password) {
//     console.log('llama a otra logica', email, password);
// };


// var mainPanel = new Panel

// var registerPanel = new RegisterPanel
// var welcomePanel = new WelcomePanel

// mainPanel.add(loginPanel)
// mainPanel.add(registerPanel)
// mainPanel.add(welcomePanel)

// loginPanel.onLogin = function() {}

// ...
