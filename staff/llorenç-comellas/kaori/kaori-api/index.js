require('dotenv').config()
const express = require('express')
const { mongoose } = require('kaori-data')
const routes = require('./routes')
const cors = require('cors')

const app = express()


const { env: { PORT, MONGO_URL_LOGIC_TEST: URL } } = process
mongoose.connect(URL, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use('/api', routes)

app.listen(PORT, () => console.log(`Server connect in port ${PORT}`))