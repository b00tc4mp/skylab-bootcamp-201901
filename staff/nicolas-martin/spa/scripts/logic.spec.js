'use strict';

describe('logic', function () {
    describe('LOGIN', function () {
        describe('succeed', function () {
            it('should succeed on correct credentials', function () {
                var expected = users.find(function (user) { return user.email === 'johndoe@mail.com'; });

                var loggedInUser;

                login(expected.email, expected.password, function (user) {
                    loggedInUser = user;
                });

                expect(loggedInUser).toBeDefined();
                expect(loggedInUser.name).toEqual(expected.name);
                expect(loggedInUser.surname).toEqual(expected.surname);
                expect(loggedInUser.email).toEqual(expected.email);
                expect(loggedInUser.password).toBeUndefined();
                expect(loggedInUser).not.toEqual(expected);
            });
        });

        describe('fails', function () {
            it('should fail on wrong email', function () {
                var inventedEmail = 'invented@mail.com';

                // var error;

                // try {
                //     login(inventedEmail, '123', function() {});
                // } catch(err) {
                //     error = err;
                // }

                // expect(error).toBeDefined();
                // expect(error.message).toBe('user ' + inventedEmail + ' not found');

                // ALT jasmine

                expect(function () {
                    login(inventedEmail, '123', function () { });
                }).toThrow(Error('user ' + inventedEmail + ' not found'));
            });

            it('should fail on wrong password', function () {
                expect(function () {
                    login('johndoe@mail.com', '123', function () { });
                }).toThrow(Error('wrong password'));
            });

            it('should fail using object in email', function () {
                var object = {};
                expect(function () {
                    login(object, '123', function () { });
                }).toThrow(TypeError(object + ' is not a string'));
            });

            it('should fail using array in email', function () {
                var array = [];
                expect(function () {
                    login(array, '123', function () { });
                }).toThrow(TypeError(array + ' is not a string'));
            });

            it('should fail using boolean in email', function () {
                var boolean = false;
                expect(function () {
                    login(boolean, '123', function () { });
                }).toThrow(TypeError(boolean + ' is not a string'));
            });

            it('should fail using object in password', function () {
                var object = {};
                expect(function () {
                    login('asdcasdc@gmail.com', object, function () { });
                }).toThrow(TypeError(object + ' is not a string'));
            });

            it('should fail using array in password', function () {
                var array = [];
                expect(function () {
                    login('asdcasdc@gmail.com', array, function () { });
                }).toThrow(TypeError(array + ' is not a string'));
            });

            it('should fail using boolean in password', function () {
                var boolean = false;
                expect(function () {
                    login('asdcasdc@gmail.com', boolean, function () { });
                }).toThrow(TypeError(boolean + ' is not a string'));
            });

            it('should fail using undefined in email', function () {
                var notdefined = undefined;
                expect(function () {
                    login(notdefined, '123', function () { });
                }).toThrow(TypeError(notdefined + ' is not a string'));
            });

            it('should fail using undefined in password', function () {
                var notdefined = undefined;
                expect(function () {
                    login('asdcasdc@gmail.com', notdefined, function () { });
                }).toThrow(TypeError(notdefined + ' is not a string'));
            });
        });       
    });

    describe('REGISTER', function () {
        var registeringEmail = 'jw@mail.com';

        beforeEach(function () {
            var userIndex = users.findIndex(function (user) { 
                return user.email === registeringEmail; 
            });

            if (userIndex > -1)
                users.splice(userIndex, 1);
        });

        describe('succeed', function () {
            it('should succeed on valid data', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'Wayne';
                var registeringPassword = 'p4ssw0rd';

                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });

                expect(registered).toBeTruthy();

                var registeredUser = users.find(function (user) { return user.email === registeringEmail; });

                expect(registeredUser).toBeDefined();
                expect(registeredUser.email).toEqual(registeringEmail);
                expect(registeredUser.name).toEqual(registeringName);
                expect(registeredUser.surname).toEqual(registeringSurname);
                expect(registeredUser.password).toEqual(registeringPassword);
            });
        });

        describe('fails', function () {
            it('should fail on undefined name', function () {
                var registered;

                var registeringName = undefined;
                var registeringSurname = 'Wayne';
                var registeringEmail = 'jw@mail.com';
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringName + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on numeric name', function () {
                var registered;

                var registeringName = 10;
                var registeringSurname = 'Wayne';
                var registeringEmail = 'jw@mail.com';
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringName + ' is not a string'));

                expect(registered).toBeUndefined();
            });


            it('should fail on boolean name', function () {
                var registered;

                var registeringName = true;
                var registeringSurname = 'Wayne';
                var registeringEmail = 'jw@mail.com';
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringName + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on object name', function () {
                var registered;

                var registeringName = {};
                var registeringSurname = 'Wayne';
                var registeringEmail = 'jw@mail.com';
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringName + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on array name', function () {
                var registered;

                var registeringName = [];
                var registeringSurname = 'Wayne';
                var registeringEmail = 'jw@mail.com';
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringName + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on empty name', function () {
                var registered;

                var registeringName = '';
                var registeringSurname = 'Wayne';
                var registeringEmail = 'jw@mail.com';
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(Error('name cannot be empty'));

                expect(registered).toBeUndefined();
            });

            it('should fail on undefined surname', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = undefined;
                var registeringEmail = 'jw@mail.com';
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringSurname + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on numeric surname', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 10;
                var registeringEmail = 'jw@mail.com';
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringSurname + ' is not a string'));

                expect(registered).toBeUndefined();
            });


            it('should fail on boolean surname', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = false;
                var registeringEmail = 'jw@mail.com';
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringSurname + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on object surname', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = {};
                var registeringEmail = 'jw@mail.com';
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringSurname + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on array surname', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = [];
                var registeringEmail = 'jw@mail.com';
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringSurname + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on empty surname', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = '';
                var registeringEmail = 'jw@mail.com';
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(Error('surname cannot be empty'));

                expect(registered).toBeUndefined();
            });

            it('should fail on undefined email', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'surname';
                var registeringEmail = undefined;
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringEmail + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on numeric email', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'surname';
                var registeringEmail = 120;
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringEmail + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on boolean email', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'surname';
                var registeringEmail = true;
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringEmail + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on object email', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'Surname';
                var registeringEmail = {};
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringEmail + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on array email', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'Surname';
                var registeringEmail = [];
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringEmail + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on empty email', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'surname';
                var registeringEmail = '';
                var registeringPassword = 'p4ssw0rd';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(Error('email cannot be empty'));

                expect(registered).toBeUndefined();
            });

            it('should fail on undefined password1', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'surname';
                var registeringEmail = 'ascasdc@gmail.com';
                var registeringPassword = undefined;

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringPassword + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on numeric password1', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'surname';
                var registeringEmail = 'ascasdc@gmail.com';
                var registeringPassword = 123.23;

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringPassword + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on boolean password1', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'surname';
                var registeringEmail = 'ascasdc@gmail.com';
                var registeringPassword = true;

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringPassword + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on object password1', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'Surname';
                var registeringEmail = 'ascasdc@gmail.com';
                var registeringPassword = {};

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringPassword + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on array password1', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'Surname';
                var registeringEmail = 'ascasdc@gmail.com';
                var registeringPassword = [];

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringPassword + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on empty password1', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'surname';
                var registeringEmail = 'asdcasdc@gmail.com';
                var registeringPassword = '';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                        registered = true;
                    });
                }).toThrow(Error('password cannot be empty'));

                expect(registered).toBeUndefined();
            });

            it('should fail on undefined password2', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'surname';
                var registeringEmail = 'ascasdc@gmail.com';
                var registeringPassword = '123';
                var registeringPassword1 = undefined;


                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword1, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringPassword1 + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on numeric password2', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'surname';
                var registeringEmail = 'ascasdc@gmail.com';
                var registeringPassword = '123';
                var registeringPassword1 = 123.55;

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword1, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringPassword1 + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on boolean password2', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'surname';
                var registeringEmail = 'ascasdc@gmail.com';
                var registeringPassword = '123';
                var registeringPassword1 = false;

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword1, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringPassword1 + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on object password2', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'Surname';
                var registeringEmail = 'ascasdc@gmail.com';
                var registeringPassword = '123';
                var registeringPassword1 = {};

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword1, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringPassword1 + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on array password2', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'Surname';
                var registeringEmail = 'ascasdc@gmail.com';
                var registeringPassword = '123';
                var registeringPassword1 = [];

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword1, function () {
                        registered = true;
                    });
                }).toThrow(TypeError(registeringPassword1 + ' is not a string'));

                expect(registered).toBeUndefined();
            });

            it('should fail on empty password2', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'surname';
                var registeringEmail = 'asdcasdc@gmail.com';
                var registeringPassword = '123';
                var registeringPassword1 = '';


                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword1, function () {
                        registered = true;
                    });
                }).toThrow(Error('password confirmation cannot be empty'));

                expect(registered).toBeUndefined();
            });
            
            it('should fail on different passwords', function () {
                var registered;

                var registeringName = 'John';
                var registeringSurname = 'surname';
                var registeringEmail = 'asdcasdc@gmail.com';
                var registeringPassword = '123';
                var registeringPassword1 = '345';

                expect(function () {
                    register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword1, function () {
                        registered = true;
                    });
                }).toThrow(Error('passwords do not match'));

                expect(registered).toBeUndefined();
            });
        });  
    });
});