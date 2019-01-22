var loginPanel = new LoginPanel
var welcomePanel = new WelcomePanel
var registerPanel = new RegisterPanel

document.body.appendChild(loginPanel.element); //posem el loguinpanel a dins del body
document.body.appendChild(welcomePanel.element);
document.body.appendChild(registerPanel.element);

loginPanel.onLogin = function(email, password) {
    try {
        login(email, password, function(user) {
            loginPanel.hide();

            welcomePanel.user = user;
            welcomePanel.show();
        });
    } catch(err) {
        loginPanel.error = err.message; //el missatge d'error esta definit a la logica(logic.js)
    }
};


loginPanel.onRegisterPanel = function (){
    
    registerPanel.show();
    loginPanel.hide();
}

welcomePanel.onLogout = function() {

    welcomePanel.hide();
    loginPanel.clear();
    loginPanel.show();
};


registerPanel.register = function(name, surname, email, password, confirmpassword) {
    try {
        register(name, surname, email, password,confirmpassword, function(user) {
           
            loginPanel.show();
            registerPanel.hide();
            registerPanel.clear();
        });
    } catch(err) {
        registerPanel.error = err.message; //el missatge d'error esta definit a la logica(logic.js)
    }
};

debugger
registerPanel.register = function() {

    loginPanel.show();
    registerPanel.hide();
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
