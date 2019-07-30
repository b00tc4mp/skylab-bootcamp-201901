'use strict';

// presentation logic
var defaultLanguage = 'en';

var select = document.getElementsByTagName('select')[0];
var langSelector = new LanguageSelector(select, function (language) {
    signUp.language = language;
    signIn.language = language;
});


var forms = document.getElementsByTagName('form');

var signUp = new SignUp(forms[0], logic.register, i18n.signUp, defaultLanguage);

var signIn = new SignIn(forms[1], logic.login, i18n.signIn, defaultLanguage);
signIn.visible = false;

