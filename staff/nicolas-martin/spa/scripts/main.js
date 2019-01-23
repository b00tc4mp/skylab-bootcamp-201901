'use strict';

var loginPanel = new LoginPanel
var registerPanel = new RegisterPanel
var homePanel = new HomePanel
var searchPanel = new SearchPanel

document.body.appendChild(loginPanel.element);
document.body.appendChild(registerPanel.element)
document.body.appendChild(homePanel.element);

homePanel.element.appendChild(searchPanel.element);

loginPanel.onLogin = function(email, password) {
    try {
        logic.login(email, password, function(user) {
            loginPanel.hide();
            loginPanel.clear();

            homePanel.user = user;
            homePanel.show();
        });
    } catch(err) {
        loginPanel.error = err.message;
    }
};

loginPanel.onGoToRegister = function() {
    loginPanel.hide();
    loginPanel.clear();

    registerPanel.show();
};

registerPanel.onRegister = function(name, surname, email, password, passwordConfirmation) {
    try {
        logic.register(name, surname, email, password, passwordConfirmation, function() {
            registerPanel.hide();
            registerPanel.clear();

            loginPanel.show();
        });
    } catch(err) {
        registerPanel.error = err.message;
    }
};

registerPanel.onGoToLogin = function() {
    registerPanel.hide();
    registerPanel.clear();
    loginPanel.show();
};

homePanel.onLogout = function() {
    homePanel.hide();
    searchPanel.clear();
    loginPanel.clear();
    loginPanel.show();
};

searchPanel.onSearch = function(query) {
    try {
        logic.search(query, function(error, results) {
            if (error) searchPanel.error = error;
            else searchPanel.results = results.map(function(result) {
                return {
                    text: result.title,
                    image: result.imageUrl
                }
            });
        });
    } catch(err) {
        searchPanel.error = err.message;
    } 
};