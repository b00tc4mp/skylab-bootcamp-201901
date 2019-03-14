'use strict'

import spotifyApi from '.'

const { env: { REACT_APP_SPOTIFY_API_TOKEN } } = process

spotifyApi.token = REACT_APP_SPOTIFY_API_TOKEN

describe('spotify api', () => {
    describe('search artists', () => {
        it('should succeed on mathing query', () => {
            const query = 'madonna'

            return spotifyApi.searchArtists(query)
                .then(artists => {
                    expect(artists).toBeDefined()
                    expect(artists instanceof Array).toBeTruthy()
                    expect(artists.length).toBeGreaterThan(0)

                    artists.forEach(({ name }) => expect(name.toLowerCase()).toContain(query))
                })
        })

        it('should fail on empty query', () => {
            const query = ''

            expect(() => spotifyApi.searchArtists(query)).toThrowError('query is empty')
        })
    })

    describe('retrieve albums', () => {
        it('should succeed on mathing query', () => {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

            return spotifyApi.retrieveAlbums(artistId)
                .then(albums => {
                    expect(albums).toBeDefined()
                    expect(albums instanceof Array).toBeTruthy()
                    expect(albums.length).toBeGreaterThan(0)
                })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''

            expect(() => spotifyApi.retrieveAlbums(artistId)).toThrowError('artistId is empty')
        })
    })

    describe('retrieve tracks', () => {
        it('should succeed on mathing query', () => {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

            return spotifyApi.retrieveTracks(albumId)
                .then(tracks => {
                    expect(tracks).toBeDefined()
                    expect(tracks instanceof Array).toBeTruthy()
                    expect(tracks.length).toBeGreaterThan(0)
                })
        })

        it('should fail on empty albumId', function () {
            const albumId = ''

            expect(() => spotifyApi.retrieveTracks(albumId)).toThrowError('albumId is empty')
        })
    })

    describe('retrieve track', () => {
        it('should succeed on mathing query', () => {
            const trackId = '5U1tMecqLfOkPDIUK9SVKa' // Rebel Heart Tour Intro - Live
            const trackName = 'Rebel Heart Tour Intro - Live'

            return spotifyApi.retrieveTrack(trackId)
                .then(track => {
                    expect(track).toBeDefined()

                    const { id, name } = track

                    expect(id).toBe(trackId)
                    expect(name).toBe(trackName)
                })
        })

        it('should fail on empty trackId', function () {
            const trackId = ''

            expect(() => spotifyApi.retrieveTrack(trackId)).toThrowError('trackId is empty')
        })
    })
})