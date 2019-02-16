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

    // TODO updateUser and removeUser
})

// const logic = require('../logic/index')
// const spotifyApi = require('../spotify_Api/spotify-api')

// const { env: { REACT_APP_SPOTIFY_API_TOKEN } } = process

// spotifyApi.token = REACT_APP_SPOTIFY_API_TOKEN

// describe('logic', () => {
//     describe('register user', () => {
//         const name = 'Manuel'
//         const surname = 'Barzi'
//         const email = `manuelbarzi@mail.com-${Math.random()}`
//         const password = '123'
//         const passwordConfirm = password

//         it('should succeed on valid data', () =>
//             logic.registerUser(name, surname, email, password, passwordConfirm) 
//                 .then(result => expect(result).toBeUndefined())
//         )

//         it('should fail on undefined name', () => {
//             const name = undefined
//             const surname = 'Barzi'
//             const email = 'manuelbarzi@mail.com'
//             const password = '123'

//             expect(() => {
//                 logic.registerUser(name, surname, email, password, password)
//             }).toThrow(TypeError(name + ' is not a string'))
//         })

//         it('should fail on numeric name', () => {
//             const name = 10
//             const surname = 'Barzi'
//             const email = 'manuelbarzi@mail.com'
//             const password = '123'

//             expect(() => {
//                 logic.registerUser(name, surname, email, password, password)
//             }).toThrow(TypeError(name + ' is not a string'))
//         })


//         it('should fail on boolean name', () => {
//             const name = true
//             const surname = 'Barzi'
//             const email = 'manuelbarzi@mail.com'
//             const password = '123'

//             expect(() => {
//                 logic.registerUser(name, surname, email, password, password)
//             }).toThrow(TypeError(name + ' is not a string'))
//         })

//         it('should fail on object name', () => {
//             const name = {}
//             const surname = 'Barzi'
//             const email = 'manuelbarzi@mail.com'
//             const password = '123'

//             expect(() => {
//                 logic.registerUser(name, surname, email, password, password)
//             }).toThrow(TypeError(name + ' is not a string'))
//         })

//         it('should fail on array name', () => {
//             const name = []
//             const surname = 'Barzi'
//             const email = 'manuelbarzi@mail.com'
//             const password = '123'

//             expect(() => {
//                 logic.registerUser(name, surname, email, password, password)
//             }).toThrow(TypeError(name + ' is not a string'))
//         })

//         it('should fail on empty name', () => {
//             const name = ''
//             const surname = 'Barzi'
//             const email = 'manuelbarzi@mail.com'
//             const password = '123'

//             expect(() => {
//                 logic.registerUser(name, surname, email, password, password)
//             }).toThrow(Error('name cannot be empty'))
//         })

//         it('should fail on undefined surname', () => {
//             const name = 'Manuel'
//             const surname = undefined
//             const email = 'manuelbarzi@mail.com'
//             const password = '123'

//             expect(() => {
//                 logic.registerUser(name, surname, email, password, password)
//             }).toThrow(TypeError(surname + ' is not a string'))
//         })

//         it('should fail on numeric surname', () => {
//             const name = 'Manuel'
//             const surname = 10
//             const email = 'manuelbarzi@mail.com'
//             const password = '123'

//             expect(() => {
//                 logic.registerUser(name, surname, email, password, password)
//             }).toThrow(TypeError(surname + ' is not a string'))
//         })


//         it('should fail on boolean surname', () => {
//             const name = 'Manuel'
//             const surname = false
//             const email = 'manuelbarzi@mail.com'
//             const password = '123'

//             expect(() => {
//                 logic.registerUser(name, surname, email, password, password)
//             }).toThrow(TypeError(surname + ' is not a string'))
//         })

//         it('should fail on object surname', () => {
//             const name = 'Manuel'
//             const surname = {}
//             const email = 'manuelbarzi@mail.com'
//             const password = '123'

//             expect(() => {
//                 logic.registerUser(name, surname, email, password, password)
//             }).toThrow(TypeError(surname + ' is not a string'))
//         })

//         it('should fail on array surname', () => {
//             const name = 'Manuel'
//             const surname = []
//             const email = 'manuelbarzi@mail.com'
//             const password = '123'

//             expect(() => {
//                 logic.registerUser(name, surname, email, password, password)
//             }).toThrow(TypeError(surname + ' is not a string'))
//         })

