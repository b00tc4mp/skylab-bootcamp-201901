var loginPanel = new LoginPanel
var homePanel = new HomePanel
var registerPanel = new RegisterPanel;
var resultsPanel = new ResultsPanel;
var detailPanel = new DetailPanel;

$body = $(document.body);
$body.append(loginPanel.$element);
$body.append(homePanel.$element);
$body.append(registerPanel.$element);

homePanel.$element.append(resultsPanel.$element);
homePanel.$element.append(detailPanel.$element);


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
    resultsPanel.clear();
};

homePanel.onSearch = function(query) {
    detailPanel.hide();
    resultsPanel.show();
    try{
        logic.search(query, function(error, ducklings){
            homePanel.clear();
            resultsPanel.clear();

            if (error)  homePanel.error = error;
            else resultsPanel.listResults = ducklings.map(function(duckling){
                return {
                    id: duckling.id,
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

resultsPanel.onDetail = function(id){
    try {
        logic.retrieve(id, function(error, detail){
            if(error) console.log(error);
            else{
                resultsPanel.hide();
                const {id, title, description, imageUrl: image, link: externalLink, price} = detail;
                detailPanel.item = {id, title,description, image, externalLink, price}
                detailPanel.show();
            }
        });
    } catch (err) {
        console.log(err);
    }
}

detailPanel.goBack = function(){
    detailPanel.hide();
    resultsPanel.show();
}
