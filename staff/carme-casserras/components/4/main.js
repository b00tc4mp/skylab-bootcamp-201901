'use strict';

// presentation logic
var defaultLanguage = 'en';

var select = document.getElementsByTagName('select')[0];
var langSelector = new LanguageSelector(select, function (language) {
    signUp.language = language;
    signUpAdmin.language = language;
    signUpSuperAdmin.language = language;
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

