import spotifyApi from './spotify-api'
import logic from './logic'
import users from './data'

spotifyApi.token = 'BQAIO0gNiRBpxcQ8k4WYweEPV_vUfxOqYUdPYX7rYYZktTIlGyRkQHCc08t5L6JpQcPSNvQI8EYhq2liRjRh8iB_GRzM-KGyj7HHXjORO3sViQOMys7fCTYXogkE1GvIaqTLBQA4nmVb'

describe('logic', function() {
    describe('login', function () {
        it('should succeed on correct credentials', function () {
            var expected = users.find(function (user) { return user.email === 'johndoe@mail.com'; });

            var loggedInUser;

            logic.login(expected.email, expected.password, function (user) {
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
                logic.login(inventedEmail, '123', function () { });
            }).toThrow(Error('user ' + inventedEmail + ' not found'));
        });

        it('should fail on wrong password', function () {
            expect(function () {
                logic.login('johndoe@mail.com', '123', function () { });
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

            logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
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
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
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
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
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
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
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
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
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
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
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
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
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
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
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
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
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
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
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
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
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
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
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
                logic.register(registeringName, registeringSurname, registeringEmail, registeringPassword, registeringPassword, function () {
                    registered = true;
                });
            }).toThrow(Error('surname cannot be empty'));

            expect(registered).toBeUndefined();
        });
    });

    describe('search artist', function() {
        it('should succeed on amtching query', function(done) {
            const query = 'madonna'

            logic.searchArtists(query, function(error, artists) {
                expect(error).toBeUndefined()

                expect(artists).toBeDefined()

                expect(artists instanceof Array).toBeTruthy()

                expect(artists.length).toBeGreaterThan(0)

                artists.forEach(( { name }) => expect(name.toLowerCase()).toContain(query))

                done()
            })
        })

        it('should fain on empty query', function() {
            const query = ''

            expect(() => logic.searchArtists(query, function(error, artist) {})).toThrow(Error('query is empty'))
        })
    })

    
 
 
    describe('retrieves albums from artist on artistsPanel', function () {
        it('should succeed on matching query', function (done) {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW'

            logic.retrieveAlbums(artistId, function (error, albums) {
                expect(error).toBeUndefined()

                expect(albums).toBeDefined()
                expect(albums instanceof Array).toBeTruthy()
                expect(albums.length).toBeGreaterThan(0)

                albums.forEach(({ name }) => expect(name.toLowerCase()).toBeDefined())
                //artists.forEach(({ name }) => expect(name.toLowerCase()).toContain(albums)) => no ho podem posar pq la id de l'artista no serà mai igual al nom
                done()
            })
        })

        it('should fail on empty albums', function () {
            const artistId = ''

            expect(() => logic.retrieveAlbums(artistId, function (error, artistId) { })).toThrowError('artistId is empty')
        })
    })

    describe('retrieves songs from albums on albumPanel', function () {
        it('should succeed on matching query', function (done) {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X'

            logic.retrieveTracks(albumId, function (error, tracks) {
                expect(error).toBeUndefined()

                expect(tracks).toBeDefined()
                expect(tracks instanceof Array).toBeTruthy()
                expect(tracks.length).toBeGreaterThan(0)

                tracks.forEach(({ name }) => expect(albumId.toLowerCase()).toBeDefined())

                done()
            })
        })

        it('should fail on empty albums', function () {
            const albumId = ''

            expect(() => logic.retrieveTracks(albumId, function (error, albumId) { })).toThrowError('albumId is empty')
        })
    })

    describe('add song to favourite', function() {
        it('should succeed on matching id', function(done) {
            const trackId = '5U1tMecqLfOkPDIUK9SVKa'
            const email = 'manuelbarzi@gmail.com'
            
            logic.favouritedSongs(email, trackId, function (error, track) {
                expect(error).toBeUndefined()

                expect(track).toBeDefined()

                expect(track instanceof Array).toBeTruthy()

                expect(email).toBeDefined()

                expect(trackId).toBeDefined()

                expect(email instanceof String).toBeTruthy()

                expect(trackId instanceof String).toBeTruthy()

                done()
            })
        })

        it('should fail on empty track id', function(done) {
            const trackId = ''

            expect(() => logic.favouritedSongs(trackId, function (error, albumId) { })).toThrow('trackId is empty')
        })
    })
})