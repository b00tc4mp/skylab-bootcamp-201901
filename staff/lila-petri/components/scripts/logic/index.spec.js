'use strict';

describe('logic', ()=> {
    var name = 'Peter';
    var surname = 'Seller';
    var email = 'peterseller@gmail.com';
    var password = '123';

    beforeEach(()=> {
        users.length = 0;
    });

    describe('register', ()=> {
        it('should succeed on correct data', ()=> {
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

        it('should fail with invalid name', ()=> {
            expect(()=> {
                logic.register(undefined, surname, email, password);
            }).toThrowError(TypeError, 'undefined is not a valid name');
        });
        it('should fail with invalid surname', ()=> {
            expect(()=> {
                logic.register(name, undefined, email, password);
            }).toThrowError(TypeError, 'undefined is not a valid surname');
        });
        it('should fail with invalid email', ()=> {
            expect(()=> {
                logic.register(name, surname, undefined, password);
            }).toThrowError(TypeError, 'undefined is not a valid email');
        });
        it('should fail with invalid password', ()=> {
            expect(()=> {
                logic.register(name, surname, email, undefined);
            }).toThrowError(Error, 'undefined is not a valid password');
        });
        it('should fail if the user is already registered', ()=>{

            var user = {
                name: name,
                surname: surname,
                email: email,
                password: password
            };
            logic.register(name, surname, email, password);
            expect(users[users.length - 1]).toEqual(user);
            
            expect(()=> {
                logic.register(name, surname, email, password);
            }).toThrowError(Error, 'user already registered');


        });
    });

    describe('login', ()=> {
        beforeEach(()=> {
            users.push({
                name: name,
                surname: surname,
                email: email,
                password: password
            });
        });

        it('should succeed on correct data', ()=> {
            logic.login(email, password);

            expect(logic.__userEmail__).toBe(email);
            expect(logic.__accessTime__ / 1000).toBeCloseTo(Date.now() / 1000, 1);
        });

        it('should fail on wrong email (unexisting user)', ()=>{
            // expect(()=> {
            //     logic.login('pepitogrillo@gmail.com', password);
            // }).toThrowError(Error, 'wrong credentials');

            var _error;

            try {
                logic.login('pepitogrillo@gmail.com', password);
            } catch(error) {
                _error = error;
            }

            expect(_error).toBeDefined();
            expect(_error.code).toBe(1);
        });

        it('should fail on wrong password (existing user)', ()=>{
            // expect(()=> {
            //     logic.login(email, '456');
            // }).toThrowError(Error, 'wrong credentials');

            var _error;

            try {
                logic.login(email, '456');
            } catch(error) {
                _error = error;
            }

            expect(_error).toBeDefined();
            expect(_error.code).toBe(1);
        });

        // TODO fail cases
    });
    describe('logout', ()=>{
        beforeEach(()=> {
            users.push({
                name: name,
                surname: surname,
                email: email,
                password: password
            });
            logic.login(email, password);
        });
        it('should logout if the user is logged', ()=>{

            logic.logout(email);
            expect(logic.__userEmail__).not.toBe(email);

        });
        !true && it('should fail if the user is not logged', ()=>{

            logic.logout(email);
            expect(()=> {
                logic.logout(email);
            }).toThrowError(Error, 'user already registered');
        

        });
    });
    describe('search ducks', ()=> {
        it('should succeed on correct query', (done)=> {
            logic.searchDucks('yellow', (ducks)=> {
                expect(ducks).toBeDefined();
                expect(ducks instanceof Array).toBeTruthy();
                expect(ducks.length).toBe(13);

                done();
            });
        });
        it('should fail on undefined arguments', ()=> {
            expect(()=>{logic.searchDucks()}).toThrowError(Error, 'undefined is not a valid queryparam');
        });
    });
    describe('retrive duck', ()=>{
        it('should succeed on correct id', ()=>{

        });
    });
});