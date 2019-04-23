'use strict';

const languageSelected = 'en';

const select = document.getElementsByTagName('select')[0];
const languageSelector = new LanguageSelector(select, function (language) {
    languageSelected = language;

    landing.language = language;
    register.language = language;
    login.language = language;
});

const sections = document.getElementsByTagName('section');

const landing = new Landing(sections[0], i18n.landing, function() {
    landing.visible = false;
    register.visible = true;
}, function() {
    landing.visible = false;
    login.visible = true;
});

const forms = document.getElementsByTagName('form');

const register = new Register(forms[0], function (name, surname, email, password) {
    logic.registerUser(name, surname, email, password, function(error) {
        if (error) return alert(error.message)

        register.visible = false
        registerOk.visible = true
    })
}, i18n.register, languageSelected)
register.visible = false

const login = new Login(forms[1], function (email, password) {
    
        logic.loginUser(email, password, function(error){
            if(error)return alert(error.message)

            logic.retrieveUser(function(user){
                    if(error)return alert(error.message)

                    home.name=user.name
                    login.visible = false;
                    home.visible = true;
                    console.log(home.name)
                })
        });
}, i18n.login, languageSelected, function() {
    this.__feedback__.visible = false;
});
login.visible = false;

const registerOk = new RegisterOk(sections[1], function () {
    registerOk.visible = false;
    login.visible = true;
});
registerOk.visible = false;

const main = document.getElementsByTagName('main')[0];

const home = new Home(main, function(query) {
    logic.searchDucks(query, function(ducks) {
        home.results = ducks.map(function(duck) {
            return {
                id: duck.id,
                title: duck.title,
                image: duck.imageUrl,
                price: duck.price
            }
        });
    });
}, function(id){
    logic.retrieveDuck(id, function(ducks){
        debugger
        home.details={
            title: ducks.title,
            image: ducks.imageUrl,
            price: ducks.price,
            description: ducks.description
        }
    });
}, function(){
    logic.logout();
    home.visible=false;
    landing.visible=true;
    logout.visible=false
},i18n.home);
home.visible = false;

