var loginPanel = new LoginPanel
var welcomePanel = new WelcomePanel
var registerPanel = new RegisterPanel

document.body.appendChild(loginPanel.element);
document.body.appendChild(welcomePanel.element);
document.body.appendChild(registerPanel.element)

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

registerPanel.onRegister = function(name,surname, email, password, confirmPassword) {
    try {
        register(name,surname, email, password, confirmPassword , function() {
            registerPanel.hide();

            registerPanel.clear();
            loginPanel.show();

            
        });
    } catch(err) {
        registerPanel.error = err.message;
    }

}

welcomePanel.onLogout = function() {
    welcomePanel.hide();
    loginPanel.clear();
    loginPanel.show();
};

loginPanel.signUp = function(){
    loginPanel.hide()
    loginPanel.clear()
    registerPanel.show()

}

registerPanel.signIn = function(){
    registerPanel.hide()
    registerPanel.clear()
    loginPanel.show()

}

