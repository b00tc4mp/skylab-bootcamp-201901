<<<<<<< HEAD
var loginPanel = new LoginPanel
var welcomePanel = new WelcomePanel

document.body.appendChild(loginPanel.element);
document.body.appendChild(welcomePanel.element);

loginPanel.onLogin = function(email, password) {
    try {
        login(email, password, function(user) {
            loginPanel.hide();

            welcomePanel.user = user;
            welcomePanel.show();
=======
'use strict';

var loginPanel = new LoginPanel
// var registerPanel = new RegisterPanel
// var homePanel = new HomePanel
// var searchPanel = new SearchPanel

var $body = $(document.body);

$body.append(loginPanel.$element);
// document.body.appendChild(registerPanel.element)
// document.body.appendChild(homePanel.element);

// homePanel.element.appendChild(searchPanel.element);

loginPanel.onLogin = function(email, password) {
    try {
        logic.login(email, password, function(user) {
            // loginPanel.hide();
            // loginPanel.clear();

            // homePanel.user = user;
            // homePanel.show();
>>>>>>> develop
        });
    } catch(err) {
        loginPanel.error = err.message;
    }
};

<<<<<<< HEAD
welcomePanel.onLogout = function() {
    welcomePanel.hide();
    loginPanel.clear();
    loginPanel.show();
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
=======
// loginPanel.onGoToRegister = function() {
//     loginPanel.hide();
//     loginPanel.clear();

//     registerPanel.show();
// };

// registerPanel.onRegister = function(name, surname, email, password, passwordConfirmation) {
//     try {
//         logic.register(name, surname, email, password, passwordConfirmation, function() {
//             registerPanel.hide();
//             registerPanel.clear();

//             loginPanel.show();
//         });
//     } catch(err) {
//         registerPanel.error = err.message;
//     }
// };

// registerPanel.onGoToLogin = function() {
//     registerPanel.hide();
//     registerPanel.clear();

//     loginPanel.show();
// };

// homePanel.onLogout = function() {
//     homePanel.hide();

//     searchPanel.clear();

//     loginPanel.clear();
//     loginPanel.show();
// };

// searchPanel.onSearch = function(query) {
//     try {
//         logic.search(query, function(error, results) {
//             if (error) {
//                 searchPanel.error = error
//                 searchPanel.clearResults();
//             } else searchPanel.results = results.map(function(result) {
//                 return {
//                     text: result.title,
//                     image: result.imageUrl
//                 }
//             });
//         });
//     } catch(err) {
//         searchPanel.error = err.message;
//     } 
// };
>>>>>>> develop
