var loginPanel = new LoginPanel
var homePanel = new HomePanel
var registerPanel = new RegisterPanel
var searchPanel=new SearchPanel

document.body.appendChild(loginPanel.element);
document.body.appendChild(homePanel.element);
document.body.appendChild(registerPanel.element);
homePanel.element.appendChild(searchPanel.element);

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

loginPanel.linkRegister= function(){
    loginPanel.hide();
    registerPanel.show();
}


registerPanel.linkLogin = function(){
    loginPanel.show();
    registerPanel.hide();
}

registerPanel.onRegister=function(name, surname, email, password, passwordConfirmation) {
    try{
        register(name, surname, email, password, passwordConfirmation, function(){
            registerPanel.hide();
            registerPanel.clear();
            loginPanel.show();

        });
    } catch(err){
        registerPanel.error=err.message;
    }
};


homePanel.onLogout = function() {
    homePanel.hide();
    loginPanel.clear();
    loginPanel.show();
};

searchPanel.onSearch=function(query){
  
    search(query, function(error,ducklings){

        if (error) searchPanel.error=error;
        else searchPanel.results=results;
    });
}

function listNoResults(message) {
    var item = document.createElement('li');

    item.innerText = message;

    list.appendChild(item);
}

function listResults(ducklings) {
    ducklings.forEach(function (duckling) {
        var item = document.createElement('li');

        item.innerText = duckling.title;

        var image = document.createElement('img');

        image.src = duckling.imageUrl;
        image.style.width = '100px';

        item.appendChild(image);

        list.appendChild(item);
    });
}

