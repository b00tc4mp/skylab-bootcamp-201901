'use strict'

require('dotenv').config()

// import cleanUpApi from './'
const cleanUpApi = require('./api')

const { mongoose, models: { User, Comment } } = require('cleanup-data')
import bcrypt from 'bcrypt'

jest.setTimeout(10000)

const { env: { TEST_DB_URL } } = process

describe('music api', () => {
    beforeAll(() => mongoose.connect(TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            Comment.deleteMany(),
            User.deleteMany()
        ])
    )

    describe('register user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`
        const passwordConfirmation = password

        it('should succeed on valid data', async () => {
            const id = await cleanUpApi.registerUser(name, surname, email, password, passwordConfirmation)


            expect(id).toBeDefined()
            expect(typeof id).toBe('string')

            const user = await User.findOne({ email })

            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on already existing user', async () => {
            await User.create({ name, surname, email, password })

            await cleanUpApi.registerUser(name, surname, email, password, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with email ${email} already exists`)
                })
        })

        it('should fail on non-matching password and its confirmation', () =>
            cleanUpApi.registerUser(name, surname, email, password, `non-matching ${password}`)
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

        beforeEach(() =>
            cleanUpApi.registerUser(name, surname, email, password, password)
        )

        it('should succeed on correct data', () =>
            cleanUpApi.authenticateUser(email, password)
                .then(token => expect(token).toBeDefined())
        )

        // TODO more unit test cases
    })

    describe('retrieve user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        let userId, token

        beforeEach(() =>
            cleanUpApi.registerUser(name, surname, email, password, password)
                .then(id => userId = id)
                .then(() => cleanUpApi.authenticateUser(email, password))
                .then(_token => token = _token)
        )

        it('should succeed on correct data', () =>
            cleanUpApi.retrieveUser(token)
                .then(user => {
                    expect(user.id).toBe(userId)
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

        let userId, token

        beforeEach(() =>
            cleanUpApi.registerUser(name, surname, email, password, password)
                .then(id => userId = id)
                .then(() => cleanUpApi.authenticateUser(email, password))
                .then(_token => token = _token)
        )

        it('should succeed on correct data', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            return cleanUpApi.updateUser(token, data)
                .then(() => cleanUpApi.retrieveUser(token))
                .then(user => {
                    expect(user.id).toBe(userId)
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

        let userId, token

        beforeEach(() =>
            cleanUpApi.registerUser(name, surname, email, password, passwordConfirmation)
                .then(id => userId = id)
                .then(() => cleanUpApi.authenticateUser(email, password))
                .then(_token => token = _token)
        )

        it('should succeed on correct data', () => {
            return cleanUpApi.remove(token, email, password, passwordConfirmation)
                .then(() => cleanUpApi.retrieveUser(token))
                .then(() => {
                    throw Error('should not pass by here')
                })
                .catch(({ message }) => expect(message).toBe(`user with id \"${userId}\" does not exist`))
        })

        // TODO more unit test cases
    })

    describe('search artists', () => {
        it('should succeed on mathing query', () => {
            const query = 'madonna'

            return cleanUpApi.searchArtists(query)
                .then(artists => {
                    expect(artists).toBeDefined()
                    expect(artists instanceof Array).toBeTruthy()
                    expect(artists.length).toBeGreaterThan(0)

                    artists.forEach(({ name }) => expect(name.toLowerCase()).toContain(query))
                })
        })

        it('should fail on empty query', () => {
            const query = ''

            expect(() => cleanUpApi.searchArtists(query)).toThrowError('query is empty')
        })
    })

    // TODO build endpoint for this in API first! (it does not exist yet)
    false && describe('retrieve artist', () => {
        it('should succeed on mathing query', () => {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

            return cleanUpApi.retrieveArtist(artistId)
                .then(({ id, name }) => {
                    expect(id).toBe(artistId)
                    expect(name).toBe('Madonna')
                })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''

            expect(() => cleanUpApi.retrieveArtist(artistId)).toThrowError('artistId is empty')
        })
    })

    false && describe('add comment to artist', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        let userId, token

        const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna
        const text = `text ${Math.random()}`

        beforeEach(() =>
            cleanUpApi.registerUser(name, surname, email, password, password)
                .then(id => userId = id)
                .then(() => cleanUpApi.authenticateUser(email, password))
                .then(_token => token = _token)
        )

        it('should succeed on mathing query', () => {
            return cleanUpApi.addCommentToArtist(token, artistId, text)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id === 'string').toBeTruthy()
                })
        })
    })

    false && describe('list comments from artist', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi-${Math.random()}@mail.com`
        const password = `password-${Math.random()}`

        let userId, token

        const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna
        const text = `text ${Math.random()}`

        let commendId

        beforeEach(() =>
            cleanUpApi.registerUser(name, surname, email, password, password)
                .then(id => userId = id)
                .then(() => cleanUpApi.authenticateUser(email, password))
                .then(_token => token = _token)
                .then(() => cleanUpApi.addCommentToArtist(token, artistId, text))
                .then(id => commendId = id)
        )

        it('should succeed on mathing query', () =>
            cleanUpApi.listCommentsFromArtist(token, artistId)
                .then(comments => {
                    expect(comments.length).toBeGreaterThan(0)

                    const comment = comments.find(({ id }) => id === commendId)

                    expect(comment.id).toBe(commendId)
                    expect(comment.userId).toBe(userId)
                    expect(comment.artistId).toBe(artistId)
                    expect(comment.text).toBe(text)
                    expect(comment.date).toBeDefined()
                    expect(comment.date instanceof Date).toBeTruthy()
                })
        )
    })

    // TODO build endpoint for this in API first! (it does not exist yet)
    false && describe('retrieve albums', () => {
        it('should succeed on mathing query', () => {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

            return cleanUpApi.retrieveAlbums(artistId)
                .then(albums => {
                    expect(albums).toBeDefined()
                    expect(albums instanceof Array).toBeTruthy()
                    expect(albums.length).toBeGreaterThan(0)
                })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''

            expect(() => cleanUpApi.retrieveAlbums(artistId)).toThrowError('artistId is empty')
        })
    })

    // TODO build endpoint for this in API first! (it does not exist yet)
    false && describe('retrieve album', () => {
        it('should succeed on mathing query', () => {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

            return cleanUpApi.retrieveAlbum(albumId)
                .then(({ id, name }) => {
                    expect(id).toBe(albumId)
                    expect(name).toBe('Rebel Heart Tour (Live)')
                })
        })

        it('should fail on empty albumId', function () {
            const albumId = ''

            expect(() => cleanUpApi.retrieveAlbum(albumId)).toThrowError('albumId is empty')
        })
    })

    // TODO build endpoint for this in API first! (it does not exist yet)
    false && describe('retrieve tracks', () => {
        it('should succeed on mathing query', () => {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

            return cleanUpApi.retrieveTracks(albumId)
                .then(tracks => {
                    expect(tracks).toBeDefined()
                    expect(tracks instanceof Array).toBeTruthy()
                    expect(tracks.length).toBeGreaterThan(0)
                })
        })

        it('should fail on empty albumId', function () {
            const albumId = ''

            expect(() => cleanUpApi.retrieveTracks(albumId)).toThrowError('albumId is empty')
        })
    })

    // TODO build endpoint for this in API first! (it does not exist yet)
    false && describe('retrieve track', () => {
        it('should succeed on mathing query', () => {
            const trackId = '5U1tMecqLfOkPDIUK9SVKa' // Rebel Heart Tour Intro - Live
            const trackName = 'Rebel Heart Tour Intro - Live'

            return cleanUpApi.retrieveTrack(trackId)
                .then(track => {
                    expect(track).toBeDefined()

                    const { id, name } = track

                    expect(id).toBe(trackId)
                    expect(name).toBe(trackName)
                })
        })

        it('should fail on empty trackId', function () {
            const trackId = ''

            expect(() => cleanUpApi.retrieveTrack(trackId)).toThrowError('trackId is empty')
        })
    })

    afterAll(() =>
        Promise.all([
            Comment.deleteMany(),
            User.deleteMany()
        ])
            .then(() => mongoose.disconnect())
    )
})