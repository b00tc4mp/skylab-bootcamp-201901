"use strict";

let languageSelected = "en";

const languageSelector = new LanguageSelector({
  container: document.getElementsByClassName("language")[0],
  onChange(language) {
    languageSelected = language;

    landing.language = language;
    register.language = language;
    login.language = language;
    home.language = language;
    logOut.language = language;
  },
});


const logOut= new LogOut({
  element: document.getElementsByClassName("nav__logout")[0],
  literals: i18n.logout,
  initialLanguage: languageSelected,
  onLogOut() {
    logic.logout();
    home.visible = false;
    landing.visible = true;
    logout.visible = false;
  }
});

const landing = new Landing({
  container: document.getElementsByClassName("landing")[0],
  literals: i18n.landing,
  onNavigateToRegister() {
    landing.visible = false;
    register.visible = true;
  },
  onNavigateToLogin() {
    landing.visible = false;
    login.visible = true;
  },
});
landing.visible = true;

const register = new Register({
  container: document.getElementsByClassName("register")[0],
  literals: i18n.register,
  defaultLanguage: languageSelected,
  onRegister(name, surname, email, password) {
    try {
      logic.register(name, surname, email, password);
      register.visible = false;
      registerOk.visible = true;
    } catch (error) {
      register.error = i18n.errors[languageSelected][error.code];
    }
  },
});
register.visible = false;

const login = new Login({
  container: document.getElementsByClassName("login")[0],
  onLogin(email, password) {
    try {
      logic.login(email, password);

      login.visible = false;
      home.visible = true;
    } catch (error) {
      login.error = i18n.errors[languageSelected][error.code];
    }
  },
  literals: i18n.login,
  defaultLanguage: languageSelected,
  onLanguageChange: function() {
    this.__feedback__.visible = false;
  },
});
login.visible = false;

const registerOk = new RegisterOk({
  container: document.getElementsByClassName("registerSuccessful")[0],
  onNavigateToLogin() {
    registerOk.visible = false;
    login.visible = true;
  },
});
registerOk.visible = false;

const home = new Home({
  container: document.getElementsByClassName("home")[0],
  literals: i18n.home,
  initialLanguage: languageSelected,
});
home.visible = false;
