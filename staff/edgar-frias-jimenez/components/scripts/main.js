'use strict';

const languageSelected = 'en';

const langSelector = document.getElementsByClassName('language-selector')[0];
const languageSelector = new LanguageSelector(langSelector, function (language) {
    languageSelected = language;

    landing.language = language;
    register.language = language;
    login.language = language;
});

const landingSection = document.getElementsByClassName('landing')[0];
const landing = new Landing(landingSection, i18n.landing, function() {
    landing.visible = false;
    register.visible = true;
}, function () {
    landing.visible = false;
    login.visible = true;
});

const registryForm = document.getElementsByClassName('registry-form')[0];
const register = new Register(registryForm, function (name, surname, email, password) {
    logic.register(name, surname, email, password);

    register.visible = false;
    registerOk.visible = true;
}, i18n.register, languageSelected);
register.visible = false;

const loginForm = document.getElementsByClassName('login-form')[0];
const login = new Login(loginForm, function (email, password) {
    try {
        logic.login(email, password);

        login.visible = false;
        const user = logic.retrieveUser(email);
        home.name = user.name;
        home.visible = true;
    } catch (error) {
        login.error = i18n.errors[languageSelected][error.code];
    }
}, i18n.login, languageSelected, function () {
    this.__feedback__.visible = false;
});
login.visible = false;

const registrySuccess = document.getElementsByClassName('register-success')[0];
const registerOk = new RegisterOk(registrySuccess, function () {
    registerOk.visible = false;
    login.visible = true;
});
registerOk.visible = false;

const main = document.getElementsByTagName('main')[0];
const home = new Home(main, function(query) {
    logic.searchDucks(query, function (ducks){
        home.results = ducks.map(function (duck) {
            return {
                id: duck.id,
                title: duck.title,
                image: duck.imageUrl,
                price: duck.price
            }
        });
    });
}, id => {
    logic.retrieveDucklingDetail(id, function (duck) {
        home.item = {
            title: duck.title,
            image: duck.imageUrl,
            price: duck.price,
            link: duck.link,
            description: duck.description,
            id: duck.id
        };
    });
});
home.visible = false;
