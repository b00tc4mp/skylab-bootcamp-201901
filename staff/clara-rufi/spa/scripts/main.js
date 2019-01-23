var loginPanel = new LoginPanel
var registerPanel = new RegisterPanel
var welcomePanel = new WelcomePanel


document.body.appendChild(loginPanel.element); //posem el loguinpanel a dins del body
document.body.appendChild(registerPanel.element);
document.body.appendChild(welcomePanel.element);


loginPanel.onLogin = function(email, password) {
    try {
        login(email, password, function(user) {
            loginPanel.hide();
            loginPanel.clear();

            welcomePanel.user = user;
            welcomePanel.show();
        
        });
    } catch(err) {
        loginPanel.error = err.message;
        //el missatge d'error esta definit a la logica(logic.js)
    }
};


loginPanel.onRegisterPanel = function (){
    loginPanel.clear();
    loginPanel.hide();

    registerPanel.show();
    
    ///
    // loginPanel.hide();
    // registerPanel.show();
}

welcomePanel.onLogout = function() {

    welcomePanel.hide();
    loginPanel.clear();
    loginPanel.show();
};


registerPanel.register = function(name, surname, email, password, passwordConfirmation) {
    try {
        register(name, surname, email, password,passwordConfirmation, function(user) {
           
            
            registerPanel.hide();
            registerPanel.clear();
            loginPanel.show();
        });
    } catch(err) {
        registerPanel.error = err.message; //el missatge d'error esta definit a la logica(logic.js)
       
    }
};


registerPanel.register = function() {

    loginPanel.show();
    registerPanel.hide();
    registerPanel.clear();
    
    // registerPanel.hide();
    // loginPanel.show();
    // registerPanel.clear();
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
