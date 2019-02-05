import logic from '.';
import thegamesDbApi from '../thegamesdb-api';

const { REACT_APP_THEGAMESDB_APIKEY } = process.env;

thegamesDbApi.apiKey = REACT_APP_THEGAMESDB_APIKEY;
const secureApiKey = thegamesDbApi.apiKey;

describe('logic', () => {
    describe('register user', () => {
        const name = 'Manuel';
        const surname = 'Barzi';
        const email = `manuelbarzi@mail.com-${Math.random()}`;
        const password = '123';
        const passwordConfirm = password;

        it('should succeed on valid data', () =>
            logic
                .registerUser(name, surname, email, password, passwordConfirm)
                .then(result => expect(result).toBeUndefined()));

        it('should fail on undefined name', () => {
            const name = undefined;
            const surname = 'Barzi';
            const email = 'manuelbarzi@mail.com';
            const password = '123';

            expect(() => {
                logic.registerUser(name, surname, email, password, password);
            }).toThrow(TypeError(name + ' is not a string'));
        });

        it('should fail on numeric name', () => {
            const name = 10;
            const surname = 'Barzi';
            const email = 'manuelbarzi@mail.com';
            const password = '123';

            expect(() => {
                logic.registerUser(name, surname, email, password, password);
            }).toThrow(TypeError(name + ' is not a string'));
        });

        it('should fail on boolean name', () => {
            const name = true;
            const surname = 'Barzi';
            const email = 'manuelbarzi@mail.com';
            const password = '123';

            expect(() => {
                logic.registerUser(name, surname, email, password, password);
            }).toThrow(TypeError(name + ' is not a string'));
        });

        it('should fail on object name', () => {
            const name = {};
            const surname = 'Barzi';
            const email = 'manuelbarzi@mail.com';
            const password = '123';

            expect(() => {
                logic.registerUser(name, surname, email, password, password);
            }).toThrow(TypeError(name + ' is not a string'));
        });

        it('should fail on array name', () => {
            const name = [];
            const surname = 'Barzi';
            const email = 'manuelbarzi@mail.com';
            const password = '123';

            expect(() => {
                logic.registerUser(name, surname, email, password, password);
            }).toThrow(TypeError(name + ' is not a string'));
        });

        it('should fail on empty name', () => {
            const name = '';
            const surname = 'Barzi';
            const email = 'manuelbarzi@mail.com';
            const password = '123';

            expect(() => {
                logic.registerUser(name, surname, email, password, password);
            }).toThrow(Error('name cannot be empty'));
        });

        it('should fail on undefined surname', () => {
            const name = 'Manuel';
            const surname = undefined;
            const email = 'manuelbarzi@mail.com';
            const password = '123';

            expect(() => {
                logic.registerUser(name, surname, email, password, password);
            }).toThrow(TypeError(surname + ' is not a string'));
        });

        it('should fail on numeric surname', () => {
            const name = 'Manuel';
            const surname = 10;
            const email = 'manuelbarzi@mail.com';
            const password = '123';

            expect(() => {
                logic.registerUser(name, surname, email, password, password);
            }).toThrow(TypeError(surname + ' is not a string'));
        });

        it('should fail on boolean surname', () => {
            const name = 'Manuel';
            const surname = false;
            const email = 'manuelbarzi@mail.com';
            const password = '123';

            expect(() => {
                logic.registerUser(name, surname, email, password, password);
            }).toThrow(TypeError(surname + ' is not a string'));
        });

        it('should fail on object surname', () => {
            const name = 'Manuel';
            const surname = {};
            const email = 'manuelbarzi@mail.com';
            const password = '123';

            expect(() => {
                logic.registerUser(name, surname, email, password, password);
            }).toThrow(TypeError(surname + ' is not a string'));
        });

        it('should fail on array surname', () => {
            const name = 'Manuel';
            const surname = [];
            const email = 'manuelbarzi@mail.com';
            const password = '123';

            expect(() => {
                logic.registerUser(name, surname, email, password, password);
            }).toThrow(TypeError(surname + ' is not a string'));
        });

        it('should fail on empty surname', () => {
            const name = 'Manuel';
            const surname = '';
            const email = 'manuelbarzi@mail.com';
            const password = '123';

            expect(() => {
                logic.registerUser(name, surname, email, password, password);
            }).toThrow(Error('surname cannot be empty'));
        });
    });

    describe('login user', () => {
        const name = 'Manuel';
        const surname = 'Barzi';
        const email = `manuelbarzi@mail.com-${Math.random()}`;
        const password = '123';
        const passwordConfirm = password;

        beforeEach(() => logic.registerUser(name, surname, email, password, passwordConfirm));

        it('should succeed on correct credentials', () =>
            logic.loginUser(email, password).then(() => {
                expect(logic.__userId__).toBeDefined();
                expect(logic.__userApiToken__).toBeDefined();
            }));
    });

    describe('retrieve user', () => {
        const name = 'Manuel';
        const surname = 'Barzi';
        const email = `manuelbarzi@mail.com-${Math.random()}`;
        const password = '123';
        const passwordConfirm = password;

        beforeEach(() =>
            logic
                .registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.loginUser(email, password))
        );

        it('should succeed on correct credentials', () =>
            logic.retrieveUser().then(user => {
                expect(user.id).toBe(logic.__userId__);
                expect(user.name).toBe(name);
                expect(user.surname).toBe(surname);
                expect(user.email).toBe(email);
            }));
    });

    // TODO updateUser and removeUser

    describe('ThegamesDb API', () => {
        describe('Search games', () => {
            it('Should succeed on matching query', () => {
                const query = 'Zelda';

                return logic.searchGame(query).then(({ data: { games } }) => {
                    expect(games).toBeDefined();
                    expect(games instanceof Array).toBeTruthy();
                    expect(games.length).toBeGreaterThan(0);

                    games.forEach(({ game_title }) =>
                        expect(game_title.toLowerCase()).toContain(query.toLowerCase())
                    );
                });
            });

            it('Should succeed on matching query and include extra data information', () => {
                const query = 'Zelda';
                const params = 'boxart,platform';

                return logic
                    .searchGame(query, params)
                    .then(({ data: { games }, include: { boxart, platform } }) => {
                        expect(games).toBeDefined();
                        expect(games instanceof Array).toBeTruthy();
                        expect(games.length).toBeGreaterThan(0);
                        games.forEach(({ game_title }) =>
                            expect(game_title.toLowerCase()).toContain(query.toLowerCase())
                        );

                        expect(boxart).toBeDefined();

                        expect(platform).toBeDefined();
                    });
            });

            it('Should fail on empty query', () => {
                const query = '';
                expect(() => logic.searchGame(query)).toThrowError('query is empty');
            });

            it('Should fail if query is not a string', () => {
                const query = 123;
                expect(() => logic.searchGame(query)).toThrowError(`${query} is not a string`);
            });

            it('Should fail on empty query', () => {
                const query = '';
                expect(() => logic.searchGame(query)).toThrowError('query is empty');
            });
        });

        describe('Retrieve GAME DATA by GameID', () => {
            beforeEach(() => {
                thegamesDbApi.apiKey = secureApiKey;
                thegamesDbApi.proxy = 'https://skylabcoders.herokuapp.com/proxy?url=';
            });

            describe('sync fails', () => {
                it('should throw error on number gameId', () => {
                    const gameId = 23;

                    expect(typeof gameId).toBe('number');
                    expect(() => logic.retrieveGame(gameId)).toThrowError(
                        `${gameId} is not a string`
                    );
                });

                it('should throw error on array gameId', () => {
                    const gameId = [1, 2, 3];

                    expect(gameId.constructor).toBe(Array);
                    expect(() => logic.retrieveGame(gameId)).toThrowError(
                        `${gameId} is not a string`
                    );
                });

                it('should throw error on object gameId', () => {
                    const gameId = { hello: 'world' };

                    expect(gameId.constructor).toBe(Object);
                    expect(() => logic.retrieveGame(gameId)).toThrowError(
                        `${gameId} is not a string`
                    );
                });

                it('should throw error on boolean gameId', () => {
                    const gameId = false;

                    expect(typeof gameId).toBe('boolean');
                    expect(() => logic.retrieveGame(gameId)).toThrowError(
                        `${gameId} is not a string`
                    );
                });

                it('should throw error on function gameId', () => {
                    const gameId = () => console.log('hello');

                    expect(typeof gameId).toBe('function');
                    expect(() => logic.retrieveGame(gameId)).toThrowError(
                        `${gameId} is not a string`
                    );
                });

                it('should throw error on empty gameId', () => {
                    const gameId = '';

                    expect(() => logic.retrieveGame(gameId)).toThrowError('gameId is empty');
                });

                it('should throw error when gameId is not a string number (isNaN(Number(gameId)))', () => {
                    const gameId = 'a';

                    expect(() => logic.retrieveGame(gameId)).toThrowError(
                        `${gameId} should be a number`
                    );
                });

                it('should throw error when gameId is <1', () => {
                    const gameId = '0';

                    expect(() => logic.retrieveGame(gameId)).toThrowError(
                        `${gameId} should be a bigger than 0 number`
                    );
                });

                it('should throw error when gameId is a float number', () => {
                    const gameId = '1.23';

                    expect(() => logic.retrieveGame(gameId)).toThrowError(
                        `${gameId} should be an integer number`
                    );
                });
            });

            describe('async fails', () => {
                it("should throw error when gameId doesn't exists on database", () => {
                    const gameId = '9823749872394872983';

                    return logic
                        .retrieveGame(gameId)
                        .then(() => {
                            throw Error('should not pass by here');
                        })
                        .catch(({ message }) =>
                            expect(message).toBe(`${gameId} doesn't exist in database`)
                        );
                });
                it('should fail on server down', () => {
                    const gameId = '1';
                    thegamesDbApi.proxy = 'https://skylabcoders.hulioapp.com/proxy?url=';

                    return logic
                        .retrieveGame(gameId)
                        .then(() => {
                            throw Error('should not pass by here');
                        })
                        .catch(({ message }) => expect(message).toBe(`Network request failed`));
                });
                it('should fail on non valid API key', () => {
                    const gameId = '1';
                    thegamesDbApi.apiKey = 'HULIO';

                    return logic
                        .retrieveGame(gameId)
                        .then(() => {
                            throw Error('should not pass by here');
                        })
                        .catch(({ message }) =>
                            expect(message).toBe(
                                `This route requires and API key and no API key was provided.`
                            )
                        );
                });
            });

            describe('success situation', () => {
                it('should succeed on retrieve correct game info', () => {
                    const gameId = '1';
                    const gameTitle = 'Halo: Combat Evolved';

                    return logic.retrieveGame(gameId).then(gameData => {
                        expect(gameData).toBeDefined();
                        expect(gameData.data.games[0].game_title).toBe(gameTitle);
                    });
                });
            });
        });

        describe('Retrieve IMAGES by GameID', () => {
            beforeEach(() => {
                thegamesDbApi.apiKey = secureApiKey;
                thegamesDbApi.proxy = 'https://skylabcoders.herokuapp.com/proxy?url=';
            });

            describe('sync fails', () => {
                it('should throw error on number gameId', () => {
                    const gameId = 23;

                    expect(typeof gameId).toBe('number');
                    expect(() => logic.retrieveImages(gameId)).toThrowError(
                        `${gameId} is not a string`
                    );
                });

                it('should throw error on array gameId', () => {
                    const gameId = [1, 2, 3];

                    expect(gameId.constructor).toBe(Array);
                    expect(() => logic.retrieveImages(gameId)).toThrowError(
                        `${gameId} is not a string`
                    );
                });

                it('should throw error on object gameId', () => {
                    const gameId = { hello: 'world' };

                    expect(gameId.constructor).toBe(Object);
                    expect(() => logic.retrieveImages(gameId)).toThrowError(
                        `${gameId} is not a string`
                    );
                });

                it('should throw error on boolean gameId', () => {
                    const gameId = false;

                    expect(typeof gameId).toBe('boolean');
                    expect(() => logic.retrieveImages(gameId)).toThrowError(
                        `${gameId} is not a string`
                    );
                });

                it('should throw error on function gameId', () => {
                    const gameId = () => console.log('hello');

                    expect(typeof gameId).toBe('function');
                    expect(() => logic.retrieveImages(gameId)).toThrowError(
                        `${gameId} is not a string`
                    );
                });

                it('should throw error on empty gameId', () => {
                    const gameId = '';

                    expect(() => logic.retrieveImages(gameId)).toThrowError('gameId is empty');
                });

                it('should throw error when gameId is not a string number (isNaN(Number(gameId)))', () => {
                    const gameId = 'a';

                    expect(() => logic.retrieveImages(gameId)).toThrowError(
                        `${gameId} should be a number`
                    );
                });

                it('should throw error when gameId is <0', () => {
                    const gameId = '0';

                    expect(() => logic.retrieveImages(gameId)).toThrowError(
                        `${gameId} should be a bigger than 0 number`
                    );
                });

                it('should throw error when gameId is a float number', () => {
                    const gameId = '1.23';

                    expect(() => logic.retrieveImages(gameId)).toThrowError(
                        `${gameId} should be an integer number`
                    );
                });
            });

            describe('async fails', () => {
                it("should throw error when gameId doesn't exists on database", () => {
                    const gameId = '9823749872394872983';

                    return logic
                        .retrieveImages(gameId)
                        .then(() => {
                            throw Error('should not pass by here');
                        })
                        .catch(({ message }) =>
                            expect(message).toBe(`${gameId} doesn't exist in database`)
                        );
                });
                it('should fail on server down', () => {
                    const gameId = '1';
                    thegamesDbApi.proxy = 'https://skylabcoders.hulioapp.com/proxy?url=';

                    return logic
                        .retrieveImages(gameId)
                        .then(() => {
                            throw Error('should not pass by here');
                        })
                        .catch(({ message }) => expect(message).toBe(`Network request failed`));
                });
                it('should fail on non valid API key', () => {
                    const gameId = '1';
                    thegamesDbApi.apiKey = 'HULIO';

                    return logic
                        .retrieveImages(gameId)
                        .then(() => {
                            throw Error('should not pass by here');
                        })
                        .catch(({ message }) =>
                            expect(message).toBe(
                                `This route requires and API key and no API key was provided.`
                            )
                        );
                });
            });

            describe('success situation', () => {
                it('should succeed on retrieve correct game images', () => {
                    const gameId = '1';

                    return logic.retrieveImages(gameId).then(imagesData => {
                        expect(imagesData).toBeDefined();
                        expect(imagesData.data.base_url.original).toBeDefined();
                        expect(imagesData.data.images[`${gameId}`][0].filename).toBeDefined();
                        expect(imagesData.data.images[`${gameId}`][0].resolution).toBe('1920x1080');
                    });
                });
            });
        });

        describe('Retrieve platform list', () => {
            beforeEach(() => {
                thegamesDbApi.apiKey = secureApiKey;
                thegamesDbApi.proxy = 'https://skylabcoders.herokuapp.com/proxy?url=';
            });

            describe('sync fails', () => {
                it('should throw error on number fields', () => {
                    const fields = 23;

                    expect(typeof fields).toBe('number');
                    expect(() => logic.retrievePlatformList(fields)).toThrowError(
                        `${fields} is not a string`
                    );
                });

                it('should throw error on array fields', () => {
                    const fields = [1, 2, 3];

                    expect(fields.constructor).toBe(Array);
                    expect(() => logic.retrievePlatformList(fields)).toThrowError(
                        `${fields} is not a string`
                    );
                });

                it('should throw error on object fields', () => {
                    const fields = { hello: 'world' };

                    expect(fields.constructor).toBe(Object);
                    expect(() => logic.retrievePlatformList(fields)).toThrowError(
                        `${fields} is not a string`
                    );
                });

                it('should throw error on boolean fields', () => {
                    const fields = false;

                    expect(typeof fields).toBe('boolean');
                    expect(() => logic.retrievePlatformList(fields)).toThrowError(
                        `${fields} is not a string`
                    );
                });

                it('should throw error on function fields', () => {
                    const fields = () => console.log('hello');

                    expect(typeof fields).toBe('function');
                    expect(() => logic.retrievePlatformList(fields)).toThrowError(
                        `${fields} is not a string`
                    );
                });
            });

            describe('async fails', () => {
                it('should fail on server down', () => {
                    const fields = 'icon,console';
                    thegamesDbApi.proxy = 'https://skylabcoders.hulioapp.com/proxy?url=';

                    return logic
                        .retrievePlatformList(fields)
                        .then(() => {
                            throw Error('should not pass by here');
                        })
                        .catch(({ message }) => expect(message).toBe(`Network request failed`));
                });
                it('should fail on non valid API key', () => {
                    const fields = 'icon,console';
                    thegamesDbApi.apiKey = 'HULIO';

                    return logic
                        .retrievePlatformList(fields)
                        .then(() => {
                            throw Error('should not pass by here');
                        })
                        .catch(({ message }) =>
                            expect(message).toBe(
                                `This route requires and API key and no API key was provided.`
                            )
                        );
                });
            });

            describe('success situation', () => {
                it('should succeed on retrieve correct game images', () => {
                    const fields = 'manufacturer,media';

                    return logic.retrievePlatformList(fields).then(platformList => {
                        expect(platformList).toBeDefined();
                        expect(platformList.data.platforms[1]).toBeDefined();
                        expect(platformList.data.platforms[2].name).toBe('Nintendo GameCube');
                        expect(platformList.data.platforms[3].manufacturer).toBe('Nintendo');
                    });
                });

                it('should succeed on empty fields', () => {
                    return logic.retrievePlatformList().then(platformList => {
                        expect(platformList).toBeDefined();
                        expect(platformList.data.platforms[1]).toBeDefined();
                        expect(platformList.data.platforms[2].name).toBe('Nintendo GameCube');
                    });
                });
            });
        });

        describe('Retrieve genres list', () => {
            beforeEach(() => {
                thegamesDbApi.apiKey = secureApiKey;
                thegamesDbApi.proxy = 'https://skylabcoders.herokuapp.com/proxy?url=';
            });

            describe('async fails', () => {
                it('should fail on server down', () => {
                    thegamesDbApi.proxy = 'https://skylabcoders.hulioapp.com/proxy?url=';

                    return logic
                        .retrieveGenresList()
                        .then(() => {
                            throw Error('should not pass by here');
                        })
                        .catch(({ message }) => expect(message).toBe(`Network request failed`));
                });
                it('should fail on non valid API key', () => {
                    thegamesDbApi.apiKey = 'HULIO';

                    return logic
                        .retrieveGenresList()
                        .then(() => {
                            throw Error('should not pass by here');
                        })
                        .catch(({ message }) =>
                            expect(message).toBe(
                                `This route requires and API key and no API key was provided.`
                            )
                        );
                });
            });

            describe('success situation', () => {
                it('should succeed on retrieve correct game images', () => {
                    return logic.retrieveGenresList().then(genresList => {
                        expect(genresList).toBeDefined();
                        expect(genresList.data.genres).toBeDefined();
                        expect(genresList.data.genres[1].name).toBe('Action');
                    });
                });
            });
        });

        describe('Retrieve developers list', () => {
            beforeEach(() => {
                thegamesDbApi.apiKey = secureApiKey;
                thegamesDbApi.proxy = 'https://skylabcoders.herokuapp.com/proxy?url=';
            });

            describe('async fails', () => {
                it('should fail on server down', () => {
                    thegamesDbApi.proxy = 'https://skylabcoders.hulioapp.com/proxy?url=';

                    return logic
                        .retrieveDevelopersList()
                        .then(() => {
                            throw Error('should not pass by here');
                        })
                        .catch(({ message }) => expect(message).toBe(`Network request failed`));
                });
                it('should fail on non valid API key', () => {
                    thegamesDbApi.apiKey = 'HULIO';

                    return logic
                        .retrieveDevelopersList()
                        .then(() => {
                            throw Error('should not pass by here');
                        })
                        .catch(({ message }) =>
                            expect(message).toBe(
                                `This route requires and API key and no API key was provided.`
                            )
                        );
                });
            });

            describe('success situation', () => {
                it('should succeed on retrieve correct game images', () => {
                    return logic.retrieveDevelopersList().then(developersList => {
                        expect(developersList).toBeDefined();
                        expect(developersList.data.developers).toBeDefined();
                        expect(developersList.data.developers[1].name).toBe('Atari Games');
                    });
                });
            });
        });

        describe('Retrieve publishers list', () => {
            beforeEach(() => {
                thegamesDbApi.apiKey = secureApiKey;
                thegamesDbApi.proxy = 'https://skylabcoders.herokuapp.com/proxy?url=';
            });

            describe('async fails', () => {
                it('should fail on server down', () => {
                    thegamesDbApi.proxy = 'https://skylabcoders.hulioapp.com/proxy?url=';

                    return logic
                        .retrievePublishersList()
                        .then(() => {
                            throw Error('should not pass by here');
                        })
                        .catch(({ message }) => expect(message).toBe(`Network request failed`));
                });
                it('should fail on non valid API key', () => {
                    thegamesDbApi.apiKey = 'HULIO';

                    return logic
                        .retrievePublishersList()
                        .then(() => {
                            throw Error('should not pass by here');
                        })
                        .catch(({ message }) =>
                            expect(message).toBe(
                                `This route requires and API key and no API key was provided.`
                            )
                        );
                });
            });

            describe('success situation', () => {
                it('should succeed on retrieve correct game images', () => {
                    return logic.retrievePublishersList().then(publishersList => {
                        expect(publishersList).toBeDefined();
                        expect(publishersList.data.publishers).toBeDefined();
                        expect(publishersList.data.publishers[2].name).toBe('Electronic Arts');
                    });
                });
            });
        });
    });

    describe('retrive games by platform', function() {
        beforeEach(() => {
            thegamesDbApi.apiKey =
                '387f91ccf550081f8c890fefc75982c76d309d2b215cfbefd959d520d397c72b';
            thegamesDbApi.proxy = 'https://skylabcoders.herokuapp.com/proxy?url=';
        });

        describe('sync fails', () => {
            it('should throw error if Id is a number', () => {
                const Id = 23;

                expect(typeof Id).toBe('number');
                expect(() => logic.retrieveGamesByPlatform(Id)).toThrowError(
                    `${Id} is not a string`
                );
            });

            it('should throw error if Id is an arrray', () => {
                const Id = [1, 2, 3];

                expect(Id.constructor).toBe(Array);
                expect(() => logic.retrieveGamesByPlatform(Id)).toThrowError(
                    `${Id} is not a string`
                );
            });

            it('should throw error if Id is an object', () => {
                const Id = { hello: 'world' };

                expect(Id.constructor).toBe(Object);
                expect(() => logic.retrieveGamesByPlatform(Id)).toThrowError(
                    `${Id} is not a string`
                );
            });

            it('should throw error on boolean Id', () => {
                const Id = false;

                expect(typeof Id).toBe('boolean');
                expect(() => logic.retrieveGamesByPlatform(Id)).toThrowError(
                    `${Id} is not a string`
                );
            });

            it('should throw error if Id is a function', () => {
                const Id = () => console.log('hello');

                expect(typeof Id).toBe('function');
                expect(() => logic.retrieveGamesByPlatform(Id)).toThrowError(
                    `${Id} is not a string`
                );
            });

            it('should throw error on empty Id', () => {
                const Id = '';

                expect(() => logic.retrieveGamesByPlatform(Id)).toThrowError('Id is empty');
            });

            it('should throw error when Id is not a string number (isNaN(Number(Id)))', () => {
                const Id = 'a';

                expect(() => logic.retrieveGamesByPlatform(Id)).toThrowError(
                    `${Id} should be a number`
                );
            });

            it('should throw error when Id is <0', () => {
                const Id = '0';

                expect(() => logic.retrieveGamesByPlatform(Id)).toThrowError(
                    `${Id} should be a bigger than 0`
                );
            });

            it('should throw error when Id is a float number', () => {
                const Id = '1.23';

                expect(() => logic.retrieveGamesByPlatform(Id)).toThrowError(
                    `${Id} should be an integer number`
                );
            });
        });

        describe('async fails', () => {
            it("should throw error when Id doesn't exists on database", () => {
                const Id = '9823749872394872983';

                return logic
                    .retrieveGamesByPlatform(Id)
                    .then(() => {
                        throw Error('should not pass by here');
                    })
                    .catch(({ message }) =>
                        expect(message).toBe(`${Id} doesn't exist in database`)
                    );
            });
            it('should fail on server down', () => {
                const Id = '1';
                thegamesDbApi.proxy = 'https://skylabcoders.hulioapp.com/proxy?url=';

                return logic
                    .retrieveGamesByPlatform(Id)
                    .then(() => {
                        throw Error('should not pass by here');
                    })
                    .catch(({ message }) => expect(message).toBe(`Network request failed`));
            });
            it('should fail on non valid API key', () => {
                const Id = '1';
                thegamesDbApi.apiKey = 'HULIO';

                return logic
                    .retrieveGamesByPlatform(Id)
                    .then(() => {
                        throw Error('should not pass by here');
                    })
                    .catch(({ message }) =>
                        expect(message).toBe(
                            `This route requires and API key and no API key was provided.`
                        )
                    );
            });
        });
    });
});
