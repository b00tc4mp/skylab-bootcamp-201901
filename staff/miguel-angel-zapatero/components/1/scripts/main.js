'use strict';

// presentation logic
var defaultLanguage = 'en';

var select = document.getElementsByTagName('select')[0];
var langSelector = new LanguageSelector(select, function (lang) {
    signUp.language = lang;
    signIn.language = lang;
});


var forms = document.getElementsByTagName('form');

var signUp = new SignUp(forms[1], register, i18n.signUp, defaultLanguage);

var signIn = new SignIn(forms[4], login, i18n.signIn, defaultLanguage);

