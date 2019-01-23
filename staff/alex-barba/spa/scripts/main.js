var loginPanel = new LoginPanel
var homePanel = new HomePanel
var registerPanel = new RegisterPanel

document.body.appendChild(loginPanel.element);
document.body.appendChild(homePanel.element);
document.body.appendChild(registerPanel.element);

loginPanel.onLogin = function(email, password) {
    try {
        login(email, password, function(user) {
            loginPanel.hide();
            loginPanel.clear();

            homePanel.user = user;
            homePanel.show();
        });
    } catch(err) {
        loginPanel.error = err.message;
    }
};

loginPanel.onRegister = function() {
    loginPanel.hide();
    loginPanel.clear();
    registerPanel.show();
}

homePanel.onSearch = function(query) {
    search(query, function(error,ducklings){
        if (error) {
            homePanel.error = error;
        } else{ 
            ducklings.forEach(function (duckling) {
                var item = document.createElement('li');
        
                item.innerText = duckling.title;
        
                var image = document.createElement('img');
        
                image.src = duckling.imageUrl;
                image.style.width = '100px';
        
                item.appendChild(image);
        
                homePanel.__duckList__.appendChild(item);
            });
        }
    });
    homePanel.clear();
};

registerPanel.onRegister = function (name, surname, email, password, passwordConf) {
    try {
        register(name, surname, email, password, passwordConf, function () {
            registerPanel.hide();
            loginPanel.show();
            registerPanel.clear();
        });
    } catch (err) {
        registerPanel.error = err.message;
    }
}; 

homePanel.onLogout = function() {
    homePanel.hide();
    loginPanel.show();
};

registerPanel.onLogin = function() {
    registerPanel.hide();
    registerPanel.clear();
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
