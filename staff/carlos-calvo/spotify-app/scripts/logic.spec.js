spotifyApi.token = 'BQD8zTxO9mV-A8Aztkl7hiZmwk85yqmWGB9SoPKe3DcIPD1EAso18uAvwr7xdxWbCWBRbPOr5xcvT2a6pCTZfssYBlPn0Ba3fnbU_3rbal5WMkzXqKY5Q79CGgzJnPkh3v7RQpWPjmoQtw'

//Before testing token must be updated.
describe('logic', function () {
    describe('search artists', function () {
        it('should succeed on mathing query', function (done) {
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

    describe('retrieveAlbums', function () {
            it('should fail on empty query', function () {
                const query = ''
                expect(() => logic.retrieveAlbums(query, function (error, artists) { })).toThrowError()
            })
            it('should fail on callback not a function', function () {
                const query = 'ska'
                const callback = true;
                expect(() => logic.retrieveAlbums(query, callback)).toThrowError()
            })

            it('should succeed on retrieving albums', function (done) {
                const query = '2fiiGUBgPsIKDCE0bTthnl' //Albums de ska-p
                logic.retrieveAlbums(query, function (error, albums) {
                    expect(error).toBeUndefined()
                    expect(albums).toBeDefined()
                    expect(albums instanceof Array).toBeTruthy()
                    expect(albums.length).toBeGreaterThan(0)   
                    done()
                })
            })
    })

    describe('retrieveSongs', function () {
        it('should fail on empty query', function () {
            const query = ''
            expect(() => logic.retrieveSongs(query, function (error, artists) { })).toThrowError()
        })
        it('should fail on callback not a function', function () {
            const query = 'ska'
            const callback = true;
            expect(() => logic.retrieveSongs(query, callback)).toThrowError()
        })

        it('should succeed on retrieving albums', function (done) {
            const query = '5bCcLqZwwP0hiDqKmseFhZ' //Albums gameover from ska-p
            logic.retrieveSongs(query, function (error, albums) {
                expect(error).toBeUndefined()
                expect(albums).toBeDefined()
                expect(albums instanceof Array).toBeTruthy()
                expect(albums.length).toBeGreaterThan(0)   
                done()
            })
        })
    })

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

            // var error;

            // try {
            //     logic.login(inventedEmail, '123', function() {});
            // } catch(err) {
            //     error = err;
            // }

            // expect(error).toBeDefined();
            // expect(error.message).toBe('user ' + inventedEmail + ' not found');

            // ALT jasmine

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
})