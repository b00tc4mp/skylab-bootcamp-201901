'use strict'

import musicApi from '.'

jest.setTimeout(10000)

describe('music api', () => {
    describe('register user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        it('should succeed on correct data', () =>
            musicApi.registerUser(name, surname, email, password, password)
                .then(id => expect(id).toBeDefined())
        )

        it('should fail on already existing user', () =>
            musicApi.registerUser(name, surname, email, password, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with email ${email} already exists`)
                })
        )

        it('should fail on non-matching password and its confirmation', () =>
            musicApi.registerUser(name, surname, email, password, `non-matching ${password}`)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe('passwords do not match')
                })
        )

        // TODO more unit test cases
    })

    describe('authenticate user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        let _id

        beforeEach(() =>
            musicApi.registerUser(name, surname, email, password, password)
                .then(id => _id = id)
        )

        it('should succeed on correct data', () =>
            musicApi.authenticateUser(email, password)
                .then(({ id, token }) => {
                    expect(id).toBe(_id)
                    expect(token).toBeDefined()
                })
        )

        // TODO more unit test cases
    })

    describe('retrieve user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        let _id, _token

        beforeEach(() =>
            musicApi.registerUser(name, surname, email, password, password)
                .then(id => _id = id)
                .then(() => musicApi.authenticateUser(email, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () =>
            musicApi.retrieveUser(_id, _token)
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        )

        // TODO more unit test cases
    })


    // TODO build endpoint for this in API first! (it does not exist yet)
    false && describe('update user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        let _id, _token

        beforeEach(() =>
            musicApi.registerUser(name, surname, email, password, password)
                .then(id => _id = id)
                .then(() => musicApi.authenticateUser(email, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            return musicApi.updateUser(_id, _token, data)
                .then(() => musicApi.retrieveUser(_id, _token))
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(data.name)
                    expect(user.surname).toBe(data.surname)
                    expect(user.age).toBe(data.age)
                    expect(user.email).toBe(email)
                })
        })

        // TODO more unit test cases
    })

    // TODO build endpoint for this in API first! (it does not exist yet)
    false && describe('remove user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        let _id, _token

        beforeEach(() =>
            musicApi.registerUser(name, surname, email, password, passwordConfirm)
                .then(id => _id = id)
                .then(() => musicApi.authenticateUser(email, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () => {
            return musicApi.remove(_id, _token, email, password, passwordConfirm)
                .then(() => musicApi.retrieveUser(_id, _token))
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({ message }) => expect(message).toBe(`user with id \"${_id}\" does not exist`))
        })

        // TODO more unit test cases
    })

    describe('search artists', () => {
        it('should succeed on mathing query', () => {
            const query = 'madonna'

            return musicApi.searchArtists(query)
                .then(artists => {
                    expect(artists).toBeDefined()
                    expect(artists instanceof Array).toBeTruthy()
                    expect(artists.length).toBeGreaterThan(0)

                    artists.forEach(({ name }) => expect(name.toLowerCase()).toContain(query))
                })
        })

        it('should fail on empty query', () => {
            const query = ''

            expect(() => musicApi.searchArtists(query)).toThrowError('query is empty')
        })
    })

    // TODO build endpoint for this in API first! (it does not exist yet)
    false && describe('retrieve artist', () => {
        it('should succeed on mathing query', () => {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

            return musicApi.retrieveArtist(artistId)
                .then(({ id, name }) => {
                    expect(id).toBe(artistId)
                    expect(name).toBe('Madonna')
                })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''

            expect(() => musicApi.retrieveArtist(artistId)).toThrowError('artistId is empty')
        })
    })

    describe('add comment to artist', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        let _id, _token

        const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna
        const text = `text ${Math.random()}`

        beforeEach(() =>
            musicApi.registerUser(name, surname, email, password, password)
                .then(id => _id = id)
                .then(() => musicApi.authenticateUser(email, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on mathing query', () =>
            musicApi.addCommentToArtist(_id, _token, artistId, text)
                .then(({ id }) => {
                    expect(id).toBeDefined()
                    expect(typeof id === 'string').toBeTruthy()
                })
        )
    })

    // TODO build endpoint for this in API first! (it does not exist yet)
    false && describe('retrieve albums', () => {
        it('should succeed on mathing query', () => {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

            return musicApi.retrieveAlbums(artistId)
                .then(albums => {
                    expect(albums).toBeDefined()
                    expect(albums instanceof Array).toBeTruthy()
                    expect(albums.length).toBeGreaterThan(0)
                })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''

            expect(() => musicApi.retrieveAlbums(artistId)).toThrowError('artistId is empty')
        })
    })

    // TODO build endpoint for this in API first! (it does not exist yet)
    false && describe('retrieve album', () => {
        it('should succeed on mathing query', () => {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

            return musicApi.retrieveAlbum(albumId)
                .then(({ id, name }) => {
                    expect(id).toBe(albumId)
                    expect(name).toBe('Rebel Heart Tour (Live)')
                })
        })

        it('should fail on empty albumId', function () {
            const albumId = ''

            expect(() => musicApi.retrieveAlbum(albumId)).toThrowError('albumId is empty')
        })
    })

    // TODO build endpoint for this in API first! (it does not exist yet)
    false && describe('retrieve tracks', () => {
        it('should succeed on mathing query', () => {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

            return musicApi.retrieveTracks(albumId)
                .then(tracks => {
                    expect(tracks).toBeDefined()
                    expect(tracks instanceof Array).toBeTruthy()
                    expect(tracks.length).toBeGreaterThan(0)
                })
        })

        it('should fail on empty albumId', function () {
            const albumId = ''

            expect(() => musicApi.retrieveTracks(albumId)).toThrowError('albumId is empty')
        })
    })

    // TODO build endpoint for this in API first! (it does not exist yet)
    false && describe('retrieve track', () => {
        it('should succeed on mathing query', () => {
            const trackId = '5U1tMecqLfOkPDIUK9SVKa' // Rebel Heart Tour Intro - Live
            const trackName = 'Rebel Heart Tour Intro - Live'

            return musicApi.retrieveTrack(trackId)
                .then(track => {
                    expect(track).toBeDefined()

                    const { id, name } = track

                    expect(id).toBe(trackId)
                    expect(name).toBe(trackName)
                })
        })

        it('should fail on empty trackId', function () {
            const trackId = ''

            expect(() => musicApi.retrieveTrack(trackId)).toThrowError('trackId is empty')
        })
    })
})