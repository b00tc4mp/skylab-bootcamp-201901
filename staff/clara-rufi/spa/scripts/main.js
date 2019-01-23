'use strict';

var loginPanel = new LoginPanel
var registerPanel = new RegisterPanel
var homePanel = new HomePanel
var searchPanel = new SearchPanel


document.body.appendChild(loginPanel.element); //posem el loguinpanel a dins del body
document.body.appendChild(registerPanel.element);
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
    // registerPanel.hide();
    // loginPanel.show();
    // registerPanel.clear();



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
