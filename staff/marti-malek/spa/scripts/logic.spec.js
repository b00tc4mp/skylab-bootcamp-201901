'use strict';
describe('Register validation', function () {
    it('should succeed on valid data', function () {
        var registered;

        var registeringName = 'John';
        var registeringSurname = 'Wayne';
        var registeringEmail = 'jw@mail.com';
        var registeringPassword = 'p4ss20rd';

        register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function() {
            registered = true;
        });

        expect(registered).toBeTruthy();

        var registeredUser = users.find(function (user) {return user.email === registeringEmail;});
        
        expect(registeredUser).toBeDefined();
        expect(registeredUser.email).toEqual(registeringEmail);
        expect(registeredUser.name).toEqual(registeringName);
        expect(registeredUser.surname).toEqual(registeringSurname);
        expect(registeredUser.password).toEqual(registeringPassword);
    })
    it('should fail on empty name', function () {
        expect(function () {register(undefined,'m','e@mail.com','p','p',function () {return true})}).toThrow(Error('name is not defined'));
    });
    it('should fail on numeric name', function () {
        expect(function () {register(10,'m','e@mail.com','p','p',function () {return true})}).toThrow(TypeError('10 is not a string'));
    });
    it('should fail on object name', function () {
        expect(function () {register({},'m','e@mail.com','p','p',function () {return true})}).toThrow();
    });
    it('should fail on boolean name', function () {
        expect(function () {register(true,'m','e@mail.com','p','p',function () {return true})}).toThrow(TypeError('true is not a string'));
    });
    it('should fail on array name', function () {
        expect(function () {register([],'m','e@mail.com','p','p',function () {return true})}).toThrow(TypeError(' is not a string'));
    });
    it('should fail on empty surname', function () {
        expect(function () {register('m',undefined,'e@mail.com','p','p',function () {return true})}).toThrow(Error('surname is not defined'));
    });
    it('should fail on numeric surname', function () {
        expect(function () {register('m',4,'e@mail.com','p','p',function () {return true})}).toThrow(TypeError('4 is not a string'));
    });
    it('should fail on boolean surname', function () {
        expect(function () {register('m',true,'e@mail.com','p','p',function () {return true})}).toThrow(TypeError('true is not a string'));
    });
    it('should fail on array surname', function () {
        expect(function () {register('m',[],'e@mail.com','p','p',function () {return true})}).toThrow(TypeError(' is not a string'));
    });
    it('should fail on empty email', function () {
        expect(function () {register('m','m',undefined,'p','p',function () {return true})}).toThrow(Error('email is not defined'));
    });
    it('should fail on numeric email', function () {
        expect(function () {register('m','m',4,'p','p',function () {return true})}).toThrow(TypeError('4 is not a string'));
    });
    it('should fail on boolean email', function () {
        expect(function () {register('m','m',true,'p','p',function () {return true})}).toThrow(TypeError('true is not a string'));
    });
    it('should fail on array email', function () {
        expect(function () {register('m','m',[],'p','p',function () {return true})}).toThrow(TypeError(' is not a string'));
    });
    it('should fail on object email', function () {
        expect(function () {register('m','m',{},'p','p',function () {return true})}).toThrow();
    });
    it('should fail on empty password', function () {
        expect(function () {register('m','m','e@mail.com',undefined,'p',function () {return true})}).toThrow(Error('password is not defined'));
    });
    it('should fail on numeric password', function () {
        expect(function () {register('m','m','e@mail.com',4,'p',function () {return true})}).toThrow(TypeError('4 is not a string'));
    });
    it('should fail on boolean password', function () {
        expect(function () {register('m','m','e@mail.com',true,'p',function () {return true})}).toThrow(TypeError('true is not a string'));
    });
    it('should fail on array password', function () {
        expect(function () {register('m','m','e@mail.com',[],'p',function () {return true})}).toThrow(TypeError(' is not a string'));
    });
    it('should fail on empty passwordConfirmation', function () {
        expect(function () {register('m','m','e@mail.com','p',undefined,function () {return true})}).toThrow(Error('passwordConfirmation is not defined'));
    });
    it('should fail on too short password', function () {
        expect(function () {register('m','m','e@mail.com','p','p',function () {return true})}).toThrow(Error('password is not strong enough'));
    });
});
describe('Log In validation', function () {
    it('should succeed', function () {
        var expected = users.find(function (user) {return user.email === 'johndoe@mail.com';});

        var testUser;

        login(expected.email,expected.password, function (user) {
            testUser = user;
        });

        expect(testUser).toBeDefined();
        expect(testUser.name).toEqual(expected.name);
        expect(testUser.surname).toEqual(expected.surname);
        expect(testUser.email).toEqual(expected.email);
        expect(testUser.password).toBeUndefined();
        expect(testUser).not.toEqual(expected);
    });
    it('should fail on wrong email', function () {
        var inventedEmail = 'invented@mail.com';

        expect(function () {
            login(inventedEmail, '123', function () { });
        }).toThrow(Error('user ' + inventedEmail + ' not found'));
    });
    it('should fail on wrong password', function () {
        expect(function () {
            login('johndoe@mail.com', '123', function () { });
        }).toThrow(Error('wrong password'));
    });
    it('should fail on empty email', function () {
        expect(function () {login(undefined,'p', function () {return true})}).toThrow(Error('email is not defined'));
    });
    it('should fail on numeric email', function () {
        expect(function () {login(4,'p', function () {return true})}).toThrow(TypeError('4 is not a string'));
    });
    it('should fail on boolean email', function () {
        expect(function () {login(true,'p', function () {return true})}).toThrow(TypeError('true is not a string'));
    });
    it('should fail on array email', function () {
        expect(function () {login([],'p', function () {return true})}).toThrow(TypeError(' is not a string'));
    });
    it('should fail on object email', function () {
        expect(function () {login(4,'p', function () {return true})}).toThrow();
    });
    it('should fail on empty password', function () {
        expect(function () {login('e@mail.com',undefined, function () {return true})}).toThrow(Error('password is not defined'));
    });
    it('should fail on numeric password', function () {
        expect(function () {login('e@mail.com',4, function () {return true})}).toThrow(TypeError('4 is not a string'));
    });
    it('should fail on boolean password', function () {
        expect(function () {login('e@mail.com',true, function () {return true})}).toThrow(TypeError('true is not a string'));
    });
    it('should fail on array password', function () {
        expect(function () {login('e@mail.com',[], function () {return true})}).toThrow(TypeError(' is not a string'));
    });
    it('should fail on object password', function () {
        expect(function () {login('e@mail.com',{}, function () {return true})}).toThrow();
    });
    
});