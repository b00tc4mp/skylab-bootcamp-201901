require('dotenv').config()
require('isomorphic-fetch')

const expect = require('expect')
const userApi = require('../user-api')
const spotifyApi = require('../spotify-api')
const artistComment = require('../data/artist-comment')
const logic = require('.')

const { env: { SPOTIFY_API_TOKEN } } = process

spotifyApi.token = SPOTIFY_API_TOKEN

describe('logic', () => {
    beforeEach(() => artistComment.removeAll())

    describe('register user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(id => {
                    expect(id).toBeDefined()
                    expect(typeof id).toBe('string')
                })
        )

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(name + ' is not a string'))
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('name cannot be empty'))
        })

        it('should fail on undefined surname', () => {
            const name = 'Manuel'
            const surname = undefined
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on numeric surname', () => {
            const name = 'Manuel'
            const surname = 10
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })


        it('should fail on boolean surname', () => {
            const name = 'Manuel'
            const surname = false
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on object surname', () => {
            const name = 'Manuel'
            const surname = {}
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on array surname', () => {
            const name = 'Manuel'
            const surname = []
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(TypeError(surname + ' is not a string'))
        })

        it('should fail on empty surname', () => {
            const name = 'Manuel'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).toThrow(Error('surname cannot be empty'))
        })
    })

    describe('authenticate user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'

        beforeEach(() =>
            // logic.registerUser(name, surname, email, password, passwordConfirm) // FATAL each test should test ONE unit
            userApi.register(name, surname, email, password)
        )

        it('should succeed on correct credentials', () =>
            logic.authenticateUser(email, password)
                .then(({ id, token }) => {
                    expect(id).toBeDefined()
                    expect(token).toBeDefined()
                })
        )
    })

    describe('retrieve user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        let _id, _token

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.authenticateUser(email, password))
                .then(({ id, token }) => {
                    _id = id
                    _token = token
                })
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUser(_id, _token)
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)
                })
        )
    })

    // TODO updateUser and removeUser

    describe('search artists', () => {
        it('should succeed on mathing query', () => {
            const query = 'madonna'

            return logic.searchArtists(query)
                .then(artists => {
                    expect(artists).toBeDefined()
                    expect(artists instanceof Array).toBeTruthy()
                    expect(artists.length).toBeGreaterThan(0)

                    artists.forEach(({ name }) => expect(name.toLowerCase()).toContain(query))
                })
        })

        it('should fail on empty query', () => {
            const query = ''

            expect(() => logic.searchArtists(query, function (error, artists) { })).toThrowError('query is empty')
        })
    })

    describe('retrieve artist', () => {
        it('should succeed on mathing query', () => {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

            return logic.retrieveArtist(artistId)
                .then(({ id, name }) => {
                    expect(id).toBe(artistId)
                    expect(name).toBe('Madonna')
                })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''

            expect(() => logic.retrieveArtist(artistId)).toThrowError('artistId is empty')
        })
    })

    describe('toggle favorite artist', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna
        let _id, _token

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.authenticateUser(email, password))
                .then(({ id, token }) => {
                    _id = id
                    _token = token
                })
        )

        it('should succeed on correct data', () =>
            logic.toggleFavoriteArtist(_id, _token, artistId)
                .then(() => logic.retrieveUser(_id, _token))
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.favoriteArtists).toBeDefined()
                    expect(user.favoriteArtists.length).toBe(1)
                    expect(user.favoriteArtists[0]).toBe(artistId)

                    return logic.toggleFavoriteArtist(_id, _token, artistId)
                })
                .then(() => logic.retrieveUser(_id, _token))
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.favoriteArtists).toBeDefined()
                    expect(user.favoriteArtists.length).toBe(0)
                })
        )
    })

    describe('add comment to artist', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna
        const text = `comment ${Math.random()}`
        let _id, _token

        beforeEach(() =>
            // FATAL each test should test ONE unit
            // logic.registerUser(name, surname, email, password, passwordConfirm)
            //     .then(() => logic.authenticateUser(email, password))
            userApi.register(name, surname, email, password)
                .then(() => userApi.authenticate(email, password))
                .then(({ id, token }) => {
                    _id = id
                    _token = token
                })
        )

        it('should succeed on correct data', () =>
            logic.addCommentToArtist(_id, _token, artistId, text)
                .then(id => {
                    expect(id).toBeDefined()

                    return artistComment.retrieve(id)
                        .then(_comment => {
                            expect(_comment.id).toBe(id)
                            expect(_comment.userId).toBe(_id)
                            expect(_comment.artistId).toBe(artistId)
                            expect(_comment.text).toBe(text)
                            expect(_comment.date).toBeDefined()
                            expect(_comment.date instanceof Date).toBeTruthy()
                        })
                })
        )
    })

    describe('list comments from artist', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna
        const text = `comment ${Math.random()}`
        const text2 = `comment ${Math.random()}`
        const text3 = `comment ${Math.random()}`
        let comment, comment2, comment3
        let _id, _token

        beforeEach(() =>
            // FATAL each test should test ONE unit
            // logic.registerUser(name, surname, email, password, passwordConfirm)
            //     .then(() => logic.authenticateUser(email, password))
            userApi.register(name, surname, email, password)
                .then(() => userApi.authenticate(email, password))
                .then(({ id, token }) => {
                    _id = id
                    _token = token
                })
                .then(() => artistComment.add(comment = { userId: _id, artistId, text }))
                .then(() => artistComment.add(comment2 = { userId: _id, artistId, text: text2 }))
                .then(() => artistComment.add(comment3 = { userId: _id, artistId, text: text3 }))
        )

        it('should succeed on correct data', () =>
            logic.listCommentsFromArtist(artistId)
                .then(comments => {
                    expect(comments).toBeDefined()
                    expect(comments.length).toBe(3)

                    comments.forEach(({ id, userId, artistId: _artistId, date }) => {
                        expect(id).toBeDefined()
                        expect(userId).toEqual(_id)
                        expect(_artistId).toEqual(artistId)
                        expect(date).toBeDefined()
                        expect(date instanceof Date).toBeTruthy()
                    })

                    expect(comments[0].text).toEqual(text)
                    expect(comments[1].text).toEqual(text2)
                    expect(comments[2].text).toEqual(text3)
                })
        )
    })

    describe('retrieve albums', () => {
        it('should succeed on mathing query', () => {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

            return logic.retrieveAlbums(artistId)
                .then(albums => {
                    expect(albums).toBeDefined()
                    expect(albums instanceof Array).toBeTruthy()
                    expect(albums.length).toBeGreaterThan(0)
                })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''

            expect(() => logic.retrieveAlbums(artistId)).toThrowError('artistId is empty')
        })
    })

    describe('retrieve album', () => {
        it('should succeed on mathing query', () => {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

            return logic.retrieveAlbum(albumId)
                .then(({ id, name }) => {
                    expect(id).toBe(albumId)
                    expect(name).toBe('Rebel Heart Tour (Live)')
                })
        })

        it('should fail on empty albumId', function () {
            const albumId = ''

            expect(() => logic.retrieveAlbum(albumId)).toThrowError('albumId is empty')
        })
    })

    describe('toggle favorite album', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)
        let _id, _token

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.authenticateUser(email, password))
                .then(({ id, token }) => {
                    _id = id
                    _token = token
                })
        )

        it('should succeed on correct data', () =>
            logic.toggleFavoriteAlbum(_id, _token, albumId)
                .then(() => logic.retrieveUser(_id, _token))
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.favoriteAlbums).toBeDefined()
                    expect(user.favoriteAlbums.length).toBe(1)
                    expect(user.favoriteAlbums[0]).toBe(albumId)

                    return logic.toggleFavoriteAlbum(_id, _token, albumId)
                })
                .then(() => logic.retrieveUser(_id, _token))
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.favoriteAlbums).toBeDefined()
                    expect(user.favoriteAlbums.length).toBe(0)
                })
        )
    })

    describe('retrieve tracks', () => {
        it('should succeed on mathing query', () => {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

            return logic.retrieveTracks(albumId)
                .then(tracks => {
                    expect(tracks).toBeDefined()
                    expect(tracks instanceof Array).toBeTruthy()
                    expect(tracks.length).toBeGreaterThan(0)
                })
        })

        it('should fail on empty albumId', function () {
            const albumId = ''

            expect(() => logic.retrieveTracks(albumId)).toThrowError('albumId is empty')
        })
    })

    describe('retrieve track', () => {
        it('should succeed on mathing query', () => {
            const trackId = '5U1tMecqLfOkPDIUK9SVKa' // Rebel Heart Tour Intro - Live
            const trackName = 'Rebel Heart Tour Intro - Live'

            return logic.retrieveTrack(trackId)
                .then(track => {
                    expect(track).toBeDefined()

                    const { id, name } = track

                    expect(id).toBe(trackId)
                    expect(name).toBe(trackName)
                })
        })

        it('should fail on empty trackId', function () {
            const trackId = ''

            expect(() => logic.retrieveTrack(trackId)).toThrowError('trackId is empty')
        })
    })

    describe('toggle favorite track', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        const trackId = '5U1tMecqLfOkPDIUK9SVKa' // Rebel Heart Tour Intro - Live)
        let _id, _token

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.authenticateUser(email, password))
                .then(({ id, token }) => {
                    _id = id
                    _token = token
                })
        )

        it('should succeed on correct data', () =>
            logic.toggleFavoriteTrack(_id, _token, trackId)
                .then(() => logic.retrieveUser(_id, _token))
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.favoriteTracks).toBeDefined()
                    expect(user.favoriteTracks.length).toBe(1)
                    expect(user.favoriteTracks[0]).toBe(trackId)

                    return logic.toggleFavoriteTrack(_id, _token, trackId)
                })
                .then(() => logic.retrieveUser(_id, _token))
                .then(user => {
                    expect(user.id).toBe(_id)
                    expect(user.name).toBe(name)
                    expect(user.surname).toBe(surname)
                    expect(user.email).toBe(email)

                    expect(user.favoriteTracks).toBeDefined()
                    expect(user.favoriteTracks.length).toBe(0)
                })
        )
    })

    after(() => artistComment.removeAll())
})