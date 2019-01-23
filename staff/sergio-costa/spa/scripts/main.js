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

welcomePanel.onLogout = function() {
    welcomePanel.hide();
    loginPanel.clear();
    loginPanel.show();
};

welcomePanel.onSearch = function(query){
    try {
        search(query, function(error, results){
            if(error)welcomePanel.error = error;
            else welcomePanel.results = results.map(function(result){
                return {
                    text: result.title,
                    image: result.imageUrl
                    }
            });
        })
    } catch (error) {
        console.log(error)
    }
}

loginPanel.loadPageRegister = function(){
    loginPanel.hide();
    registerPanel.show();
}

registerPanel.loadPageLogin = function(){
    registerPanel.clear();
    registerPanel.hide();
    loginPanel.show();
}

registerPanel.onRegister = function(name, surname, email, password, passwordConfirmation){
    try {
        register(name, surname, email, password, passwordConfirmation, function(){
            registerPanel.hide();
            loginPanel.show();
            registerPanel.clear();
        })
    } catch (err) {
        registerPanel.error = err.message;
    }
}

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
