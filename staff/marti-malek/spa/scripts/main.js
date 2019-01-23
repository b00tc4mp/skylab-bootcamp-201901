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

            homePanel.user = user;
            homePanel.show();
        });
    } catch(err) {
        loginPanel.error = err.message;
    }
};

loginPanel.onRegister = function() {
    loginPanel.hide();
    registerPanel.show();
};

homePanel.onLogout = function() {
    homePanel.hide();
    loginPanel.clear();
    loginPanel.show();
};

homePanel.onSearch = function(query) {
    search(query, function(error, ducklings) {
        if(error) {
            homePanel.error = error;
        } else {
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
};

registerPanel.onRegister = function(name, surname, email, password, passwordConfirmation) {
    try {
        register(name, surname, email, password, passwordConfirmation, function() {
            registerPanel.hide();
            registerPanel.clear();
            loginPanel.show();
        })
    } catch(err) {
        registerPanel.error = err.message;
    }
};

registerPanel.onLogin = function() {
    registerPanel.hide();
    loginPanel.show();
};
