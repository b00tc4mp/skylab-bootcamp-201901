'use strict';

// presentation logic
var defaultLanguage = 'en';

var select = document.getElementsByTagName('select')[0];
var langSelector = new LanguageSelector(select, function (lang) {
    signIn.language = lang;
    signInAdmin.language = lang;
    signInSuperAdmin.language = lang;
});


var forms = document.getElementsByTagName('form');

var signIn = new SignIn(forms[0], login, i18n.signIn, defaultLanguage);

var signInAdmin = new SignIn(forms[1], loginAdmin, i18n.signIn, defaultLanguage, function (language) {
    var admin = i18n.admin[language];

    this.__form__.children[0].innerText += ' ' + admin;
});

var signInSuperAdmin = new SignIn(forms[2], loginSuperAdmin, i18n.signIn, defaultLanguage, function (language) {
    var admin = i18n.admin[language];

    this.__form__.children[0].innerText += ' Super ' + admin;
});

