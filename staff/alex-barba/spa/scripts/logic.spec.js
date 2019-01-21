describe('spa', function() {
    describe('log in', function() {

    })
    
    describe('register', function() {
        it('should succeed on correct credentials', function(){
            var registered;

            var regName = 'àlex';
            var regSurname = 'barba';
            var regEmail = 'alexander.barba@gmail.com';
            var regPassword = 'popopopo'
            register (regName, regSurname, regEmail, regPassword, 'popopopo', function() {
                registered = true;
            })

            expect(registered).toBeTruthy();

            var registeredUser = users.find(function(user) { return user.email === regEmail})

            expect(registeredUser).toBeDefined();
            expect(registeredUser.name).toEqual(regName);
            expect(registeredUser.surname).toEqual(regSurname);
            expect(registeredUser.email).toEqual(regEmail);
            expect(registeredUser.password).toEqual(regPassword); 
        })

        it('should fail on passing empty name value ', function(){
            var registered;

            expect(function(){register (undefined, 'barba', 'alexander.barba@gmail.com', 'p', 'p', function() {registered = true})
            }).toThrow(Error('Name is mandatory'));
            
            expect(registered).toBeUndefined();
        })

        it('should fail on passing empty surname value ', function(){

            expect(function(){register ('àlex', undefined, 'alexander.barba@gmail.com', 'p', 'p', function() {return true})
        }).toThrow(Error('Surname is mandatory'));
        })

        it('should fail on passing empty email value ', function(){

            expect(function(){register ('àlex', 'barba', undefined, 'p', 'p', function() {return true})
        }).toThrow(Error('Email is mandatory'));
        })

        it('should fail on passing empty password value ', function(){

            expect(function(){register ('àlex', 'barba', 'alexander.barba@gmail.com', undefined, 'p', function() {return true})
        }).toThrow(Error('Password is mandatory'));
        })

        it('should fail on passing empty password confirmation value ', function(){

            expect(function(){register ('àlex', 'barba', 'alexander.barba@gmail.com', 'p', undefined, function() {return true})
        }).toThrow(Error('Password confirmation is mandatory'));
        })

        it('should fail on passing missmatched password', function(){

            expect(function(){register ('àlex', 'barba', 'a@gmail.com', 'pooooooo', 'dooooooo', function() {return true})
        }).toThrow(Error('Passwords do not match'));
        })

        it('should fail on passing registered email', function(){

            expect(function(){register ('àlex', 'barba', 'johndoe@mail.com', 'pooooooo', 'pooooooo', function() {return true})
        }).toThrow(Error('User johndoe@mail.com already exists'));
        })

        it('should fail on passing password.length < 8', function(){

            expect(function(){register ('àlex', 'barba', 'emi@gmail.com', 'poppy', 'poppy', function() {})
        }).toThrow(Error('Minimum password length: 8 characters'));
        })
    })
});