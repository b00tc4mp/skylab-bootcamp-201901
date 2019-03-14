spotifyApi.token = 'BQCnSDHCsm8GsQi_5Lc0XxKxjyDBHtSio2F-ss14hsU0XAf9KBdxQSjmcfc3qRWr7cwj7PcGVhMdsQNzPvdo3KnCAFO-511UHl77w6cK3aUOrOflnTB1d25RN5exwyTz9REo-Vj10eYn_NM'

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
})