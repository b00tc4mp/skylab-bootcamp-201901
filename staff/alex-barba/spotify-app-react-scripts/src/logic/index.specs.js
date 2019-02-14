import React from 'react';
import ReactDOM from 'react-dom';
import logic from '.';
import spotifyApi from '../spotify-api';

spotifyApi.token='BQB8Ygu3ZKRjzwe5HFRUirl7D_cZoMZ82RLxiqaPN7CaEcRFI86X3NEk-VMtuI2FrLNgtctiPM2gn1XvsfOSDM9deH6i0FkiOwaU07LmMpkR9wc2jwEaDeO2ikAx9zYDHINL7zICZyoo64i0rg';

/**
 * logic.spec.js for Spotify App
 * 
 * Testing logic.js with Jest
 * 
 */

describe('spotify app', function() {

    /* login function */

    describe('login', function() {
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

        it('should fail on undefined email', function () {
            var registered;

            var registeringEmail = undefined;
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                login(registeringEmail, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on numeric email', function () {
            var registered;

            var registeringEmail = 10;
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                login(registeringEmail, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on boolean email', function () {
            var registered;

            var registeringEmail = true;
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                login(registeringEmail, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on object email', function () {
            var registered;

            var registeringEmail = {};
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                login(registeringEmail, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on array email', function () {
            var registered;

            var registeringEmail = [];
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                login(registeringEmail, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringEmail + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on empty email', function () {
            var registered;

            var registeringEmail = '';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                login(registeringEmail, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(Error('email cannot be empty'));

            expect(registered).toBeUndefined();
        });  

        it('should fail on undefined password', function () {
            var registered;

            var registeringEmail = 'john@gmail.com';
            var registeringPassword = undefined;

            expect(function () {
                login(registeringEmail, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on numeric password', function () {
            var registered;

            var registeringEmail = 'john@gmail.com';
            var registeringPassword = 10;

            expect(function () {
                login(registeringEmail, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on boolean password', function () {
            var registered;

            var registeringEmail = 'john@gmail.com';
            var registeringPassword = true;

            expect(function () {
                login(registeringEmail, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on object password', function () {
            var registered;

            var registeringEmail = 'john@gmail.com';
            var registeringPassword = {};

            expect(function () {
                login(registeringEmail, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on array password', function () {
            var registered;

            var registeringEmail = 'john@gmail.com';
            var registeringPassword = [];

            expect(function () {
                login(registeringEmail, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on empty password', function () {
            var registered;

            var registeringEmail = 'john@gmail.com';
            var registeringPassword = '';

            expect(function () {
                login(registeringEmail, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(Error('password cannot be empty'));

            expect(registered).toBeUndefined();
        });
    });

    /* register function */
    
    describe('register', function() {
        var registeringEmail = 'jw@mail.com';

        beforeEach(function () {
            var userIndex = users.findIndex(function (user) { return user.email === registeringEmail; });

            if (userIndex > -1)
                users.splice(userIndex, 1);
        });

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

        it('should fail on passing missmatched password', function(){

            expect(function(){register ('àlex', 'barba', 'a@gmail.com', 'pooooooo', 'dooooooo', function() {return true})
        }).toThrow(Error('passwords do not match'));
        })

        it('should fail on passing registered email', function(){

            expect(function(){register ('àlex', 'barba', 'johndoe@mail.com', 'pooooooo', 'pooooooo', function() {return true})
        }).toThrow(Error('user johndoe@mail.com already exists'));
        })

        it('should fail on passing password.length < 8', function(){

            expect(function(){register ('àlex', 'barba', 'emi@gmail.com', 'poppy', 'poppy', function() {})
        }).toThrow(Error('Minimum password length: 8 characters'));
        })

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
            var registeringSurname = 'Wayne';
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
            var registeringSurname = 'Wayne';
            var registeringEmail = 10;
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
            var registeringSurname = 'Wayne';
            var registeringEmail = false;
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
            var registeringSurname = 'Wayne';
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
            var registeringSurname = 'Wayne';
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
            var registeringSurname = 'Wayne';
            var registeringEmail = '';
            var registeringPassword = 'p4ssw0rd';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(Error('email cannot be empty'));

            expect(registered).toBeUndefined();
        });
           
        it('should fail on undefined password', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = undefined;

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on numeric password', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = 12;

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on boolean password', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = true;

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on object password', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = {};

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on array password', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = [];

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(TypeError(registeringPassword + ' is not a string'));

            expect(registered).toBeUndefined();
        });

        it('should fail on empty password', function () {
            var registered;

            var registeringName = 'John';
            var registeringSurname = 'Wayne';
            var registeringEmail = 'jw@mail.com';
            var registeringPassword = '';

            expect(function () {
                register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(Error('password cannot be empty'));

            expect(registered).toBeUndefined();
        });

        

    })

    /* searchArtists function */

    describe('search artists', function () {
        it('should succeed on matching query', function (done) {
            const query = 'madonna'

            logic.searchArtists(query, function (error, artists) {
                expect(error).toBeUndefined()

                expect(artists).toBeDefined()
                expect(artists instanceof Array).toBeTruthy()
                expect(artists.length).toBeGreaterThan(0)

                artists.forEach(({ name }) => expect(name.toLowerCase()).toContain(query))

                done()
            })
        })

        it('should fail on empty query', function () {
            const query = ''

            expect(() => logic.searchArtists(query, function (error, artists) { })).toThrowError('query is empty')
        })
    })

    /* retrieveAlbums function */
    
    describe('retrieve albums', function () {
        it('should succeed on matching query', function (done) {
            const query = '2ye2Wgw4gimLv2eAKyk1NB'

            logic.retrieveAlbums(query, function (error, albums) {
                expect(error).toBeUndefined()

                expect(albums).toBeDefined()
                expect(albums instanceof Array).toBeTruthy()
                expect(albums.length).toBeGreaterThan(0)

                done()
            })
        })

        it('should fail on empty query', function () {
            const query = ''

            expect(() => logic.retrieveAlbums(query, function (error, albums) { })).toThrowError('artist is empty')
        })
    })

    /* retrieveTracks function */
    
    describe('retrieve tracks', function () {
        it('should succeed on matching query', function (done) {
            const query = '4bcUiX49wpmDRhrC8TvDWV'

            logic.retrieveTracks(query, function (error, tracks) {
                expect(error).toBeUndefined()

                expect(tracks).toBeDefined()
                expect(tracks instanceof Array).toBeTruthy()
                expect(tracks.length).toBeGreaterThan(0)

                done()
            })
        })

        it('should fail on empty query', function () {
            const query = ''

            expect(() => logic.retrieveTracks(query, function (error, tracks) { })).toThrowError('album is empty')
        })
    })

    /* retrieveTrack function */
    
    describe('retrieve track', function () {
        it('should succeed on matching query', function (done) {
            const query = '0QV3swr7L8MZr72lL2izV1'

            logic.retrieveTrack(query, function (error, track) {
                expect(error).toBeUndefined()

                expect(track).toBeDefined()
                expect(track instanceof Object).toBeTruthy()
                

                done()
            })
        })

        it('should fail on empty query', function () {
            const query = ''

            expect(() => logic.retrieveTrack(query, function (error, tracks) { })).toThrowError('track is empty')
        })
    })

    /* retrieveFavourites function */
    
    describe('retrieve favourites', function () {
        it('should return true on adding new song', function (done) {
            const query = '0QV3swr7L8MZr72lL2izV1'

            logic.retrieveTrack(query, function (error, track) {
                expect(error).toBeUndefined()

                expect(track).toBeDefined()
                expect(track instanceof Object).toBeTruthy()

                done()
            })
        })

        it('should fail on empty query', function () {
            const query = ''

            expect(() => logic.retrieveTrack(query, function (error, tracks) { })).toThrowError('track is empty')
        })
    })
})