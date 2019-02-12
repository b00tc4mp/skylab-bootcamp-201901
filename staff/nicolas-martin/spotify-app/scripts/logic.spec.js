spotifyApi.token = 'BQCTyAGZfqgxMwk6KxwUlr7JKI6rlHAROEy8x96DsOShqfcLMfxzl57jQZbhj7MFF3JGgPVHlM_Rodd62hScf1K5X3Z2sN4mFjAqmMGX7TNKRPOF7Qz4MeZwzih9DrdR2w2Eki3xtjxHOA'

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