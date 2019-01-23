var loginPanel = new LoginPanel
var welcomePanel = new WelcomePanel
var registerPanel = new RegisterPanel

document.body.appendChild(loginPanel.element);
document.body.appendChild(welcomePanel.element);
document.body.appendChild(registerPanel.element);

loginPanel.onLogin = function (email, password) {
    try {
        login(email, password, function (user) {
            loginPanel.hide();

            welcomePanel.user = user;
            welcomePanel.show();
        });
    } catch (err) {
        loginPanel.error = err.message;
    }
};

loginPanel.clickRegister = function () {
    loginPanel.hide();
    registerPanel.show()
    registerPanel.clear()
};

welcomePanel.onLogout = function () {
    welcomePanel.hide();
    loginPanel.clear();
    loginPanel.show();
};

registerPanel.clickLogin = function () {
    registerPanel.hide()
    loginPanel.clear()
    loginPanel.show()
}

registerPanel.onRegister = function (name, surname, email, password, passwordConfirmation) {

    try {
        register(name, surname, email, password, passwordConfirmation, function (user) {
            registerPanel.hide();

            loginPanel.show()

        })
    } catch (err) {
        registerPanel.error = err.message;
    }
};

welcomePanel.onSearch = function (query) {

    try {
        search(query, function (error, results) {
            if (error) {
                registerPanel.error = error
            }
            else {
                registerPanel.results = results.map(function (result) {
                    return {
                        text: result.title,
                        image: result.imageUrl
                    }
                })
            }
        })
    } catch (err) {
        registerPanel.error = err.message;
    }
};
