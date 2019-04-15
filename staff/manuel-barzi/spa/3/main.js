'use strict';

// presentation logic

var form = document.getElementsByTagName('form')[1];

onSignUp(form, register);

var form2 = document.getElementsByTagName('form')[2];

onSignUp(form2, registerAdmin);

var titles = document.getElementsByTagName('h2');

titles[0].innerText = i18n.signUp.ga.title;
titles[1].innerText = i18n.signUp.ga.title + ' Admin';

