'use strict';

// presentation logic
var defaultLanguage = 'en';

var select = document.getElementsByTagName('select')[0];
var langSelector = new LanguageSelector(select, function (lang) {
    signIn.language = lang;
    signUpAdmin.language = lang;
    signUpSuperAdmin.language = lang;
});


var forms = document.getElementsByTagName('form');

var signIn = new SignIn(forms[1], register, i18n.signIn, defaultLanguage);

var signUpAdmin = new SignIn(forms[2], registerAdmin, i18n.signIn, defaultLanguage, function (language) {
    var admin = i18n.admin[language];

    this.__form__.children[0].innerText += ' ' + admin;
});

var signUpSuperAdmin = new SignIn(forms[3], registerSuperAdmin, i18n.signIn, defaultLanguage, function (language) {
    var admin = i18n.admin[language];

    this.__form__.children[0].innerText += ' Super ' + admin;
});

