spotifyApi.token = 'BBQDWQ8CrNoWiITvV_KbCfZ2_Xv_SK0iE_tvl_vZZvowRnTy85lJJFmjz-ucccsbiB4Gwb5C__yM2F1VJiCgepODMeRCbqZFZXcZ3EVKzl5kMC02KwzohLp4VBdFZXVUADiBQvtcmD2f3bA'

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