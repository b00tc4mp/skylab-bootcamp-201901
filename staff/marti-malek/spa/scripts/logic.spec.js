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
        expect(function () {register(10,'m','e@mail.com','p','p',function () {return true})}).toThrow(Error('10 is not a string'));
    });
    it('should fail on empty surname', function () {
        expect(function () {register('m',undefined,'e@mail.com','p','p',function () {return true})}).toThrow(Error('surname is not defined'));
    });
    it('should fail on empty email', function () {
        expect(function () {register('m','m',undefined,'p','p',function () {return true})}).toThrow(Error('email is not defined'));
    });
    it('should fail on empty password', function () {
        expect(function () {register('m','m','e@mail.com',undefined,'p',function () {return true})}).toThrow(Error('password is not defined'));
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

        
    });
    it('should fail on empty email', function () {
        expect(function () {login(undefined,'p', function () {return true})}).toThrow(Error('email is not defined'));
    });
    it('should fail on empty password', function () {
        expect(function () {login('e@mail.com',undefined, function () {return true})}).toThrow(Error('password is not defined'));
    });
    
});