'use strict'
import spotifyApi from './index.js'

const { env: { REACT_APP_SPOTIFY_API_TOKEN }} = process 

spotifyApi.token = REACT_APP_SPOTIFY_API_TOKEN 

/**
 * spotifyApi testing
 */

 describe('spotify api' , () => {

    const query = 'metallica'

    /* searchArtists method */

    describe('search artists', () => {

        it('should return artists on correct query', () => {
            return spotifyApi.searchArtists(query)
                .then(results => {
                    expect(results).toBeDefined()
                    expect(results[0].name).toEqual('Metallica')
                })
                .catch(error => expect(error).toBeUndefined())
        })

        it('should return error on empty query', () => {
            try {
                return spotifyApi.searchArtists('')
            } catch (error) {
                expect(error).toBeDefined()
                expect(error.message).toBe('query is empty')
            }
        })
    })

    /* retrieveAlbums method */

    const artistId='ye2Wgw4gimLv2eAKyk1NB'

    describe('retrieve Albums', () => {

        it('retrieves the albums matching the artist', () => {
            return spotifyApi.retrieveAlbums('ye2Wgw4gimLv2eAKyk1NB')
                .then(results => {
                    // expect(results).toBeDefined()
                    expect(results instanceof Array).toBeTruthy()
                })
        })


    })




 })