const dotenv = require('dotenv')
const { mongoose } = require('cinema-and-go-data/src/models')
const logic = require('../logic')

dotenv.config()

const { env: { MONGO_URL_TEST: url } } = process;

(async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, })

        console.log('connected to database')

        await logic.scrapCinemaMovies()

        return mongoose.disconnect()
    } catch (error) {
        console.error(error, error.message)
    }
})()
