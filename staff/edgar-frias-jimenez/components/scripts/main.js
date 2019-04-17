'use strict';

var languageSelected = 'en';

var langSelector = document.getElementsByClassName('language-selector')[0];
var languageSelector = new LanguageSelector(langSelector, function (language) {
    languageSelected = language;

    landing.language = language;
    register.language = language;
    login.language = language;
});

var landingSection = document.getElementsByClassName('landing')[0];
var landing = new Landing(landingSection, i18n.landing, function() {
    landing.visible = false;
    register.visible = true;
}, function() {
    landing.visible = false;
    login.visible = true;
});

var registryForm = document.getElementsByClassName('registry-form')[0];
var register = new Register(registryForm, function (name, surname, email, password) {
    logic.register(name, surname, email, password);

    register.visible = false;
    registerOk.visible = true;
}, i18n.register, languageSelected);
register.visible = false;

var loginForm = document.getElementsByClassName('login-form')[0];
var login = new Login(loginForm, function (email, password) {
    try {
        logic.login(email, password);

        login.visible = false;
        home.visible = true;
    } catch (error) {
        login.error = i18n.errors[languageSelected][error.code];
    }
}, i18n.login, languageSelected, function() {
    this.__feedback__.visible = false;
});
login.visible = false;

var registrySuccess = document.getElementsByClassName('register-success')[0];
var registerOk = new RegisterOk(registrySuccess, function () {
    registerOk.visible = false;
    login.visible = true;
});
registerOk.visible = false;

var main = document.getElementsByTagName('main')[0];
var home = new Home(main);
home.visible = false;


