'use strict';

var loginPanel = new LoginPanel;
var registerPanel = new RegisterPanel;
var homePanel = new HomePanel;
var searchPanel = new SearchPanel;
var resultPanel = new ResultPanel;


var $body = $(document.body);

$body.append(loginPanel.$element);
$body.append(registerPanel.$element);
$body.append(homePanel.$element);

homePanel.$element.append(searchPanel.$element);
homePanel.$element.append(resultPanel.$element);

loginPanel.onLogin = function (email, password) {
    try {
        logic.login(email, password, function (user) {
            loginPanel.hide();
            loginPanel.clear();

            homePanel.user = user;
            homePanel.show();
        });
    } catch (err) {
        loginPanel.error = err.message;
    }
};

loginPanel.onRegisterPanel = function () {
    loginPanel.hide();
    loginPanel.clear();

    registerPanel.show();
};

registerPanel.onRegister = function (name, surname, email, password, passwordConfirmation) {
    try {
        logic.register(name, surname, email, password, passwordConfirmation, function () {
            registerPanel.hide();
            registerPanel.clear();

            loginPanel.show();
        });
    } catch (err) {
        console.log(err);
        registerPanel.error = err.message;
    }
};

registerPanel.onLoginPanel = function () {
    registerPanel.hide();
    registerPanel.clear();

    loginPanel.show();
};

homePanel.onLogout = function () {
    homePanel.hide();

    searchPanel.clear();

    loginPanel.clear();
    loginPanel.show();
};

searchPanel.onSearch = function (query) {
    try {
        logic.search(query, function (error, results) {
            if (error) {
                searchPanel.error = error;
                searchPanel.clearResults();
            } else searchPanel.results = results.map(function (result) {
                return {
                    text: result.title,
                    image: result.imageUrl
                }
            });
        });
    } catch (err) {
        searchPanel.error = err.message;
    }
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
