var loginPanel = new LoginPanel
var welcomePanel = new WelcomePanel

document.body.appendChild(loginPanel.element);
document.body.appendChild(welcomePanel.element);

loginPanel.onLogin = function(email, password) {
    try {
        login(email, password, function(user) {
            console.log('ok logged in through current business logic', user);

            loginPanel.hide();

            welcomePanel.user = user;
            welcomePanel.show();
        });
    } catch(err) {
        console.error(err.message);
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
