const bcrypt = require('bcrypt')
const LogicError = require('../common/errors')
const validate = require('../common/validate')
const models = require('cinema-and-go-data')
const scrapper = require('../lib/scrapper')

const { User, Movie, MovieSessions, City, mongoose } = models
const {Types: {ObjectId}} = mongoose

const logic = {
    registerUser(name, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const user = await User.findOne({'email': email})
            if (user) throw new LogicError(`user with email "${email}" already exists`)

            let hash = await bcrypt.hash(password, 10)

            return await User.create({ name, email, password: hash })
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const user = await User.findOne({email})
            if (!user) throw new LogicError(`user with email "${email}" does not exist`)

            if (await bcrypt.compare(password, user.password)) return user.id
            else throw new LogicError('wrong credentials')
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await User.findById(id)
            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            const { name, email } = user

            return { name, email }
        })()
    },

    registerCities(name, link, cinemas) {
        return(async () => {
            return await City.create({name, link, cinemas})
        })()
    },

    registerMovie(title, img, info, cast) {
        return (async () => {
            const exists = await Movie.findOne({ title })
            if (exists) return exists._id

            const insertMovie = await Movie.create({ title, img, info, cast })

            return insertMovie._id
        })()
    },

    registerSessions(movie, sessions) {
        return(async () => {
            return await MovieSessions.create({ movie, sessions })
        })()
    },

    scrapperCinemaMovies() {
        const bcnCinemas = 'https://www.ecartelera.com/cines/0,9,23.html'
        return (async () => {
            const scrapCity = await scrapper.getAllCinemas(bcnCinemas);

            await Promise.all(scrapCity.map(async cinema => {
                const { billboard } = cinema
                await Promise.all(billboard.map(async ({title, img, info, cast, movieSessions}) => {
                    const movie = await this.registerMovie(title, img, info, cast)
                    const movieSession = await this.registerSessions(ObjectId(movie), movieSessions)
                }))
            }))
        })()
    }
}

module.exports = logic
