
require('dotenv').config()
const { User, Game, mongoose } = require('freendies_data')
const bcrypt = require('bcrypt')
import logic from '.'

const { env: { REACT_APP_TEST_DB_URL } } = process

describe('logic', () => {
    beforeAll(() => mongoose.connect(REACT_APP_TEST_DB_URL, { useNewUrlParser: true }))

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Game.deleteMany()
        ])
    )
    describe('register user', () => {

        const username = `TestUser-${Math.random()}`
        const email = `testmail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`
        const passwordConfirm = password

        it('should succeed on registering a user with valid data', async () => {
            const message = await logic.registerUser(username, email, password, passwordConfirm)
            expect(message).toBeDefined()
            expect(typeof message).toBe('object')
            expect(message.message).toBe('registered succesfully')

            const user = await User.findOne({ email }).lean()

            expect(user.username).toBe(username)
            expect(user.email).toBe(email)

            const match = await bcrypt.compare(password, user.password)

            expect(match).toBeTruthy()
        })

        it('should fail on undefined username', async () => {
            const username = undefined
            try {
                await logic.registerUser(username, email, password, passwordConfirm)
            } catch (error) {
                expect(error.message).toBe(`${username} is not a string`)
            }
            // expect(() => {
            // logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${username} is not a string`))
            // })

        })

        it('should fail on numeric username', async () => {
            const username = 123

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${username} is not a string`))
            })

        })

        it('should fail on boolean username', async () => {
            const username = true

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${username} is not a string`))
            })
        })

        it('should fail on spaced username', async () => {
            const username = '  '

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${username} is not a string`))
            })
        })

        it('should fail on empty username', async () => {
            const username = ''

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${username} is not a string`))
            })
        })

        it('should fail on undefined email', async () => {
            const email = undefined

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${email} is not a string`))
            })

        })

        it('should fail on numeric email', async () => {
            const email = 123

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${email} is not a string`))
            })

        })

        it('should fail on boolean email', async () => {
            const email = true

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${email} is not a string`))
            })

        })
        it('should fail on spaced email', async () => {
            const email = '  '

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${email} is not a string`))
            })
        })

        it('should fail on empty email', async () => {
            const email = ''

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${email} is not a string`))
            })
        })

        it('should fail on undefined password', async () => {
            const password = undefined

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${password} is not a string`))
            })

        })

        it('should fail on numeric password', async () => {
            const password = 123

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${password} is not a string`))
            })

        })

        it('should fail on boolean password', async () => {
            const password = true

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${password} is not a string`))
            })

        })

        it('should fail on spaced password', async () => {
            const password = '  '

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${password} is not a string`))
            })
        })

        it('should fail on empty password', async () => {
            const password = ''

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${password} is not a string`))
            })
        })


        it('should fail on undefined passwordConfirm', async () => {
            const passwordConfirm = undefined

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${passwordConfirm} is not a string`))
            })

        })

        it('should fail on numeric passwordConfirm', async () => {
            const passwordConfirm = 123

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${passwordConfirm} is not a string`))
            })

        })

        it('should fail on boolean passwordConfirm', async () => {
            const passwordConfirm = true

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${passwordConfirm} is not a string`))
            })

        })
        it('should fail on spaced passwordConfirm', async () => {
            const passwordConfirm = '  '

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${passwordConfirm} is not a string`))
            })
        })

        it('should fail on empty passwordConfirm', async () => {
            const passwordConfirm = ''

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(TypeError(`${passwordConfirm} is not a string`))
            })
        })

        it('should fail on password confirmation not matching password', async () => {
            const passwordConfirm = 'fail'

            expect(() => {
                logic.registerUser(username, email, password, passwordConfirm).toThrow(Error(`${passwordConfirm} does not match password`))
            })
        })

    })

    describe('authenticate user', () => {

        const username = 'TestUser'
        const email = `testmail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`


        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
        )


        it('should succeed to authenicate with valid credentials', async () => {
            logic.authenticateUser(email, password).then(id => expect(id).toBeDefined())

        })

        it('should fail on empty email', async () => {
            const _email = ''

            expect(() => {
                logic.authenticateUser(_email, password)
                    .toThrow(Error(`email cannot be empty`))
            })
        })


        it('should fail on spaced email', async () => {
            const _email = ' '

            expect(() => {
                logic.authenticateUser(_email, password)
                    .toThrow(Error(`email cannot be empty`))
            })
        })


        it('should fail on numeric email', async () => {
            const _email = 1233

            expect(() => {
                logic.authenticateUser(_email, password)
                    .toThrow(Error(`${_email} is not a string`))
            })
        })


        it('should fail on array email', async () => {
            const _email = []

            try {
                await logic.authenticateUser(_email, password)
            } catch (error) {
                expect(error.message).toBe(`${_email} is not a string`)
            }

        })


        it('should fail on object email', async () => {
            const _email = {}

            expect(() => {
                logic.authenticateUser(_email, password)
                    .toThrow(Error(`${_email} is not a string`))
            })
        })


        it('should fail on undefined email', async () => {
            const _email = undefined
            expect(() => {
                logic.authenticateUser(_email, password)
                    .toThrow(Error(`${_email} is not a string`))
            })
        })


        it('should fail on empty password', async () => {
            const password = ''

            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${password} cannot be empty`))
            })
        })


        it('should fail on spaced password', async () => {
            const password = '  '

            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${password} is not a string`))
            })
        })


        it('should fail on numeric password', async () => {
            const password = 1233

            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${password} is not a string`))
            })
        })


        it('should fail on array password', async () => {
            const password = []

            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${password} is not a string`))
            })
        })


        it('should fail on object password', async () => {
            const password = {}
            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${password} is not a string`))
            })
        })


        it('should fail on undefined password', async () => {
            const password = undefined
            expect(() => {
                logic.authenticateUser(email, password)
                    .toThrow(Error(`${password} is not a string`))
            })
        })
    })


    describe('retrieve user', () => {

        const username = 'TestUser'
        const email = `testmail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId, token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => logic.authenticateUser(email, password))
                .then(res => token = res)
        )

        it('should succeed retrieving the user on correct credentials', () => {
            logic.retrieveUser(token)
                .then(user => {
                    expect(user.id).toBe(userId)
                    expect(user.username).toBe(username)
                    expect(user.email).toBe(email)
                })
        })

        it('should fail on boolean id', () => {
            expect(() => {
                logic.retrieveUser(true)
                    .toThrow(Error(`true is not a string`))
            })
        })

        it('should fail on object id', () => {
            expect(() => {
                logic.retrieveUser({})
                    .toThrow(Error(`{} is not a string`))
            })
        })

        it('should fail on numeric id', () => {
            expect(() => {
                logic.retrieveUser(123)
                    .toThrow(Error(`123 is not string`))
            })
        })

        it('should fail on undefined id', () => {
            expect(() => {
                logic.retrieveUser(undefined)
                    .toThrow(Error(`undefined is not string`))
            })
        })

    })

    // describe('update user', () => {
    //     const username = 'TestUser'
    //     const email = `testmail-${Math.random()}@mail.com`
    //     const password = `123-${Math.random()}`

    //     let userId

    //     beforeEach(() =>
    //         bcrypt.hash(password, 10)
    //             .then(hash => User.create({ username, email, password: hash }))
    //             .then(({ id }) => userId = id)
    //     )

    //     it('should succeed on updating user info', async () => {
    //         const newData = {
    //             'email': 'updatedmail@mail.com'
    //         }
    //         const user = await logic.updateUser(userId, newData)
    //         expect(user).toBeTruthy()
    //         expect(user.email).toBe(newData.email)
    //         expect(user.username).toBe(username)
    //     })

    //     it('should fail on wrong userId', () => {
    //         const wrongId = 234223
    //         const newData = {
    //             'email': 'updatedmail@mail.com'
    //         }
    //         expect(() => {
    //             logic.updateUser(wrongId, newData)
    //                 .toThrow(Error('userId is not a string'))
    //         })
    //     })
    // })

    describe('retrieve game by query', () => {

        const username = 'TestUser'
        const email = `testmail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId


        const title = `title-${Math.random()}`
        const genre = `genre-${Math.random()}`
        const description = `description ${Math.random()}`
        const images = [`images ${Math.random()}`]
        const gameFile = `gamefile ${Math.random()}`
        let game

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => {

                    game = Game.create({ ownerId: userId, title, genre, description, images, gameFile })
                    return game
                })
        )

        it('should succed on retrieving a game by query', async () => {
            const retrievedGame = await logic.retrieveGameByQuery(genre, title)
            expect(retrievedGame).toBeTruthy()
            expect(retrievedGame[0].title).toBe(title)
        })
        it('should succed on retrieving a game by query and "any" genre', async () => {
            const any = 'any'
            const retrievedGame = await logic.retrieveGameByQuery(any, title)
            expect(retrievedGame).toBeTruthy()
            expect(retrievedGame[0].title).toBe(title)
        })

        it('should fail on wrong genre', async () => {
            const wrongGenre = 'wrong'
            expect(async () => {
                await logic.retrieveGameByQuery(wrongGenre, title)
                    .toThrow(Error('wrong genre'))

            })
        })

    })

    describe('retrieve game by genre', () => {
        const username = 'TestUser'
        const email = `testmail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId


        const title = `title-${Math.random()}`
        const genre = `genre-${Math.random()}`
        const description = `description ${Math.random()}`
        const images = [`images ${Math.random()}`]
        const gameFile = `gamefile ${Math.random()}`
        let game

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => {

                    game = Game.create({ ownerId: userId, title, genre, description, images, gameFile })
                    return game
                })
        )


        it('should succeed on retrieve a game by genre', async () => {
            const retrievedGame = await logic.retrieveGameByGenre(genre)
            expect(retrievedGame).toBeTruthy()
            expect(retrievedGame[0].title).toBe(title)
        })

        it('should succeed on retrieve a game by "any" genre', async () => {
            const any = 'any'
            const retrievedGame = await logic.retrieveGameByGenre(any)
            expect(retrievedGame).toBeTruthy()
            expect(retrievedGame[0].title).toBe(title)
        })

        it('should fail on wrong genre', () => {
            const wrongGenre = 'wrong'
            expect(async () => {
                await logic.retrieveGameByGenre(wrongGenre)
                    .toThrow(Error('wrong genre'))
            })
        })

        it('should fail on empty genre', () => {
            const wrongGenre = ''
            expect(async () => {
                await logic.retrieveGameByGenre(wrongGenre)
                    .toThrow(Error('wrong genre'))
            })
        })
        it('should fail on wrong genre', () => {
            const wrongGenre = undefined
            expect(async () => {
                await logic.retrieveGameByGenre(wrongGenre)
                    .toThrow(Error('wrong genre'))
            })
        })


    })

    describe('retrieve game by id', () => {
        const username = 'TestUser'
        const email = `testmail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId


        const title = `title-${Math.random()}`
        const genre = `genre-${Math.random()}`
        const description = `description ${Math.random()}`
        const images = [`images ${Math.random()}`]
        const gameFile = `gamefile ${Math.random()}`
        let game

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => {
                    return Game.create({ ownerId: userId, title, genre, description, images, gameFile })
                })
                .then(response => game = response)
        )

        it('should succeed to retrieve game by id with correct id', async () => {
            const retrievedGame = await logic.retrieveGameById(game.id)
            expect(retrievedGame).toBeTruthy()
            expect(retrievedGame.title).toBe(title)

        })

        it('should fail retrieving a game by id on wrong id', async () => {
            const wrongId = ':D'
            expect(async () => {
                await logic.retrieveGameById(wrongId)
                    .toThrow(Error('wrong id'))
            })
        })
        it('should fail retrieving a game by id on empty id', async () => {
            const wrongId = ''
            expect(async () => {
                await logic.retrieveGameById(wrongId)
                    .toThrow(Error('wrong id'))
            })
        })
        it('should fail retrieving a game by id on undefined id', async () => {
            const wrongId = undefined
            expect(async () => {
                await logic.retrieveGameById(wrongId)
                    .toThrow(Error('wrong id'))
            })
        })
    })

    describe('retrieve all games', () => {
        const username = 'TestUser'
        const email = `testmail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId


        const title = `title-${Math.random()}`
        const genre = `genre-${Math.random()}`
        const description = `description ${Math.random()}`
        const images = [`images ${Math.random()}`]
        const gameFile = `gamefile ${Math.random()}`
        let game

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => {

                    game = Game.create({ ownerId: userId, title, genre, description, images, gameFile })
                    return game
                })
        )

        it('should succeed on retrieving all games', async () => {
            const retrievedGame = await logic.retrieveAllGames()
            expect(retrievedGame).toBeTruthy()
            expect(retrievedGame[0].title).toBe(title)
        })
    })

    describe('retrieve user uploads', () => {
        const username = 'TestUser'
        const email = `testmail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId


        const title = `title-${Math.random()}`
        const genre = `genre-${Math.random()}`
        const description = `description ${Math.random()}`
        const images = [`images ${Math.random()}`]
        const gameFile = `gamefile ${Math.random()}`
        let game, token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => {
                    return Game.create({ ownerId: userId, title, genre, description, images, gameFile })
                })
                .then(response => game = response)
                .then(() => logic.authenticateUser(email, password))
                .then(res => token = res)
        )

        it('should succed to retrieve user uploads on correct userId', async () => {
            const retrievedUpload = await logic.retrieveUploads(token)
            expect(retrievedUpload).toBeTruthy()
        })

        it('should fail to retrieve user uploads on wrong userId', async () => {
            const wrongToken = 'wrongToken'
            expect(async () => {
                await logic.retrieveUploads(wrongToken).toThrow(Error('wrong userId'))
            })
        })
        it('should fail to retrieve user uploads on undefined userId', async () => {
            const wrongToken = undefined
            expect(async () => {
                await logic.retrieveUploads(wrongToken).toThrow(Error('wrong userId'))
            })
        })
        it('should fail to retrieve user uploads on empty userId', async () => {
            const wrongToken = ''
            expect(async () => {
                await logic.retrieveUploads(wrongToken).toThrow(Error('wrong userId'))
            })
        })

    })

    describe('toggle favs', () => {
        const username = 'TestUser'
        const email = `testmail-${Math.random()}@mail.com`
        const password = `123-${Math.random()}`

        let userId


        const title = `title-${Math.random()}`
        const genre = `genre-${Math.random()}`
        const description = `description ${Math.random()}`
        const images = [`images ${Math.random()}`]
        const gameFile = `gamefile ${Math.random()}`
        let game, token

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(hash => User.create({ username, email, password: hash }))
                .then(({ id }) => userId = id)
                .then(() => {

                    return Game.create({ ownerId: userId, title, genre, description, images, gameFile })
                })
                .then(response => game = response)
                .then(() => logic.authenticateUser(email, password))
                .then(res => token = res)
        )

        it('should succeed on toggling a game to fav', async () => {
            debugger
            await logic.toggleFavs(game.id)
            const user = await logic.retrieveUser(token)
            expect(user.favoriteGames[0].toString()).toBe(game.id)

        })

        it('should succeed on untoggling a game to fav', async () => {
            await logic.toggleFavs(game.id)
            await logic.toggleFavs(game.id)
            const user = await logic.retrieveUser(token)
            expect(user.favoriteGames[0]).toBe(undefined)
        })

        it('should fail on undefined game.id', async () => {
            const wrongGameId = undefined
            expect(async () => await logic.toggleFavs(wrongGameId).toThrow(Error('wrong userId')))
        })
        it('should fail on empty game.id', async () => {
            const wrongGameId = ''
            expect(async () => await logic.toggleFavs(wrongGameId).toThrow(Error('wrong userId')))
        })
    })

    // describe('retrieve user favs', () => {
    //     const username = 'TestUser'
    //     const email = `testmail-${Math.random()}@mail.com`
    //     const password = `123-${Math.random()}`

    //     let userId


    //     const title = `title-${Math.random()}`
    //     const genre = `genre-${Math.random()}`
    //     const description = `description ${Math.random()}`
    //     const images = [`images ${Math.random()}`]
    //     const gameFile = `gamefile ${Math.random()}`
    //     let game, token

    //     beforeEach(() =>
    //         bcrypt.hash(password, 10)
    //             .then(hash => User.create({ username, email, password: hash }))
    //             .then(({ id }) => userId = id)
    //             .then(() => {

    //                 return Game.create({ ownerId: userId, title, genre, description, images, gameFile })
    //             })
    //             .then(response => game = response)
    //             .then(() => logic.authenticateUser(email, password))
    //             .then(res => token = res)
    //             .then(() => logic.toggleFavs(token, game.id))
    //     )

    //     it('should succeed on retrieving user favlist', async () => {
    //         debugger
    //         const favs = await logic.retrieveFavs()
    //         expect(favs).toBeTruthy()
    //         expect(favs[0].id).toBe(game.id)
    //     })
    //     it('should fail on wrong userId', async () => {
    //         const wrongId = 'wrongId'
    //         expect(async () => await logic.retrieveFavs().toThrow(Error('wrong userId')))
    //     })
    //     it('should fail on empty userId', async () => {
    //         const wrongId = ''
    //         expect(async () => await logic.retrieveFavs().toThrow(Error('wrong userId')))
    //     })
    //     it('should fail on undefined userId', async () => {
    //         const wrongId = 'undefined'
    //         expect(async () => await logic.retrieveFavs().toThrow(Error('wrong userId')))
    //     })
    // })
    afterAll(() =>
        Promise.all([
            User.deleteMany(),
            House.deleteMany()

        ])
            .then(() => mongoose.disconnect())
    )
})