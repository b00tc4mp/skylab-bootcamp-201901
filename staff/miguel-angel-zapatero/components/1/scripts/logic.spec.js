'use strict';

describe('logic', function () {
    var name = 'Peter';
    var surname = 'Seller';
    var email = 'peterseller@gmail.com';
    var password = '123';

    beforeEach(function () {
        users.length = 0;
    });

    describe('register', function () {
        it('should succeed on correct data', function () {
            var user = {
                name: name,
                surname: surname,
                email: email,
                password: password
            };

            var currentUsersCount = users.length;

            logic.register(name, surname, email, password);

            expect(users.length).toBe(currentUsersCount + 1);

            var lastUser = users[users.length - 1];
            expect(lastUser).toEqual(user);
        });

        it('should fail on undefined name', function () {
            expect(function () {
                logic.register(undefined, surname, email, password);
            }).toThrowError(TypeError, 'undefined is not a valid name');
        });

        it('should fail on undefined surname', function () {
            expect(function () {
                logic.register(undefined, surname, email, password);
            }).toThrowError(TypeError, 'undefined is not a valid surname');
        });

        it('should fail on undefined email', function () {
            expect(function () {
                logic.register(undefined, surname, email, password);
            }).toThrowError(TypeError, 'undefined is not a valid email');
        });

        it('should fail on undefined password', function () {
            expect(function () {
                logic.register(undefined, surname, email, password);
            }).toThrowError(TypeError, 'undefined is not a valid password');
        });

        it('should fail on repeat email', function() {
            //find email into users!
        });

        it('should fail on different password', function() {
            //check password1 vs password2
        });
    });

    describe('login', function () {
        beforeEach(function () {
            users.push({
                name: name,
                surname: surname,
                email: email,
                password: password
            });
        });

        it('should succeed on correct data', function () {
            logic.login(email, password);

            expect(logic.__userEmail__).toBe(email);
            expect(logic.__accessTime__ / 1000).toBeCloseTo(Date.now() / 1000, 1);
        });

        // TODO fail cases
    });
});