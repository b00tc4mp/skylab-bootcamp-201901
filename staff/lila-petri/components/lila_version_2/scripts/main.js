'use strict';

var defaultLanguage = 'en';

var select = document.getElementsByTagName('select')[0];
var languageSelector = new LanguageSelector(select, function (language) {
    signUp.language = language;
    signIn.language = language;
});

var forms = document.getElementsByTagName('form');

var signUp = new SignUp(forms[0], function(name, surname, email, password) {
    logic.register(name, surname, email, password);

    signUp.visible = false;
    signUpOk.visible = true;
}, i18n.signUp, defaultLanguage);

var signIn = new SignIn(forms[1], function(email, password){
    logic.login(email,password);
    signIn.visible=false;
    home.visible=true
}, i18n.signIn, defaultLanguage);
signIn.visible = false;

var sections = document.getElementsByTagName('section');

var signUpOk = new SignUpOk(sections[0], function() {
    signUpOk.visible = false;
    signIn.visible = true;
});
signUpOk.visible = false;

var home=new Home(sections[1]);
home.visible=false;



