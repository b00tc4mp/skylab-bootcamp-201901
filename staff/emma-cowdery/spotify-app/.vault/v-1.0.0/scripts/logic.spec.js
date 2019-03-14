spotifyApi.token = 'BQDXM1L6ObLDsL1cOyjtD9etO5-Mo0r1x7mmvH1jSuqf3VIKkBiVIEh1IIg7CPMcSWErEYfWjrKc1ke6WXbCPb3_Lf6dmI_N_MAk_jLGu9jmndslS-2qOzjzmL13_09ExnH1AdGK2Q0u'

describe('logic', function() {
    describe('search artist', function() {
        interface('should succeed on amtching query', function(done) {
            const query = 'madonna'

            logic.searchArtists(query, function(error, artist) {
                expect(error).toBeUndefined()

                expect(artist).toBeUndefined()

                expect(artist instanceof Array).toBeTruty()

                expect(artist.length).toBeGreaterThan(0)

                artist.forEach(( { name }) => expect(name.toLowerCase()).toContain(query))

                done()
            })
        })

        it('should fain on empty query', function() {
            const query = ''

            expect(() => logic.searchArtists(query, function(error, artist) {})).toTrowError('query is empty')
        })
    })
})