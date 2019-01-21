'use strict';

describe('logic', function () {
    describe('register', function () {
        
        var registeringEmail = 'jw@mail.com';
        
        beforeEach(function(){
            var userIndex = users.findIndex(function(user){return user.email === registeringEmail});
            if(userIndex > -1) users.splice(userIndex,1);
        }); 

        it('should succed on valid data', function () {
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringPassword = 'p4ssw0rd';

            register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                registered = true;
            });
            
            expect(registered).toBeTruthy();
            
            var registeredUser = users.find(function(user){return user.email === registeringEmail});
            
            expect(registeredUser).toBeDefined();
            expect(registeredUser.name).toEqual(registeringName);
            expect(registeredUser.surname).toEqual(registeringSurname);
            expect(registeredUser.email).toEqual(registeringEmail);
            expect(registeredUser.password).toEqual(registeringPassword);
        });

        it('should fail on undefined name', function(){
            var registered;
            var registeringName = undefined;
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringName +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on number name', function(){
            var registered;
            var registeringName = 1234;
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringName +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on boolean name', function(){
            var registered;
            var registeringName = true;
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringName +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on object name', function(){
            var registered;
            var registeringName = {};
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringName +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on array name', function(){
            var registered;
            var registeringName = [];
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringName +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on function name', function(){
            var registered;
            var registeringName = function(){};
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringName +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on empty name', function(){
            var registered;
            var registeringName = '';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError('name cannot be empty'));

            expect(registered).toBeUndefined();
        });

        it('should fail on undefined surname', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = undefined;
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on boolean surname', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = false;
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on number surname', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 1234;
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on array surname', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = [];
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on object surname', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = {};
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on function surname', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = function(){};
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringSurname +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on empty surname', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = '';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError('surname cannot be empty'));

            expect(registered).toBeUndefined();
        });

        it('should fail on undefined email', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = undefined;
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on boolean email', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = true;
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on number email', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 1234;
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on array email', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = [];
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on object email', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = {};
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on function email', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = function(){};
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on empty email', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = '';
            var registeringPassword = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPassword, function () { 
                    registered = true;
                });
            }).toThrow(TypeError('email cannot be empty'));

            expect(registered).toBeUndefined();
        });

        it('should fail on undefined password', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = undefined;
            var registeringPasswordC = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on boolean password', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = false;
            var registeringPasswordC = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on number password', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 1234;
            var registeringPasswordC = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on object password', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = {};
            var registeringPasswordC = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on array password', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = [];
            var registeringPasswordC = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on object password', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = {};
            var registeringPasswordC = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on empty password', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = '';
            var registeringPasswordC = 'p4ssw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(TypeError('password cannot be empty'));

            expect(registered).toBeUndefined();
        });

        it('should fail on undefined password confirmation', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
            var registeringPasswordC = undefined;
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringPasswordC +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on boolean password confirmation', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
            var registeringPasswordC = true;
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringPasswordC +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on number password confirmation', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
            var registeringPasswordC = 1234;
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringPasswordC +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on array password confirmation', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
            var registeringPasswordC = [];
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringPasswordC +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on object password confirmation', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
            var registeringPasswordC = {};
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringPasswordC +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on function password confirmation', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
            var registeringPasswordC = function(){};
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(TypeError(registeringPasswordC +' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on empty password confirmation', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
            var registeringPasswordC = '';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(TypeError('password confirmation cannot be empty'));

            expect(registered).toBeUndefined();
        });

        it('should fail on different passwords value', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';
            var registeringPasswordC = 'passw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(Error('passwords do not match'));

            expect(registered).toBeUndefined();
        });

        it('should fail on registering existing email', function(){
            var registered;
            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'johndoe@mail.com';
            var registeringPassword = 'p4ssw0rd';
            var registeringPasswordC = 'passw0rd';
  
            expect(function(){
                register(registeringName, registeringSurname, registeringEmail,registeringPassword,registeringPasswordC, function () { 
                    registered = true;
                });
            }).toThrow(Error('user ' + registeringEmail + ' already exists'));

            expect(registered).toBeUndefined();
        });

    });

    describe('login', function () {
        it('should login successfully on correct credentials', function () {
            var user = users.find(function (user) { return user.email === 'johndoe@mail.com' });
            var loggedUser;

            login(user.email, user.password, function (logUser) {
                loggedUser = logUser;
            });

            expect(loggedUser).toBeDefined();
            expect(loggedUser.name).toEqual(user.name);
            expect(loggedUser.surname).toEqual(user.surname);
            expect(loggedUser.email).toEqual(user.email);
            expect(loggedUser.password).toBeUndefined();
            expect(loggedUser).not.toEqual(user);
        });

        it('should fail on wrong email', function () {
            var dummy = 'invented@mail.com';

            expect(function () {
                login(dummy, '123', function () { });
            }).toThrow(Error('user ' + dummy + ' not found'));
        });

        it('should fail on empty email', function () {
            var dummy = '';

            expect(function () {
                login(dummy, '123', function () { });
            }).toThrow(Error('email cannot be empty'));
        });

        it('should fail on undefined email', function () {
            var dummy = undefined;

            expect(function () {
                login(dummy, '123', function () { });
            }).toThrow(TypeError(dummy+' is not a string'));
        });

        it('should fail on boolean email', function () {
            var dummy = true;

            expect(function () {
                login(dummy, '123', function () { });
            }).toThrow(TypeError(dummy+' is not a string'));
        });

        it('should fail on number email', function () {
            var dummy = 123;

            expect(function () {
                login(dummy, '123', function () { });
            }).toThrow(TypeError(dummy+' is not a string'));
        });

        it('should fail on object email', function () {
            var dummy = {};

            expect(function () {
                login(dummy, '123', function () { });
            }).toThrow(TypeError(dummy+' is not a string'));
        });

        it('should fail on array email', function () {
            var dummy = [];

            expect(function () {
                login(dummy, '123', function () { });
            }).toThrow(TypeError(dummy+' is not a string'));
        });

        it('should fail on function email', function () {
            var dummy = function(){};

            expect(function () {
                login(dummy, '123', function () { });
            }).toThrow(TypeError(dummy+' is not a string'));
        });


        it('should fail on wrong password', function () {
            var dummy = 'johndoe@mail.com';

            expect(function () {
                login(dummy, '123', function () { });
            }).toThrow(Error('wrong password'));
        });

        it('should fail on empty password', function () {
            var dummy = '';
            expect(function () {
                login('johndoe@mail.com', dummy, function () { });
            }).toThrow(Error('password cannot be empty'));
        });

        it('should fail on undefined password', function () {
            var dummy = undefined;
            expect(function () {
                login('johndoe@mail.com', dummy, function () { });
            }).toThrow(Error(dummy+' is not a string'));
        });

        it('should fail on number password', function () {
            var dummy = 1234;
            expect(function () {
                login('johndoe@mail.com', dummy, function () { });
            }).toThrow(Error(dummy+' is not a string'));
        });

        it('should fail on boolean password', function () {
            var dummy = true;
            expect(function () {
                login('johndoe@mail.com', dummy, function () { });
            }).toThrow(Error(dummy+' is not a string'));
        });

        it('should fail on array password', function () {
            var dummy = [];
            expect(function () {
                login('johndoe@mail.com', dummy, function () { });
            }).toThrow(Error(dummy+' is not a string'));
        });

        it('should fail on object password', function () {
            var dummy = {};
            expect(function () {
                login('johndoe@mail.com', dummy, function () { });
            }).toThrow(Error(dummy+' is not a string'));
        });

        it('should fail on function password', function () {
            var dummy = function(){};
            expect(function () {
                login('johndoe@mail.com', dummy, function () { });
            }).toThrow(Error(dummy+' is not a string'));
        });
    });
});