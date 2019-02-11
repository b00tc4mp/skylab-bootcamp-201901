spotifyApi.token = 'BQAAfxdJnGEYu9ESZA_nivigiJFKl8tWlvnwGIuSerQVivv6Bp5oE6eHk_dJznLB_opOKE6yA74sGj-ZzIk9EC1_ZyX7cVX1jy6wN36UuR96zWkAIhGeM2ho5MGZt7ZcGtgMXqhnZz8pAw'

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
    });

    describe('search album', function () {
        it('should succeed on mathing query', function (done) {
            const id = '6tbjWDEIzxoDsBA1FuhfPW';

            logic.retrieveAlbums(id, function (error, albums) {
                expect(error).toBeUndefined()

                expect(albums).toBeDefined()
                expect(albums instanceof Array).toBeTruthy()
                expect(albums.length).toBeGreaterThan(0)

                done()
            })
        })

        it('should fail on empty query', function () {
            const id = ''

            expect(() => logic.retrieveAlbums(id, function (error, albums) { })).toThrowError('artistId is empty')
        })
    });

    describe('search tracks', function () {
        it('should succeed on mathing query', function (done) {
            const id = '4hBA7VgOSxsWOf2N9dJv2X';

            logic.retrieveTracks(id, function (error, tracks) {
                expect(error).toBeUndefined()

                expect(tracks).toBeDefined()
                expect(tracks instanceof Array).toBeTruthy()
                expect(tracks.length).toBeGreaterThan(0)

                done()
            })
        })

        it('should fail on empty query', function () {
            const id = ''

            expect(() => logic.retrieveTracks(id, function (error, tracks) { })).toThrowError('albumId is empty')
        })
    });
})