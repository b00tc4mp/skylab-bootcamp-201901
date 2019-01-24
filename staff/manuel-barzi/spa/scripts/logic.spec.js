'use strict';

describe('logic', function () {
    describe('login', function () {
        it('should succeed on correct credentials', function () {
            var expected = users.find(function (user) { return user.email === 'johndoe@mail.com'; });

            var loggedInUser;

<<<<<<< HEAD
            login(expected.email, expected.password, function (user) {
=======
            logic.login(expected.email, expected.password, function (user) {
>>>>>>> develop
                loggedInUser = user;
            });

            expect(loggedInUser).toBeDefined();
            expect(loggedInUser.name).toEqual(expected.name);
            expect(loggedInUser.surname).toEqual(expected.surname);
            expect(loggedInUser.email).toEqual(expected.email);
            expect(loggedInUser.password).toBeUndefined();
            expect(loggedInUser).not.toEqual(expected);
        });

        it('should fail on wrong email', function () {
            var inventedEmail = 'invented@mail.com';

            // var error;

            // try {
<<<<<<< HEAD
            //     login(inventedEmail, '123', function() {});
=======
            //     logic.login(inventedEmail, '123', function() {});
>>>>>>> develop
            // } catch(err) {
            //     error = err;
            // }

            // expect(error).toBeDefined();
            // expect(error.message).toBe('user ' + inventedEmail + ' not found');

            // ALT jasmine

            expect(function () {
<<<<<<< HEAD
                login(inventedEmail, '123', function () { });
=======
                logic.login(inventedEmail, '123', function () { });
>>>>>>> develop
            }).toThrow(Error('user ' + inventedEmail + ' not found'));
        });

        it('should fail on wrong password', function () {
            expect(function () {
<<<<<<< HEAD
                login('johndoe@mail.com', '123', function () { });
=======
                logic.login('johndoe@mail.com', '123', function () { });
>>>>>>> develop
            }).toThrow(Error('wrong password'));
        });
    });

    describe('register', function () {
        var registeringEmail = 'jw@mail.com';

        beforeEach(function () {
            var userIndex = users.findIndex(function (user) { return user.email === registeringEmail; });

            if (userIndex > -1)
                users.splice(userIndex, 1);
        });

        it('should succeed on valid data', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringPassword = 'p4ssw0rd';

<<<<<<< HEAD
            register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
=======
            logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
>>>>>>> develop
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

        it('should fail on undefined name', function () {
            var registered;

            var registeringName = undefined;
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
<<<<<<< HEAD
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
=======
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
>>>>>>> develop
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
<<<<<<< HEAD
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
=======
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
>>>>>>> develop
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
<<<<<<< HEAD
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
=======
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
>>>>>>> develop
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
<<<<<<< HEAD
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
=======
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
>>>>>>> develop
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
<<<<<<< HEAD
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
=======
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
>>>>>>> develop
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
<<<<<<< HEAD
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
=======
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
>>>>>>> develop
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
<<<<<<< HEAD
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
=======
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
>>>>>>> develop
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
<<<<<<< HEAD
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
=======
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
>>>>>>> develop
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
<<<<<<< HEAD
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
=======
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
>>>>>>> develop
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
<<<<<<< HEAD
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
=======
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
>>>>>>> develop
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
<<<<<<< HEAD
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
=======
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
>>>>>>> develop
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
<<<<<<< HEAD
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
=======
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
>>>>>>> develop
                    registered = true;
                });
            }).toThrow(Error('surname cannot be empty'));

            expect(registered).toBeUndefined();
        });
    });
});