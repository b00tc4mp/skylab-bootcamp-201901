var loginPanel = new LoginPanel
var welcomePanel = new WelcomePanel
//var registerPanel = new RegisterPanel

document.body.appendChild(loginPanel.element);
document.body.appendChild(welcomePanel.element);

loginPanel.onLogin = function(email, password) {
    try {
        login(email, password, function(user) {
            loginPanel.hide();
            registerPanel.hide();
            welcomePanel.user = user;
            welcomePanel.show();
        });
    } catch(err) {
        loginPanel.error = err.message;
    }
};

welcomePanel.onLogout = function() {
    welcomePanel.hide();
    registerPanel.hide();
    loginPanel.clear();
    loginPanel.show();
};

/*registerPanel.onRegister = function() {
    loginPanel.hide();
    //welcomePanel.hide();
    registerPanel.show();
};*/


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
