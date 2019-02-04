import thegamesDbApi from '.';

const { REACT_APP_THEGAMESDB_APIKEY } = process.env;

thegamesDbApi.apiKey = REACT_APP_THEGAMESDB_APIKEY;
const secureApiKey = thegamesDbApi.apiKey;

describe('ThegamesDb API', () => {
    describe('Search games', () => {
        it('Should succeed on matching query', () => {
            const query = 'Zelda';

            return thegamesDbApi.searchGame(query).then(({ data: { games } }) => {
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

            return thegamesDbApi
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
            expect(() => thegamesDbApi.searchGame(query)).toThrowError('query is empty');
        });

        it('Should fail if query is not a string', () => {
            const query = 123;
            expect(() => thegamesDbApi.searchGame(query)).toThrowError(`${query} is not a string`);
        });

        it('Should fail on empty query', () => {
            const query = '';
            expect(() => thegamesDbApi.searchGame(query)).toThrowError('query is empty');
        });
    });

    describe('ultra-vgsm api retrieve GAME DATA by GameID', () => {
        beforeEach(() => {
            thegamesDbApi.apiKey = secureApiKey;
            thegamesDbApi.proxy = 'https://skylabcoders.herokuapp.com/proxy?url=';
        });

        describe('sync fails', () => {
            it('should throw error on number gameId', () => {
                const gameId = 23;

                expect(typeof gameId).toBe('number');
                expect(() => thegamesDbApi.retrieveGame(gameId)).toThrowError(
                    `${gameId} is not a string`
                );
            });

            it('should throw error on array gameId', () => {
                const gameId = [1, 2, 3];

                expect(gameId.constructor).toBe(Array);
                expect(() => thegamesDbApi.retrieveGame(gameId)).toThrowError(
                    `${gameId} is not a string`
                );
            });

            it('should throw error on object gameId', () => {
                const gameId = { hello: 'world' };

                expect(gameId.constructor).toBe(Object);
                expect(() => thegamesDbApi.retrieveGame(gameId)).toThrowError(
                    `${gameId} is not a string`
                );
            });

            it('should throw error on boolean gameId', () => {
                const gameId = false;

                expect(typeof gameId).toBe('boolean');
                expect(() => thegamesDbApi.retrieveGame(gameId)).toThrowError(
                    `${gameId} is not a string`
                );
            });

            it('should throw error on function gameId', () => {
                const gameId = () => console.log('hello');

                expect(typeof gameId).toBe('function');
                expect(() => thegamesDbApi.retrieveGame(gameId)).toThrowError(
                    `${gameId} is not a string`
                );
            });

            it('should throw error on empty gameId', () => {
                const gameId = '';

                expect(() => thegamesDbApi.retrieveGame(gameId)).toThrowError('gameId is empty');
            });

            it('should throw error when gameId is not a string number (isNaN(Number(gameId)))', () => {
                const gameId = 'a';

                expect(() => thegamesDbApi.retrieveGame(gameId)).toThrowError(
                    `${gameId} should be a number`
                );
            });

            it('should throw error when gameId is <1', () => {
                const gameId = '0';

                expect(() => thegamesDbApi.retrieveGame(gameId)).toThrowError(
                    `${gameId} should be a bigger than 0 number`
                );
            });

            it('should throw error when gameId is a float number', () => {
                const gameId = '1.23';

                expect(() => thegamesDbApi.retrieveGame(gameId)).toThrowError(
                    `${gameId} should be an integer number`
                );
            });
        });

        describe('async fails', () => {
            it("should throw error when gameId doesn't exists on database", () => {
                const gameId = '9823749872394872983';

                return thegamesDbApi
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

                return thegamesDbApi
                    .retrieveGame(gameId)
                    .then(() => {
                        throw Error('should not pass by here');
                    })
                    .catch(({ message }) => expect(message).toBe(`Network request failed`));
            });
            it('should fail on non valid API key', () => {
                const gameId = '1';
                thegamesDbApi.apiKey = 'HULIO';

                return thegamesDbApi
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

                return thegamesDbApi.retrieveGame(gameId).then(gameData => {
                    expect(gameData).toBeDefined();
                    expect(gameData.data.games[0].game_title).toBe(gameTitle);
                });
            });
        });
    });

    describe('ultra-vgsm api retrieve IMAGES by GameID', () => {
        beforeEach(() => {
            thegamesDbApi.apiKey = secureApiKey;
            thegamesDbApi.proxy = 'https://skylabcoders.herokuapp.com/proxy?url=';
        });

        describe('sync fails', () => {
            it('should throw error on number gameId', () => {
                const gameId = 23;

                expect(typeof gameId).toBe('number');
                expect(() => thegamesDbApi.retrieveImages(gameId)).toThrowError(
                    `${gameId} is not a string`
                );
            });

            it('should throw error on array gameId', () => {
                const gameId = [1, 2, 3];

                expect(gameId.constructor).toBe(Array);
                expect(() => thegamesDbApi.retrieveImages(gameId)).toThrowError(
                    `${gameId} is not a string`
                );
            });

            it('should throw error on object gameId', () => {
                const gameId = { hello: 'world' };

                expect(gameId.constructor).toBe(Object);
                expect(() => thegamesDbApi.retrieveImages(gameId)).toThrowError(
                    `${gameId} is not a string`
                );
            });

            it('should throw error on boolean gameId', () => {
                const gameId = false;

                expect(typeof gameId).toBe('boolean');
                expect(() => thegamesDbApi.retrieveImages(gameId)).toThrowError(
                    `${gameId} is not a string`
                );
            });

            it('should throw error on function gameId', () => {
                const gameId = () => console.log('hello');

                expect(typeof gameId).toBe('function');
                expect(() => thegamesDbApi.retrieveImages(gameId)).toThrowError(
                    `${gameId} is not a string`
                );
            });

            it('should throw error on empty gameId', () => {
                const gameId = '';

                expect(() => thegamesDbApi.retrieveImages(gameId)).toThrowError('gameId is empty');
            });

            it('should throw error when gameId is not a string number (isNaN(Number(gameId)))', () => {
                const gameId = 'a';

                expect(() => thegamesDbApi.retrieveImages(gameId)).toThrowError(
                    `${gameId} should be a number`
                );
            });

            it('should throw error when gameId is <0', () => {
                const gameId = '0';

                expect(() => thegamesDbApi.retrieveImages(gameId)).toThrowError(
                    `${gameId} should be a bigger than 0 number`
                );
            });

            it('should throw error when gameId is a float number', () => {
                const gameId = '1.23';

                expect(() => thegamesDbApi.retrieveImages(gameId)).toThrowError(
                    `${gameId} should be an integer number`
                );
            });
        });

        describe('async fails', () => {
            it("should throw error when gameId doesn't exists on database", () => {
                const gameId = '9823749872394872983';

                return thegamesDbApi
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

                return thegamesDbApi
                    .retrieveImages(gameId)
                    .then(() => {
                        throw Error('should not pass by here');
                    })
                    .catch(({ message }) => expect(message).toBe(`Network request failed`));
            });
            it('should fail on non valid API key', () => {
                const gameId = '1';
                thegamesDbApi.apiKey = 'HULIO';

                return thegamesDbApi
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

                return thegamesDbApi.retrieveImages(gameId).then(imagesData => {
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
                expect(() => thegamesDbApi.retrievePlatformList(fields)).toThrowError(
                    `${fields} is not a string`
                );
            });

            it('should throw error on array fields', () => {
                const fields = [1, 2, 3];

                expect(fields.constructor).toBe(Array);
                expect(() => thegamesDbApi.retrievePlatformList(fields)).toThrowError(
                    `${fields} is not a string`
                );
            });

            it('should throw error on object fields', () => {
                const fields = { hello: 'world' };

                expect(fields.constructor).toBe(Object);
                expect(() => thegamesDbApi.retrievePlatformList(fields)).toThrowError(
                    `${fields} is not a string`
                );
            });

            it('should throw error on boolean fields', () => {
                const fields = false;

                expect(typeof fields).toBe('boolean');
                expect(() => thegamesDbApi.retrievePlatformList(fields)).toThrowError(
                    `${fields} is not a string`
                );
            });

            it('should throw error on function fields', () => {
                const fields = () => console.log('hello');

                expect(typeof fields).toBe('function');
                expect(() => thegamesDbApi.retrievePlatformList(fields)).toThrowError(
                    `${fields} is not a string`
                );
            });
        });

        describe('async fails', () => {
            it('should fail on server down', () => {
                const fields = 'icon,console';
                thegamesDbApi.proxy = 'https://skylabcoders.hulioapp.com/proxy?url=';

                return thegamesDbApi
                    .retrievePlatformList(fields)
                    .then(() => {
                        throw Error('should not pass by here');
                    })
                    .catch(({ message }) => expect(message).toBe(`Network request failed`));
            });
            it('should fail on non valid API key', () => {
                const fields = 'icon,console';
                thegamesDbApi.apiKey = 'HULIO';

                return thegamesDbApi
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

                return thegamesDbApi.retrievePlatformList(fields).then(platformList => {
                    expect(platformList).toBeDefined();
                    expect(platformList.data.platforms[1]).toBeDefined();
                    expect(platformList.data.platforms[2].name).toBe('Nintendo GameCube');
                    expect(platformList.data.platforms[3].manufacturer).toBe('Nintendo');
                });
            });

            it('should succeed on empty fields', () => {
                return thegamesDbApi.retrievePlatformList().then(platformList => {
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

                return thegamesDbApi
                    .retrieveGenresList()
                    .then(() => {
                        throw Error('should not pass by here');
                    })
                    .catch(({ message }) => expect(message).toBe(`Network request failed`));
            });
            it('should fail on non valid API key', () => {
                thegamesDbApi.apiKey = 'HULIO';

                return thegamesDbApi
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
                return thegamesDbApi.retrieveGenresList().then(genresList => {
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

                return thegamesDbApi
                    .retrieveDevelopersList()
                    .then(() => {
                        throw Error('should not pass by here');
                    })
                    .catch(({ message }) => expect(message).toBe(`Network request failed`));
            });
            it('should fail on non valid API key', () => {
                thegamesDbApi.apiKey = 'HULIO';

                return thegamesDbApi
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
                return thegamesDbApi.retrieveDevelopersList().then(developersList => {
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

                return thegamesDbApi
                    .retrievePublishersList()
                    .then(() => {
                        throw Error('should not pass by here');
                    })
                    .catch(({ message }) => expect(message).toBe(`Network request failed`));
            });
            it('should fail on non valid API key', () => {
                thegamesDbApi.apiKey = 'HULIO';

                return thegamesDbApi
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
                return thegamesDbApi.retrievePublishersList().then(publishersList => {
                    expect(publishersList).toBeDefined();
                    expect(publishersList.data.publishers).toBeDefined();
                    expect(publishersList.data.publishers[2].name).toBe('Electronic Arts');
                });
            });
        });
    });
});
