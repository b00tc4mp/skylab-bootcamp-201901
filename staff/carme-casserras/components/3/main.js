'use strict';

// presentation logic

var forms = document.getElementsByTagName('form');

var language = 'ga';

var literals = i18n.signUp[language];

var signUp = new SignUp(forms[1]); 
signUp.onSubmit(register);
signUp.title = literals.title;
signUp.name = literals.name;
signUp.surname = literals.surname;
signUp.email = literals.email;
signUp.password = literals.password;

var signUpAdmin = new SignUp(forms[2]); 
signUpAdmin.onSubmit(registerAdmin);
signUpAdmin.title = literals.title + ' Admin';
signUpAdmin.name = literals.name;
signUpAdmin.surname = literals.surname;
signUpAdmin.email = literals.email;
signUpAdmin.password = literals.password;

var signUpSuperAdmin = new SignUp(forms[3]); 
signUpSuperAdmin.onSubmit(registerSuperAdmin);
signUpSuperAdmin.title = literals.title + ' Super Admin';
signUpSuperAdmin.name = literals.name;
signUpSuperAdmin.surname = literals.surname;
signUpSuperAdmin.email = literals.email;
signUpSuperAdmin.password = literals.password;