//         it('should fail on empty surname', () => {
//             const name = 'Manuel'
//             const surname = ''
//             const email = 'manuelbarzi@mail.com'
//             const password = '123'

//             expect(() => {
//                 logic.registerUser(name, surname, email, password, password)
//             }).toThrow(Error('surname cannot be empty'))
//         })
//     })

//     describe('login user', () => {
//         const name = 'Manuel'
//         const surname = 'Barzi'
//         const email = `manuelbarzi@mail.com-${Math.random()}`
//         const password = '123'
//         const passwordConfirm = password

//         beforeEach(() => 
//             logic.registerUser(name, surname, email, password, passwordConfirm)
//         )

//         it('should succeed on correct credentials', () => 
//             logic.loginUser(email, password)
//                 .then(() => {
//                     expect(logic.__userId__).toBeDefined()
//                     expect(logic.__userApiToken__).toBeDefined()
//                 })
//         )
//     })

//     describe('retrieve user', () => {
//         const name = 'Manuel'
//         const surname = 'Barzi'
//         const email = `manuelbarzi@mail.com-${Math.random()}`
//         const password = '123'
//         const passwordConfirm = password

//         beforeEach(() => 
//             logic.registerUser(name, surname, email, password, passwordConfirm)
//                 .then(() => logic.loginUser(email, password))
//         )

//         it('should succeed on correct credentials', () => 
//             logic.retrieveUser()
//                 .then(user => {
//                     expect(user.id).toBe(logic.__userId__)
//                     expect(user.name).toBe(name)
//                     expect(user.surname).toBe(surname)
//                     expect(user.email).toBe(email)
//                 })
//         )
//     })

//     // TODO updateUser and removeUser

//     describe('search artists', () => {
//         it('should succeed on mathing query', () => {
//             const query = 'madonna'

//             return logic.searchArtists(query)
//                 .then(artists => {
//                     expect(artists).toBeDefined()
//                     expect(artists instanceof Array).toBeTruthy()
//                     expect(artists.length).toBeGreaterThan(0)

//                     artists.forEach(({ name }) => expect(name.toLowerCase()).toContain(query))
//                 })
//         })

//         it('should fail on empty query', () => {
//             const query = ''

//             expect(() => logic.searchArtists(query, function (error, artists) { })).toThrowError('query is empty')
//         })
//     })

//     describe('retrieve albums', () => {
//         it('should succeed on mathing query', () => {
//             const artistId = '6tbjWDEIzxoDsBA1FuhfPW' // madonna

//             return logic.retrieveAlbums(artistId)
//                 .then(albums => {
//                     expect(albums).toBeDefined()
//                     expect(albums instanceof Array).toBeTruthy()
//                     expect(albums.length).toBeGreaterThan(0)
//                 })
//         })

//         it('should fail on empty artistId', function () {
//             const artistId = ''

//             expect(() => logic.retrieveAlbums(artistId)).toThrowError('artistId is empty')
//         })
//     })

//     describe('retrieve tracks', () => {
//         it('should succeed on mathing query', () => {
//             const albumId = '4hBA7VgOSxsWOf2N9dJv2X' // Rebel Heart Tour (Live)

//             return logic.retrieveTracks(albumId)
//                 .then(tracks => {
//                     expect(tracks).toBeDefined()
//                     expect(tracks instanceof Array).toBeTruthy()
//                     expect(tracks.length).toBeGreaterThan(0)
//                 })
//         })

//         it('should fail on empty albumId', function () {
//             const albumId = ''

//             expect(() => logic.retrieveTracks(albumId)).toThrowError('albumId is empty')
//         })
//     })

//     describe('retrieve track', () => {
//         it('should succeed on mathing query', () => {
//             const trackId = '5U1tMecqLfOkPDIUK9SVKa' // Rebel Heart Tour Intro - Live
//             const trackName = 'Rebel Heart Tour Intro - Live'

//             return logic.retrieveTrack(trackId)
//                 .then(track => {
//                     expect(track).toBeDefined()

//                     const { id, name } = track

//                     expect(id).toBe(trackId)
//                     expect(name).toBe(trackName)
//                 })
//         })

//         it('should fail on empty trackId', function () {
//             const trackId = ''

//             expect(() => logic.retrieveTrack(trackId)).toThrowError('trackId is empty')
//         })
//     })
// })