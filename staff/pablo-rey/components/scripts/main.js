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

const logOut = new LogOut({
  element: document.getElementsByClassName("nav__logout")[0],
  literals: i18n.logout,
  initialLanguage: languageSelected,
  onLogOut() {
    logic.logout();
    viewState();
  },
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

const register = new Register({
  container: document.getElementsByClassName("register")[0],
  literals: i18n.register,
  defaultLanguage: languageSelected,
  onRegister(name, surname, email, password) {
    try {
      logic.registerUser(name, surname, email, password, response => {
        if (!response) {
          register.visible = false;
          registerOk.visible = true;
        } else {
          register.error = response.message;
        }
      });
    } catch (error) {
      register.error = error.message;
    }
  },
});
register.visible = false;

const login = new Login({
  container: document.getElementsByClassName("login")[0],
  onLogin(email, password) {
    try {
      logic.loginUser(email, password, (response) => {
        if (!response) {
          home.name = "";
          logic.retrieveUser((user) => {
            home.name = user.name;
          })
          viewState();
          login.visible = false;
        } else {
          login.error = response.error;
        }
      });

    } catch (error) {
      login.error = error.message;
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

function viewState() {
  home.visible = logic.isLogged;
  landing.visible = !logic.isLogged;
  logOut.visible = logic.isLogged
}

viewState();