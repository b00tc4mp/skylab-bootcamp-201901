'use strict'

const { expect } = require('chai')
const spotifyApi = require('.')

const { env: { SPOTIFY_API_TOKEN } } = process

// spotifyApi.token = SPOTIFY_API_TOKEN

describe('spotify api', () => {
    describe('search artists', () => {
        it('should succeed on mathing query', () => {
            const query = 'madonna'

            return spotifyApi.searchArtists(query)
                .then(artists => {
                    expect(artists).to.exist
                    expect(artists instanceof Array).to.be.true
                    expect(artists.length).to.be.at.least(0)

                    artists.forEach(({ name }) => expect(name.toLowerCase()).to.contain(query))
                })
        })

        it('should fail on empty query', () => {
            const query = ''

            expect(() => spotifyApi.searchArtists(query)).to.throw(Error, 'query is empty')
        })
    })

    describe('retrieve artist', () => {
        it('should succeed on mathing query', () => {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

            return spotifyApi.retrieveArtist(artistId)
                .then(({id, name}) => {
                    expect(id).to.equal(artistId)
                    expect(name).to.equal('Madonna')
                })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''

            expect(() => spotifyApi.retrieveArtist(artistId)).to.throw(Error, 'artistId is empty')
        })
    })

    describe('retrieve albums', () => {
        it('should succeed on mathing query', () => {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

            return spotifyApi.retrieveAlbums(artistId)
                .then(albums => {
                    expect(albums).to.exist
                    expect(albums instanceof Array).to.be.true
                    expect(albums.length).to.be.at.least(0)
                })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''

            expect(() => spotifyApi.retrieveAlbums(artistId)).to.throw(Error, 'artistId is empty')
        })
    })

    describe('retrieve album', () => {
        it('should succeed on mathing query', () => {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

            return spotifyApi.retrieveAlbum(albumId)
                .then(({id, name}) => {
                    expect(id).to.equal(albumId)
                    expect(name).to.equal('Rebel Heart Tour (Live)')
                })
        })

        it('should fail on empty albumId', function () {
            const albumId = ''

            expect(() => spotifyApi.retrieveAlbum(albumId)).to.throw(Error, 'albumId is empty')
        })
    })

    describe('retrieve tracks', () => {
        it('should succeed on mathing query', () => {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

            return spotifyApi.retrieveTracks(albumId)
                .then(tracks => {
                    expect(tracks).to.exist
                    expect(tracks instanceof Array).to.be.true
                    expect(tracks.length).to.be.at.least(0)
                })
        })

        it('should fail on empty albumId', function () {
            const albumId = ''

            expect(() => spotifyApi.retrieveTracks(albumId)).to.throw(Error, 'albumId is empty')
        })
    })

    describe('retrieve track', () => {
        it('should succeed on mathing query', () => {
            const trackId = '5U1tMecqLfOkPDIUK9SVKa' // Rebel Heart Tour Intro - Live
            const trackName = 'Rebel Heart Tour Intro - Live'

            return spotifyApi.retrieveTrack(trackId)
                .then(track => {
                    expect(track).to.exist

                    const { id, name } = track

                    expect(id).to.equal(trackId)
                    expect(name).to.equal(trackName)
                })
        })

        it('should fail on empty trackId', function () {
            const trackId = ''

            expect(() => spotifyApi.retrieveTrack(trackId)).to.throw(Error, 'trackId is empty')
        })
    })
})