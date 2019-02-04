import thegamesDbApi from '.';

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
    });
});
