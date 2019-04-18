"use strict";

var languageSelected = "en";

var languageSelector = new LanguageSelector(document.getElementsByClassName("language")[0], function(language) {
  languageSelected = language;

  landing.language = language;
  register.language = language;
  login.language = language;
  home.language = language;
});

var landing = new Landing(
  document.getElementsByClassName("landing")[0],
  i18n.landing,
  function() {
    landing.visible = false;
    register.visible = true;
  },
  function() {
    landing.visible = false;
    login.visible = true;
  }
);
landing.visible = true;

var register = new Register(
  document.getElementsByClassName("register")[0],
  function(name, surname, email, password) {
    try {
      logic.register(name, surname, email, password);
      register.visible = false;
      registerOk.visible = true;      
    } catch (error) {
      register.error = i18n.errors[languageSelected][error.code];
    }

  },
  i18n.register,
  languageSelected
);
register.visible = false;

var login = new Login(
  document.getElementsByClassName("login")[0],
  function(email, password) {
    try {
      logic.login(email, password);

      login.visible = false;
      home.visible = true;
    } catch (error) {
      login.error = i18n.errors[languageSelected][error.code];
    }
  },
  i18n.login,
  languageSelected,
  function() {
    this.__feedback__.visible = false;
  }
);
login.visible = false;

var registerOk = new RegisterOk(document.getElementsByClassName("registerSuccessful")[0], function() {
  registerOk.visible = false;
  login.visible = true;
});
registerOk.visible = false;

// var main = document.getElementsByTagName("main")[0];
var home = new Home(document.getElementsByClassName("home")[0], i18n.home, languageSelected, function() {
  logic.logout();
  home.visible = false;
  landing.visible = true;
});
home.visible = false;
