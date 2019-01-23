var loginPanel = new LoginPanel;
var welcomePanel = new WelcomePanel;
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

welcomePanel.onSearch = function (title, image){
    try {
        
    } catch (error) {
        
    }
};

welcomePanel.onLogout = function () {
    welcomePanel.hide();
    loginPanel.clear();
    loginPanel.show();
};

loginPanel.onLoadPageRegister = function () {
    loginPanel.hide();
    registerPanel.show();
};

registerPanel.onClickLoginFromRegister = function () {
    registerPanel.clear();
    registerPanel.hide();
    loginPanel.show();

};

registerPanel.submitFormRegister = function (name, surname, email, password, passwordConfirmation) {
    try {
        register(name, surname, email, password, passwordConfirmation, function(){
            registerPanel.hide();
            registerPanel.clear();
            loginPanel.show();
        })
    } catch (error) {
        registerPanel.error = error.message;
    }
};

