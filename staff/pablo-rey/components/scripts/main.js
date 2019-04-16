"use strict";

var languageSelected = "en";

var select = document.getElementsByTagName("select")[0];
var languageSelector = new LanguageSelector(select, function(language) {
  languageSelected = language;

  landing.language = language;
  register.language = language;
  login.language = language;
});

var sections = document.getElementsByTagName("section");

var landing = new Landing(
  sections[0],
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

var forms = document.getElementsByTagName("form");

var register = new Register(
  forms[0],
  function(name, surname, email, password) {
    logic.register(name, surname, email, password);

    register.visible = false;
    registerOk.visible = true;
  },
  i18n.register,
  languageSelected
);
register.visible = false;

var login = new Login(
  forms[1],
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

var registerOk = new RegisterOk(sections[1], function() {
  registerOk.visible = false;
  login.visible = true;
});
registerOk.visible = false;

var main = document.getElementsByTagName("main")[0];
var home = new Home(main, i18n.home, function() {
  logic.logout();
  home.visible = false;
  landing.visible = true;
});
home.visible = false;
