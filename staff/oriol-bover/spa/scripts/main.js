var loginPanel = new LoginPanel
var welcomePanel = new WelcomePanel
var registerPanel = new RegisterPanel;

document.body.appendChild(loginPanel.element);
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
        loginPanel.error = err.message;
    }
};

loginPanel.onRegisterPanel = function(){
    loginPanel.hide();
    registerPanel.show();
}

welcomePanel.onLogout = function() {
    welcomePanel.hide();
    loginPanel.clear();
    loginPanel.show();
};

registerPanel.onLoginPanel = function(){
    registerPanel.hide();
    registerPanel.clear();
    loginPanel.show();
}

registerPanel.onRegister = function(name, surname, email, password, passwordConfirmation){
    try {
        register(name, surname, email, password, passwordConfirmation, function(){
            registerPanel.hide();
            registerPanel.clear();
            loginPanel.show();
        });
    } catch (err) {
        registerPanel.error = err.message;
    }
}
