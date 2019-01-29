/**
 * logic.spec.js for Spotify App
 * 
 * Testing logic.js with Jasmine
 * 
 */

describe('logic', function () {

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
})