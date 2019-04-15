'use strict';

// presentation logic
var defaultLanguage = 'en';

var select = document.getElementsByTagName('select')[0];

var langSelector = new LanguageSelector(select, function (lang) {
    signUp.language = lang;
    signUpAdmin.language = lang;
    signUpSuperAdmin.language = lang;
    login.language = lang;
    loginAdmin.language = lang;
    loginSuperAdmin.language = lang;
});


var forms = document.getElementsByTagName('form');

var signUp = new SignUp(forms[1], register, i18n.signUp, defaultLanguage);

var signUpAdmin = new SignUp(forms[2], registerAdmin, i18n.signUp, defaultLanguage, function (language) {
    var admin = i18n.admin[language];

    this.__form__.children[0].innerText += ' ' + admin;
});

var signUpSuperAdmin = new SignUp(forms[3], registerSuperAdmin, i18n.signUp, defaultLanguage, function (language) {
    var admin = i18n.admin[language];

    this.__form__.children[0].innerText += ' Super ' + admin;
});

var login = new LogIn(forms[4], loginUser, i18n.logIn, defaultLanguage);

var loginAdmin = new LogIn(forms[5], loginAdmin, i18n.logIn, defaultLanguage, function (language) {
  var admin = i18n.admin[language];

  this.__form__.children[0].innerText += ' ' + admin;
});

var loginSuperAdmin = new LogIn(forms[6], loginSuperAdmin, i18n.logIn, defaultLanguage, function (language) {
  var admin = i18n.admin[language];

  this.__form__.children[0].innerText += ' Super ' + admin;
});