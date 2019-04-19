'use strict';

describe('logic', () => {
    const name = 'Peter';
    const surname = 'Seller';
    const email = 'peterseller@gmail.com';
    const password = '123';

    beforeEach(() => {
        users.length = 0;
    });

    describe('users', () => {
        describe('register', () => {
            it('should succeed on correct data', () => {
                const user = {
                    name: name,
                    surname: surname,
                    email: email,
                    password: password
                };

                const currentUsersCount = users.length;

                logic.register(name, surname, email, password);

                expect(users.length).toBe(currentUsersCount + 1);

                const lastUser = users[users.length - 1];
                expect(lastUser).toEqual(user);
            });

            it('should fail on undefined name', () => {
                expect(() => {
                    logic.register(undefined, surname, email, password);
                }).toThrowError(TypeError, 'undefined is not a valid name');
            });
        });

        describe('login', () => {
            beforeEach(() => {
                users.push({
                    name: name,
                    surname: surname,
                    email: email,
                    password: password
                });
            });

            it('should succeed on correct data', () => {
                logic.login(email, password);

                expect(logic.__userEmail__).toBe(email);
                expect(logic.__accessTime__ / 1000).toBeCloseTo(Date.now() / 1000, 1);
            });

            it('should fail on wrong email (unexisting user)', () => {
                // expect(function() {
                //     logic.login('pepitogrillo@gmail.com', password);
                // }).toThrowError(Error, 'wrong credentials');

                const _error;

                try {
                    logic.login('pepitogrillo@gmail.com', password);
                } catch(error) {
                    _error = error;
                }

                expect(_error).toBeDefined();
                expect(_error.code).toBe(1);
            });

            it('should fail on wrong password (existing user)', () => {
                // expect(function() {
                //     logic.login(email, '456');
                // }).toThrowError(Error, 'wrong credentials');

                const _error;

                try {
                    logic.login(email, '456');
                } catch(error) {
                    _error = error;
                }

                expect(_error).toBeDefined();
                expect(_error.code).toBe(1);
            });
        });

        describe('retrieve user', () => {
            beforeEach(() => {
                users.push({
                    name: name,
                    surname: surname,
                    email: email,
                    password: password
                });
            });

            it('should succeed on existing user and corect email', () => {
                const user = logic.retrieveUser(email);

                expect(user).toBeDefined();
                expect(user.name).toBe(name);
                expect(user.surname).toBe(surname);
                expect(user.email).toBe(email);
                expect(user.password).toBeUndefined();
            });
        })
    });

    describe('ducks', () => {
        describe('search ducks', () => {
            it('should succeed on correct query', done => {
                logic.searchDucks('yellow', ducks => {
                    expect(ducks).toBeDefined();
                    expect(ducks instanceof Array).toBeTruthy();
                    expect(ducks.length).toBe(13);

                    done();
                });
            });

            it('should fail on undefined argument', () => {
                expect(() => {
                    logic.searchDucks(undefined);
                }).toThrowError(TypeError, 'undefined is not defined');
            });

            it('should fail on undefined callback', () => {
                expect(() => {
                    logic.searchDucks('yellow');
                }).toThrowError(TypeError, 'undefined is not defined');
            });

            it('should fail if callback is not a function', () => {
                expect(() => {
                    logic.searchDucks('yellow', 'hola');
                }).toThrowError(TypeError, 'hola is not a valid function');
            });
        });

        describe('searh details of each duck', () => {
            it('should succeed on search a duck item', done => {
                logic.retrieveDucklingDetail('5c3853aebd1bde8520e66e15', duck => {
                    expect(duck).toBeDefined();
                    expect(duck instanceof Object).toBeTruthy();
                    expect(duck.id).toBe('5c3853aebd1bde8520e66e15');

                    done();
                });
            });

            it('should fail on undefined id', () => {
                expect(() => {
                    logic.retrieveDucklingDetail(undefined);
                }).toThrowError(TypeError, 'undefined is not defined');
            });

            it('should fail on undefined callback', () => {
                expect(() => {
                    logic.retrieveDucklingDetail('5c3853aebd1bde8520e66e15');
                }).toThrowError(TypeError, 'undefined is not defined');
            });

            it('should fail if callback is not a function', () => {
                expect(() => {
                    logic.retrieveDucklingDetail('5c3853aebd1bde8520e66e15', 'hola');
                }).toThrowError(TypeError, 'hola is not a valid function');
            });
        });
    });
});