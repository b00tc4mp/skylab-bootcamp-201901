var loginPanel = new LoginPanel
var homePanel = new HomePanel
var registerPanel = new RegisterPanel;

$body = $(document.body);
$body.append(loginPanel.$element);
$body.append(homePanel.$element);
$body.append(registerPanel.$element);

loginPanel.onLogin = function(email, password) {
    try {
        logic.login(email, password, function(user) {
            loginPanel.hide();

            homePanel.user = user;
            homePanel.show();
        });
    } catch(err) {
        loginPanel.error = err.message;
    }
};

loginPanel.onRegisterPanel = function(){
    loginPanel.hide();
    registerPanel.show();
}

homePanel.onLogout = function() {
    homePanel.hide();
    homePanel.clear(true);
    loginPanel.clear();
    loginPanel.show();
};

homePanel.onSearch = function(query) {
    try{
        logic.search(query, function(error, ducklings){
            homePanel.clear();
            if (error)  homePanel.error = error;
            else homePanel.listResults = ducklings.map(function(duckling){
                return {
                    text: duckling.title,
                    image: duckling.imageUrl
                }
            });
        });
    }catch(err){
        homePanel.error = err.message;
    }
}

registerPanel.onLoginPanel = function(){
    registerPanel.hide();
    registerPanel.clear();
    loginPanel.show();
}

registerPanel.onRegister = function(name, surname, email, password, passwordConfirmation){
    try {
        logic.register(name, surname, email, password, passwordConfirmation, function(){
            registerPanel.hide();
            registerPanel.clear();
            loginPanel.show();
        });
    } catch (err) {
        registerPanel.error = err.message;
    }
}
