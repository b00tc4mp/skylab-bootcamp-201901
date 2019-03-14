'use strict'
const { expect } = require('chai')
const Logic = require('.')



describe('Logic', () => {
    describe('register user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        const logic = new Logic

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(result => expect(result).not.to.exist)
        )

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, name + ' is not a string')
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, name + ' is not a string')
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, name + ' is not a string')
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, name + ' is not a string')
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, name + ' is not a string')
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(Error, 'name cannot be empty')
        })

        it('should fail on undefined surname', () => {
            const name = 'Manuel'
            const surname = undefined
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, surname + ' is not a string')
        })

        it('should fail on numeric surname', () => {
            const name = 'Manuel'
            const surname = 10
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, surname + ' is not a string')
        })


        it('should fail on boolean surname', () => {
            const name = 'Manuel'
            const surname = false
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, surname + ' is not a string')
        })

        it('should fail on object surname', () => {
            const name = 'Manuel'
            const surname = {}
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, surname + ' is not a string')
        })

        it('should fail on array surname', () => {
            const name = 'Manuel'
            const surname = []
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, surname + ' is not a string')
        })

        it('should fail on empty surname', () => {
            const name = 'Manuel'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(Error, 'surname cannot be empty')
        })
    })

    describe('log in user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        const logic = new Logic

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
        )

        it('should succeed on correct credentials', () =>
            logic.logInUser(email, password)
                .then(() => {
                    expect(logic.__storage__.userId).to.exist
                    expect(logic.__storage__.userApiToken).to.exist
                })
        )
    })

    describe('check user is logged in', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        const logic = new Logic

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
        )

        it('should succeed on correct credentials', () =>
            logic.logInUser(email, password)
                .then(() => expect(logic.isUserLoggedIn).to.be.true)
        )
    })

    describe('log out user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        const logic = new Logic

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.logInUser(email, password))
        )

        it('should succeed on correct credentials', () => {
            logic.logOutUser()

            expect(logic.__storage__.userId).to.be.null
            expect(logic.__storage__.userId).to.be.null
        })
    })

    describe('retrieve user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        const logic = new Logic

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.logInUser(email, password))
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUser()
                .then(user => {
                    expect(user.id).to.equal(logic.__storage__.userId)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                })
        )
    })

    describe('search artists', () => {
        it('should succeed on mathing query', () => {
            const query = 'madonna'
            const logic = new Logic

            return logic.searchArtists(query)
                .then(artists => {
                    expect(artists).to.exist
                    expect(artists instanceof Array).to.be.true
                    expect(artists.length).to.be.above(0)

                    artists.forEach(({ name }) => expect(name.toLowerCase()).to.contain(query))
                })
        })

        it('should fail on empty query', () => {
            const query = ''
            const logic = new Logic

            expect(() => logic.searchArtists(query, function (error, artists) { })).to.throw(Error, 'query is empty')
        })
    })

    describe('retrieve artist', () => {
        it('should succeed on mathing query', () => {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna
            const logic = new Logic

            return logic.retrieveArtist(artistId)
                .then(({ id, name }) => {
                    expect(id).to.equal(artistId)
                    expect(name).to.equal('Madonna')
                })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''
            const logic = new Logic

            expect(() => logic.retrieveArtist(artistId)).to.throw(Error, 'artistId is empty')
        })
    })

    describe('retrieve albums', () => {
        it('should succeed on mathing query', () => {
            const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna
            const logic = new Logic

            return logic.retrieveAlbums(artistId)
                .then(albums => {
                    expect(albums).to.exist
                    expect(albums instanceof Array).to.be.true
                    expect(albums.length).to.be.above(0)
                })
        })

        it('should fail on empty artistId', function () {
            const artistId = ''
            const logic = new Logic

            expect(() => logic.retrieveAlbums(artistId)).to.throw(Error, 'artistId is empty')
        })
    })

    describe('retrieve album', () => {
        it('should succeed on mathing query', () => {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)
            const logic = new Logic

            return logic.retrieveAlbum(albumId)
                .then(({ id, name }) => {
                    expect(id).to.equal(albumId)
                    expect(name).to.equal('Rebel Heart Tour (Live)')
                })
        })

        it('should fail on empty albumId', function () {
            const albumId = ''
            const logic = new Logic

            expect(() => logic.retrieveAlbum(albumId)).to.throw(Error, 'albumId is empty')
        })
    })

    describe('retrieve tracks', () => {
        it('should succeed on mathing query', () => {
            const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)
            const logic = new Logic

            return logic.retrieveTracks(albumId)
                .then(tracks => {
                    expect(tracks).to.exist
                    expect(tracks instanceof Array).to.be.true
                    expect(tracks.length).to.be.above(0)
                })
        })

        it('should fail on empty albumId', function () {
            const albumId = ''
            const logic = new Logic

            expect(() => logic.retrieveTracks(albumId)).to.throw(Error, 'albumId is empty')
        })
    })

    describe('retrieve track', () => {
        it('should succeed on mathing query', () => {
            const trackId = '5U1tMecqLfOkPDIUK9SVKa' // Rebel Heart Tour Intro - Live
            const trackName = 'Rebel Heart Tour Intro - Live'
            const logic = new Logic

            return logic.retrieveTrack(trackId)
                .then(track => {
                    expect(track).to.exist

                    const { id, name } = track

                    expect(id).to.equal(trackId)
                    expect(name).to.equal(trackName)
                })
        })

        it('should fail on empty trackId', function () {
            const trackId = ''
            const logic = new Logic

            expect(() => logic.retrieveTrack(trackId)).to.throw(Error, 'trackId is empty')
        })
    })

    // TODO updateUser and removeUser
})