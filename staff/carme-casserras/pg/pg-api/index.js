require('dotenv').config()
const express = require('express')

const cors = require('cors')
const {mongoose} = require('pg-data')
const router = require('./routes')

const app = express()

// const {env: {PORT, MONGO_URL : url} } = process;

const {env: {PORT, MONGO_URL_TEST : url}, argv: [, , port = PORT || 8080], } = process;

mongoose.connect(url, {useNewUrlParser: true, useFindAndModify:false, useCreateIndex: true});

app.use(cors())
app.use('/api', router)



app.listen(port, () => {
    console.log(`servidor conectado al puerto ${port}`)
})