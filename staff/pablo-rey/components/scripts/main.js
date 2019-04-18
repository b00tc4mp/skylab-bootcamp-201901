"use strict";

let languageSelected = "en";

const languageSelector = new LanguageSelector(
  document.getElementsByClassName("language")[0],
  function(language) {
    languageSelected = language;

    landing.language = language;
    register.language = language;
    login.language = language;
    home.language = language;
  }
);

const landing = new Landing(
  document.getElementsByClassName("landing")[0],
  i18n.landing,
  () => {
    landing.visible = false;
    register.visible = true;
  },
  () => {
    landing.visible = false;
    login.visible = true;
  }
);
landing.visible = true;

const register = new Register(
  document.getElementsByClassName("register")[0],
  (name, surname, email, password) => {
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

const login = new Login(
  document.getElementsByClassName("login")[0],
  (email, password) => {
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
  function () {
    this.__feedback__.visible = false;
  }
);
login.visible = false;

const registerOk = new RegisterOk(
  document.getElementsByClassName("registerSuccessful")[0],
  () => {
    registerOk.visible = false;
    login.visible = true;
  }
);
registerOk.visible = false;

// const main = document.getElementsByTagName("main")[0];
const home = new Home(
  document.getElementsByClassName("home")[0],
  i18n.home,
  languageSelected,
  () => {
    logic.logout();
    home.visible = false;
    landing.visible = true;
  }
);
home.visible = true;
